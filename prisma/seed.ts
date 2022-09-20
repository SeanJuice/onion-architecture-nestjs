import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.role.deleteMany();

  console.log('Seeding...');

  const role1 = await prisma.role.create({
    data: {
      description: 'Admin',
    },
  });
  const role2 = await prisma.role.create({
    data: {
      description: 'Customer',
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
