import { Observable } from 'rxjs';

export interface ChatbotInterface {
  generateResponse(prompt: string, conversationId: string): Observable<string>;
}
