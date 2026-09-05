import prisma from '../../config/prisma.js';

export const getBalanceSheet = async (req, res, next) => {
  try {
    // Ensure standard accounts exist in DB
    const standardAccounts = [
      { accountName: 'Bank', accountType: 'ASSET' },
      { accountName: 'Cash', accountType: 'ASSET' },
      { accountName: 'Debtors', accountType: 'ASSET' },
      { accountName: 'Creditors', accountType: 'LIABILITY' },
      { accountName: 'Capital', accountType: 'CAPITAL' }
    ];

    for (const std of standardAccounts) {
      await prisma.account.upsert({
        where: { accountName: std.accountName },
        update: { accountType: std.accountType },
        create: { accountName: std.accountName, accountType: std.accountType }
      });
    }

    // Fetch accounts
    const accounts = await prisma.account.findMany({
      where: {
        accountType: { in: ['ASSET', 'LIABILITY', 'CAPITAL'] }
      }
    });

    // Fetch posted journal entry lines
    const postedLines = await prisma.journalEntryLine.findMany({
      where: {
        entry: { status: 'POSTED' }
      },
      include: { account: true }
    });

    const accountBalances = {};
    accounts.forEach(acc => {
      accountBalances[acc.id] = {
        id: acc.id,
        name: acc.accountName,
        type: acc.accountType,
        rawBalance: 0
      };
    });

    for (const line of postedLines) {
      if (accountBalances[line.accountId]) {
        const debit = Number(line.debit) || 0;
        const credit = Number(line.credit) || 0;
        const acc = accountBalances[line.accountId];
        if (acc.type === 'ASSET') {
          acc.rawBalance += (debit - credit);
        } else {
          acc.rawBalance += (credit - debit);
        }
      }
    }

    // Check customer invoices for Debtors fallback
    const invoices = await prisma.customerInvoice.findMany({
      where: { status: 'POSTED' },
      include: { payments: true }
    });
    const debtorsAccount = accounts.find(a => a.accountName === 'Debtors');
    if (debtorsAccount && accountBalances[debtorsAccount.id].rawBalance === 0) {
      let unpaidSum = 0;
      for (const inv of invoices) {
        const paid = inv.payments.reduce((sum, p) => sum + Number(p.amount || 0), 0);
        unpaidSum += Math.max(0, Number(inv.totalAmount || 0) - paid);
      }
      accountBalances[debtorsAccount.id].rawBalance = unpaidSum;
    }

    // Check vendor bills for Creditors fallback
    const bills = await prisma.vendorBill.findMany({
      where: { status: 'POSTED' },
      include: { payments: true }
    });
    const creditorsAccount = accounts.find(a => a.accountName === 'Creditors');
    if (creditorsAccount && accountBalances[creditorsAccount.id].rawBalance === 0) {
      let unpaidSum = 0;
      for (const bill of bills) {
        const paid = bill.payments.reduce((sum, p) => sum + Number(p.amount || 0), 0);
        unpaidSum += Math.max(0, Number(bill.totalAmount || 0) - paid);
      }
      accountBalances[creditorsAccount.id].rawBalance = unpaidSum;
    }

    const assets = [];
    const liabilities = [];
    let totalAssets = 0;
    let totalLiabilities = 0;

    Object.values(accountBalances).forEach(acc => {
      const balance = Math.max(0, acc.rawBalance);
      const item = {
        id: acc.id,
        name: acc.name,
        type: acc.type,
        accountCategory: acc.type === 'ASSET' ? `Asset - ${acc.name}` : (acc.type === 'CAPITAL' ? 'Capital' : `Liability - ${acc.name.toLowerCase()}`),
        balance
      };

      if (acc.type === 'ASSET') {
        assets.push(item);
        totalAssets += balance;
      } else {
        liabilities.push(item);
        totalLiabilities += balance;
      }
    });

    res.json({
      totalAssets,
      totalLiabilities,
      assets,
      liabilities
    });
  } catch (error) {
    next(error);
  }
};
