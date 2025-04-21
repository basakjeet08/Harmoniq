import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiErrorHandlerService } from './api-error-handler.service';
import { ThreadInterface } from '../interfaces/ThreadInterface';
import { catchError, map, Observable } from 'rxjs';
import { ThreadDetailResponse } from '../Models/thread/ThreadDetailResponse';
import { ThreadDto } from '../Models/thread/ThreadDto';
import {
  ThreadHistoryItem,
  ThreadHistoryResponse,
} from '../Models/thread/ThreadHistoryResponse';
import { ResponseWrapper } from '../Models/common/ResponseWrapper';
import {
  CREATE_THREAD_ENDPOINT,
  DELETE_THREAD_BY_ID_ENDPOINT,
  FETCH_ALL_THREADS_BY_TAG,
  FETCH_PERSONALISED_THREADS_ENDPOINT,
  FETCH_CURRENT_USER_THREADS_ENDPOINT,
  FETCH_THREAD_BY_ID_ENDPOINT,
  TOGGLE_LIKE_ENDPOINTS,
} from '../constants/url-constants';
import { ProfileService } from './profile.service';
import { AuthResponse } from '../Models/auth/AuthResponse';
import { PageWrapper } from '../Models/common/PageWrapper';

@Injectable({ providedIn: 'root' })
export class ThreadService implements ThreadInterface {
  // Storing the urls
  private token: string;
  private user!: AuthResponse;

  // Injecting the necessary dependencies
  constructor(
    private http: HttpClient,
    private apiErrorHandler: ApiErrorHandlerService,
    profileService: ProfileService
  ) {
    // Storing the token in the variable
    this.token = profileService.getUser()?.token || 'Invalid Token';
    this.user = profileService.getUser()!;

    // Subscribing to the user changes
    profileService.getUserSubject().subscribe({
      next: (user) => {
        this.user = user!;
        this.token = user?.token || 'Invalid Token';
      },
    });
  }

  // This function creates the headers required
  private getHeaders() {
    return {
      headers: new HttpHeaders({ Authorization: `Bearer ${this.token}` }),
    };
  }

  // This function updates the thread if its liked by current user
  private updateLikedByCurrentUser<
    T extends ThreadDto | ThreadDetailResponse | ThreadHistoryItem
  >(threadDto: T): T {
    return {
      ...threadDto,
      isLikedByCurrentUser: threadDto.likedByUserIds.includes(this.user.id!),
    };
  }

  // This function sends a POST Request to create a thread
  create(thread: { description: string }): Observable<ThreadDto> {
    return this.http
      .post<ResponseWrapper<ThreadDto>>(
        CREATE_THREAD_ENDPOINT,
        thread,
        this.getHeaders()
      )
      .pipe(
        map((response) => response.data),
        catchError(this.apiErrorHandler.handleApiError)
      );
  }

  // This function fetches the single thread Data from the backend
  findById(id: string): Observable<ThreadDetailResponse> {
    return this.http
      .get<ResponseWrapper<ThreadDetailResponse>>(
        FETCH_THREAD_BY_ID_ENDPOINT.replace(':id', id),
        this.getHeaders()
      )
      .pipe(
        map((response) => this.updateLikedByCurrentUser(response.data)),
        catchError(this.apiErrorHandler.handleApiError)
      );
  }

  // This function fetches all the personalized threads for the user
  findAllPersonalized(pageable: {
    page: number;
    size: number;
  }): Observable<PageWrapper<ThreadDto>> {
    // Page related data
    const page = pageable.page.toString();
    const size = pageable.size.toString();

    // Creating the url
    let url = FETCH_PERSONALISED_THREADS_ENDPOINT;
    url = url.replace(':page', page);
    url = url.replace(':size', size);

    // Calling the API
    return this.http
      .get<ResponseWrapper<PageWrapper<ThreadDto>>>(url, this.getHeaders())
      .pipe(
        map((response) => {
          response.data.content = response.data.content.map((thread) =>
            this.updateLikedByCurrentUser(thread)
          );

          return response.data;
        }),
        catchError(this.apiErrorHandler.handleApiError)
      );
  }

  // This function fetches all the threads with the given tag from the backend
  findByTags(
    tag: string,
    pageable: { page: number; size: number }
  ): Observable<PageWrapper<ThreadDto>> {
    // Page related data
    const page = pageable.page.toString();
    const size = pageable.size.toString();

    // Creating the url
    let url = FETCH_ALL_THREADS_BY_TAG;
    url = url.replace(':tag', tag);
    url = url.replace(':page', page);
    url = url.replace(':size', size);

    // Calling the API
    return this.http
      .get<ResponseWrapper<PageWrapper<ThreadDto>>>(url, this.getHeaders())
      .pipe(
        map((response) => {
          response.data.content = response.data.content.map((thread) =>
            this.updateLikedByCurrentUser(thread)
          );

          return response.data;
        }),
        catchError(this.apiErrorHandler.handleApiError)
      );
  }

  // This function fetches the current user thread post history
  fetchThreadHistory(): Observable<ThreadHistoryResponse> {
    return this.http
      .get<ResponseWrapper<ThreadHistoryResponse>>(
        FETCH_CURRENT_USER_THREADS_ENDPOINT,
        this.getHeaders()
      )
      .pipe(
        map((response) => {
          response.data.threadList = response.data.threadList.map((thread) =>
            this.updateLikedByCurrentUser(thread)
          );

          return response.data;
        }),
        catchError(this.apiErrorHandler.handleApiError)
      );
  }

  // This function toggles the like status for the given thread
  toggleThreadLike(threadId: string): Observable<void> {
    return this.http
      .post<ResponseWrapper<void>>(
        TOGGLE_LIKE_ENDPOINTS.replace(':id', threadId),
        null,
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
      .delete<ResponseWrapper<void>>(
        DELETE_THREAD_BY_ID_ENDPOINT.replace(':id', id),
        this.getHeaders()
      )
      .pipe(
        map((response) => response.data),
        catchError(this.apiErrorHandler.handleApiError)
      );
  }
}
