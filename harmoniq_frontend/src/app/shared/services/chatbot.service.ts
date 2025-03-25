import { ApiErrorHandlerService } from './api-error-handler.service';
import { Injectable } from '@angular/core';
import { ProfileService } from './profile.service';
import { BASE_URL } from '../constants/url-constants';
import { ChatbotInterface } from '../interfaces/ChatbotInterface';
import { catchError, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatbotService implements ChatbotInterface {
  // Storing the urls
  private token: string;

  // Injectiong the necessary dependencies
  constructor(
    profileService: ProfileService,
    private apiErrorHandlerService: ApiErrorHandlerService
  ) {
    // Storing the token in the variable
    this.token = profileService.getUser()?.token || 'Invalid Token';

    // Subscribing to the user changes
    profileService.getUserSubject().subscribe({
      next: (user) => (this.token = user?.token || 'Invalid Token'),
    });
  }

  // This function calls the api to generate a chatbot response
  generateResponse(prompt: string): Observable<string> {
    return new Observable<string>((observer) => {
      fetch(`${BASE_URL}/chatbot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify({ prompt }),
      })
        .then((response) => {
          // Getting the Stream Reader and text decoder
          const reader = response.body?.getReader();
          const decoder = new TextDecoder();

          // Reading and processing the first received stream data
          reader?.read().then(function process({ done, value }) {
            if (done) {
              observer.complete();
              return;
            }

            // Decoding the chunks and then removing the unnecessary prefixes them
            const chunk = decoder.decode(value, { stream: true });
            const eventData = chunk
              .split('\n')
              .find((line) => line.startsWith('data:'));

            // Streaming the next data for the component layer
            if (eventData) {
              const jsonData = eventData.replace('data:', '').trim();
              observer.next(jsonData);
            }

            // Reading the next chunk
            reader.read().then(process);
          });
        })
        .catch((error: Error) => observer.error(error));
    }).pipe(catchError(this.apiErrorHandlerService.handleApiError));
  }
}
