import prisma from '../../config/prisma.js';
import { generateSequence } from '../../utils/generateSequence.js';
import { postJournalEntry } from '../accounting/ledger.service.js';

export const createCustomerInvoice = async (req, res, next) => {
  try {
    const { salesOrderId, customerId, journalId, invoiceDate, dueDate, lines } = req.body;
    const invoiceNumber = await generateSequence('INVOICE');

    const totalAmount = lines.reduce((sum, line) => sum + (Number(line.quantity) * Number(line.unitPrice)), 0);

    const invoice = await prisma.customerInvoice.create({
      data: {
        invoiceNumber,
        salesOrderId,
        customerId,
        journalId,
        invoiceDate: new Date(invoiceDate),
        dueDate: new Date(dueDate),
        totalAmount: totalAmount.toFixed(2),
        status: 'DRAFT',
        lines: {
          create: lines.map(line => ({
            productId: line.productId,
            accountId: line.accountId,
            analyticAccountId: line.analyticAccountId,
            quantity: line.quantity,
            unitPrice: line.unitPrice,
            total: (Number(line.quantity) * Number(line.unitPrice)).toFixed(2)
          }))
        }
      },
      include: { lines: true }
    });
    
    // If it came from an SO, mark SO as BILLED
    if (salesOrderId) {
      await prisma.salesOrder.update({
        where: { id: salesOrderId },
        data: { status: 'BILLED' }
      });
    }

    res.status(201).json(invoice);
  } catch (error) {
    next(error);
  }
};

export const getCustomerInvoices = async (req, res, next) => {
  try {
    const invoices = await prisma.customerInvoice.findMany({
      include: { customer: true, lines: true, payments: true },
      orderBy: { id: 'desc' }
    });
    res.json(invoices);
  } catch (error) {
    next(error);
  }
};

export const getCustomerInvoiceById = async (req, res, next) => {
  try {
    const invoice = await prisma.customerInvoice.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { customer: true, lines: { include: { product: true } }, payments: true }
    });
    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });
    res.json(invoice);
  } catch (error) {
    next(error);
  }
};

export const confirmCustomerInvoice = async (req, res, next) => {
  try {
    const invoiceId = parseInt(req.params.id);
    const invoice = await prisma.customerInvoice.findUnique({
      where: { id: invoiceId },
      include: { lines: true, journal: { include: { defaultDebitAccount: true, defaultCreditAccount: true } }, customer: true }
    });

    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });
    if (invoice.status !== 'DRAFT') return res.status(400).json({ error: 'Invoice is not in DRAFT status' });

    // Build ledger lines
    // Debit Debtor/Cash Account (from Journal default Debit account)
    // Credit Income (from Line accountId OR Journal default Credit account)
    const journalLines = [];
    
    let totalDebit = 0;

    for (const line of invoice.lines) {
      const creditAccountId = line.accountId || invoice.journal.defaultCreditAccountId;
      const lineTotal = Number(line.total);
      
      journalLines.push({
        accountId: creditAccountId,
        partnerId: invoice.customerId,
        debit: 0,
        credit: lineTotal
      });
      totalDebit += lineTotal;
    }

    // Debit Line
    journalLines.push({
      accountId: invoice.journal.defaultDebitAccountId,
      partnerId: invoice.customerId,
      debit: totalDebit,
      credit: 0
    });

    // Create Journal Entry via Ledger Service
    await postJournalEntry({
      journalId: invoice.journalId,
      reference: invoice.invoiceNumber,
      sourceType: 'INVOICE',
      sourceId: invoice.id,
      lines: journalLines
    });

    // Update Invoice status
    const updatedInvoice = await prisma.customerInvoice.update({
      where: { id: invoiceId },
      data: { status: 'POSTED' }
    });

    res.json(updatedInvoice);
  } catch (error) {
    next(error);
  }
};
