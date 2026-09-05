import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting customer to user migration...');

  // Find all CUSTOMER contacts that do not have an associated user
  const customersWithoutUsers = await prisma.contact.findMany({
    where: {
      type: 'CUSTOMER',
      user: {
        is: null
      }
    }
  });

  console.log(`Found ${customersWithoutUsers.length} customers to migrate.`);

  let successCount = 0;
  let errorCount = 0;

  for (const customer of customersWithoutUsers) {
    try {
      const loginIdBase = customer.name.toLowerCase().replace(/\s+/g, '');
      const plainPassword = customer.mobile && customer.mobile.trim() !== '' ? customer.mobile : 'password123';
      const passwordHash = await bcrypt.hash(plainPassword, 10);

      // Check for unique loginId
      let uniqueLoginId = loginIdBase;
      let counter = 1;
      while (await prisma.user.findUnique({ where: { loginId: uniqueLoginId } })) {
        uniqueLoginId = `${loginIdBase}${counter}`;
        counter++;
      }

      await prisma.user.create({
        data: {
          loginId: uniqueLoginId,
          email: customer.email || `${uniqueLoginId}@example.com`,
          passwordHash,
          role: 'CONTACT',
          contactId: customer.id
        }
      });
      console.log(`[SUCCESS] Created user for customer ID ${customer.id} (${customer.name}) -> Login: ${uniqueLoginId}`);
      successCount++;
    } catch (error) {
      console.error(`[ERROR] Failed to create user for customer ID ${customer.id} (${customer.name}):`, error.message);
      errorCount++;
    }
  }

  console.log(`Migration complete. Successfully imported: ${successCount}. Errors: ${errorCount}.`);
}

main()
  .catch((e) => {
    console.error('Migration failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
