import { Injectable } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';

import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private readonly http: HttpService) {}

  async register(body: any) {
    const response = await firstValueFrom(
      this.http.post('http://localhost:3001/auth/register', body),
    );

    return response.data;
  }

  async login(body: any) {
    const response = await firstValueFrom(
      this.http.post('http://localhost:3001/auth/login', body),
    );

    return response.data;
  }
}
