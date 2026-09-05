import prisma from '../../config/prisma.js';
import { generateSequence } from '../../utils/generateSequence.js';

export const createPO = async (req, res, next) => {
  try {
    const { vendorId, orderDate, lines } = req.body;
    const poNumber = await generateSequence('PO');

    const po = await prisma.purchaseOrder.create({
      data: {
        poNumber,
        vendorId,
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

    res.status(201).json(po);
  } catch (error) {
    next(error);
  }
};

export const getPOs = async (req, res, next) => {
  try {
    const pos = await prisma.purchaseOrder.findMany({
      include: { vendor: true, lines: true }
    });
    res.json(pos);
  } catch (error) {
    next(error);
  }
};

export const getPOById = async (req, res, next) => {
  try {
    const po = await prisma.purchaseOrder.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { vendor: true, lines: { include: { product: true } } }
    });
    if (!po) return res.status(404).json({ error: 'PO not found' });
    res.json(po);
  } catch (error) {
    next(error);
  }
};

export const confirmPO = async (req, res, next) => {
  try {
    const po = await prisma.purchaseOrder.update({
      where: { id: parseInt(req.params.id) },
      data: { status: 'CONFIRMED' }
    });
    res.json(po);
  } catch (error) {
    next(error);
  }
};
