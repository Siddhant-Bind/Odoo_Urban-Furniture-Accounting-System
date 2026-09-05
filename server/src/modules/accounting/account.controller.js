import prisma from '../../config/prisma.js';

export const getAccounts = async (req, res, next) => {
  try {
    const { accountType } = req.query;
    const where = accountType ? { accountType } : {};
    
    const accounts = await prisma.account.findMany({ where });
    res.json(accounts);
  } catch (error) {
    next(error);
  }
};

export const getAccountById = async (req, res, next) => {
  try {
    const account = await prisma.account.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!account) return res.status(404).json({ error: 'Account not found' });
    res.json(account);
  } catch (error) {
    next(error);
  }
};

export const updateAccount = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { accountName, accountType, parentAccountId, status } = req.body;

    const account = await prisma.account.update({
      where: { id: parseInt(id) },
      data: {
        accountName,
        accountType,
        parentAccountId,
        status
      }
    });
    res.json(account);
  } catch (error) {
    next(error);
  }
};
