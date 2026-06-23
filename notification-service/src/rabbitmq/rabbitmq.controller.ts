import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class RabbitmqController {
  @EventPattern('order_created')
  handleOrderCreated(data: any) {
    console.log('ORDER CREATED EVENT RECEIVED');

    console.log(data);
  }
}
