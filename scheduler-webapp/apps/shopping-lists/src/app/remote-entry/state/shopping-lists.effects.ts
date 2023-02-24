import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { ShoppingListsService } from '../shopping-lists.service';
import {
  ShoppingListsActions,
  ShoppingListsApiActions,
} from './shopping-lists.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { SelectedShoppingListItemsActions } from './selected-shopping-list-items.actions';
import { Navigation, NavigationUtils } from '@rennic/commons';

@Injectable()
export class ShoppingListsEffects implements OnInitEffects {
  create$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ShoppingListsActions.create),
      mergeMap(({ dto }) =>
        this.service.create(dto).pipe(
          map((createdShoppingList) =>
            ShoppingListsApiActions.createSuccess({ createdShoppingList })
          ),
          catchError((error) =>
            of(ShoppingListsApiActions.createFailure({ error }))
          )
        )
      )
    );
  });

  createSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ShoppingListsApiActions.createSuccess),
        tap(async ({ createdShoppingList }) => {
          await this.router.navigate(
            NavigationUtils.getNavigationCommands(
              Navigation.SHOPPING_LIST_EDIT,
              { id: createdShoppingList.id }
            )
          );
        })
      );
    },
    { dispatch: false }
  );

  getAll$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ShoppingListsActions.getAll),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((shoppingLists) =>
            ShoppingListsApiActions.getAllSuccess({ shoppingLists })
          ),
          catchError((error) =>
            of(ShoppingListsApiActions.getAllFailure({ error }))
          )
        )
      )
    );
  });

  update$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ShoppingListsActions.update),
      mergeMap(({ id, dto }) =>
        this.service.update(id, dto).pipe(
          map((updatedShoppingList) =>
            ShoppingListsApiActions.updateSuccess({ updatedShoppingList })
          ),
          catchError((error) =>
            of(ShoppingListsApiActions.updateFailure({ error }))
          )
        )
      )
    );
  });

  remove$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ShoppingListsActions.remove),
      mergeMap(({ id }) =>
        this.service.remove(id).pipe(
          map((removedShoppingList) =>
            ShoppingListsApiActions.removeSuccess({ removedShoppingList })
          ),
          catchError((error) =>
            of(ShoppingListsApiActions.removeFailure({ error }))
          )
        )
      )
    );
  });

  select$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ShoppingListsActions.select),
      mergeMap(async ({ id }) => {
        await this.router.navigate(
          NavigationUtils.getNavigationCommands(
            Navigation.SHOPPING_LIST_DETAILS,
            { id }
          )
        );
        return SelectedShoppingListItemsActions.getItems();
      })
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly service: ShoppingListsService,
    private readonly router: Router
  ) {}

  ngrxOnInitEffects(): Action {
    return ShoppingListsActions.getAll();
  }
}
