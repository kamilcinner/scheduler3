import { CreateShoppingListItemDto } from './create-shopping-list-item.dto';
import { ShoppingListItemModel } from '../models';

export type UpdateShoppingListItemDto = Partial<
  CreateShoppingListItemDto & Pick<ShoppingListItemModel, 'bought'>
>;
