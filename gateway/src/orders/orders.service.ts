import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private http: HttpService) {}

  async create(userId: string, dto: CreateOrderDto) {
    const productResponse = await firstValueFrom(
      this.http.get(
        `${process.env.PRODUCT_SERVICE_URL}/products/${dto.productId}`,
      ),
    );

    const product = productResponse.data;

    const totalPrice = Number(product.price) * dto.quantity;

    const orderResponse = await firstValueFrom(
      this.http.post(`${process.env.ORDER_SERVICE_URL}/orders`, {
        userId,

        productId: dto.productId,

        quantity: dto.quantity,

        totalPrice,
      }),
    );

    return orderResponse.data;
  }

  async findAll(page?: number, limit?: number) {
    const url = new URL(`${process.env.ORDER_SERVICE_URL}/orders`);
    if (page) url.searchParams.append('page', page.toString());
    if (limit) url.searchParams.append('limit', limit.toString());

    const response = await firstValueFrom(this.http.get(url.toString()));

    return response.data;
  }

  async findOne(id: string) {
    const response = await firstValueFrom(
      this.http.get(`${process.env.ORDER_SERVICE_URL}/orders/${id}`),
    );

    return response.data;
  }

  async findMyOrders(userId: string, page?: number, limit?: number) {
    const url = new URL(
      `${process.env.ORDER_SERVICE_URL}/orders/internal/user/${userId}`,
    );
    if (page) url.searchParams.append('page', page.toString());
    if (limit) url.searchParams.append('limit', limit.toString());

    const response = await firstValueFrom(this.http.get(url.toString()));

    return response.data;
  }

  async findMyOrder(userId: string, orderId: string) {
    const response = await firstValueFrom(
      this.http.get(
        `${process.env.ORDER_SERVICE_URL}/orders/internal/user/${userId}/${orderId}`,
      ),
    );

    return response.data;
  }

  async update(id: string, body: any) {
    const response = await firstValueFrom(
      this.http.patch(`${process.env.ORDER_SERVICE_URL}/orders/${id}`, body),
    );

    return response.data;
  }

  async remove(id: string) {
    const response = await firstValueFrom(
      this.http.delete(`${process.env.ORDER_SERVICE_URL}/orders/${id}`),
    );

    return response.data;
  }
}
