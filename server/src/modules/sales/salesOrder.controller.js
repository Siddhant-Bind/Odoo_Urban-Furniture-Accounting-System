import prisma from '../../config/prisma.js';
import { generateSequence } from '../../utils/generateSequence.js';

export const createSO = async (req, res, next) => {
  try {
    const { customerId, orderDate, lines } = req.body;
    const soNumber = await generateSequence('SO');

    const so = await prisma.salesOrder.create({
      data: {
        soNumber,
        customerId,
        orderDate: new Date(orderDate),
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

    res.status(201).json(so);
  } catch (error) {
    next(error);
  }
};

export const getSOs = async (req, res, next) => {
  try {
    const sos = await prisma.salesOrder.findMany({
      include: { customer: true, lines: true }
    });
    res.json(sos);
  } catch (error) {
    next(error);
  }
};

export const getSOById = async (req, res, next) => {
  try {
    const so = await prisma.salesOrder.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { customer: true, lines: { include: { product: true } } }
    });
    if (!so) return res.status(404).json({ error: 'SO not found' });
    res.json(so);
  } catch (error) {
    next(error);
  }
};

export const confirmSO = async (req, res, next) => {
  try {
    const so = await prisma.salesOrder.update({
      where: { id: parseInt(req.params.id) },
      data: { status: 'CONFIRMED' }
    });
    res.json(so);
  } catch (error) {
    next(error);
  }
};
