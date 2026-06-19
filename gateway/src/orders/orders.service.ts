import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private http: HttpService) {}

  async create(userId: string, dto: CreateOrderDto) {
    const productResponse = await firstValueFrom(
      this.http.get(`http://localhost:3003/products/${dto.productId}`),
    );

    const product = productResponse.data;

    const totalPrice = Number(product.price) * dto.quantity;

    const orderResponse = await firstValueFrom(
      this.http.post('http://localhost:3004/orders', {
        userId,

        productId: dto.productId,

        quantity: dto.quantity,

        totalPrice,
      }),
    );

    return orderResponse.data;
  }

  async findAll(page?: number, limit?: number, search?: string) {
    const url = new URL('http://localhost:3004/orders');
    if (page) url.searchParams.append('page', page.toString());
    if (limit) url.searchParams.append('limit', limit.toString());
    if (search) url.searchParams.append('search', search);

    const response = await firstValueFrom(this.http.get(url.toString()));

    return response.data;
  }

  async findOne(id: string) {
    const response = await firstValueFrom(
      this.http.get(`http://localhost:3004/orders/${id}`),
    );

    return response.data;
  }

  async findMyOrders(userId: string) {
    const response = await firstValueFrom(
      this.http.get(`http://localhost:3004/orders/internal/user/${userId}`),
    );

    return response.data;
  }

  async findMyOrder(userId: string, orderId: string) {
    const response = await firstValueFrom(
      this.http.get(
        `http://localhost:3004/orders/internal/user/${userId}/${orderId}`,
      ),
    );

    return response.data;
  }

  async update(id: string, body: any) {
    const response = await firstValueFrom(
      this.http.patch(`http://localhost:3004/orders/${id}`, body),
    );

    return response.data;
  }

  async remove(id: string) {
    const response = await firstValueFrom(
      this.http.delete(`http://localhost:3004/orders/${id}`),
    );

    return response.data;
  }
}
