import { Component } from '@angular/core';
import { EntityFormControlsModel } from '@shared/models';
import { CreateShoppingListDto } from '../dto';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ShoppingListsActions } from '../state';

type FormModel = FormGroup<EntityFormControlsModel<CreateShoppingListDto>>;

@Component({
  selector: 'app-shopping-list-create',
  templateUrl: './shopping-list-create.component.html',
  styleUrls: ['./shopping-list-create.component.scss'],
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

    this.store.dispatch(ShoppingListsActions.create({ dto: { name: this.form.controls.name.value } }));
  }

  private createForm(): FormModel {
    return this.fb.group({ name: this.fb.control('', [Validators.required]) });
  }
}
