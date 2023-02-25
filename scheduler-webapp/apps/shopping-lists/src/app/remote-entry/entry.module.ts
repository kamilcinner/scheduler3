import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RemoteEntryComponent } from './entry.component';
import { remoteRoutes } from './entry.routes';
import { ShoppingListDetailsComponent } from './shopping-list-details/shopping-list-details.component';
import { ShoppingListCreateComponent } from './shopping-list-create/shopping-list-create.component';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ShoppingListsService } from './shopping-lists.service';
import { SharedMaterialModule } from '@rennic/shared/material';
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
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(remoteRoutes),

    SharedMaterialModule,

    StoreModule.forFeature(shoppingListsFeature),
    StoreModule.forFeature(selectedShoppingListItemsFeature),
    EffectsModule.forFeature([ShoppingListsEffects, SelectedShoppingListItemsEffects]),
  ],
  providers: [ShoppingListsService],
})
export class RemoteEntryModule {}
