import { getRouterSelectors } from '@ngrx/router-store';

export const {
  selectRouteParam,
  selectCurrentRoute,
  selectQueryParam,
  selectQueryParams,
  selectRouteData,
  selectRouteDataParam,
  selectRouteParams,
  selectTitle,
  selectUrl,
  selectFragment,
} = getRouterSelectors();
