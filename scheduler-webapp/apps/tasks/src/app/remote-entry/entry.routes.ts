import { Route } from '@angular/router';
import { TasksBrowseComponent } from './tasks-browse/tasks-browse.component';
import { TaskCreateComponent } from './task-create/task-create.component';

export const remoteRoutes: Route[] = [
  { path: '', component: TasksBrowseComponent },
  {
    path: 'create',
    component: TaskCreateComponent,
  },
];
