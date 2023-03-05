import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { TasksActions, TasksApiActions } from './tasks.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { TasksService } from '../tasks.service';
import { Action, Store } from '@ngrx/store';
import { getRouterSelectors } from '@ngrx/router-store';
import { Router } from '@angular/router';

@Injectable()
export class TasksEffects implements OnInitEffects {
  getAll$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TasksActions.getAll),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((tasks) => TasksApiActions.getAllSuccess({ tasks })),
          catchError((error) => of(TasksApiActions.getAllFailure({ error }))),
        ),
      ),
    );
  });

  create$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TasksActions.create),
      mergeMap(({ dto }) =>
        this.service.create(dto).pipe(
          map((createdTask) => TasksApiActions.createSuccess({ createdTask })),
          catchError((error) => of(TasksApiActions.createFailure({ error }))),
        ),
      ),
    );
  });

  createSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TasksApiActions.createSuccess),
        concatLatestFrom(() => this.store.select(getRouterSelectors().selectUrl)),
        tap(async ([, url]) => {
          console.log({ url });
          await this.router.navigate(['tasks']);
        }),
      );
    },
    { dispatch: false },
  );

  remove$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TasksActions.remove),
      mergeMap(({ id }) =>
        this.service.remove(id).pipe(
          map(() => TasksApiActions.removeSuccess({ id })),
          catchError((error) => of(TasksApiActions.removeFailure({ error }))),
        ),
      ),
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly service: TasksService,
    private readonly store: Store,
    private readonly router: Router,
  ) {}

  ngrxOnInitEffects(): Action {
    return TasksActions.getAll();
  }
}
