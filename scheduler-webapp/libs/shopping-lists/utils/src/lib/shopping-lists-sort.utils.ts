import { ShoppingListItemModel } from '@rennic/shopping-lists/shared/models';

export class ShoppingListsSortUtils {
  static sortShoppingListItems(a: ShoppingListItemModel, b: ShoppingListItemModel): number {
    let result = ShoppingListsSortUtils.sortShoppingListItemsByBought(a, b);
    if (result === 0) {
      result = ShoppingListsSortUtils.sortShoppingListItemsByName(a, b);
    }
    return result;
  }

  static sortShoppingListItemsByBought(a: ShoppingListItemModel, b: ShoppingListItemModel): number {
    if (!a.bought && b.bought) {
      return -1;
    }
    if (a.bought && !b.bought) {
      return 1;
    }
    return 0;
  }

  static sortShoppingListItemsByName(a: ShoppingListItemModel, b: ShoppingListItemModel): number {
    return a.name.localeCompare(b.name);
  }
}
