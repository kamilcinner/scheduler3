import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { remoteRoutes } from './entry.routes';
import { SharedMaterialModule } from '@rennic/shared/material';
import { TranslateModule } from '@ngx-translate/core';
import { TasksBrowseComponent } from './tasks-browse/tasks-browse.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TasksService } from './tasks.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { API_URL } from '@rennic/shared/services';
import { environment } from '../../environments/environment';
import { StoreModule } from '@ngrx/store';
import { TasksEffects, tasksFeature } from './state';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [TasksBrowseComponent, TaskCreateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(remoteRoutes),
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    TranslateModule,

    StoreModule.forFeature(tasksFeature),
    EffectsModule.forFeature([TasksEffects]),
  ],
  providers: [
    TasksService,
    {
      provide: API_URL,
      useValue: environment.API_URL,
    },
  ],
})
export class RemoteEntryModule {}
