import { CreateShoppingListDto } from '../dto/create-shopping-list.dto';

export namespace ShoppingLists {
  export class Create {
    static readonly type = '[ShoppingLists] Create';
    constructor(public dto: CreateShoppingListDto) {}
  }
}
