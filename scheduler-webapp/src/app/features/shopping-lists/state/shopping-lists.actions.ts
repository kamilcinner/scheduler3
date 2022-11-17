import {
  CreateShoppingListDto,
  CreateShoppingListItemDto,
  UpdateShoppingListDto,
  UpdateShoppingListItemDto,
  UpdateShoppingListItemsDto,
} from '../dto';
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

  export class ToggleShoppingListItemBought {
    static readonly type = '[ShoppingLists] ToggleShoppingListItemBought';
    constructor(public id: number) {}
  }

  export class UpdateShoppingListItems {
    static readonly type = '[ShoppingLists] UpdateShoppingListItems';
    constructor(public dto: UpdateShoppingListItemsDto) {}
  }
}
