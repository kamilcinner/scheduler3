import { ShoppingListItemModel } from '../models';

export type CreateShoppingListItemDto = Pick<ShoppingListItemModel, 'name'>;
