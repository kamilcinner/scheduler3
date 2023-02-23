import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector, NgxsOnInit } from '@ngxs/store';
import { ShoppingLists } from './shopping-lists.actions';
import { ShoppingListItemModel, ShoppingListModel } from '../models';
import { append, compose, insertItem, patch, removeItem, updateItem } from '@ngxs/store/operators';
import { ShoppingListsAPI } from './shopping-lists-api.actions';
import { ShoppingListsService } from '../shopping-lists.service';
import { catchError, EMPTY, switchMap } from 'rxjs';
import { EntityStateModel } from '@shared/models';
import { EntityState } from '@shared/state/entity.state';
import { sortEntities } from '@shared/state-operators';

export type ShoppingListsStateModel = EntityStateModel<ShoppingListModel>;

const defaults = {
  entities: [],
};

@State<ShoppingListsStateModel>({
  name: 'shoppingLists',
  defaults,
})
@Injectable()
export class ShoppingListsState extends EntityState implements NgxsOnInit {
  @Selector([ShoppingListsState.entities<ShoppingListModel>()])
  static shoppingLists(entities: ShoppingListModel[]) {
    return entities;
  }

  @Selector([ShoppingListsState.selectedEntity<ShoppingListModel>()])
  static selectedShoppingList(selectedEntity: ShoppingListModel) {
    return selectedEntity;
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

  @Action(ShoppingLists.UpdateShoppingListItems)
  updateShoppingListItems(
    { getState, dispatch }: StateContext<ShoppingListsStateModel>,
    { dto }: ShoppingLists.UpdateShoppingListItems,
  ) {
    const selectedShoppingListId = getState().selectedEntity?.id;
    if (!selectedShoppingListId) {
      return EMPTY; // todo: maybe some message
    }
    return this.service.updateShoppingListItems(selectedShoppingListId, dto).pipe(
      switchMap((responseDto) => dispatch(new ShoppingListsAPI.UpdateShoppingListItemsSuccess(responseDto))),
      catchError((err) => dispatch(new ShoppingListsAPI.UpdateShoppingListItemsFailed(err))),
    );
  }

  @Action(ShoppingListsAPI.UpdateShoppingListItemsSuccess)
  updateShoppingListItemsSuccess(
    { setState, getState }: StateContext<ShoppingListsStateModel>,
    { dto }: ShoppingListsAPI.UpdateShoppingListItemsSuccess,
  ) {
    if (!getState().selectedEntity) {
      return;
    }
    setState(
      patch<ShoppingListsStateModel>({
        selectedEntity: patch({
          items: compose(
            append(dto.createdShoppingListItems),
            ...dto.updatedShoppingListItems.map((updatedItem) =>
              updateItem((item) => item?.id === updatedItem.id, updatedItem),
            ),
            ...dto.removedShoppingListItemsIds.map((removedItemId) =>
              removeItem<ShoppingListItemModel>((item) => item?.id === removedItemId),
            ),
          ),
        }),
      }),
    );
    this.updateSelectedShoppingListOrigin({ getState, setState });
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
  select(
    { patchState, setState }: StateContext<ShoppingListsStateModel>,
    { selectedShoppingList }: ShoppingLists.Select,
  ) {
    patchState({ selectedEntity: selectedShoppingList });
    // todo: instead sort at server
    setState(
      patch<ShoppingListsStateModel>({
        selectedEntity: patch<ShoppingListModel>({
          items: sortEntities<ShoppingListItemModel>(ShoppingListsService.sortShoppingListItems),
        }),
      }),
    );
  }

  @Action(ShoppingLists.ToggleShoppingListItemBought)
  toggleShoppingListItemBought(
    { dispatch }: StateContext<ShoppingListsStateModel>,
    { id }: ShoppingLists.ToggleShoppingListItemBought,
  ) {
    return this.service.toggleShoppingListItemBought(id).pipe(
      switchMap((updatedItem) => dispatch(new ShoppingListsAPI.ToggleShoppingListItemBoughtSuccess(updatedItem))),
      catchError((err) => dispatch(new ShoppingListsAPI.ToggleShoppingListItemBoughtFailed(err))),
    );
  }

  @Action(ShoppingListsAPI.ToggleShoppingListItemBoughtSuccess)
  toggleShoppingListItemBoughtSuccess(
    { getState, setState }: StateContext<ShoppingListsStateModel>,
    { updatedItem }: ShoppingListsAPI.ToggleShoppingListItemBoughtSuccess,
  ) {
    const selectedShoppingListId = getState().selectedEntity?.id;
    if (!selectedShoppingListId) {
      return;
    }
    setState(
      patch<ShoppingListsStateModel>({
        selectedEntity: patch<ShoppingListModel>({
          items: compose(
            updateItem((item) => item?.id === updatedItem.id, updatedItem),
            sortEntities(ShoppingListsService.sortShoppingListItems),
          ),
        }),
      }),
    );
    this.updateSelectedShoppingListOrigin({ getState, setState });
  }

  private updateSelectedShoppingListOrigin({
    getState,
    setState,
  }: Pick<StateContext<ShoppingListsStateModel>, 'setState' | 'getState'>) {
    const selectedShoppingList = getState().selectedEntity;
    if (!selectedShoppingList) {
      return;
    }
    setState(
      patch<ShoppingListsStateModel>({
        entities: updateItem((shoppingList) => shoppingList?.id === selectedShoppingList.id, selectedShoppingList),
      }),
    );
  }
}
