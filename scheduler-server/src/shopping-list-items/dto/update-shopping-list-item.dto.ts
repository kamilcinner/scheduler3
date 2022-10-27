import { PartialType } from '@nestjs/mapped-types';
import { CreateShoppingListItemDto } from './create-shopping-list-item.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateShoppingListItemDto extends PartialType(CreateShoppingListItemDto) {
  @IsOptional()
  @IsString()
  name: string;
}
