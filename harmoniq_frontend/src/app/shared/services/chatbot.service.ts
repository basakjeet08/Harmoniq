import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiErrorHandlerService } from './api-error-handler.service';
import { ProfileService } from './profile.service';
import { catchError, Observable } from 'rxjs';
import { BASE_URL } from '../constants/url-constants';
import { ChatbotInterface } from '../interfaces/ChatbotInterface';

@Injectable({ providedIn: 'root' })
export class ChatbotService implements ChatbotInterface {
  // Storing the urls
  private token: string;

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

  // This function calls the api to generate a api response
  generateResponse(prompt: string): Observable<string> {
    return this.http
      .post<string>(`${BASE_URL}/chatbot`, { prompt }, this.getHeaders())
      .pipe(catchError(this.apiErrorHandler.handleApiError));
  }
}
