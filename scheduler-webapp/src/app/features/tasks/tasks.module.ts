import { NgModule } from '@angular/core';
import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TasksComponent],
  imports: [SharedModule, TasksRoutingModule],
})
export class TasksModule {}
