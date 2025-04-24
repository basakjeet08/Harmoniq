import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiErrorHandlerService } from './api-error-handler.service';
import { ThreadInterface } from '../interfaces/ThreadInterface';
import { catchError, map, Observable } from 'rxjs';
import { ThreadDetailResponse } from '../Models/thread/ThreadDetailResponse';
import { ThreadDto } from '../Models/thread/ThreadDto';
import { ThreadHistoryItem, ThreadHistoryResponse } from '../Models/thread/ThreadHistoryResponse';
import { ResponseWrapper } from '../Models/common/ResponseWrapper';
import {
  CREATE_THREAD_ENDPOINT,
  DELETE_THREAD_BY_ID_ENDPOINT,
  FETCH_CURRENT_USER_THREADS_ENDPOINT,
  FETCH_THREAD_BY_ID_ENDPOINT,
  FETCH_THREAD_TYPE_PERSONALISED_ENDPOINT,
  FETCH_THREAD_TYPE_POPULAR_ENDPOINT,
  FETCH_THREAD_TYPE_TAG_ENDPOINT,
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
    profileService: ProfileService,
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

  // This function updates the thread if it's liked by current user
  private updateLikedByCurrentUser<T extends ThreadDto | ThreadDetailResponse | ThreadHistoryItem>(
    threadDto: T,
  ): T {
    return {
      ...threadDto,
      isLikedByCurrentUser: threadDto.likedByUserIds.includes(this.user.id!),
    };
  }

  // This function sends a POST Request to create a thread
  create(thread: { description: string }): Observable<ThreadDto> {
    return this.http
      .post<ResponseWrapper<ThreadDto>>(CREATE_THREAD_ENDPOINT, thread, this.getHeaders())
      .pipe(
        map((response) => response.data),
        catchError(this.apiErrorHandler.handleApiError),
      );
  }

  // This function fetches the single thread Data from the backend
  findById(id: string): Observable<ThreadDetailResponse> {
    const url: string = FETCH_THREAD_BY_ID_ENDPOINT.replace(':id', id);

    return this.http.get<ResponseWrapper<ThreadDetailResponse>>(url, this.getHeaders()).pipe(
      map((response) => this.updateLikedByCurrentUser(response.data)),
      catchError(this.apiErrorHandler.handleApiError),
    );
  }

  // This function calls the fetch thread api endpoints and return the data accordingly
  private resolveThreadListApiCall(url: string): Observable<PageWrapper<ThreadDto>> {
    return this.http.get<ResponseWrapper<PageWrapper<ThreadDto>>>(url, this.getHeaders()).pipe(
      map((response) => {
        response.data.content = response.data.content.map((thread) =>
          this.updateLikedByCurrentUser(thread),
        );

        return response.data;
      }),
    );
  }

  // This function builds the url for fetching the threads according to the relevant tags
  findThreadsByTag(
    tag: string,
    pageable: { page: number; size: number },
  ): Observable<PageWrapper<ThreadDto>> {
    const page: string = pageable.page.toString();
    const size: string = pageable.size.toString();

    let url: string = FETCH_THREAD_TYPE_TAG_ENDPOINT;
    url = url.replace(':tagName', tag);
    url = url.replace(':page', page);
    url = url.replace(':size', size);

    return this.resolveThreadListApiCall(url);
  }

  // This function builds the url for fetching the personalised threads of user
  findPersonalisedThreads(pageable: {
    page: number;
    size: number;
  }): Observable<PageWrapper<ThreadDto>> {
    const page: string = pageable.page.toString();
    const size: string = pageable.size.toString();

    let url: string = FETCH_THREAD_TYPE_PERSONALISED_ENDPOINT;
    url = url.replace(':page', page);
    url = url.replace(':size', size);

    return this.resolveThreadListApiCall(url);
  }

  // This function builds the url for fetching the exploratory threads
  findPopularThreads(pageable: { page: number; size: number }): Observable<PageWrapper<ThreadDto>> {
    const page: string = pageable.page.toString();
    const size: string = pageable.size.toString();

    let url: string = FETCH_THREAD_TYPE_POPULAR_ENDPOINT;
    url = url.replace(':page', page);
    url = url.replace(':size', size);

    return this.resolveThreadListApiCall(url);
  }

  // This function fetches the current user thread post history
  fetchThreadHistory(): Observable<ThreadHistoryResponse> {
    return this.http
      .get<
        ResponseWrapper<ThreadHistoryResponse>
      >(FETCH_CURRENT_USER_THREADS_ENDPOINT, this.getHeaders())
      .pipe(
        map((response) => {
          response.data.threadList = response.data.threadList.map((thread) =>
            this.updateLikedByCurrentUser(thread),
          );

          return response.data;
        }),
        catchError(this.apiErrorHandler.handleApiError),
      );
  }

  // This function toggles the like status for the given thread
  toggleThreadLike(threadId: string): Observable<void> {
    const url: string = TOGGLE_LIKE_ENDPOINTS.replace(':id', threadId);

    return this.http.post<ResponseWrapper<void>>(url, null, this.getHeaders()).pipe(
      map((response) => response.data),
      catchError(this.apiErrorHandler.handleApiError),
    );
  }

  // This function deletes the given thread
  deleteById(id: string): Observable<void> {
    const url: string = DELETE_THREAD_BY_ID_ENDPOINT.replace(':id', id);

    return this.http.delete<ResponseWrapper<void>>(url, this.getHeaders()).pipe(
      map((response) => response.data),
      catchError(this.apiErrorHandler.handleApiError),
    );
  }
}
