import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { shoppingListsFeature } from './state/shopping-lists.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SelectedShoppingListItemsEffects } from './state/selected-shopping-list-items.effects';
import { ShoppingListsEffects } from './state/shopping-lists.effects';
import { selectedShoppingListItemsFeature } from './state/selected-shopping-list-items.reducer';
import { ShoppingListsService } from './shopping-lists.service';

@NgModule({
  imports: [
    StoreModule.forFeature(shoppingListsFeature),
    StoreModule.forFeature(selectedShoppingListItemsFeature),
    EffectsModule.forFeature([ShoppingListsEffects, SelectedShoppingListItemsEffects]),
  ],
  providers: [ShoppingListsService],
})
export class ShoppingListsDataAccessModule {}
