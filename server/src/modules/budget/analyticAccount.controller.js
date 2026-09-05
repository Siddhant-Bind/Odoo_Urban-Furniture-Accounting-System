import prisma from '../../config/prisma.js';

export const createAnalyticAccount = async (req, res, next) => {
  try {
    const { name, type } = req.body;
    const analyticAccount = await prisma.analyticAccount.create({
      data: { name, type }
    });
    res.status(201).json(analyticAccount);
  } catch (error) {
    next(error);
  }
};

export const getAnalyticAccounts = async (req, res, next) => {
  try {
    const analyticAccounts = await prisma.analyticAccount.findMany();
    res.json(analyticAccounts);
  } catch (error) {
    next(error);
  }
};

export const getAnalyticAccountById = async (req, res, next) => {
  try {
    const analyticAccount = await prisma.analyticAccount.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!analyticAccount) return res.status(404).json({ error: 'Analytic Account not found' });
    res.json(analyticAccount);
  } catch (error) {
    next(error);
  }
};

export const updateAnalyticAccount = async (req, res, next) => {
  try {
    const { name, type } = req.body;
    const analyticAccount = await prisma.analyticAccount.update({
      where: { id: parseInt(req.params.id) },
      data: { name, type }
    });
    res.json(analyticAccount);
  } catch (error) {
    next(error);
  }
};
