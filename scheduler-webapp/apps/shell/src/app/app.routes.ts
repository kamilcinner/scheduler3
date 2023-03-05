import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'tasks',
    loadChildren: () => import('tasks/Module').then((m) => m.RemoteEntryModule),
  },
  {
    path: 'shopping-lists',
    loadChildren: () => import('shopping-lists/Module').then((m) => m.RemoteEntryModule),
  },
];
