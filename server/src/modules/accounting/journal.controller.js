import prisma from '../../config/prisma.js';

export const getJournals = async (req, res, next) => {
  try {
    const { journalType } = req.query;
    const where = journalType ? { journalType } : {};
    
    const journals = await prisma.journal.findMany({
      where,
      include: {
        defaultDebitAccount: true,
        defaultCreditAccount: true
      }
    });
    res.json(journals);
  } catch (error) {
    next(error);
  }
};

export const getJournalById = async (req, res, next) => {
  try {
    const journal = await prisma.journal.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        defaultDebitAccount: true,
        defaultCreditAccount: true
      }
    });
    if (!journal) return res.status(404).json({ error: 'Journal not found' });
    res.json(journal);
  } catch (error) {
    next(error);
  }
};

export const createJournal = async (req, res, next) => {
  try {
    const { journalName, journalType, defaultDebitAccountId, defaultCreditAccountId } = req.body;

    const journal = await prisma.journal.create({
      data: {
        journalName,
        journalType,
        defaultDebitAccountId,
        defaultCreditAccountId
      }
    });
    res.status(201).json(journal);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'A journal with this name already exists.' });
    }
    next(error);
  }
};

export const updateJournal = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { journalName, journalType, defaultDebitAccountId, defaultCreditAccountId } = req.body;

    const journal = await prisma.journal.update({
      where: { id: parseInt(id) },
      data: {
        journalName,
        journalType,
        defaultDebitAccountId,
        defaultCreditAccountId
      }
    });
    res.json(journal);
  } catch (error) {
    next(error);
  }
};
