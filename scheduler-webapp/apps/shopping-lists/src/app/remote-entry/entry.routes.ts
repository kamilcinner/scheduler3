import { Route } from '@angular/router';
import { ShoppingListsBrowseComponent } from '@rennic/shopping-lists/feature-browse';
import { ShoppingListDetailsComponent } from '@rennic/shopping-lists/feature-details';
import { ShoppingListCreateComponent } from '@rennic/shopping-lists/feature-create';
import { ShoppingListEditComponent } from '@rennic/shopping-lists/feature-edit';

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
