import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { ShoppingListModel } from '@rennic/shopping-lists/shared/models';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import {
  SelectedShoppingListItemsActions,
  selectShoppingLists,
  ShoppingListsActions,
} from '@rennic/shopping-lists/data-access';
import { NavigationUtils } from '@rennic/shared/utils';
import { Navigation, DateFormat } from '@rennic/shared/enums';

@Component({
  selector: 'rennic-shopping-lists-browse',
  templateUrl: './shopping-lists-browse.component.html',
  styleUrls: ['./shopping-lists-browse.component.scss'],
})
export class ShoppingListsBrowseComponent implements OnInit {
  readonly DateFormat = DateFormat;
  readonly vm$: Observable<{ shoppingLists: ShoppingListModel[] }>;

  private readonly shoppingLists$: Observable<ShoppingListModel[]>;

  constructor(private readonly store: Store, private readonly router: Router) {
    this.shoppingLists$ = this.store.select(selectShoppingLists);
    this.vm$ = combineLatest([this.shoppingLists$]).pipe(map(([shoppingLists]) => ({ shoppingLists })));
  }

  ngOnInit(): void {
    this.store.dispatch(SelectedShoppingListItemsActions.reset());
  }

  async onClickShoppingList(shoppingList: ShoppingListModel): Promise<void> {
    this.store.dispatch(ShoppingListsActions.select({ id: shoppingList.id }));
  }

  async onClickCreate(): Promise<void> {
    await this.router.navigate(NavigationUtils.getNavigationCommands(Navigation.SHOPPING_LIST_CREATE));
  }
}
