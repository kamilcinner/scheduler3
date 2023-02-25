import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';
import { remoteRoutes } from './entry.routes';
import { ShoppingListDetailsComponent } from './shopping-list-details/shopping-list-details.component';
import { ShoppingListCreateComponent } from './shopping-list-create/shopping-list-create.component';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ShoppingListsService } from './shopping-lists.service';
import { SharedModule } from '@rennic/shared';
import {
  SelectedShoppingListItemsEffects,
  selectedShoppingListItemsFeature,
  ShoppingListsEffects,
  shoppingListsFeature,
} from './state';

@NgModule({
  declarations: [
    RemoteEntryComponent,
    ShoppingListDetailsComponent,
    ShoppingListEditComponent,
    ShoppingListCreateComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(remoteRoutes),

    StoreModule.forFeature(shoppingListsFeature),
    StoreModule.forFeature(selectedShoppingListItemsFeature),
    EffectsModule.forFeature([
      ShoppingListsEffects,
      SelectedShoppingListItemsEffects,
    ]),
  ],
  providers: [ShoppingListsService],
})
export class RemoteEntryModule {}
