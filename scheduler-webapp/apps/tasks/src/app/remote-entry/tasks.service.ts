import { Inject, Injectable } from '@angular/core';
import { API_URL, HttpService } from '@rennic/shared/services';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './models';
import { FeatureUrl } from '@rennic/shared/enums';
import { CreateTaskDto } from './dto';

@Injectable()
export class TasksService extends HttpService {
  constructor(protected override readonly http: HttpClient, @Inject(API_URL) private readonly apiUrl: string) {
    super(http, `${apiUrl}/${FeatureUrl.TASKS}`);
  }

  create(dto: CreateTaskDto): Observable<Task> {
    return this.post<Task>('', dto);
  }

  getAll(): Observable<Task[]> {
    return this.get<Task[]>('');
  }

  remove(id: number): Observable<Task> {
    return this.delete<Task>(`/${id}`);
  }
}
