import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListsComponent } from './shopping-lists.component';
import { ShoppingListDetailsComponent } from './shopping-list-details/shopping-list-details.component';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { ShoppingListCreateComponent } from './shopping-list-create/shopping-list-create.component';

const routes: Routes = [
  {
    path: '',
    component: ShoppingListsComponent,
  },
  {
    path: 'create',
    component: ShoppingListCreateComponent,
  },
  {
    path: ':id',
    component: ShoppingListDetailsComponent,
  },
  {
    path: ':id/edit',
    component: ShoppingListEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingListsRoutingModule {}
