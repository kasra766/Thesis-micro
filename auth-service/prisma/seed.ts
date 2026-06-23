import { PrismaClient, Role } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.auth.deleteMany();

  const adminPassword = await bcrypt.hash('123456', 10);

  await prisma.auth.create({
    data: {
      email: 'admin@thesis.com',
      passwordHash: adminPassword,
      role: Role.ADMIN,
      userId: 'admin-user-id',
    },
  });

  for (let i = 0; i < 200; i++) {
    const passwordHash = await bcrypt.hash('123456', 10);

    await prisma.auth.create({
      data: {
        email: faker.internet.email(),
        passwordHash,
        role: Role.USER,
      },
    });

    if (i % 50 === 0) {
      console.log(`Auth ${i}/200`);
    }
  }
}

main().finally(async () => {
  await prisma.$disconnect();
});
