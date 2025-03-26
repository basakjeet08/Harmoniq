import { Observable } from 'rxjs';
import { ConversationDto } from '../Models/conversation/ConversationDto';

export interface ConversationInterface {
  create(conversationRequest: { title: string }): Observable<ConversationDto>;

  findAllUserConversation(): Observable<ConversationDto[]>;
}
