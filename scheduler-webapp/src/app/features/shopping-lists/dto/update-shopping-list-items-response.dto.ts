import { ShoppingListItemModel } from '../models';

export type UpdateShoppingListItemsResponseDto = {
  createdShoppingListItems: ShoppingListItemModel[];
  updatedShoppingListItems: ShoppingListItemModel[];
  removedShoppingListItemsIds: number[];
};
