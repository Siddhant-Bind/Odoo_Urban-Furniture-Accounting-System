import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
dotenv.config({ path: new URL("../.env", import.meta.url) });
const prisma = new PrismaClient();
const accounts = [
  ["Cash", "ASSET"],
  ["Bank", "ASSET"],
  ["Debtors", "ASSET"],
  ["Creditors", "LIABILITY"],
  ["Sale Income", "INCOME"],
  ["Purchase Expense", "EXPENSE"],
];
async function main() {
  for (const [accountName, accountType] of accounts)
    await prisma.account.upsert({
      where: { accountName },
      update: { accountType },
      create: { accountName, accountType },
    });
  const byName = Object.fromEntries(
    (await prisma.account.findMany()).map((account) => [
      account.accountName,
      account.id,
    ]),
  );
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
  const passwordHash = await bcrypt.hash("Password@123", 12);
  await prisma.user.upsert({
    where: { loginId: "admin" },
    update: {
      email: "admin@urbanfurniture.local",
      role: "ADMIN",
      passwordHash,
    },
    create: {
      loginId: "admin",
      email: "admin@urbanfurniture.local",
      role: "ADMIN",
      passwordHash,
    },
  });
  console.log("Seed complete: 6 accounts, 4 journals, and 1 admin user.");
}
main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
