import { Observable } from 'rxjs';
import { ConversationDto } from '../Models/conversation/ConversationDto';
import { ConversationHistoryDto } from '../Models/conversation/ConversationHistoryDto';

export interface ConversationInterface {
  create(conversationRequest: { title: string }): Observable<ConversationDto>;

  findAllUserConversation(): Observable<ConversationDto[]>;

  findConversationHistory(id: string): Observable<ConversationHistoryDto>;

  deleteById(id: string): Observable<void>;
}
