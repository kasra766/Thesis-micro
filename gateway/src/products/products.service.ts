import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateProductDto } from './dto/create.dto';

@Injectable()
export class ProductsService {
  constructor(private http: HttpService) {}

  async create(dto: CreateProductDto) {
    const response = await firstValueFrom(
      this.http.post(`${process.env.PRODUCT_SERVICE_URL}/products`, dto),
    );

    return response.data;
  }

  async findAll(page?: number, limit?: number, search?: string) {
    const url = new URL(`${process.env.PRODUCT_SERVICE_URL}/products`);
    if (page) url.searchParams.append('page', page.toString());
    if (limit) url.searchParams.append('limit', limit.toString());
    if (search) url.searchParams.append('search', search);

    const response = await firstValueFrom(this.http.get(url.toString()));

    return response.data;
  }

  async findOne(id: string) {
    const response = await firstValueFrom(
      this.http.get(`${process.env.PRODUCT_SERVICE_URL}/products/${id}`),
    );

    return response.data;
  }

  async update(id: string, body: any) {
    const response = await firstValueFrom(
      this.http.patch(
        `${process.env.PRODUCT_SERVICE_URL}/products/${id}`,
        body,
      ),
    );

    return response.data;
  }

  async remove(id: string) {
    const response = await firstValueFrom(
      this.http.delete(`${process.env.PRODUCT_SERVICE_URL}/products/${id}`),
    );

    return response.data;
  }
}
