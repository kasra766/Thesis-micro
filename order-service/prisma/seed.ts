import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

interface TOrder {
  userId: string;
  productId: string;
  quantity: number;
  totalPrice: number;
}
async function main() {
  await prisma.order.deleteMany();

  const orders: TOrder[] = [];

  for (let i = 0; i < 50000; i++) {
    const quantity = Math.floor(Math.random() * 5) + 1;

    const price = Number(
      faker.commerce.price({
        min: 5,
        max: 1000,
      }),
    );

    orders.push({
      userId: faker.string.uuid(),
      productId: faker.string.uuid(),
      quantity,
      totalPrice: price * quantity,
    });

    if (i % 5000 === 0) {
      console.log(`Orders ${i}/50000`);
    }
  }

  await prisma.order.createMany({
    data: orders,
  });
}

main().finally(async () => {
  await prisma.$disconnect();
});
