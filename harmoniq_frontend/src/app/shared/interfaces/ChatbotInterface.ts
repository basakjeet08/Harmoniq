import { Observable } from 'rxjs';

export interface ChatbotInterface {
  generateResponse(prompt: string): Observable<string>;
}
