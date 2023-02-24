import { NgModule } from '@angular/core';
import { ShoppingListsRoutingModule } from './shopping-lists-routing.module';
import { ShoppingListsComponent } from './shopping-lists.component';
import { ShoppingListDetailsComponent } from './shopping-list-details/shopping-list-details.component';
import { ShoppingListsService } from './shopping-lists.service';
import { SharedModule } from '@shared/shared.module';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { EffectsModule } from '@ngrx/effects';
import {
  ShoppingListsEffects,
  shoppingListsFeature,
  selectedShoppingListItemsFeature,
  SelectedShoppingListItemsEffects,
} from './state';
import { StoreModule } from '@ngrx/store';
import { ShoppingListCreateComponent } from './shopping-list-create/shopping-list-create.component';

@NgModule({
  declarations: [
    ShoppingListsComponent,
    ShoppingListDetailsComponent,
    ShoppingListEditComponent,
    ShoppingListCreateComponent,
  ],
  imports: [
    SharedModule,
    ShoppingListsRoutingModule,
    StoreModule.forFeature(shoppingListsFeature),
    StoreModule.forFeature(selectedShoppingListItemsFeature),
    EffectsModule.forFeature([
      ShoppingListsEffects,
      SelectedShoppingListItemsEffects,
    ]),
  ],
  providers: [ShoppingListsService],
})
export class ShoppingListsModule {}
