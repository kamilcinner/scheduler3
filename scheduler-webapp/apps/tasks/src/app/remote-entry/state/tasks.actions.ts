import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateTaskDto, Task } from '../models';
import { HttpErrorResponse } from '@angular/common/http';

export const TasksActions = createActionGroup({
  source: 'Tasks',
  events: {
    'Create': props<{ dto: CreateTaskDto }>(),
    'Get all': emptyProps(),
    'Remove': props<{ id: number }>(),
  },
});

export const TasksApiActions = createActionGroup({
  source: 'Tasks API',
  events: {
    'Create success': props<{ createdTask: Task }>(),
    'Create failure': props<{ error: HttpErrorResponse }>(),
    'Get all success': props<{ tasks: Task[] }>(),
    'Get all failure': props<{ error: HttpErrorResponse }>(),
    'Remove success': props<{ id: number }>(),
    'Remove failure': props<{ error: HttpErrorResponse }>(),
  },
});
