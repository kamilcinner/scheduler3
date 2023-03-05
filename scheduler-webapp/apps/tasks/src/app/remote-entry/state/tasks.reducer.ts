import { Task } from '../models';
import { createFeature, createReducer, on } from '@ngrx/store';
import { TasksApiActions } from './tasks.actions';

export interface TasksState {
  entities: Task[];
}

const initialState: TasksState = {
  entities: [],
};

export const tasksFeature = createFeature({
  name: 'Tasks',
  reducer: createReducer(
    initialState,

    on(TasksApiActions.getAllSuccess, (state, { tasks }) => {
      return { ...state, entities: tasks };
    }),

    on(TasksApiActions.createSuccess, (state, { createdTask }) => {
      return { ...state, entities: [...state.entities, createdTask] };
    }),

    on(TasksApiActions.removeSuccess, (state, { id }) => {
      return { ...state, entities: state.entities.filter((entity) => entity.id !== id) };
    }),
  ),
});
