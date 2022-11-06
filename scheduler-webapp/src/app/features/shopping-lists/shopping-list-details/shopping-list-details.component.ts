import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ShoppingListsState } from '../state/shopping-lists.state';
import { Observable, combineLatest, map } from 'rxjs';
import { ShoppingListModel } from '../models/shopping-list.model';
import { ShoppingListItemModel } from '../models/shopping-list-item.model';

@Component({
  selector: 'app-shopping-list-details',
  templateUrl: './shopping-list-details.component.html',
  styleUrls: ['./shopping-list-details.component.scss'],
})
export class ShoppingListDetailsComponent {
  @Select(ShoppingListsState.selectedShoppingList)
  private readonly selectedShoppingList$!: Observable<ShoppingListModel>;

  readonly vm$ = combineLatest([this.selectedShoppingList$]).pipe(
    map(([selectedShoppingList]) => ({ selectedShoppingList })),
  );

  constructor(private readonly store: Store) {}

  onClickRemove(item: ShoppingListItemModel): void {}
}
