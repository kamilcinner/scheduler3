import { ShoppingListModel } from '../models/shopping-list.model';
import { HttpErrorResponse } from '@angular/common/http';
import { UpdateShoppingListItemsResponseDto } from '../dto';

export namespace ShoppingListsAPI {
  export class CreateSuccess {
    static readonly type = '[ShoppingLists API] CreateSuccess';
    constructor(public createdShoppingList: ShoppingListModel) {}
  }

  export class CreateFailed {
    static readonly type = '[ShoppingLists API] CreateFailed';
    constructor(public error: HttpErrorResponse) {}
  }

  export class GetAllSuccess {
    static readonly type = '[ShoppingLists] GetAllSuccess';
    constructor(public shoppingLists: ShoppingListModel[]) {}
  }

  export class GetAllFailed {
    static readonly type = '[ShoppingLists] GetAllFailed';
    constructor(public error: HttpErrorResponse) {}
  }

  export class UpdateSuccess {
    static readonly type = '[ShoppingLists] UpdateSuccess';
    constructor(public updatedShoppingList: ShoppingListModel) {}
  }

  export class UpdateFailed {
    static readonly type = '[ShoppingLists] UpdateFailed';
    constructor(public error: HttpErrorResponse) {}
  }

  export class UpdateShoppingListItemsSuccess {
    static readonly type = '[ShoppingLists] UpdateShoppingListItemsSuccess';
    constructor(public updatedShoppingListItemsResponseDto: UpdateShoppingListItemsResponseDto) {}
  }

  export class UpdateShoppingListItemsFailed {
    static readonly type = '[ShoppingLists] UpdateShoppingListItemsFailed';
    constructor(public error: HttpErrorResponse) {}
  }

  export class RemoveSuccess {
    static readonly type = '[ShoppingLists] RemoveSuccess';
    constructor(public removedShoppingList: ShoppingListModel) {}
  }

  export class RemoveFailed {
    static readonly type = '[ShoppingLists] RemoveFailed';
    constructor(public error: HttpErrorResponse) {}
  }
}
