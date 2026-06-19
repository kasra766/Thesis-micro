import { Injectable } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';

import { firstValueFrom } from 'rxjs';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly http: HttpService,
    private jwtService: JwtService,
  ) {}

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

    await firstValueFrom(
      this.http.post('http://localhost:3001/auth/link-user', {
        authId: authResponse.data.id,
        userId: userResponse.data.id,
      }),
    );

    const payload = {
      sub: authResponse.data.id,
      userId: userResponse.data.id,
      email: userResponse.data.email,
      role: userResponse.data.role,
    };

    return {
      auth: {
        ...authResponse.data,
        userId: userResponse.data.id,
      },
      user: userResponse.data,
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(body: any) {
    const response = await firstValueFrom(
      this.http.post('http://localhost:3001/auth/login', body),
    );

    return response.data;
  }
}
