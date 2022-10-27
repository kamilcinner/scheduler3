import { PartialType } from '@nestjs/mapped-types';
import { CreateShoppingListDto } from './create-shopping-list.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateShoppingListDto extends PartialType(CreateShoppingListDto) {
  @IsOptional()
  @IsString()
  name: string;
}
