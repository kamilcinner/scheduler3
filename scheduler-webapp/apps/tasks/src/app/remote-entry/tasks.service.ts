import { Injectable } from '@angular/core';
import { HttpService } from '@rennic/shared/services';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './models';
import { FeatureUrl } from '@rennic/shared/enums';
import { CreateTaskDto } from './dto';

@Injectable()
export class TasksService extends HttpService {
  constructor(protected override readonly http: HttpClient) {
    super(http);
  }

  create(dto: CreateTaskDto): Observable<Task> {
    return this.post<Task>(`/${FeatureUrl.TASKS}`, dto);
  }

  getAll(): Observable<Task[]> {
    return this.get<Task[]>(`/${FeatureUrl.TASKS}`);
  }

  remove(id: number): Observable<Task> {
    return this.delete<Task>(`/${FeatureUrl.TASKS}/${id}`);
  }
}
