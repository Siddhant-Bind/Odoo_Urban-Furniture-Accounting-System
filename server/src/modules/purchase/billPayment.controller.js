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

    // Record the payment
    const payment = await prisma.billPayment.create({
      data: {
        billId,
        amount: amount,
        paymentVia,
        paymentDate: new Date(paymentDate)
      }
    });

    // Mark bill as PAID so the list view updates immediately
    const updatedBill = await prisma.vendorBill.update({
      where: { id: billId },
      data: { status: 'PAID' },
      include: { vendor: true, payments: true }
    });

    res.status(201).json({ payment, bill: updatedBill });
  } catch (error) {
    next(error);
  }
};
