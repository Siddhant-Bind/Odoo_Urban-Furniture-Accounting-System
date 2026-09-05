import express from 'express';
import prisma from '../../config/prisma.js';
import requireAuth from '../../middleware/authMiddleware.js';

const router = express.Router();

router.use(requireAuth);

router.get('/', async (req, res, next) => {
  try {
    const entries = await prisma.journalEntry.findMany({
      include: { lines: true, journal: true, vendorBill: true, customerInvoice: true }
    });
    res.json(entries);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { journalId, reference, lines, date } = req.body;
    const entry = await prisma.journalEntry.create({
      data: {
        journalId,
        reference,
        status: 'DRAFT',
        lines: {
          create: lines.map(line => ({
            accountId: line.accountId,
            partnerId: line.partnerId || null,
            debit: line.debit || 0,
            credit: line.credit || 0
          }))
        }
      },
      include: { lines: true, journal: true }
    });
    res.status(201).json(entry);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const entry = await prisma.journalEntry.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { lines: true, journal: true }
    });
    if (!entry) return res.status(404).json({ error: 'Entry not found' });
    res.json(entry);
  } catch (err) {
    next(err);
  }
});

export default router;
