import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(private readonly http: HttpService) {}

  async create(body: any) {
    const response = await firstValueFrom(
      this.http.post(`${process.env.USER_SERVICE_URL}/users`, body),
    );

    return response.data;
  }

  async findAll(page?: number, limit?: number) {
    const url = new URL(`${process.env.USER_SERVICE_URL}/users`);

    if (page) url.searchParams.append('page', page.toString());
    if (limit) url.searchParams.append('limit', limit.toString());

    const response = await firstValueFrom(this.http.get(url.toString()));

    return response.data;
  }

  async findOne(id: string) {
    const response = await firstValueFrom(
      this.http.get(`${process.env.USER_SERVICE_URL}/users/${id}`),
    );

    return response.data;
  }

  async update(id: string, body: any) {
    const response = await firstValueFrom(
      this.http.patch(`${process.env.USER_SERVICE_URL}/users/${id}`, body),
    );

    return response.data;
  }

  async remove(id: string) {
    const response = await firstValueFrom(
      this.http.delete(`${process.env.USER_SERVICE_URL}/users/${id}`),
    );

    return response.data;
  }
}
