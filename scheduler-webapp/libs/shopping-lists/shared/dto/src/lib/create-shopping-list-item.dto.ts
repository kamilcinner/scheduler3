import { ShoppingListItemModel } from '@rennic/shopping-lists/shared/models';

export type CreateShoppingListItemDto = Pick<ShoppingListItemModel, 'name'>;
