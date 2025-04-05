import { UserDto } from '../user/UserDto';
import { ChatMessageDto } from './ChatMessageDto';

export interface ConversationHistoryDto {
  id: string;
  title: string;
  chatMessageList: ChatMessageDto[];
  userDto: UserDto;
  chatBotImage: string;
}
