import { UserDto } from '../user/UserDto';

export class ConversationDto {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly createdBy: UserDto
  ) {}
}
