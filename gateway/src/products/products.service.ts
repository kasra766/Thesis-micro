import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(private http: HttpService) {}

  async findAll(page?: number, limit?: number, search?: string) {
    const url = new URL('http://localhost:3003/products');
    if (page) url.searchParams.append('page', page.toString());
    if (limit) url.searchParams.append('limit', limit.toString());
    if (search) url.searchParams.append('search', search);

    const response = await firstValueFrom(this.http.get(url.toString()));

    return response.data;
  }
}
