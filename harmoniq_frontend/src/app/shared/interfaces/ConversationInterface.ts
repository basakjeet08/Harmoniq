import { Observable } from 'rxjs';
import { ConversationDto } from '../Models/conversation/ConversationDto';
import { ConversationHistoryDto } from '../Models/conversation/ConversationHistoryDto';
import { PageWrapper } from '../Models/common/PageWrapper';

export interface ConversationInterface {
  create(conversationRequest: { title: string }): Observable<ConversationDto>;

  findAllUserConversation(pageable: {
    page: number;
    size: number;
  }): Observable<PageWrapper<ConversationDto>>;

  findConversationHistory(id: string): Observable<ConversationHistoryDto>;

  deleteById(id: string): Observable<void>;
}
