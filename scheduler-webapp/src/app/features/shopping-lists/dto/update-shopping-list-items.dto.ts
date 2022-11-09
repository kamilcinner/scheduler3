import { CreateShoppingListItemDto } from './create-shopping-list-item.dto';
import { UpdateShoppingListItemDto } from './update-shopping-list-item.dto';

export type UpdateShoppingListItemsDto = {
  createShoppingListItemDtos: CreateShoppingListItemDto[];
  updateShoppingListItemDtos: UpdateShoppingListItemDto[];
  removeShoppingListItemsIds: number[];
};
