import { Observable } from 'rxjs';
import { ConversationDto } from '../Models/conversation/ConversationDto';
import { PageWrapper } from '../Models/common/PageWrapper';
import { ChatMessageDto } from '../Models/conversation/ChatMessageDto';

export interface ConversationInterface {
  create(conversationRequest: { title: string }): Observable<ConversationDto>;

  findAllUserConversation(pageable: {
    page: number;
    size: number;
  }): Observable<PageWrapper<ConversationDto>>;

  findConversationHistory(
    id: string,
    pageable: { page: number; size: number },
  ): Observable<PageWrapper<ChatMessageDto>>;

  deleteById(id: string): Observable<void>;
}
