import { IsInt, IsNumber, IsString, Min } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  userId!: string;

  @IsString()
  productId!: string;

  @IsInt()
  @Min(1)
  quantity!: number;

  @IsNumber()
  totalPrice!: number;
}
