import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { ShoppingListItemModel } from '@rennic/shopping-lists/shared/models';
import { createFeature, createReducer, on } from '@ngrx/store';
import {
  SelectedShoppingListItemsActions,
  SelectedShoppingListItemsApiActions,
} from './selected-shopping-list-items.actions';
import { ShoppingListsService } from '../shopping-lists.service';

export type SelectedShoppingListItemsStateModel = EntityState<ShoppingListItemModel>;

export const selectedShoppingListItemsAdapter = createEntityAdapter<ShoppingListItemModel>({
  sortComparer: ShoppingListsService.sortShoppingListItems,
});

const initialState: SelectedShoppingListItemsStateModel = selectedShoppingListItemsAdapter.getInitialState();

export const selectedShoppingListItemsFeature = createFeature({
  name: 'SelectedShoppingListItems',
  reducer: createReducer(
    initialState,

    on(SelectedShoppingListItemsApiActions.getItemsSuccess, (state, { items }) => {
      return selectedShoppingListItemsAdapter.setAll(items, state);
    }),

    on(SelectedShoppingListItemsActions.reset, (state) => {
      return selectedShoppingListItemsAdapter.removeAll(state);
    }),

    on(SelectedShoppingListItemsApiActions.updateItemsSuccess, (state, { dto }) => {
      return selectedShoppingListItemsAdapter.upsertMany(
        [...dto.createdShoppingListItems, ...dto.updatedShoppingListItems],
        selectedShoppingListItemsAdapter.removeMany(dto.removedShoppingListItemsIds, state),
      );
    }),

    on(SelectedShoppingListItemsApiActions.toggleItemBoughtSuccess, (state, { updatedItem }) => {
      return selectedShoppingListItemsAdapter.updateOne(
        { id: updatedItem.id, changes: { bought: updatedItem.bought } },
        state,
      );
    }),
  ),
});
