import { createSelector } from '@ngxs/store';
import { EntityStateModel } from '@shared/models';

export class EntityState {
  protected static entities<T>() {
    return createSelector([this], (state: EntityStateModel<T>) => state.entities);
  }

  protected static selectedEntity<T>() {
    return createSelector([this], (state: EntityStateModel<T>) => state.selectedEntity);
  }
}
