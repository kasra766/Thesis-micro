import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { UsersService } from 'src/users/users.service';
import { UserRegisteredEvent } from './dto/user-registered-event.dto';

@Controller()
export class RabbitmqController {
  constructor(
    private usersService: UsersService,
    @Inject('RABBITMQ_SERVICE')
    private client: ClientProxy,
  ) {}

  @EventPattern('user_registered')
  async handleUserRegistered(data: UserRegisteredEvent) {
    console.log('USER REGISTERED EVENT RECEIVED');

    console.log(data);

    const user = await this.usersService.create({
      name: data.name,
      email: data.email,
    });
    this.client.emit('user_created', {
      authId: data.authId,
      userId: user.id,
    });
  }
}
