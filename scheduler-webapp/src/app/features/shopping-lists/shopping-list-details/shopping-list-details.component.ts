import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ShoppingListsState } from '../state/shopping-lists.state';
import { Observable, combineLatest, map } from 'rxjs';
import { ShoppingListModel, ShoppingListItemModel } from '../models';
import { Navigate } from '@ngxs/router-plugin';
import { ActivatedRoute } from '@angular/router';
import { ShoppingLists } from '../state/shopping-lists.actions';

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

  constructor(private readonly store: Store, private readonly route: ActivatedRoute) {}

  onClickItem(item: ShoppingListItemModel): void {
    this.store.dispatch(new ShoppingLists.ToggleShoppingListItemBought(item.id));
  }

  onClickEdit(): void {
    this.store.dispatch(new Navigate(['edit'], {}, { relativeTo: this.route.parent }));
  }
}
