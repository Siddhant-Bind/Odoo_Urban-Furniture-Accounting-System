/**
 * Urban Furniture — Accounting System
 * Prisma seed script
 *
 * Seeds master data, one full Purchase cycle (PO -> Bill -> Payment),
 * one full Sales cycle (SO -> Invoice -> Payment), the resulting
 * double-entry journal entries, and a sample budget — based on the
 * scenarios in the SRS / hackathon brief (Azure Furniture as vendor,
 * Nimesh Pathak buying 5 Office Chairs, etc).
 *
 * Run with:  node prisma/seed.js
 * (or wire it up as "prisma.seed" in package.json:
 *   "prisma": { "seed": "node prisma/seed.js" }  then run `npx prisma db seed`)
 *
 * NOTE: schema.prisma currently declares
 *   ChartOfAccount.accountType  AccountType
 * but the only matching enum defined is named `BalanceSheet`. Rename
 * that enum to `AccountType` (or update the field) before running
 * `prisma generate`, otherwise the client won't compile. This seed
 * assumes the enum is called AccountType with values:
 *   asset | liability | income | expenses | capital
 * 
 */
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import bcrypt from "bcryptjs";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL);

const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('Clearing existing data...');
    // Delete in FK-safe order (children first)
    await prisma.journalEntryLine.deleteMany();
    await prisma.journalEntry.deleteMany();
    await prisma.invoicePayment.deleteMany();
    await prisma.invoiceLine.deleteMany();
    await prisma.customerInvoice.deleteMany();
    await prisma.salesOrderLine.deleteMany();
    await prisma.salesOrder.deleteMany();
    await prisma.billPayment.deleteMany();
    await prisma.vendorBillLine.deleteMany();
    await prisma.vendorBill.deleteMany();
    await prisma.purchaseOrderLine.deleteMany();
    await prisma.purchaseOrder.deleteMany();
    await prisma.budget.deleteMany();
    await prisma.analyticAccount.deleteMany();
    await prisma.journal.deleteMany();
    await prisma.chartOfAccount.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();
    await prisma.contact.deleteMany();

    // ---------------------------------------------------------------
    // 1. CHART OF ACCOUNTS
    // ---------------------------------------------------------------
    console.log('Seeding Chart of Accounts...');
    const [cash, bank, debtors, creditors, salesIncome, purchaseExpense, capital] =
        await Promise.all([
            prisma.chartOfAccount.create({ data: { accountName: 'Cash', accountType: 'asset' } }),
            prisma.chartOfAccount.create({ data: { accountName: 'Bank', accountType: 'asset' } }),
            prisma.chartOfAccount.create({ data: { accountName: 'Debtors', accountType: 'asset' } }),
            prisma.chartOfAccount.create({ data: { accountName: 'Creditors', accountType: 'liability' } }),
            prisma.chartOfAccount.create({ data: { accountName: 'Sales Income', accountType: 'income' } }),
            prisma.chartOfAccount.create({ data: { accountName: 'Purchase Expense', accountType: 'expenses' } }),
            prisma.chartOfAccount.create({ data: { accountName: 'Capital', accountType: 'capital' } }),
        ]);

    // ---------------------------------------------------------------
    // 2. JOURNALS
    // ---------------------------------------------------------------
    console.log('Seeding Journals...');
    const [salesJournal, purchaseJournal, bankJournal, cashJournal] = await Promise.all([
        prisma.journal.create({
            data: {
                journalName: 'Sales Journal',
                journalType: 'sales',
                defaultDebitAccountId: debtors.id,
                defaultCreditAccountId: salesIncome.id,
            },
        }),
        prisma.journal.create({
            data: {
                journalName: 'Purchase Journal',
                journalType: 'purchase',
                defaultDebitAccountId: purchaseExpense.id,
                defaultCreditAccountId: creditors.id,
            },
        }),
        prisma.journal.create({
            data: {
                journalName: 'Bank Journal',
                journalType: 'bank',
                defaultDebitAccountId: bank.id,
                defaultCreditAccountId: bank.id,
            },
        }),
        prisma.journal.create({
            data: {
                journalName: 'Cash Journal',
                journalType: 'cash',
                defaultDebitAccountId: cash.id,
                defaultCreditAccountId: cash.id,
            },
        }),
    ]);

    // ---------------------------------------------------------------
    // 3. CONTACTS (vendor + customer, per SRS examples)
    // ---------------------------------------------------------------
    console.log('Seeding Contacts...');
    const rahulVendor = await prisma.contact.create({
        data: {
            name: 'Rahul Sharma',
            type: 'vendor',
            email: 'rahul.sharma@example.com',
            mobile: '9876500001',
            addressCity: 'Ahmedabad',
            addressState: 'Gujarat',
            addressPincode: '380001',
        },
    });

    const azureFurniture = await prisma.contact.create({
        data: {
            name: 'Azure Furniture',
            type: 'vendor',
            email: 'accounts@azurefurniture.example',
            mobile: '9876500002',
            addressCity: 'Surat',
            addressState: 'Gujarat',
            addressPincode: '395001',
        },
    });

    const nimeshCustomer = await prisma.contact.create({
        data: {
            name: 'Nimesh Pathak',
            type: 'customer',
            email: 'nimesh.pathak@example.com',
            mobile: '9876500003',
            addressCity: 'Ahmedabad',
            addressState: 'Gujarat',
            addressPincode: '380015',
        },
    });

    // ---------------------------------------------------------------
    // 4. USERS (Admin, Invoicing User, Contact-linked logins)
    // ---------------------------------------------------------------
    console.log('Seeding Users...');
    const passwordHash = bcrypt.hashSync('Password@123', 10);

    const adminUser = await prisma.user.create({
        data: {
            loginId: 'admin',
            email: 'admin@urbanfurniture.example',
            passwordHash,
            role: 'admin',
        },
    });

    await prisma.user.create({
        data: {
            loginId: 'accountant',
            email: 'accountant@urbanfurniture.example',
            passwordHash,
            role: 'invoicing_user',
        },
    });

    await prisma.user.create({
        data: {
            loginId: 'nimesh.pathak',
            email: nimeshCustomer.email,
            passwordHash,
            role: 'contact_user',
            linkedContactId: nimeshCustomer.id,
        },
    });

    await prisma.user.create({
        data: {
            loginId: 'azure.furniture',
            email: azureFurniture.email,
            passwordHash,
            role: 'contact_user',
            linkedContactId: azureFurniture.id,
        },
    });

    // ---------------------------------------------------------------
    // 5. PRODUCTS
    // ---------------------------------------------------------------
    console.log('Seeding Products...');
    const [officeChair, woodenChair, woodenTable, sofa, diningTable] = await Promise.all([
        prisma.product.create({
            data: { productName: 'Office Chair', type: 'goods', category: 'Seating', salesPrice: 3500, cost: 2200 },
        }),
        prisma.product.create({
            data: { productName: 'Wooden Chair', type: 'goods', category: 'Seating', salesPrice: 2800, cost: 1700 },
        }),
        prisma.product.create({
            data: { productName: 'Wooden Table', type: 'goods', category: 'Tables', salesPrice: 8500, cost: 5200 },
        }),
        prisma.product.create({
            data: { productName: 'Sofa', type: 'goods', category: 'Seating', salesPrice: 22000, cost: 14000 },
        }),
        prisma.product.create({
            data: { productName: 'Dining Table', type: 'goods', category: 'Tables', salesPrice: 15500, cost: 9800 },
        }),
    ]);

    // ---------------------------------------------------------------
    // 6. PURCHASE CYCLE — PO -> Vendor Bill -> Payment (Bank)
    //    Scenario: PO for Azure Furniture, 10 Wooden Chairs
    // ---------------------------------------------------------------
    console.log('Seeding Purchase cycle...');
    const poQty = 10;
    const poUnitPrice = 1700;
    const poTotal = poQty * poUnitPrice;

    const purchaseOrder = await prisma.purchaseOrder.create({
        data: {
            poNumber: 'PO-0001',
            vendorId: azureFurniture.id,
            orderDate: new Date('2026-08-01'),
            status: 'confirmed',
            lines: {
                create: [
                    {
                        productId: woodenChair.id,
                        quantity: poQty,
                        unitPrice: poUnitPrice,
                        total: poTotal,
                    },
                ],
            },
        },
    });

    const vendorBill = await prisma.vendorBill.create({
        data: {
            billNumber: 'BILL-0001',
            purchaseOrderId: purchaseOrder.id,
            vendorId: azureFurniture.id,
            invoiceDate: new Date('2026-08-03'),
            dueDate: new Date('2026-08-17'),
            totalAmount: poTotal,
            status: 'posted',
            journalId: purchaseJournal.id,
            lines: {
                create: [
                    {
                        productId: woodenChair.id,
                        quantity: poQty,
                        unitPrice: poUnitPrice,
                        total: poTotal,
                    },
                ],
            },
        },
    });

    await prisma.billPayment.create({
        data: {
            billId: vendorBill.id,
            amount: poTotal,
            paymentVia: 'bank',
            paymentDate: new Date('2026-08-10'),
        },
    });

    // Journal entry for the Vendor Bill: Dr Purchase Expense / Cr Creditors
    await prisma.journalEntry.create({
        data: {
            journalId: purchaseJournal.id,
            entryDate: new Date('2026-08-03'),
            reference: vendorBill.billNumber,
            status: 'posted',
            sourceType: 'bill',
            sourceId: vendorBill.id,
            lines: {
                create: [
                    { accountId: purchaseExpense.id, partnerId: azureFurniture.id, debit: poTotal, credit: 0 },
                    { accountId: creditors.id, partnerId: azureFurniture.id, debit: 0, credit: poTotal },
                ],
            },
        },
    });

    // ---------------------------------------------------------------
    // 7. SALES CYCLE — SO -> Customer Invoice -> Payment (Cash)
    //    Scenario from SRS: Nimesh Pathak, 5 Office Chairs
    // ---------------------------------------------------------------
    console.log('Seeding Sales cycle...');
    const soQty = 5;
    const soUnitPrice = 3500;
    const soTaxPct = 18; // GST-style example
    const soLineSubtotal = soQty * soUnitPrice;
    const soTax = Math.round((soLineSubtotal * soTaxPct) / 100);
    const soTotal = soLineSubtotal + soTax;

    const salesOrder = await prisma.salesOrder.create({
        data: {
            soNumber: 'SO-0001',
            customerId: nimeshCustomer.id,
            orderDate: new Date('2026-08-12'),
            status: 'confirmed',
            lines: {
                create: [
                    {
                        productId: officeChair.id,
                        quantity: soQty,
                        unitPrice: soUnitPrice,
                        tax: soTaxPct,
                        total: soTotal,
                    },
                ],
            },
        },
    });

    const customerInvoice = await prisma.customerInvoice.create({
        data: {
            invoiceNumber: 'INV-0001',
            salesOrderId: salesOrder.id,
            customerId: nimeshCustomer.id,
            invoiceDate: new Date('2026-08-13'),
            dueDate: new Date('2026-08-27'),
            totalAmount: soTotal,
            status: 'posted',
            journalId: salesJournal.id,
            lines: {
                create: [
                    {
                        productId: officeChair.id,
                        quantity: soQty,
                        unitPrice: soUnitPrice,
                        tax: soTaxPct,
                        total: soTotal,
                    },
                ],
            },
        },
    });

    await prisma.invoicePayment.create({
        data: {
            invoiceId: customerInvoice.id,
            amount: soTotal,
            paymentVia: 'cash',
            paymentDate: new Date('2026-08-15'),
        },
    });

    // Journal entry for the Customer Invoice: Dr Debtors / Cr Sales Income
    await prisma.journalEntry.create({
        data: {
            journalId: salesJournal.id,
            entryDate: new Date('2026-08-13'),
            reference: customerInvoice.invoiceNumber,
            status: 'posted',
            sourceType: 'invoice',
            sourceId: customerInvoice.id,
            lines: {
                create: [
                    { accountId: debtors.id, partnerId: nimeshCustomer.id, debit: soTotal, credit: 0 },
                    { accountId: salesIncome.id, partnerId: nimeshCustomer.id, debit: 0, credit: soTotal },
                ],
            },
        },
    });

    // ---------------------------------------------------------------
    // 8. BUDGETING — Analytic Accounts + a sample Budget
    // ---------------------------------------------------------------
    console.log('Seeding Budget data...');
    const salesAnalytic = await prisma.analyticAccount.create({
        data: { name: 'Furniture Sales', type: 'income' },
    });

    const purchaseAnalytic = await prisma.analyticAccount.create({
        data: { name: 'Furniture Procurement', type: 'expense' },
    });

    await prisma.budget.create({
        data: {
            budgetName: 'Q3 2026 Sales Target',
            periodStart: new Date('2026-07-01'),
            periodEnd: new Date('2026-09-30'),
            responsiblePersonId: adminUser.id,
            analyticAccountId: salesAnalytic.id,
            status: 'confirm',
            committedAmount: 500000,
            achievedAmount: soTotal, // seeded from the invoice above
        },
    });

    await prisma.budget.create({
        data: {
            budgetName: 'Q3 2026 Procurement Budget',
            periodStart: new Date('2026-07-01'),
            periodEnd: new Date('2026-09-30'),
            responsiblePersonId: adminUser.id,
            analyticAccountId: purchaseAnalytic.id,
            status: 'confirm',
            committedAmount: 200000,
            achievedAmount: poTotal, // seeded from the bill above
        },
    });

    console.log('Seed complete!');
    console.log({
        contacts: 3,
        users: 4,
        products: 5,
        chartOfAccounts: 7,
        journals: 4,
        purchaseOrder: purchaseOrder.poNumber,
        vendorBill: vendorBill.billNumber,
        salesOrder: salesOrder.soNumber,
        customerInvoice: customerInvoice.invoiceNumber,
        budgets: 2,
    });
}

main()
    .catch((e) => {
        console.error('Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });