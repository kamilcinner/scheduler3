import { CreateShoppingListItemDto } from './create-shopping-list-item.dto';
import { ShoppingListItemModel } from '@rennic/shopping-lists/shared/models';

export type UpdateShoppingListItemDto = Partial<CreateShoppingListItemDto & Pick<ShoppingListItemModel, 'bought'>>;
