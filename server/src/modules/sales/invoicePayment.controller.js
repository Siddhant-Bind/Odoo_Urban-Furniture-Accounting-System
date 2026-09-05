import prisma from '../../config/prisma.js';

export const payInvoice = async (req, res, next) => {
  try {
    const invoiceId = parseInt(req.params.id);
    const { amount, paymentVia, paymentDate } = req.body;
    const { role, contactId } = req.user;

    const invoice = await prisma.customerInvoice.findUnique({ where: { id: invoiceId } });
    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });

    if (role === 'CONTACT' && invoice.customerId !== contactId) {
      return res.status(403).json({ error: 'Not authorized to pay this invoice' });
    }

    // Record the payment
    const payment = await prisma.invoicePayment.create({
      data: {
        invoiceId,
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
