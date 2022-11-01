import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { ShoppingLists } from './shopping-lists.actions';
import { ShoppingListModel } from '../models/shopping-list.model';

export type ShoppingListsStateModel = {
  shoppingLists: ShoppingListModel[];
};

const defaults = {
  shoppingLists: [],
};

@State<ShoppingListsStateModel>({
  name: 'shoppingLists',
  defaults,
})
@Injectable()
export class ShoppingListsState {
  @Action(ShoppingLists.Create)
  create({}: StateContext<ShoppingListsStateModel>) {}
}
