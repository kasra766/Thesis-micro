import { IsString } from 'class-validator';

export class LinkUserDto {
  @IsString()
  authId!: string;

  @IsString()
  userId!: string;
}
