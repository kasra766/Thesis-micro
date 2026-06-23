import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller()
export class RabbitmqController {
  constructor(private prisma: PrismaService) {}

  @EventPattern('user_created')
  async handleUserCreated(data: any) {
    console.log('USER CREATED EVENT RECEIVED', data);

    await this.prisma.auth.update({
      where: {
        id: data.authId,
      },
      data: {
        userId: data.userId,
      },
    });
  }
}
