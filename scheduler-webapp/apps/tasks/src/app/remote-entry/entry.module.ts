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

@NgModule({
  declarations: [TasksBrowseComponent, TaskCreateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(remoteRoutes),
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    TranslateModule,
  ],
  providers: [TasksService],
})
export class RemoteEntryModule {}
