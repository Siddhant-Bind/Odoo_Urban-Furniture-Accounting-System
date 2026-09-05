import prisma from '../../config/prisma.js';
import { generateSequence } from '../../utils/generateSequence.js';
import { postJournalEntry } from '../accounting/ledger.service.js';

export const createVendorBill = async (req, res, next) => {
  try {
    const { purchaseOrderId, vendorId, journalId, invoiceDate, dueDate, lines } = req.body;
    const billNumber = await generateSequence('BILL');

    const totalAmount = lines.reduce((sum, line) => sum + (Number(line.quantity) * Number(line.unitPrice)), 0);

    const bill = await prisma.vendorBill.create({
      data: {
        billNumber,
        purchaseOrderId,
        vendorId,
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
    
    // If it came from a PO, mark PO as BILLED
    if (purchaseOrderId) {
      await prisma.purchaseOrder.update({
        where: { id: purchaseOrderId },
        data: { status: 'BILLED' }
      });
    }

    res.status(201).json(bill);
  } catch (error) {
    next(error);
  }
};

export const getVendorBills = async (req, res, next) => {
  try {
    const bills = await prisma.vendorBill.findMany({
      include: { vendor: true, lines: true, payments: true },
      orderBy: { id: 'desc' }
    });
    res.json(bills);
  } catch (error) {
    next(error);
  }
};

export const getVendorBillById = async (req, res, next) => {
  try {
    const bill = await prisma.vendorBill.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { vendor: true, lines: { include: { product: true } }, payments: true }
    });
    if (!bill) return res.status(404).json({ error: 'Bill not found' });
    res.json(bill);
  } catch (error) {
    next(error);
  }
};

export const confirmVendorBill = async (req, res, next) => {
  try {
    const billId = parseInt(req.params.id);
    const bill = await prisma.vendorBill.findUnique({
      where: { id: billId },
      include: { lines: true, journal: { include: { defaultDebitAccount: true, defaultCreditAccount: true } }, vendor: true }
    });

    if (!bill) return res.status(404).json({ error: 'Bill not found' });
    if (bill.status !== 'DRAFT') return res.status(400).json({ error: 'Bill is not in DRAFT status' });

    // Build ledger lines
    // Credit Creditor Account (from Journal default Credit account)
    // Debit Purchase Expense (from Line accountId OR Journal default Debit account)
    const journalLines = [];
    
    let totalCredit = 0;

    for (const line of bill.lines) {
      const debitAccountId = line.accountId || bill.journal.defaultDebitAccountId;
      const lineTotal = Number(line.total);
      
      journalLines.push({
        accountId: debitAccountId,
        partnerId: bill.vendorId,
        debit: lineTotal,
        credit: 0
      });
      totalCredit += lineTotal;
    }

    // Credit Line
    journalLines.push({
      accountId: bill.journal.defaultCreditAccountId,
      partnerId: bill.vendorId,
      debit: 0,
      credit: totalCredit
    });

    // Create Journal Entry via Ledger Service
    await postJournalEntry({
      journalId: bill.journalId,
      reference: bill.billNumber,
      sourceType: 'BILL',
      sourceId: bill.id,
      lines: journalLines
    });

    // Update Bill status
    const updatedBill = await prisma.vendorBill.update({
      where: { id: billId },
      data: { status: 'POSTED' }
    });

    res.json(updatedBill);
  } catch (error) {
    next(error);
  }
};
