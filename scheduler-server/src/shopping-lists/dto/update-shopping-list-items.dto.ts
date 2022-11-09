import { CreateShoppingListItemDto } from './create-shopping-list-item.dto';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';
import { UpdateShoppingListItemDto } from './update-shopping-list-item.dto';
import { Type } from 'class-transformer';

export class UpdateShoppingListItemsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateShoppingListItemDto)
  createShoppingListItemDtos: CreateShoppingListItemDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateShoppingListItemDto)
  updateShoppingListItemDtos: UpdateShoppingListItemDto[];

  @IsArray()
  @IsNumber({}, { each: true })
  removeShoppingListItemsIds: number[];
}
