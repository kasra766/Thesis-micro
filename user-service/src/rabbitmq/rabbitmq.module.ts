import { Module } from '@nestjs/common';
import { RabbitmqController } from './rabbitmq.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          queue: 'user_created_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],

  controllers: [RabbitmqController],

  exports: [ClientsModule],
})
export class RabbitmqModule {}
