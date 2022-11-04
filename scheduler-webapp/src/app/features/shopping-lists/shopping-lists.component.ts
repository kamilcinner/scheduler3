import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { combineLatest, map, Observable } from 'rxjs';
import { ShoppingListModel } from './models/shopping-list.model';
import { ShoppingListsState } from './state/shopping-lists.state';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.component.html',
  styleUrls: ['./shopping-lists.component.scss'],
})
export class ShoppingListsComponent {
  @Select(ShoppingListsState.getShoppingLists) private readonly shoppingLists$!: Observable<ShoppingListModel>;

  readonly vm$ = combineLatest([this.shoppingLists$]).pipe(map(([shoppingLists]) => ({ shoppingLists })));

  constructor(private readonly store: Store) {}
}
