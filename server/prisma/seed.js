import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
dotenv.config({ path: new URL("../.env", import.meta.url) });
const prisma = new PrismaClient();

// =============================================================================
// Urban Furniture — Bulk Demo Seed
// Volumes: 1 Admin + 4 Invoicing Users, 20 Customers + 30 Vendors, 30 Products,
//          ~30 Purchase cycles (PO->Bill->Payment), ~30 Sales cycles
//          (SO->Invoice->Payment), matching Journal Entries, 10 Analytic
//          Accounts, 10 Budgets.
// Style: same config/connection pattern as the original seed.js — only data
// volume differs. Every create is upsert/find-then-create so this script is
// safe to re-run without creating duplicates.
// =============================================================================

const passwordHash = () => bcrypt.hash("Password@123", 12);

// -----------------------------------------------------------------------
// Deterministic pseudo-random helpers (seeded) so re-running produces the
// same dataset shape rather than fresh random noise each time.
// -----------------------------------------------------------------------
let seed = 42;
function rand() {
  // simple LCG — deterministic across runs
  seed = (seed * 1103515245 + 12345) % 2147483648;
  return seed / 2147483648;
}
function randInt(min, max) {
  return Math.floor(rand() * (max - min + 1)) + min;
}
function pick(arr) {
  return arr[randInt(0, arr.length - 1)];
}
function pad(n, width) {
  return String(n).padStart(width, "0");
}

// -----------------------------------------------------------------------
// Reference data pools
// -----------------------------------------------------------------------
const cities = [
  ["Ahmedabad", "Gujarat", "380001"],
  ["Surat", "Gujarat", "395001"],
  ["Vadodara", "Gujarat", "390001"],
  ["Rajkot", "Gujarat", "360001"],
  ["Gandhinagar", "Gujarat", "382001"],
  ["Mumbai", "Maharashtra", "400001"],
  ["Pune", "Maharashtra", "411001"],
  ["Jaipur", "Rajasthan", "302001"],
  ["Indore", "Madhya Pradesh", "452001"],
  ["Delhi", "Delhi", "110001"],
];

const customerFirstNames = [
  "Nimesh", "Priya", "Rohan", "Ananya", "Karan", "Ishita", "Aditya", "Meera",
  "Vikram", "Sneha", "Arjun", "Kavya", "Rahul", "Divya", "Sanjay", "Pooja",
  "Manish", "Ritu", "Deepak", "Neha",
];
const customerLastNames = [
  "Pathak", "Shah", "Mehta", "Desai", "Joshi", "Patel", "Iyer", "Nair",
  "Kapoor", "Malhotra", "Reddy", "Rao", "Chaudhary", "Bose", "Verma",
  "Agarwal", "Kulkarni", "Bhatt", "Trivedi", "Chawla",
];

const vendorNames = [
  "Azure Furniture", "Rahul Sharma", "Solid Oak Traders", "Gujarat Timber Co",
  "Modern Living Supplies", "Craftsman Woodworks", "Prime Upholstery",
  "Sunrise Interiors", "Heritage Wood Works", "Urban Steel Fittings",
  "Comfort Foam Industries", "Classic Cane Crafts", "Deluxe Hardware Store",
  "Elegant Fabrics Ltd", "Grand Teak Suppliers", "Harmony Home Furnishing",
  "Ideal Plywood Depot", "Jaipur Handicrafts", "Kwality Varnish & Paints",
  "Laminate World", "Metro Glass & Mirror", "National Foam Traders",
  "Oakwood Exports", "Pinewood Furniture Mart", "Quality Screws & Fasteners",
  "Royal Teak Industries", "Shreeji Timber Depot", "Trendy Cushions Co",
  "Vishwakarma Carpentry", "Zenith Furniture Hardware",
];

const productDefs = [
  ["Office Chair", "GOODS", "Seating", 3500, 2200],
  ["Wooden Chair", "GOODS", "Seating", 2800, 1700],
  ["Wooden Table", "GOODS", "Tables", 8500, 5200],
  ["Sofa - 3 Seater", "GOODS", "Seating", 22000, 14000],
  ["Dining Table - 6 Seater", "GOODS", "Tables", 15500, 9800],
  ["Bar Stool", "GOODS", "Seating", 2200, 1300],
  ["Coffee Table", "GOODS", "Tables", 6200, 3800],
  ["Bookshelf - 5 Tier", "GOODS", "Storage", 7800, 4900],
  ["TV Console Unit", "GOODS", "Storage", 9800, 6100],
  ["Wardrobe - 3 Door", "GOODS", "Storage", 18500, 11700],
  ["Bed Frame - Queen", "GOODS", "Bedroom", 21000, 13200],
  ["Bed Frame - King", "GOODS", "Bedroom", 26500, 16800],
  ["Bedside Table", "GOODS", "Bedroom", 3200, 1900],
  ["Study Desk", "GOODS", "Office", 6800, 4200],
  ["Recliner Chair", "GOODS", "Seating", 17500, 11000],
  ["Rocking Chair", "GOODS", "Seating", 5400, 3300],
  ["Outdoor Bench", "GOODS", "Outdoor", 8900, 5500],
  ["Garden Table Set", "GOODS", "Outdoor", 13500, 8600],
  ["Filing Cabinet", "GOODS", "Office", 6100, 3700],
  ["Conference Table", "GOODS", "Office", 32000, 20500],
  ["Ottoman Stool", "GOODS", "Seating", 2600, 1500],
  ["Shoe Rack", "GOODS", "Storage", 3100, 1800],
  ["Kids Study Table", "GOODS", "Kids", 4200, 2600],
  ["Kids Bunk Bed", "GOODS", "Kids", 19800, 12400],
  ["Wall Mirror - Large", "GOODS", "Decor", 4800, 2900],
  ["Furniture Assembly Service", "SERVICE", "Services", 1200, 500],
  ["Home Delivery & Setup", "SERVICE", "Services", 900, 350],
  ["Custom Polish Service", "SERVICE", "Services", 1500, 700],
  ["Office Starter Combo", "COMBO", "Office", 24000, 15800],
  ["Living Room Combo Set", "COMBO", "Seating", 45000, 29500],
];

const analyticDefs = [
  ["Retail Sales - Seating", "INCOME"],
  ["Retail Sales - Tables", "INCOME"],
  ["Retail Sales - Bedroom", "INCOME"],
  ["Corporate Sales - Office", "INCOME"],
  ["Online Sales Channel", "INCOME"],
  ["Timber & Raw Material Procurement", "EXPENSE"],
  ["Hardware & Fittings Procurement", "EXPENSE"],
  ["Upholstery & Fabric Procurement", "EXPENSE"],
  ["Logistics & Delivery", "EXPENSE"],
  ["Showroom Operations", "EXPENSE"],
];

async function main() {
  // -----------------------------------------------------------------
  // 1. CHART OF ACCOUNTS — fixed set (schema models a single flat CoA
  //    for this build; unchanged in count from the original seed).
  // -----------------------------------------------------------------
  const accounts = [
    ["Cash", "ASSET"],
    ["Bank", "ASSET"],
    ["Debtors", "ASSET"],
    ["Creditors", "LIABILITY"],
    ["Sale Income", "INCOME"],
    ["Purchase Expense", "EXPENSE"],
  ];
  for (const [accountName, accountType] of accounts)
    await prisma.account.upsert({
      where: { accountName },
      update: { accountType },
      create: { accountName, accountType },
    });
  const byName = Object.fromEntries(
    (await prisma.account.findMany()).map((a) => [a.accountName, a.id]),
  );

  // -----------------------------------------------------------------
  // 2. JOURNALS — fixed set (journalType is @unique, so only 4 exist)
  // -----------------------------------------------------------------
  const journals = [
    ["Sales", "SALES", "Debtors", "Sale Income"],
    ["Purchase", "PURCHASE", "Purchase Expense", "Creditors"],
    ["Bank", "BANK", "Bank", "Bank"],
    ["Cash", "CASH", "Cash", "Cash"],
  ];
  for (const [journalName, journalType, debit, credit] of journals)
    await prisma.journal.upsert({
      where: { journalType },
      update: {
        journalName,
        defaultDebitAccountId: byName[debit],
        defaultCreditAccountId: byName[credit],
      },
      create: {
        journalName,
        journalType,
        defaultDebitAccountId: byName[debit],
        defaultCreditAccountId: byName[credit],
      },
    });
  const journalByType = Object.fromEntries(
    (await prisma.journal.findMany()).map((j) => [j.journalType, j.id]),
  );

  // -----------------------------------------------------------------
  // 3. USERS — 1 Admin + 4 Invoicing Users
  // -----------------------------------------------------------------
  const adminUser = await prisma.user.upsert({
    where: { loginId: "admin" },
    update: { email: "admin@urbanfurniture.local", role: "ADMIN", passwordHash: await passwordHash() },
    create: {
      loginId: "admin",
      email: "admin@urbanfurniture.local",
      role: "ADMIN",
      passwordHash: await passwordHash(),
    },
  });

  const invoicingUserDefs = [
    ["invoicing.user1", "accountant1@urbanfurniture.local"],
    ["invoicing.user2", "accountant2@urbanfurniture.local"],
    ["invoicing.user3", "accountant3@urbanfurniture.local"],
    ["invoicing.user4", "accountant4@urbanfurniture.local"],
  ];
  const invoicingUsers = [];
  for (const [loginId, email] of invoicingUserDefs) {
    invoicingUsers.push(
      await prisma.user.upsert({
        where: { loginId },
        update: { email, role: "INVOICING_USER", passwordHash: await passwordHash() },
        create: { loginId, email, role: "INVOICING_USER", passwordHash: await passwordHash() },
      }),
    );
  }

  // -----------------------------------------------------------------
  // 4. CONTACTS — 20 Customers + 30 Vendors
  //    Contact has no @unique on name/email, so we findFirst(name, type)
  //    before creating to keep this script idempotent on re-run.
  // -----------------------------------------------------------------
  async function upsertContact(data) {
    const existing = await prisma.contact.findFirst({ where: { name: data.name, type: data.type } });
    if (existing) return existing;
    return prisma.contact.create({ data });
  }

  const customers = [];
  for (let i = 0; i < 20; i++) {
    const first = customerFirstNames[i % customerFirstNames.length];
    const last = customerLastNames[i % customerLastNames.length];
    const name = `${first} ${last}`;
    const [city, state, pin] = cities[i % cities.length];
    customers.push(
      await upsertContact({
        name,
        type: "CUSTOMER",
        email: `${first.toLowerCase()}.${last.toLowerCase()}${i}@example.com`,
        mobile: `98765${pad(10000 + i, 5)}`,
        addressCity: city,
        addressState: state,
        addressPincode: pin,
      }),
    );
  }

  const vendors = [];
  for (let i = 0; i < 30; i++) {
    const name = vendorNames[i % vendorNames.length];
    const [city, state, pin] = cities[(i + 3) % cities.length];
    vendors.push(
      await upsertContact({
        name,
        type: "VENDOR",
        email: `vendor${i}.${name.toLowerCase().replace(/[^a-z]+/g, "")}@example.com`,
        mobile: `98766${pad(20000 + i, 5)}`,
        addressCity: city,
        addressState: state,
        addressPincode: pin,
      }),
    );
  }

  // A couple of contact-linked self-service logins (kept small — not the
  // focus of this bulk seed, but useful for demoing Phase 8).
  await prisma.user.upsert({
    where: { loginId: "nimesh.pathak" },
    update: { email: customers[0].email, role: "CONTACT", passwordHash: await passwordHash(), contactId: customers[0].id },
    create: {
      loginId: "nimesh.pathak",
      email: customers[0].email,
      role: "CONTACT",
      passwordHash: await passwordHash(),
      contactId: customers[0].id,
    },
  });
  await prisma.user.upsert({
    where: { loginId: "azure.furniture" },
    update: { email: vendors[0].email, role: "CONTACT", passwordHash: await passwordHash(), contactId: vendors[0].id },
    create: {
      loginId: "azure.furniture",
      email: vendors[0].email,
      role: "CONTACT",
      passwordHash: await passwordHash(),
      contactId: vendors[0].id,
    },
  });

  // -----------------------------------------------------------------
  // 5. PRODUCTS — 30 products (productName has no @unique constraint,
  //    so findFirst before create to stay idempotent).
  // -----------------------------------------------------------------
  async function upsertProduct(data) {
    const existing = await prisma.product.findFirst({ where: { productName: data.productName } });
    if (existing) return existing;
    return prisma.product.create({ data });
  }

  const products = [];
  for (const [productName, type, category, salesPrice, cost] of productDefs) {
    products.push(await upsertProduct({ productName, type, category, salesPrice, cost }));
  }

  // -----------------------------------------------------------------
  // 6. ANALYTIC ACCOUNTS — 10 (5 income, 5 expense)
  // -----------------------------------------------------------------
  const analyticAccounts = [];
  for (const [name, type] of analyticDefs) {
    analyticAccounts.push(
      await prisma.analyticAccount.upsert({ where: { name }, update: { type }, create: { name, type } }),
    );
  }
  const incomeAnalytics = analyticAccounts.filter((a) => a.type === "INCOME");
  const expenseAnalytics = analyticAccounts.filter((a) => a.type === "EXPENSE");

  // -----------------------------------------------------------------
  // 7. PURCHASE CYCLE — 30x (PO -> Vendor Bill -> Bill Payment -> Journal Entry)
  // -----------------------------------------------------------------
  console.log("Seeding 30 purchase cycles...");
  for (let i = 1; i <= 30; i++) {
    const poNumber = `PO-${pad(i, 4)}`;
    const billNumber = `BILL-${pad(i, 4)}`;
    const vendor = vendors[i % vendors.length];
    const product = products[i % products.length];
    const qty = randInt(2, 20);
    const unitPrice = Number(product.cost);
    const total = qty * unitPrice;
    const orderDate = new Date(2026, 6, randInt(1, 28)); // July 2026
    const invoiceDate = new Date(orderDate.getTime() + 2 * 86400000);
    const dueDate = new Date(orderDate.getTime() + 16 * 86400000);
    const analytic = pick(expenseAnalytics);

    const purchaseOrder =
      (await prisma.purchaseOrder.findUnique({ where: { poNumber } })) ??
      (await prisma.purchaseOrder.create({
        data: {
          poNumber,
          vendorId: vendor.id,
          orderDate,
          status: "CONFIRMED",
          lines: {
            create: [
              {
                productId: product.id,
                analyticAccountId: analytic.id,
                quantity: qty,
                unitPrice,
                total,
              },
            ],
          },
        },
      }));

    const vendorBill =
      (await prisma.vendorBill.findUnique({ where: { billNumber } })) ??
      (await prisma.vendorBill.create({
        data: {
          billNumber,
          purchaseOrderId: purchaseOrder.id,
          vendorId: vendor.id,
          journalId: journalByType["PURCHASE"],
          invoiceDate,
          dueDate,
          totalAmount: total,
          status: "POSTED",
          lines: {
            create: [
              {
                productId: product.id,
                analyticAccountId: analytic.id,
                quantity: qty,
                unitPrice,
                total,
              },
            ],
          },
        },
      }));

    const existingPayment = await prisma.billPayment.findFirst({ where: { billId: vendorBill.id } });
    if (!existingPayment) {
      await prisma.billPayment.create({
        data: {
          billId: vendorBill.id,
          amount: total,
          paymentVia: i % 2 === 0 ? "BANK" : "CASH",
          paymentDate: new Date(invoiceDate.getTime() + 5 * 86400000),
        },
      });
    }

    const existingEntry = await prisma.journalEntry.findUnique({ where: { vendorBillId: vendorBill.id } });
    if (!existingEntry) {
      await prisma.journalEntry.create({
        data: {
          journalId: journalByType["PURCHASE"],
          vendorBillId: vendorBill.id,
          entryDate: invoiceDate,
          reference: vendorBill.billNumber,
          status: "POSTED",
          lines: {
            create: [
              { accountId: byName["Purchase Expense"], partnerId: vendor.id, debit: total, credit: 0 },
              { accountId: byName["Creditors"], partnerId: vendor.id, debit: 0, credit: total },
            ],
          },
        },
      });
    }
  }

  // -----------------------------------------------------------------
  // 8. SALES CYCLE — 30x (SO -> Customer Invoice -> Invoice Payment -> Journal Entry)
  // -----------------------------------------------------------------
  console.log("Seeding 30 sales cycles...");
  for (let i = 1; i <= 30; i++) {
    const soNumber = `SO-${pad(i, 4)}`;
    const invoiceNumber = `INV-${pad(i, 4)}`;
    const customer = customers[i % customers.length];
    const product = products[(i + 7) % products.length];
    const qty = randInt(1, 10);
    const unitPrice = Number(product.salesPrice);
    const taxPct = 18;
    const subtotal = qty * unitPrice;
    const tax = Math.round((subtotal * taxPct) / 100);
    const total = subtotal + tax;
    const orderDate = new Date(2026, 7, randInt(1, 28)); // August 2026
    const invoiceDate = new Date(orderDate.getTime() + 1 * 86400000);
    const dueDate = new Date(orderDate.getTime() + 15 * 86400000);
    const analytic = pick(incomeAnalytics);

    const salesOrder =
      (await prisma.salesOrder.findUnique({ where: { soNumber } })) ??
      (await prisma.salesOrder.create({
        data: {
          soNumber,
          customerId: customer.id,
          orderDate,
          status: "CONFIRMED",
          lines: {
            create: [
              {
                productId: product.id,
                analyticAccountId: analytic.id,
                quantity: qty,
                unitPrice,
                tax: taxPct,
                total,
              },
            ],
          },
        },
      }));

    const customerInvoice =
      (await prisma.customerInvoice.findUnique({ where: { invoiceNumber } })) ??
      (await prisma.customerInvoice.create({
        data: {
          invoiceNumber,
          salesOrderId: salesOrder.id,
          customerId: customer.id,
          journalId: journalByType["SALES"],
          invoiceDate,
          dueDate,
          totalAmount: total,
          status: "POSTED",
          lines: {
            create: [
              {
                productId: product.id,
                analyticAccountId: analytic.id,
                quantity: qty,
                unitPrice,
                tax: taxPct,
                total,
              },
            ],
          },
        },
      }));

    const existingPayment = await prisma.invoicePayment.findFirst({ where: { invoiceId: customerInvoice.id } });
    if (!existingPayment) {
      await prisma.invoicePayment.create({
        data: {
          invoiceId: customerInvoice.id,
          amount: total,
          paymentVia: i % 2 === 0 ? "CASH" : "BANK",
          paymentDate: new Date(invoiceDate.getTime() + 3 * 86400000),
        },
      });
    }

    const existingEntry = await prisma.journalEntry.findUnique({ where: { customerInvoiceId: customerInvoice.id } });
    if (!existingEntry) {
      await prisma.journalEntry.create({
        data: {
          journalId: journalByType["SALES"],
          customerInvoiceId: customerInvoice.id,
          entryDate: invoiceDate,
          reference: customerInvoice.invoiceNumber,
          status: "POSTED",
          lines: {
            create: [
              { accountId: byName["Debtors"], partnerId: customer.id, debit: total, credit: 0 },
              { accountId: byName["Sale Income"], partnerId: customer.id, debit: 0, credit: total },
            ],
          },
        },
      });
    }
  }

  // -----------------------------------------------------------------
  // 9. BUDGETS — 10, one per analytic account, Q3 2026
  // -----------------------------------------------------------------
  console.log("Seeding 10 budgets...");
  const allAnalytics = [...incomeAnalytics, ...expenseAnalytics];
  for (let i = 0; i < allAnalytics.length; i++) {
    const analytic = allAnalytics[i];
    const budgetName = `Q3 2026 Budget - ${analytic.name}`;
    const existing = await prisma.budget.findFirst({ where: { budgetName } });
    if (existing) continue;
    const committed = randInt(100000, 600000);
    await prisma.budget.create({
      data: {
        budgetName,
        periodStart: new Date("2026-07-01"),
        periodEnd: new Date("2026-09-30"),
        responsiblePersonId: pick(invoicingUsers.length ? invoicingUsers : [adminUser]).id,
        analyticAccountId: analytic.id,
        status: "CONFIRMED",
        committedAmount: committed,
        achievedAmount: Math.round(committed * (0.3 + rand() * 0.5)),
      },
    });
  }

  console.log("Bulk seed complete:");
  console.log({
    users: 1 + invoicingUsers.length + 2, // admin + invoicing users + 2 contact logins
    customers: customers.length,
    vendors: vendors.length,
    products: products.length,
    accounts: accounts.length,
    journals: journals.length,
    analyticAccounts: analyticAccounts.length,
    purchaseCycles: 30,
    salesCycles: 30,
    budgets: allAnalytics.length,
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());