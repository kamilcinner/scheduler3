import { ValidateNested } from 'class-validator';
import { UpdateShoppingListItemDto } from './update-shopping-list-item.dto';

export class UpdateShoppingListItemsDto {
  @ValidateNested({ each: true })
  items: UpdateShoppingListItemDto[];
}
