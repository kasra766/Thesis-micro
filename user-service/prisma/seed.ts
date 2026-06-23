import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      id: 'admin-user-id',
      name: 'System Admin',
      email: 'admin@thesis.com',
    },
  });

  for (let i = 0; i < 200; i++) {
    await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
    });

    if (i % 50 === 0) {
      console.log(`Users ${i}/200`);
    }
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });