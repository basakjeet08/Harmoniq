import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiErrorHandlerService } from './api-error-handler.service';
import { AuthService } from './auth.service';
import { CommentInterface } from '../interfaces/CommentInterface';
import { catchError, map, Observable } from 'rxjs';
import { CommentDto } from '../Models/comment/CommentDto';
import { ResponseWrapper } from '../Models/common/ResponseWrapper';
import { CREATE_COMMENT_ENDPOINT } from '../constants/url-constants';

@Injectable({ providedIn: 'root' })
export class CommentService implements CommentInterface {
  // Storing the urls
  private token: string;

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

  // This calls the api to create a comment
  create(commentRequest: {
    comment: string;
    threadId: string;
  }): Observable<CommentDto> {
    return this.http
      .post<ResponseWrapper<CommentDto>>(
        CREATE_COMMENT_ENDPOINT.replace(':threadId', commentRequest.threadId),
        commentRequest,
        this.getHeaders()
      )
      .pipe(
        map((response) => response.data),
        catchError(this.apiErrorHandler.handleApiError)
      );
  }
}
