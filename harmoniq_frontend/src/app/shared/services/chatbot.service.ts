import { ApiErrorHandlerService } from './api-error-handler.service';
import { Injectable } from '@angular/core';
import { ProfileService } from './profile.service';
import { BASE_URL } from '../constants/url-constants';
import { ChatbotInterface } from '../interfaces/ChatbotInterface';
import { catchError, Observable } from 'rxjs';
import { ResponseWrapper } from '../Models/common/ResponseWrapper';

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
          let buffer: string = '';

          // This function creates json objects from the buffer
          const extractJsonObjects = () => {
            let jsonObjects: ResponseWrapper<string>[] = [];
            let startIndex = buffer.indexOf('{');
            let endIndex = buffer.indexOf('}');

            while (startIndex !== -1 && endIndex !== -1) {
              try {
                let jsonString = buffer.substring(startIndex, endIndex + 1);
                let jsonData = JSON.parse(
                  jsonString
                ) as ResponseWrapper<string>;
                jsonObjects.push(jsonData);

                buffer = buffer.substring(endIndex + 1);
              } catch (error) {
                console.log(error);
                break;
              }

              return jsonObjects;
            }

            return [];
          };

          // Reading and processing the first received stream data
          reader?.read().then(function process({ done, value }) {
            if (done) {
              observer.complete();
              return;
            }

            // Decoding the chunks and then removing the unnecessary prefixes them
            buffer += decoder.decode(value, { stream: true });
            const jsonObjects = extractJsonObjects();
            jsonObjects.forEach((jsonData) => observer.next(jsonData.data));

            // Reading the next chunk
            reader.read().then(process);
          });
        })
        .catch((error: Error) => observer.error(error));
    }).pipe(catchError(this.apiErrorHandlerService.handleApiError));
  }
}
