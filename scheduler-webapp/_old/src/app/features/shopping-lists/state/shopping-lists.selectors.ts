import {
  shoppingListsAdapter,
  shoppingListsFeature,
} from './shopping-lists.reducer';
import { createSelector } from '@ngrx/store';

const adapterSelectors = shoppingListsAdapter.getSelectors();

export const selectShoppingLists = createSelector(
  shoppingListsFeature.selectShoppingListsState,
  adapterSelectors.selectAll
);
