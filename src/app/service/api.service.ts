import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Predicate } from '../../utils/types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public apiUrl = '/api_v2_books';
  private headers = new HttpHeaders({
    Accept: 'application/json, text/plain, */*',
  });

  public get<U>(url: string, queryParams?: Predicate[]): Observable<U> {
    if (queryParams != null) {
      url = this.addQueryParams(url, queryParams);
    }
    return this.http.get<U>(`${this.apiUrl}${url}`, { headers: this.headers });
  }

  public put<U>(url: string, data: Object): Observable<U> {
    return this.http.put<U>(`${this.apiUrl}${url}`, data, {
      headers: this.headers,
    });
  }

  public addQueryParams(url: string, queryParams: Predicate[]): string {
    const separator = url.includes('?') ? '&' : '?';
    const queryString = queryParams
      .map((param) => `${param.field}=${param.value}`)
      .join('&');
    return `${url}${separator}${queryString}`;
  }

}
