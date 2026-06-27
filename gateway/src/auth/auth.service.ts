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
      this.http.post(`${process.env.AUTH_SERVICE_URL}/auth/register`, {
        name: dto.name,
        email: dto.email,
        password: dto.password,
      }),
    );

    // const userResponse = await firstValueFrom(
    //   this.http.post(`${process.env.USER_SERVICE_URL}/users`, {
    //     name: dto.name,
    //     email: dto.email,
    //   }),
    // );

    // await firstValueFrom(
    //   this.http.post(`${process.env.AUTH_SERVICE_URL}/auth/link-user`, {
    //     authId: authResponse.data.id,
    //     userId: userResponse.data.id,
    //   }),
    // );

    // const payload = {
    //   sub: authResponse.data.id,
    //   userId: authResponse.data.userId,
    //   email: authResponse.data.email,
    //   role: authResponse.data.role,
    // };

    // return {
    //   auth: {
    //     ...authResponse.data,
    //     userId: userResponse.data.id,
    //   },
    //   user: userResponse.data,
    //   access_token: this.jwtService.sign(payload),
    // };

    // const payload = {
    //   sub: authResponse.data.id,
    //   email: dto.email,
    // };

    // return {
    //   auth: authResponse.data,
    //   // access_token: this.jwtService.sign(payload),
    // };

    return authResponse.data;
  }

  async login(body: any) {
    const response = await firstValueFrom(
      this.http.post(`${process.env.AUTH_SERVICE_URL}/auth/login`, body),
    );

    return response.data;
  }
}
