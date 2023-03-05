import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { EntityFormControlsModel } from '@rennic/shared/models';
import { TasksService } from '../tasks.service';
import { Router } from '@angular/router';
import { CreateTaskDto } from '../models';
import { Store } from '@ngrx/store';
import { TasksActions } from '../state';

type FormModel = FormGroup<EntityFormControlsModel<CreateTaskDto>>;

@Component({
  selector: 'rennic-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss'],
})
export class TaskCreateComponent {
  readonly form: FormModel;

  constructor(
    private readonly fb: NonNullableFormBuilder,
    private readonly tasksService: TasksService,
    private readonly router: Router,
    private readonly store: Store,
  ) {
    this.form = this.createForm();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(TasksActions.create({ dto: this.form.getRawValue() }));
  }

  private createForm(): FormModel {
    return this.fb.group<EntityFormControlsModel<CreateTaskDto>>({
      name: this.fb.control('', [Validators.required]),
      description: this.fb.control(''),
    });
  }
}
