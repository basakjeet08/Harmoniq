import {
  CREATE_CONVERSATION_ENDPOINT,
  DELETE_CONVERSATION_ENDPOINT,
  FETCH_CONVERSATION_HISTORY,
  FETCH_USER_CONVERSATIONS,
} from './../constants/url-constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiErrorHandlerService } from './api-error-handler.service';
import { ProfileService } from './profile.service';
import { ConversationInterface } from '../interfaces/ConversationInterface';
import { catchError, map, Observable } from 'rxjs';
import { ConversationDto } from '../Models/conversation/ConversationDto';
import { ResponseWrapper } from '../Models/common/ResponseWrapper';
import { ConversationHistoryDto } from '../Models/conversation/ConversationHistoryDto';
import { PageWrapper } from '../Models/common/PageWrapper';

@Injectable({ providedIn: 'root' })
export class ConversationService implements ConversationInterface {
  // Storing the urls
  private token: string;

  // Injecting the necessary dependencies
  constructor(
    private http: HttpClient,
    private apiErrorHandler: ApiErrorHandlerService,
    profileService: ProfileService
  ) {
    // Storing the token in the variable
    this.token = profileService.getUser()?.token || 'Invalid Token';

    // Subscribing to the user changes
    profileService.getUserSubject().subscribe({
      next: (user) => (this.token = user?.token || 'Invalid Token'),
    });
  }

  // This function creates the headers required
  private getHeaders() {
    return {
      headers: new HttpHeaders({ Authorization: `Bearer ${this.token}` }),
    };
  }

  // This function creates a new Conversation window
  create(conversationRequest: { title: string }): Observable<ConversationDto> {
    return this.http
      .post<ResponseWrapper<ConversationDto>>(
        CREATE_CONVERSATION_ENDPOINT,
        conversationRequest,
        this.getHeaders()
      )
      .pipe(
        map((response) => response.data),
        catchError(this.apiErrorHandler.handleApiError)
      );
  }

  // This function fetches all the conversations for a certain user
  findAllUserConversation(pageable: {
    page: number;
    size: number;
  }): Observable<PageWrapper<ConversationDto>> {
    // Page Data
    const pageString = pageable.page.toString();
    const pageSize = pageable.size.toString();

    return this.http
      .get<ResponseWrapper<PageWrapper<ConversationDto>>>(
        FETCH_USER_CONVERSATIONS.replace(':page', pageString).replace(
          ':size',
          pageSize
        ),
        this.getHeaders()
      )
      .pipe(
        map((response) => response.data),
        catchError(this.apiErrorHandler.handleApiError)
      );
  }

  // This function fetches the conversation history from the backend
  findConversationHistory(id: string): Observable<ConversationHistoryDto> {
    return this.http
      .get<ResponseWrapper<ConversationHistoryDto>>(
        FETCH_CONVERSATION_HISTORY.replace(':id', id),
        this.getHeaders()
      )
      .pipe(
        map((response) => response.data),
        catchError(this.apiErrorHandler.handleApiError)
      );
  }

  // This function deletes the given conversation from the database
  deleteById(id: string): Observable<void> {
    return this.http
      .delete<ResponseWrapper<void>>(
        DELETE_CONVERSATION_ENDPOINT.replace(':id', id),
        this.getHeaders()
      )
      .pipe(
        map((response) => response.data),
        catchError(this.apiErrorHandler.handleApiError)
      );
  }
}
