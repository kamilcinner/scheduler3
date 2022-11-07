import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListsComponent } from './shopping-lists.component';
import { ShoppingListDetailsComponent } from './shopping-list-details/shopping-list-details.component';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ShoppingListsComponent,
  },
  {
    path: 'details',
    component: ShoppingListDetailsComponent,
  },
  {
    path: 'edit',
    component: ShoppingListEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingListsRoutingModule {}
