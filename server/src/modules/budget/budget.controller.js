import prisma from '../../config/prisma.js';

export const createBudget = async (req, res, next) => {
  try {
    const { budgetName, periodStart, periodEnd, responsiblePersonId, analyticAccountId, committedAmount } = req.body;
    const budget = await prisma.budget.create({
      data: {
        budgetName,
        periodStart: new Date(periodStart),
        periodEnd: new Date(periodEnd),
        responsiblePersonId,
        analyticAccountId,
        committedAmount: Number(committedAmount)
      }
    });
    res.status(201).json(budget);
  } catch (error) {
    next(error);
  }
};

export const getBudgets = async (req, res, next) => {
  try {
    const budgets = await prisma.budget.findMany({
      include: { analyticAccount: true, responsiblePerson: true }
    });

    // Dynamically calculate achievedAmount for each budget
    for (const budget of budgets) {
      const type = budget.analyticAccount.type; // INCOME or EXPENSE
      let achieved = 0;

      if (type === 'EXPENSE') {
        const taggedLines = await prisma.vendorBillLine.findMany({
          where: {
            analyticAccountId: budget.analyticAccountId,
            bill: {
              invoiceDate: { gte: budget.periodStart, lte: budget.periodEnd }
            }
          }
        });
        achieved = taggedLines.reduce((sum, line) => sum + Number(line.total), 0);
      } else {
        const taggedLines = await prisma.customerInvoiceLine.findMany({
          where: {
            analyticAccountId: budget.analyticAccountId,
            invoice: {
              invoiceDate: { gte: budget.periodStart, lte: budget.periodEnd }
            }
          }
        });
        achieved = taggedLines.reduce((sum, line) => sum + Number(line.total), 0);
      }

      budget.achievedAmount = achieved.toFixed(2);
    }

    res.json(budgets);
  } catch (error) {
    next(error);
  }
};

export const confirmBudget = async (req, res, next) => {
  try {
    const budget = await prisma.budget.update({
      where: { id: parseInt(req.params.id) },
      data: { status: 'CONFIRMED' }
    });
    res.json(budget);
  } catch (error) {
    next(error);
  }
};

export const reviseBudget = async (req, res, next) => {
  try {
    const budgetId = parseInt(req.params.id);
    const { committedAmount, periodStart, periodEnd, responsiblePersonId } = req.body;
    
    // Find the original
    const original = await prisma.budget.findUnique({ where: { id: budgetId } });
    if (!original) return res.status(404).json({ error: 'Budget not found' });

    // Mark original as REVISED
    await prisma.budget.update({
      where: { id: budgetId },
      data: { status: 'REVISED' }
    });

    // Create a new revised budget
    const revisedBudget = await prisma.budget.create({
      data: {
        budgetName: `${original.budgetName} Revised`,
        periodStart: periodStart ? new Date(periodStart) : original.periodStart,
        periodEnd: periodEnd ? new Date(periodEnd) : original.periodEnd,
        responsiblePersonId: responsiblePersonId || original.responsiblePersonId,
        analyticAccountId: original.analyticAccountId,
        committedAmount: committedAmount ? Number(committedAmount) : original.committedAmount,
        revisionOfId: original.id,
        status: 'DRAFT'
      }
    });

    res.status(201).json(revisedBudget);
  } catch (error) {
    next(error);
  }
};

export const cancelBudget = async (req, res, next) => {
  try {
    const budget = await prisma.budget.update({
      where: { id: parseInt(req.params.id) },
      data: { status: 'CANCELLED' }
    });
    res.json(budget);
  } catch (error) {
    next(error);
  }
};
