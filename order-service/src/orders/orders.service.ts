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

  async findAll() {
    return this.prisma.order.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
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

  async findByUser(userId: string) {
    return this.prisma.order.findMany({
      where: {
        userId,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findByUserAndId(userId: string, orderId: string) {
    const order = await this.prisma.order.findFirst({
      where: {
        id: orderId,
        userId,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async update(id: string, dto: UpdateOrderDto) {
    const order = await this.findOne(id);

    if (!order) throw new NotFoundException('Order not found');

    return this.prisma.order.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(id: string) {
    const order = await this.findOne(id);

    if (!order) throw new NotFoundException('Order not found');

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
