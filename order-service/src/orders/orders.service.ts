import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,

    @Inject('RABBITMQ_SERVICE')
    private client: ClientProxy,
  ) {}

  async create(dto: CreateOrderDto) {
    const order = await this.prisma.order.create({
      data: dto,
    });

    this.client.emit('order_created', {
      orderId: order.id,
      userId: order.userId,
      productId: order.productId,
      quantity: order.quantity,
      totalPrice: order.totalPrice,
    });

    return order;
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const count = await this.prisma.order.count();
    const orders = await this.prisma.order.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      count,
      data: orders,
    };
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: {
        id,
      },
    });

    if (!order) throw new NotFoundException('Order not found');

    return order;
  }

  async findByUser(userId: string, page: number, limit: number) {
    const skip = (page - 1) * limit;

    const count = await this.prisma.order.count({
      where: {
        userId,
      },
    });
    const orders = await this.prisma.order.findMany({
      where: {
        userId,
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      count,
      data: orders,
    };
  }

  async findByUserAndId(userId: string, orderId: string) {
    await this.findOne(orderId);
    return this.prisma.order.findUnique({
      where: {
        id: orderId,
        userId,
      },
    });
  }

  async update(id: string, dto: UpdateOrderDto) {
    await this.findOne(id);

    return this.prisma.order.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.order.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Order deleted',
    };
  }
}
