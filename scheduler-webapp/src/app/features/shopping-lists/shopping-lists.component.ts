import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { combineLatest, map, Observable } from 'rxjs';
import { ShoppingListModel } from './models/shopping-list.model';
import { ShoppingListsState } from './state/shopping-lists.state';
import { ShoppingLists } from './state/shopping-lists.actions';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.component.html',
  styleUrls: ['./shopping-lists.component.scss'],
})
export class ShoppingListsComponent {
  @Select(ShoppingListsState.shoppingLists) private readonly shoppingLists$!: Observable<ShoppingListModel[]>;

  readonly vm$ = combineLatest([this.shoppingLists$]).pipe(map(([shoppingLists]) => ({ shoppingLists })));

  constructor(private readonly store: Store) {}

  onClickShoppingList(shoppingList: ShoppingListModel): void {
    this.store.dispatch(new ShoppingLists.Select(shoppingList));
  }
}
