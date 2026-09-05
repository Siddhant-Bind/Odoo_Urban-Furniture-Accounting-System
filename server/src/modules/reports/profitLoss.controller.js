import prisma from '../../config/prisma.js';

export const getProfitLoss = async (req, res, next) => {
  try {
    const { year } = req.query;
    let dateFilter = {};
    if (year) {
      const start = new Date(`${year}-01-01T00:00:00.000Z`);
      const end = new Date(`${year}-12-31T23:59:59.999Z`);
      dateFilter = {
        entryDate: {
          gte: start,
          lte: end
        }
      };
    }

    // Ensure standard income & expense accounts exist in DB
    const standardAccounts = [
      { accountName: 'Sale Income', accountType: 'INCOME' },
      { accountName: 'Purchase Expense', accountType: 'EXPENSE' }
    ];

    for (const std of standardAccounts) {
      await prisma.account.upsert({
        where: { accountName: std.accountName },
        update: { accountType: std.accountType },
        create: { accountName: std.accountName, accountType: std.accountType }
      });
    }

    // Fetch accounts of type INCOME and EXPENSE
    const accounts = await prisma.account.findMany({
      where: {
        accountType: { in: ['INCOME', 'EXPENSE'] }
      }
    });

    // Fetch posted journal entry lines
    const postedLines = await prisma.journalEntryLine.findMany({
      where: {
        entry: {
          status: 'POSTED',
          ...dateFilter
        },
        account: {
          accountType: { in: ['INCOME', 'EXPENSE'] }
        }
      },
      include: { account: true, entry: true }
    });

    const accountSums = {};
    accounts.forEach(acc => {
      accountSums[acc.id] = {
        id: acc.id,
        name: acc.accountName,
        type: acc.accountType,
        balance: 0
      };
    });

    for (const line of postedLines) {
      if (accountSums[line.accountId]) {
        const debit = Number(line.debit) || 0;
        const credit = Number(line.credit) || 0;
        const acc = accountSums[line.accountId];
        if (acc.type === 'INCOME') {
          acc.balance += (credit - debit);
        } else {
          acc.balance += (debit - credit);
        }
      }
    }

    // Fallback for Sale Income from CustomerInvoices if journal lines are zero
    const saleIncomeAccount = accounts.find(a => a.accountName === 'Sale Income');
    if (saleIncomeAccount && accountSums[saleIncomeAccount.id].balance === 0) {
      let invDateFilter = {};
      if (year) {
        invDateFilter = {
          invoiceDate: {
            gte: new Date(`${year}-01-01T00:00:00.000Z`),
            lte: new Date(`${year}-12-31T23:59:59.999Z`)
          }
        };
      }
      const invoices = await prisma.customerInvoice.findMany({
        where: { status: 'POSTED', ...invDateFilter }
      });
      const totalInvSum = invoices.reduce((sum, inv) => sum + Number(inv.totalAmount || 0), 0);
      accountSums[saleIncomeAccount.id].balance = totalInvSum;
    }

    // Fallback for Purchase Expense from VendorBills if journal lines are zero
    const purchaseExpenseAccount = accounts.find(a => a.accountName === 'Purchase Expense');
    if (purchaseExpenseAccount && accountSums[purchaseExpenseAccount.id].balance === 0) {
      let billDateFilter = {};
      if (year) {
        billDateFilter = {
          billDate: {
            gte: new Date(`${year}-01-01T00:00:00.000Z`),
            lte: new Date(`${year}-12-31T23:59:59.999Z`)
          }
        };
      }
      const bills = await prisma.vendorBill.findMany({
        where: { status: 'POSTED', ...billDateFilter }
      });
      const totalBillSum = bills.reduce((sum, b) => sum + Number(b.totalAmount || 0), 0);
      accountSums[purchaseExpenseAccount.id].balance = totalBillSum;
    }

    let totalIncome = 0;
    let totalExpense = 0;
    const details = { INCOME: [], EXPENSE: [] };

    Object.values(accountSums).forEach(acc => {
      const item = {
        id: acc.id,
        name: acc.name,
        type: acc.type,
        balance: Math.max(0, acc.balance)
      };

      if (acc.type === 'INCOME') {
        details.INCOME.push(item);
        totalIncome += item.balance;
      } else {
        details.EXPENSE.push(item);
        totalExpense += item.balance;
      }
    });

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
