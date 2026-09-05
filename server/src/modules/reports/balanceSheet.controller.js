import prisma from '../../config/prisma.js';

export const getBalanceSheet = async (req, res, next) => {
  try {
    // Assets must equal Liabilities + Capital
    // Sum JournalEntryLine amounts by Account.type for POSTED journal entries only
    const postedEntries = await prisma.journalEntryLine.findMany({
      where: {
        entry: { status: 'POSTED' },
        account: {
          accountType: { in: ['ASSET', 'LIABILITY', 'CAPITAL'] }
        }
      },
      include: { account: true }
    });

    let totalAssets = 0;
    let totalLiabilities = 0;
    let totalCapital = 0;
    const details = { ASSET: [], LIABILITY: [], CAPITAL: [] };

    // Grouping logic (naive loop for simplicity)
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

      // Assets normal balance is debit (Debit - Credit)
      // Liability & Capital normal balance is credit (Credit - Debit)
      if (line.account.accountType === 'ASSET') {
        accountSums[accId].balance += (debit - credit);
      } else {
        accountSums[accId].balance += (credit - debit);
      }
    }

    for (const acc of Object.values(accountSums)) {
      details[acc.type].push(acc);
      if (acc.type === 'ASSET') totalAssets += acc.balance;
      else if (acc.type === 'LIABILITY') totalLiabilities += acc.balance;
      else if (acc.type === 'CAPITAL') totalCapital += acc.balance;
    }

    res.json({
      totalAssets,
      totalLiabilities,
      totalCapital,
      isBalanced: totalAssets === (totalLiabilities + totalCapital),
      details
    });
  } catch (error) {
    next(error);
  }
};
