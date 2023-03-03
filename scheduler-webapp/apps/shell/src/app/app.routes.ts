import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'shopping-lists',
    loadChildren: () =>
      import('shopping-lists/Module').then((m) => m.RemoteEntryModule),
  },
];
