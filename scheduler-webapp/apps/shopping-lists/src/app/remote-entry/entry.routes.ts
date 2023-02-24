import { Route } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';
import { ShoppingListCreateComponent } from './shopping-list-create/shopping-list-create.component';
import { ShoppingListDetailsComponent } from './shopping-list-details/shopping-list-details.component';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';

export const remoteRoutes: Route[] = [
  { path: '', component: RemoteEntryComponent },
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
