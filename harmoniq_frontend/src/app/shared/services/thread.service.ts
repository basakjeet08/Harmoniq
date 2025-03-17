import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiErrorHandlerService } from './api-error-handler.service';
import { AuthService } from './auth.service';
import { ThreadInterface } from '../interfaces/ThreadInterface';
import { catchError, map, Observable } from 'rxjs';
import { ThreadDetailResponse } from '../Models/thread/ThreadDetailResponse';
import { ThreadDto } from '../Models/thread/ThreadDto';
import { ThreadHistoryResponse } from '../Models/thread/ThreadHistoryResponse';
import { ResponseWrapper } from '../Models/common/ResponseWrapper';

@Injectable({ providedIn: 'root' })
export class ThreadService implements ThreadInterface {
  // Storing the urls
  private url = 'http://localhost:8080/thread';
  private token: string;

  // Injecting the necessary dependencies
  constructor(
    private http: HttpClient,
    private apiErrorHandler: ApiErrorHandlerService,
    authService: AuthService
  ) {
    // Storing the token in the variable
    this.token = authService.getUser()?.token || 'Invalid Token';

    // Subscribing to the user changes
    authService.getUserSubject().subscribe({
      next: (user) => (this.token = user?.token || 'Invalid Token'),
    });
  }

  // This function creates the headers required
  private getHeaders() {
    return {
      headers: new HttpHeaders({ Authorization: `Bearer ${this.token}` }),
    };
  }

  // This function sends a POST Request to create a thread
  create(thread: { description: string }): Observable<ThreadDto> {
    return this.http
      .post<ResponseWrapper<ThreadDto>>(this.url, thread, this.getHeaders())
      .pipe(
        map((response) => response.data),
        catchError(this.apiErrorHandler.handleApiError)
      );
  }

  // This function fetches the single thread Data from the backend
  findById(id: string): Observable<ThreadDetailResponse> {
    return this.http
      .get<ResponseWrapper<ThreadDetailResponse>>(
        `${this.url}/${id}`,
        this.getHeaders()
      )
      .pipe(
        map((response) => response.data),
        catchError(this.apiErrorHandler.handleApiError)
      );
  }

  // This function fetches all the threads from the backend
  findAll(): Observable<ThreadDto[]> {
    return this.http
      .get<ResponseWrapper<ThreadDto[]>>(this.url, this.getHeaders())
      .pipe(
        map((response) => response.data),
        catchError(this.apiErrorHandler.handleApiError)
      );
  }

  // This function fetches the current user thread post history
  fetchThreadHistory(): Observable<ThreadHistoryResponse> {
    return this.http
      .get<ResponseWrapper<ThreadHistoryResponse>>(
        `${this.url}/user`,
        this.getHeaders()
      )
      .pipe(
        map((response) => response.data),
        catchError(this.apiErrorHandler.handleApiError)
      );
  }

  // This function deletes the given thread
  deleteById(id: string): Observable<void> {
    return this.http
      .delete<ResponseWrapper<void>>(`${this.url}/${id}`, this.getHeaders())
      .pipe(
        map((response) => response.data),
        catchError(this.apiErrorHandler.handleApiError)
      );
  }
}
