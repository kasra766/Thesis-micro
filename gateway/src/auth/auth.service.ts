import { Injectable } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';

import { firstValueFrom } from 'rxjs';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly http: HttpService) {}

  async register(dto: RegisterDto) {
    const authResponse = await firstValueFrom(
      this.http.post('http://localhost:3001/auth/register', {
        email: dto.email,
        password: dto.password,
      }),
    );

    const userResponse = await firstValueFrom(
      this.http.post('http://localhost:3002/users', {
        name: dto.name,
        email: dto.email,
      }),
    );

    return {
      auth: authResponse.data,
      user: userResponse.data,
    };
  }

  async login(body: any) {
    const response = await firstValueFrom(
      this.http.post('http://localhost:3001/auth/login', body),
    );

    return response.data;
  }
}
