import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingListsRoutingModule } from './shopping-lists-routing.module';
import { ShoppingListsComponent } from './shopping-lists.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListDetailsComponent } from './shopping-list-details/shopping-list-details.component';
import { ShoppingListItemComponent } from './shopping-list-item/shopping-list-item.component';

@NgModule({
  declarations: [
    ShoppingListsComponent,
    ShoppingListComponent,
    ShoppingListDetailsComponent,
    ShoppingListItemComponent,
  ],
  imports: [CommonModule, ShoppingListsRoutingModule],
})
export class ShoppingListsModule {}
