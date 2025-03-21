import { UserDto } from '../user/UserDto';

export class CommentDto {
  constructor(
    readonly id: string,
    readonly content: string,
    readonly createdBy: UserDto
  ) {}
}
