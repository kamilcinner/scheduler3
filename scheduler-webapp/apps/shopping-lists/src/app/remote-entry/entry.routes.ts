import { Route } from '@angular/router';
import {
  ShoppingListCreateComponent,
  ShoppingListDetailsComponent,
  ShoppingListEditComponent,
  ShoppingListsBrowseComponent,
} from '@rennic/shopping-lists/features';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: ShoppingListsBrowseComponent,
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
