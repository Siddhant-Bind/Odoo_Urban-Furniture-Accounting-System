import prisma from '../config/prisma.js';

export async function generateSequence(type) {
  const prefixMap = {
    PO: 'PO',
    BILL: 'VB',
    SO: 'SO',
    INVOICE: 'INV'
  };
  
  const prefix = prefixMap[type] || type;
  
  // Find the last document of this type to get the next sequence
  // This is a naive implementation; in production a sequence table is better.
  let lastRecord;
  if (type === 'PO') {
    lastRecord = await prisma.purchaseOrder.findFirst({ orderBy: { id: 'desc' } });
  } else if (type === 'BILL') {
    lastRecord = await prisma.vendorBill.findFirst({ orderBy: { id: 'desc' } });
  } else if (type === 'SO') {
    lastRecord = await prisma.salesOrder.findFirst({ orderBy: { id: 'desc' } });
  } else if (type === 'INVOICE') {
    lastRecord = await prisma.customerInvoice.findFirst({ orderBy: { id: 'desc' } });
  }

  let nextId = 1;
  if (lastRecord) {
    nextId = lastRecord.id + 1;
  }
  
  // Format to 5 digits, e.g. PO-00001
  return `${prefix}-${String(nextId).padStart(5, '0')}`;
}
