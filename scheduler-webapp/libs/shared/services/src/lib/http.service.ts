import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

type HttpOptions = {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  params?:
    | HttpParams
    | {
        [param: string]: string | number | boolean | readonly (string | number | boolean)[];
      };
};

enum HttpObserveType {
  BODY = 'body',
  EVENTS = 'events',
  RESPONSE = 'response',
}

enum HttpResponseType {
  JSON = 'json',
  ARRAY_BUFFER = 'arraybuffer',
  BLOB = 'blob',
  TEXT = 'text',
}

export class HttpService {
  constructor(protected readonly http: HttpClient, protected readonly apiUrlPrefix: string) {}

  protected get<T>(url: string, options?: HttpOptions): Observable<T> {
    return this.http.get<T>(`${this.apiUrlPrefix}${url}`, {
      ...options,
      observe: HttpObserveType.BODY,
      responseType: HttpResponseType.JSON,
    });
  }

  protected post<T>(url: string, body: Record<string, unknown>, options?: HttpOptions): Observable<T> {
    return this.http.post<T>(`${this.apiUrlPrefix}${url}`, body, {
      ...options,
      observe: HttpObserveType.BODY,
      responseType: HttpResponseType.JSON,
    });
  }

  protected patch<T>(url: string, body: Record<string, unknown>, options?: HttpOptions): Observable<T> {
    return this.http.patch<T>(`${this.apiUrlPrefix}${url}`, body, {
      ...options,
      observe: HttpObserveType.BODY,
      responseType: HttpResponseType.JSON,
    });
  }

  protected put<T>(url: string, body: Record<string, unknown>, options?: HttpOptions): Observable<T> {
    return this.http.put<T>(`${this.apiUrlPrefix}${url}`, body, {
      ...options,
      observe: HttpObserveType.BODY,
      responseType: HttpResponseType.JSON,
    });
  }

  protected delete<T>(url: string, body?: Record<string, unknown>, options?: HttpOptions): Observable<T> {
    return this.http.delete<T>(`${this.apiUrlPrefix}${url}`, {
      ...options,
      body,
      observe: HttpObserveType.BODY,
      responseType: HttpResponseType.JSON,
    });
  }
}
