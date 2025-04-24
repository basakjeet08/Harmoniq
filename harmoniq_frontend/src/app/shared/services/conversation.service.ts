import {
  CREATE_CONVERSATION_ENDPOINT,
  DELETE_CONVERSATION_ENDPOINT,
  FETCH_CONVERSATION_HISTORY,
  FETCH_USER_CONVERSATIONS,
} from '../constants/url-constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiErrorHandlerService } from './api-error-handler.service';
import { ProfileService } from './profile.service';
import { ConversationInterface } from '../interfaces/ConversationInterface';
import { catchError, map, Observable } from 'rxjs';
import { ConversationDto } from '../Models/conversation/ConversationDto';
import { ResponseWrapper } from '../Models/common/ResponseWrapper';
import { PageWrapper } from '../Models/common/PageWrapper';
import { ChatMessageDto } from '../Models/conversation/ChatMessageDto';

@Injectable({ providedIn: 'root' })
export class ConversationService implements ConversationInterface {
  // Storing the urls
  private token: string;

  // Injecting the necessary dependencies
  constructor(
    private http: HttpClient,
    private apiErrorHandler: ApiErrorHandlerService,
    profileService: ProfileService,
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
      .post<
        ResponseWrapper<ConversationDto>
      >(CREATE_CONVERSATION_ENDPOINT, conversationRequest, this.getHeaders())
      .pipe(
        map((response) => response.data),
        catchError(this.apiErrorHandler.handleApiError),
      );
  }

  // This function fetches all the conversations for a certain user
  findAllUserConversation(pageable: {
    page: number;
    size: number;
  }): Observable<PageWrapper<ConversationDto>> {
    let url: string = FETCH_USER_CONVERSATIONS;
    url = url.replace(':page', pageable.page.toString());
    url = url.replace(':size', pageable.size.toString());

    return this.http
      .get<ResponseWrapper<PageWrapper<ConversationDto>>>(url, this.getHeaders())
      .pipe(
        map((response) => response.data),
        catchError(this.apiErrorHandler.handleApiError),
      );
  }

  // This function fetches the conversation history from the backend
  findConversationHistory(
    id: string,
    pageable: { page: number; size: number },
  ): Observable<PageWrapper<ChatMessageDto>> {
    let url: string = FETCH_CONVERSATION_HISTORY;
    url = url.replace(':id', id);
    url = url.replace(':page', pageable.page.toString());
    url = url.replace(':size', pageable.size.toString());

    return this.http.get<ResponseWrapper<PageWrapper<ChatMessageDto>>>(url, this.getHeaders()).pipe(
      map((response) => response.data),
      catchError(this.apiErrorHandler.handleApiError),
    );
  }

  // This function deletes the given conversation from the database
  deleteById(id: string): Observable<void> {
    const url: string = DELETE_CONVERSATION_ENDPOINT.replace(':id', id);

    return this.http.delete<ResponseWrapper<void>>(url, this.getHeaders()).pipe(
      map((response) => response.data),
      catchError(this.apiErrorHandler.handleApiError),
    );
  }
}
