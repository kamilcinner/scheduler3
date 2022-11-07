import { CreateShoppingListDto, UpdateShoppingListDto } from '../dto';
import { ShoppingListModel, ShoppingListItemModel } from '../models';

export namespace ShoppingLists {
  export class Create {
    static readonly type = '[ShoppingLists] Create';
    constructor(public dto: CreateShoppingListDto) {}
  }

  export class GetAll {
    static readonly type = '[ShoppingLists] GetAll';
  }

  export class Update {
    static readonly type = '[ShoppingLists] Update';
    constructor(public id: number, public dto: UpdateShoppingListDto) {}
  }

  export class Remove {
    static readonly type = '[ShoppingLists] Remove';
    constructor(public id: number) {}
  }

  export class Select {
    static readonly type = '[ShoppingLists] Select';
    constructor(public selectedShoppingList: ShoppingListModel) {}
  }

  export class ToggleItemBought {
    static readonly type = '[ShoppingLists] ToggleItemBought';
    constructor(public item: ShoppingListItemModel) {}
  }
}
