import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { ShoppingListModel } from '@rennic/shopping-lists/shared/models';
import { createFeature, createReducer, on } from '@ngrx/store';
import { ShoppingListsApiActions } from './shopping-lists.actions';

export type ShoppingListsStateModel = EntityState<ShoppingListModel>;

export const shoppingListsAdapter = createEntityAdapter<ShoppingListModel>();

const initialState: ShoppingListsStateModel = shoppingListsAdapter.getInitialState();

export const shoppingListsFeature = createFeature({
  name: 'ShoppingLists',
  reducer: createReducer(
    initialState,

    on(ShoppingListsApiActions.createSuccess, (state, { createdShoppingList }) => {
      return shoppingListsAdapter.addOne(createdShoppingList, state);
    }),

    on(ShoppingListsApiActions.getAllSuccess, (state, { shoppingLists }) => {
      return shoppingListsAdapter.setAll(shoppingLists, state);
    }),

    on(ShoppingListsApiActions.updateSuccess, (state, { updatedShoppingList }) => {
      return shoppingListsAdapter.upsertOne(updatedShoppingList, state);
    }),

    on(ShoppingListsApiActions.removeSuccess, (state, { removedShoppingList }) => {
      return shoppingListsAdapter.removeOne(removedShoppingList.id, state);
    }),
  ),
});
