import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateShoppingListDto, UpdateShoppingListDto } from '../dto';
import { ShoppingListModel } from '../models';
import { HttpErrorResponse } from '@angular/common/http';

export const ShoppingListsActions = createActionGroup({
  source: 'Shopping lists',
  events: {
    Create: props<{ dto: CreateShoppingListDto }>(),
    'Get all': emptyProps(),
    Update: props<{ id: number; dto: UpdateShoppingListDto }>(),
    Remove: props<{ id: number }>(),
    Select: props<{ id: number }>(),
  },
});

export const ShoppingListsApiActions = createActionGroup({
  source: 'Shopping lists API',
  events: {
    'Create success': props<{ createdShoppingList: ShoppingListModel }>(),
    'Create failure': props<{ error: HttpErrorResponse }>(),
    'Get all success': props<{ shoppingLists: ShoppingListModel[] }>(),
    'Get all failure': props<{ error: HttpErrorResponse }>(),
    'Update success': props<{ updatedShoppingList: ShoppingListModel }>(),
    'Update failure': props<{ error: HttpErrorResponse }>(),
    'Remove success': props<{ removedShoppingList: ShoppingListModel }>(),
    'Remove failure': props<{ error: HttpErrorResponse }>(),
  },
});
