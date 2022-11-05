import { NgModule } from '@angular/core';
import { ShoppingListsRoutingModule } from './shopping-lists-routing.module';
import { ShoppingListsComponent } from './shopping-lists.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListDetailsComponent } from './shopping-list-details/shopping-list-details.component';
import { ShoppingListItemComponent } from './shopping-list-item/shopping-list-item.component';
import { ShoppingListsService } from './shopping-lists.service';
import { SharedModule } from '@shared/shared.module';
import { NgxsModule } from '@ngxs/store';
import { ShoppingListsState } from './state/shopping-lists.state';

@NgModule({
  declarations: [
    ShoppingListsComponent,
    ShoppingListComponent,
    ShoppingListDetailsComponent,
    ShoppingListItemComponent,
  ],
  imports: [SharedModule, ShoppingListsRoutingModule, NgxsModule.forFeature([ShoppingListsState])],
  providers: [ShoppingListsService],
})
export class ShoppingListsModule {}
