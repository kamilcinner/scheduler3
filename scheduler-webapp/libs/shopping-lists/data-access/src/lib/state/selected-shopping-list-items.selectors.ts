import {
  selectedShoppingListItemsAdapter,
  selectedShoppingListItemsFeature,
} from './selected-shopping-list-items.reducer';
import { createSelector } from '@ngrx/store';

const adapterSelectors = selectedShoppingListItemsAdapter.getSelectors();

export const selectSelectedShoppingListItems = createSelector(
  selectedShoppingListItemsFeature.selectSelectedShoppingListItemsState,
  adapterSelectors.selectAll,
);
