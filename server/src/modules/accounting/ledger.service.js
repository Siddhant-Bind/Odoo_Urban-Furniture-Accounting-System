import prisma from '../../config/prisma.js';

export async function postJournalEntry({ journalId, reference, sourceType, sourceId, lines }) {
  // Validate debit/credit balance
  const totalDebit = lines.reduce((s, l) => s + (Number(l.debit) || 0), 0);
  const totalCredit = lines.reduce((s, l) => s + (Number(l.credit) || 0), 0);
  
  if (totalDebit !== totalCredit) {
    const err = new Error(`Debit and credit totals do not match (Debit: ${totalDebit}, Credit: ${totalCredit})`);
    err.statusCode = 422;
    throw err;
  }

  // Find if entry already exists to make it idempotent?
  // sourceType is 'BILL' or 'INVOICE'
  
  const existingEntry = await prisma.journalEntry.findFirst({
    where: {
      ...(sourceType === 'BILL' ? { vendorBillId: sourceId } : {}),
      ...(sourceType === 'INVOICE' ? { customerInvoiceId: sourceId } : {}),
    }
  });

  if (existingEntry) {
    if (existingEntry.status === 'POSTED') {
      return existingEntry; // Already posted
    } else {
      // If draft/cancelled, could reset and update. For simplicity, we create if not exists
      // as the requirements don't specifically dictate how to handle re-posting existing.
    }
  }

  // Create new journal entry
  const entry = await prisma.journalEntry.create({
    data: {
      journalId,
      reference,
      status: 'POSTED',
      ...(sourceType === 'BILL' ? { vendorBillId: sourceId } : {}),
      ...(sourceType === 'INVOICE' ? { customerInvoiceId: sourceId } : {}),
      lines: {
        create: lines.map(line => ({
          accountId: line.accountId,
          partnerId: line.partnerId,
          debit: line.debit,
          credit: line.credit
        }))
      },
    },
    include: { lines: true },
  });

  return entry;
}

export async function resetToDraft(journalEntryId) {
  return prisma.journalEntry.update({
    where: { id: journalEntryId },
    data: { status: 'DRAFT' },
  });
}
