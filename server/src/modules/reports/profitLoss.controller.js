import prisma from '../../config/prisma.js';

export const getProfitLoss = async (req, res, next) => {
  try {
    // Net Income = Total Income - Total Expenses
    const postedEntries = await prisma.journalEntryLine.findMany({
      where: {
        entry: { status: 'POSTED' },
        account: {
          accountType: { in: ['INCOME', 'EXPENSE'] }
        }
      },
      include: { account: true }
    });

    let totalIncome = 0;
    let totalExpense = 0;
    const details = { INCOME: [], EXPENSE: [] };

    const accountSums = {};

    for (const line of postedEntries) {
      const accId = line.account.id;
      if (!accountSums[accId]) {
        accountSums[accId] = {
          name: line.account.accountName,
          type: line.account.accountType,
          balance: 0
        };
      }
      
      const debit = Number(line.debit) || 0;
      const credit = Number(line.credit) || 0;

      // Income normal balance is credit (Credit - Debit)
      // Expense normal balance is debit (Debit - Credit)
      if (line.account.accountType === 'INCOME') {
        accountSums[accId].balance += (credit - debit);
      } else {
        accountSums[accId].balance += (debit - credit);
      }
    }

    for (const acc of Object.values(accountSums)) {
      details[acc.type].push(acc);
      if (acc.type === 'INCOME') totalIncome += acc.balance;
      else if (acc.type === 'EXPENSE') totalExpense += acc.balance;
    }

    const netIncome = totalIncome - totalExpense;

    res.json({
      totalIncome,
      totalExpense,
      netIncome,
      details
    });
  } catch (error) {
    next(error);
  }
};
