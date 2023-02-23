import { createActionGroup, createFeature, createReducer, emptyProps, on, props } from '@ngrx/store';

export const OrdersActions = createActionGroup({
  source: 'Orders',
  events: {
    Add: props<{ order: any }>(),
  },
});

export type OrdersState = { id: number; isActive: boolean }[];

const initialState: OrdersState = [];

const ordersFeature = createFeature({
  name: 'Orders',
  reducer: createReducer(
    initialState,

    on(OrdersActions.add, (state, { order }) => {
      return [...state, order];
    }),
  ),
});
