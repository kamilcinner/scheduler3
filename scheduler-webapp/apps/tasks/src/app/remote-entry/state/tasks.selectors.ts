import { createSelector } from '@ngrx/store';
import { tasksFeature } from './tasks.reducer';

export const selectTasks = createSelector(tasksFeature.selectTasksState, (state) => state.entities);
