import { createSelector } from '@ngxs/store';
import { EntitiesStateModel } from '@shared/models';

export class EntitiesState {
  protected static entities<T>() {
    return createSelector([this], (state: EntitiesStateModel<T>) => state.entities);
  }
}
