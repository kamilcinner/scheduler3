import { CreateShoppingListItemDto } from './create-shopping-list-item.dto';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';
import { UpdateShoppingListItemDto } from './update-shopping-list-item.dto';

export class UpdateShoppingListItemsDto {
  @ValidateNested({ each: true })
  createShoppingListItemDtos: CreateShoppingListItemDto[];

  @ValidateNested({ each: true })
  updateShoppingListItemDtos: UpdateShoppingListItemDto[];

  @IsArray()
  @IsNumber({}, { each: true })
  removeShoppingListItemsIds: number[];
}
