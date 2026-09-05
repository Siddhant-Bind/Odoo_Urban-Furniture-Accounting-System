import prisma from '../../config/prisma.js';

export const payInvoice = async (req, res, next) => {
  try {
    const invoiceId = parseInt(req.params.id);
    const { amount, paymentVia, paymentDate } = req.body;

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
