import { UserDto } from '../user/UserDto';

export interface CommentDto {
  id: string;
  content: string;
  createdBy: UserDto;
}
