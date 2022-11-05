import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector, NgxsOnInit } from '@ngxs/store';
import { ShoppingLists } from './shopping-lists.actions';
import { ShoppingListModel } from '../models/shopping-list.model';
import { insertItem, patch, removeItem, updateItem } from '@ngxs/store/operators';
import { ShoppingListsAPI } from './shopping-lists-api.actions';
import { ShoppingListsService } from '../shopping-lists.service';
import { catchError, switchMap } from 'rxjs';
import { EntitiesStateModel } from '@shared/models';
import { EntitiesState } from '@shared/state/entities.state';

export type ShoppingListsStateModel = EntitiesStateModel<ShoppingListModel>;

const defaults = {
  entities: [],
};

@State<ShoppingListsStateModel>({
  name: 'shoppingLists',
  defaults,
})
@Injectable()
export class ShoppingListsState extends EntitiesState implements NgxsOnInit {
  @Selector([ShoppingListsState.entities<ShoppingListModel>()])
  static shoppingLists(entities: ShoppingListModel[]) {
    return entities;
  }

  constructor(private readonly service: ShoppingListsService) {
    super();
  }

  ngxsOnInit({ dispatch }: StateContext<ShoppingListsStateModel>): void {
    dispatch(new ShoppingLists.GetAll());
  }

  @Action(ShoppingLists.Create)
  create({ dispatch }: StateContext<ShoppingListsStateModel>, { dto }: ShoppingLists.Create) {
    return this.service.create(dto).pipe(
      switchMap((shoppingList) => dispatch(new ShoppingListsAPI.CreateSuccess(shoppingList))),
      catchError((err) => dispatch(new ShoppingListsAPI.CreateFailed(err))),
    );
  }

  @Action(ShoppingListsAPI.CreateSuccess)
  createSuccess(
    { setState }: StateContext<ShoppingListsStateModel>,
    { createdShoppingList }: ShoppingListsAPI.CreateSuccess,
  ) {
    setState(patch<ShoppingListsStateModel>({ entities: insertItem(createdShoppingList) }));
  }

  @Action(ShoppingLists.GetAll)
  getAll({ dispatch }: StateContext<ShoppingListsStateModel>) {
    return this.service.getAll().pipe(
      switchMap((shoppingLists) => dispatch(new ShoppingListsAPI.GetAllSuccess(shoppingLists))),
      catchError((err) => dispatch(new ShoppingListsAPI.GetAllFailed(err))),
    );
  }

  @Action(ShoppingListsAPI.GetAllSuccess)
  getAllSuccess(
    { patchState }: StateContext<ShoppingListsStateModel>,
    { shoppingLists }: ShoppingListsAPI.GetAllSuccess,
  ) {
    patchState({ entities: shoppingLists });
  }

  @Action(ShoppingLists.Update)
  update({ dispatch }: StateContext<ShoppingListsStateModel>, { id, dto }: ShoppingLists.Update) {
    return this.service.update(id, dto).pipe(
      switchMap((updatedShoppingList) => dispatch(new ShoppingListsAPI.UpdateSuccess(updatedShoppingList))),
      catchError((err) => dispatch(new ShoppingListsAPI.UpdateFailed(err))),
    );
  }

  @Action(ShoppingListsAPI.UpdateSuccess)
  updateSuccess(
    { setState }: StateContext<ShoppingListsStateModel>,
    { updatedShoppingList }: ShoppingListsAPI.UpdateSuccess,
  ) {
    setState(
      patch<ShoppingListsStateModel>({
        entities: updateItem((shoppingList) => shoppingList?.id === updatedShoppingList.id, updatedShoppingList),
      }),
    );
  }

  @Action(ShoppingLists.Remove)
  remove({ dispatch }: StateContext<ShoppingListsStateModel>, { id }: ShoppingLists.Remove) {
    return this.service.remove(id).pipe(
      switchMap((removedShoppingList) => dispatch(new ShoppingListsAPI.RemoveSuccess(removedShoppingList))),
      catchError((err) => dispatch(new ShoppingListsAPI.RemoveFailed(err))),
    );
  }

  @Action(ShoppingListsAPI.RemoveSuccess)
  removeSuccess(
    { setState }: StateContext<ShoppingListsStateModel>,
    { removedShoppingList }: ShoppingListsAPI.RemoveSuccess,
  ) {
    setState(
      patch<ShoppingListsStateModel>({
        entities: removeItem((shoppingList) => shoppingList?.id === removedShoppingList.id),
      }),
    );
  }

  @Action(ShoppingLists.Select)
  select({ patchState }: StateContext<ShoppingListsStateModel>, { selectedShoppingList }: ShoppingLists.Select) {
    patchState({ selectedEntity: selectedShoppingList });
  }
}
