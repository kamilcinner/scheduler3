import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  UpdateShoppingListItemsDto,
  UpdateShoppingListItemsResponseDto,
} from '../dto';
import { HttpErrorResponse } from '@angular/common/http';
import { ShoppingListItemModel } from '../models';

export const SelectedShoppingListItemsActions = createActionGroup({
  source: 'Selected shopping list items',
  events: {
    'Get items': emptyProps(),
    Reset: emptyProps(),
    'Update items': props<{ dto: UpdateShoppingListItemsDto }>(),
    'Toggle item bought': props<{ id: number }>(),
  },
});

export const SelectedShoppingListItemsApiActions = createActionGroup({
  source: 'Selected shopping list items API',
  events: {
    'Get items success': props<{ items: ShoppingListItemModel[] }>(),
    'Get items failure': props<{ error: HttpErrorResponse | Error }>(),
    'Update items success': props<{
      dto: UpdateShoppingListItemsResponseDto;
    }>(),
    'Update items failure': props<{ error: HttpErrorResponse | Error }>(),
    'Toggle item bought success': props<{
      updatedItem: ShoppingListItemModel;
    }>(),
    'Toggle item bought failure': props<{ error: HttpErrorResponse }>(),
  },
});
