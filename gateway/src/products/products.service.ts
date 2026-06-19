import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(private http: HttpService) {}

  async create(body: any) {
    const response = await firstValueFrom(
      this.http.post('http://localhost:3003/products', body),
    );

    return response.data;
  }

  async findAll(page?: number, limit?: number, search?: string) {
    const url = new URL('http://localhost:3003/products');
    if (page) url.searchParams.append('page', page.toString());
    if (limit) url.searchParams.append('limit', limit.toString());
    if (search) url.searchParams.append('search', search);

    const response = await firstValueFrom(this.http.get(url.toString()));

    return response.data;
  }

  async findOne(id: string) {
    const response = await firstValueFrom(
      this.http.get(`http://localhost:3003/products/${id}`),
    );

    return response.data;
  }

  async update(id: string, body: any) {
    const response = await firstValueFrom(
      this.http.patch(`http://localhost:3003/products/${id}`, body),
    );

    return response.data;
  }

  async remove(id: string) {
    const response = await firstValueFrom(
      this.http.delete(`http://localhost:3003/products/${id}`),
    );

    return response.data;
  }
}
