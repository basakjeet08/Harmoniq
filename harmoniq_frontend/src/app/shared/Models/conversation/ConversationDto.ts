import { UserDto } from '../user/UserDto';

export interface ConversationDto {
  id: string;
  title: string;
  createdBy: UserDto;
}
