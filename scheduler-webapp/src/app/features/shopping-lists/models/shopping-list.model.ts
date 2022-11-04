import { ShoppingListItemModel } from './shopping-list-item.model';

export type ShoppingListModel = {
  id: number;
  name: string;
  lastEditDateTime: Date;
  items?: ShoppingListItemModel[];
};
