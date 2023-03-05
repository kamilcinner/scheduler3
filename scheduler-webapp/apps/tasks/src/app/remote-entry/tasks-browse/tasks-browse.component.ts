import { Component, OnInit } from '@angular/core';
import { Task } from '../models';
import { TasksService } from '../tasks.service';
import { Router } from '@angular/router';
import { NavigationUtils } from '@rennic/shared/utils';
import { Navigation } from '@rennic/shared/enums';

@Component({
  selector: 'rennic-tasks-browse',
  templateUrl: './tasks-browse.component.html',
  styleUrls: ['./tasks-browse.component.scss'],
})
export class TasksBrowseComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private readonly tasksService: TasksService, private readonly router: Router) {}

  ngOnInit(): void {
    this.getAllTasks();
  }

  onClickDelete(task: Task): void {
    this.tasksService.remove(task.id).subscribe({ complete: () => this.getAllTasks() });
  }

  async onClickCreate(): Promise<void> {
    await this.router.navigate(NavigationUtils.getNavigationCommands(Navigation.TASK_CREATE));
  }

  private getAllTasks(): void {
    this.tasksService.getAll().subscribe((tasks) => (this.tasks = tasks));
  }
}
