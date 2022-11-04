import { CreateShoppingListDto } from '../dto/create-shopping-list.dto';
import { UpdateShoppingListDto } from '../dto/update-shopping-list.dto';

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
}
