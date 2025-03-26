import { ChatMessageDto } from './ChatMessageDto';

export class ConversationHistoryDto {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly chatMessageList: ChatMessageDto[]
  ) {}
}
