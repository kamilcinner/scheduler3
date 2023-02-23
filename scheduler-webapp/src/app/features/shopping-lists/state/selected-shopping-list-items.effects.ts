import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { ShoppingListsService } from '../shopping-lists.service';
import {
  SelectedShoppingListItemsActions,
  SelectedShoppingListItemsApiActions,
} from './selected-shopping-list-items.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectRouteParam } from '@shared/state/router.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationUtils } from '@shared/utils/navigation.utils';
import { Navigation } from '@shared/enums';

@Injectable()
export class SelectedShoppingListItemsEffects {
  getItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SelectedShoppingListItemsActions.getItems),
      concatLatestFrom(() => this.store.select(selectRouteParam('id'))),
      mergeMap(([, id]) => {
        if (id == null) {
          return of(
            SelectedShoppingListItemsApiActions.getItemsFailure({
              error: new Error('Selected shopping list id is undefined'),
            }),
          );
        }
        return this.service.getAllShoppingListItems(+id).pipe(
          map((items) => SelectedShoppingListItemsApiActions.getItemsSuccess({ items })),
          catchError((error) => of(SelectedShoppingListItemsApiActions.getItemsFailure({ error }))),
        );
      }),
    );
  });

  updateItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SelectedShoppingListItemsActions.updateItems),
      concatLatestFrom(() => this.store.select(selectRouteParam('id'))),
      mergeMap(([{ dto }, id]) => {
        if (id == null) {
          return of(
            SelectedShoppingListItemsApiActions.updateItemsFailure({
              error: new Error('Selected shopping list id is undefined'),
            }),
          );
        }
        return this.service.updateShoppingListItems(+id, dto).pipe(
          map((dto) => SelectedShoppingListItemsApiActions.updateItemsSuccess({ dto })),
          catchError((error) => of(SelectedShoppingListItemsApiActions.updateItemsFailure({ error }))),
        );
      }),
    );
  });

  updateItemsSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(SelectedShoppingListItemsApiActions.updateItemsSuccess),
        concatLatestFrom(() => this.store.select(selectRouteParam('id'))),
        tap(async ([, id]) => {
          if (id != null) {
            await this.router.navigate(NavigationUtils.getNavigationCommands(Navigation.SHOPPING_LIST_DETAILS, { id }));
          }
        }),
      );
    },
    { dispatch: false },
  );

  toggleItemBought$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SelectedShoppingListItemsActions.toggleItemBought),
      mergeMap(({ id }) =>
        this.service.toggleShoppingListItemBought(id).pipe(
          map((updatedItem) => SelectedShoppingListItemsApiActions.toggleItemBoughtSuccess({ updatedItem })),
          catchError((error) => of(SelectedShoppingListItemsApiActions.toggleItemBoughtFailure({ error }))),
        ),
      ),
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly service: ShoppingListsService,
    private readonly store: Store,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}
}
