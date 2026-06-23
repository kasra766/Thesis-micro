import { PrismaClient, Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();

  const products: Prisma.ProductCreateManyInput[] = [];

  for (let i = 0; i < 10000; i++) {
    products.push({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: Number(
        faker.commerce.price({
          min: 5,
          max: 1000,
        }),
      ),
    });

    if (i % 500 === 0) {
      console.log(`Products ${i}/10000`);
    }
  }

  await prisma.product.createMany({
    data: products,
  });
}

main().finally(async () => {
  await prisma.$disconnect();
});
