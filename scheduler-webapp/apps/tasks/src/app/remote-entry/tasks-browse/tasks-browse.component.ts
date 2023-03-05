import { Component, OnDestroy } from '@angular/core';
import { Task } from '../models';
import { Router } from '@angular/router';
import { NavigationUtils } from '@rennic/shared/utils';
import { Navigation } from '@rennic/shared/enums';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, Subject, takeUntil } from 'rxjs';
import { selectTasks, TasksActions } from '../state';

@Component({
  selector: 'rennic-tasks-browse',
  templateUrl: './tasks-browse.component.html',
  styleUrls: ['./tasks-browse.component.scss'],
})
export class TasksBrowseComponent implements OnDestroy {
  readonly tasks$: Observable<Task[]>;
  readonly vm$: Observable<{ tasks: Task[] }>;

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly store: Store, private readonly router: Router) {
    this.tasks$ = this.store.select(selectTasks).pipe(takeUntil(this.destroy$));
    this.vm$ = combineLatest([this.tasks$]).pipe(map(([tasks]) => ({ tasks })));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onClickDelete(task: Task): void {
    this.store.dispatch(TasksActions.remove({ id: task.id }));
  }

  async onClickCreate(): Promise<void> {
    await this.router.navigate(NavigationUtils.getNavigationCommands(Navigation.TASK_CREATE));
  }
}
