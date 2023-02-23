import { NgModule } from '@angular/core';
import { ShoppingListsRoutingModule } from './shopping-lists-routing.module';
import { ShoppingListsComponent } from './shopping-lists.component';
import { ShoppingListDetailsComponent } from './shopping-list-details/shopping-list-details.component';
import { ShoppingListsService } from './shopping-lists.service';
import { SharedModule } from '@shared/shared.module';
import { NgxsModule } from '@ngxs/store';
import { ShoppingListsState } from './state/shopping-lists.state';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';

@NgModule({
  declarations: [ShoppingListsComponent, ShoppingListDetailsComponent, ShoppingListEditComponent],
  imports: [SharedModule, ShoppingListsRoutingModule, NgxsModule.forFeature([ShoppingListsState])],
  providers: [ShoppingListsService],
})
export class ShoppingListsModule {}
