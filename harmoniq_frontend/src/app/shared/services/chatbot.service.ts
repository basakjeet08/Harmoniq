import { ApiErrorHandlerService } from './api-error-handler.service';
import { Injectable } from '@angular/core';
import { ProfileService } from './profile.service';
import { SEND_MESSAGE } from '../constants/url-constants';
import { ChatbotInterface } from '../interfaces/ChatbotInterface';
import { catchError, Observable } from 'rxjs';
import { ResponseWrapper } from '../Models/common/ResponseWrapper';

@Injectable({ providedIn: 'root' })
export class ChatbotService implements ChatbotInterface {
  // Storing the urls
  private token: string;

  // Injecting the necessary dependencies
  constructor(
    profileService: ProfileService,
    private apiErrorHandlerService: ApiErrorHandlerService,
  ) {
    // Storing the token in the variable
    this.token = profileService.getUser()?.token || 'Invalid Token';

    // Subscribing to the user changes
    profileService.getUserSubject().subscribe({
      next: (user) => (this.token = user?.token || 'Invalid Token'),
    });
  }

  // This function calls the api to generate a chatbot response
  generateResponse(prompt: string, conversationId: string): Observable<string> {
    return new Observable<string>((observer) => {
      fetch(SEND_MESSAGE.replace(':id', conversationId), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify({ prompt }),
      })
        .then(async (response) => {
          if (!response.ok) {
            throw new Error("Can't Generate right now. Please retry again !!");
          }

          return response.body?.getReader();
        })
        .then((reader) => {
          // Getting the Stream Reader and text decoder
          const decoder = new TextDecoder();
          let buffer: string = '';

          // This function creates json objects from the buffer
          const extractJsonObjects = () => {
            // Json Object storage to store Objects from the buffer
            let jsonObjects: ResponseWrapper<string>[] = [];
            let startIndex: number = buffer.indexOf('{');
            let endIndex: number = buffer.indexOf('}');

            // Converting the objects from the string to objects until the buffer has no object left
            while (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
              try {
                // Getting the JSON String for the object
                let jsonString: string = buffer.substring(startIndex, endIndex + 1);

                // Converting the JSON String to object and pushing it to the array
                let jsonData = JSON.parse(jsonString) as ResponseWrapper<string>;
                jsonObjects.push(jsonData);

                // Updating the buffer and removing the processed string
                buffer = buffer.substring(endIndex + 1);

                // Search for the next JSON object in the buffer
                startIndex = buffer.indexOf('{');
                endIndex = buffer.indexOf('}');
              } catch (error) {
                console.log(error);
                break;
              }
            }

            return jsonObjects;
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
            jsonObjects.forEach((jsonData): void => observer.next(jsonData.data));

            // Reading the next chunk
            reader.read().then(process);
          });
        })
        .catch((error: Error) => observer.error(error));
    }).pipe(catchError(this.apiErrorHandlerService.handleApiError));
  }
}
