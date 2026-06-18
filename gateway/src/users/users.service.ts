import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(private readonly http: HttpService) {}

  async create(body: any) {
    const response = await firstValueFrom(
      this.http.post('http://localhost:3002/users', body),
    );

    return response.data;
  }
}
