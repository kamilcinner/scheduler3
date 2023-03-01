import { ShoppingListItemModel } from '@rennic/shopping-lists/shared/models';

export type UpdateShoppingListItemsResponseDto = {
  createdShoppingListItems: ShoppingListItemModel[];
  updatedShoppingListItems: ShoppingListItemModel[];
  removedShoppingListItemsIds: number[];
};
