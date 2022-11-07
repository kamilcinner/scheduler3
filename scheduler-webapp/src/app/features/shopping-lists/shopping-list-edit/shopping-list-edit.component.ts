import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ShoppingListsState } from '../state/shopping-lists.state';
import { combineLatest, map, Observable } from 'rxjs';
import { ShoppingListModel, ShoppingListItemModel } from '../models';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss'],
})
export class ShoppingListEditComponent implements OnInit {
  @Select(ShoppingListsState.selectedShoppingList)
  private readonly selectedShoppingList$!: Observable<ShoppingListModel>;

  readonly vm$ = combineLatest([this.selectedShoppingList$]).pipe(
    map(([selectedShoppingList]) => ({ selectedShoppingList })),
  );
  form = new FormArray([]);

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.selectedShoppingList$.subscribe();
  }

  onClickRemove(item: ShoppingListItemModel): void {}
}
