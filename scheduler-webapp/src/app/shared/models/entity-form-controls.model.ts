import { FormControl } from '@angular/forms';

export type EntityFormControlsModel<T> = {
  [K in keyof T]: FormControl<T[K]>;
};
