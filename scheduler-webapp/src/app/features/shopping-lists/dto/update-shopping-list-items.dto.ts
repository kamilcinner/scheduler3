import { CreateShoppingListItemDto } from './create-shopping-list-item.dto';

export type UpdateShoppingListItemsDto = {
  createShoppingListItemDtos: CreateShoppingListItemDto[];
  updateShoppingListItemDtos: UpdateShoppingListItemsDto[];
  removeShoppingListItemsIds: number[];
};
