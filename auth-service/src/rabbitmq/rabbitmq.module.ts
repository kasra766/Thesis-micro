import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitmqController } from './rabbitmq.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',

        transport: Transport.RMQ,

        options: {
          urls: ['amqp://rabbitmq:5672'],

          queue: 'user_registered_queue',

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
