import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { EntityFormControlsModel } from '@rennic/shared/models';
import { CreateTaskDto } from '../dto';
import { TasksService } from '../tasks.service';
import { Router } from '@angular/router';
import { NavigationUtils } from '@rennic/shared/utils';
import { Navigation } from '@rennic/shared/enums';

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
  ) {
    this.form = this.createForm();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.tasksService
      .create(this.form.getRawValue())
      .subscribe({ complete: () => this.router.navigate(NavigationUtils.getNavigationCommands(Navigation.TASKS)) });
  }

  private createForm(): FormModel {
    return this.fb.group<EntityFormControlsModel<CreateTaskDto>>({
      name: this.fb.control('', [Validators.required]),
      description: this.fb.control(''),
    });
  }
}
