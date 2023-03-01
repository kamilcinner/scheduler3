import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ShoppingListsActions } from '@rennic/shopping-lists/data-access';
import { EntityFormControlsModel } from '@rennic/shared/models';
import { CreateShoppingListDto } from '@rennic/shopping-lists/shared/dto';

type FormModel = FormGroup<EntityFormControlsModel<CreateShoppingListDto>>;

@Component({
  selector: 'rennic-shopping-list-create',
  templateUrl: './shopping-list-create.component.html',
})
export class ShoppingListCreateComponent {
  readonly form: FormModel;

  constructor(private readonly fb: NonNullableFormBuilder, private readonly store: Store) {
    this.form = this.createForm();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(
      ShoppingListsActions.create({
        dto: { name: this.form.controls['name'].value },
      }),
    );
  }

  private createForm(): FormModel {
    return this.fb.group({ name: this.fb.control('', [Validators.required]) });
  }
}
