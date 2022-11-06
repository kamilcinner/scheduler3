import { PartialType } from '@nestjs/mapped-types';
import { CreateShoppingListItemDto } from './create-shopping-list-item.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateShoppingListItemDto extends PartialType(CreateShoppingListItemDto) {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  name: string;
}
