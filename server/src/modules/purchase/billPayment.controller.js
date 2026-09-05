import prisma from '../../config/prisma.js';

export const payBill = async (req, res, next) => {
  try {
    const billId = parseInt(req.params.id);
    const { amount, paymentVia, paymentDate } = req.body;
    const { role, contactId } = req.user;

    const bill = await prisma.vendorBill.findUnique({ where: { id: billId } });
    if (!bill) return res.status(404).json({ error: 'Bill not found' });

    if (role === 'CONTACT' && bill.vendorId !== contactId) {
      return res.status(403).json({ error: 'Not authorized to pay this bill' });
    }

    // In a real system, payment would also generate a journal entry (Debit Creditor, Credit Bank/Cash).
    // For simplicity or depending on phase requirements, we might just record it.
    // Spec says: "Record Cash/Bank payment and calculate live amount due."
    
    const payment = await prisma.billPayment.create({
      data: {
        billId,
        amount: amount,
        paymentVia,
        paymentDate: new Date(paymentDate)
      }
    });

    res.status(201).json(payment);
  } catch (error) {
    next(error);
  }
};
