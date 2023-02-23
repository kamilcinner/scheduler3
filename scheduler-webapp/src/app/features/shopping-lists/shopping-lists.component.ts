import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { ShoppingListModel } from './models';
import { DateFormat, Navigation } from '@shared/enums';
import { Store } from '@ngrx/store';
import { SelectedShoppingListItemsActions, selectShoppingLists, ShoppingListsActions } from './state';
import { Router } from '@angular/router';
import { NavigationUtils } from '@shared/utils/navigation.utils';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.component.html',
  styleUrls: ['./shopping-lists.component.scss'],
})
export class ShoppingListsComponent implements OnInit {
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
