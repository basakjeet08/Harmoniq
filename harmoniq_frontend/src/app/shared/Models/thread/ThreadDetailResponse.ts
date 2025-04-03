import { CommentDto } from '../comment/CommentDto';
import { UserDto } from '../user/UserDto';

export class ThreadDetailResponse {
  constructor(
    readonly id: string,
    readonly description: string,
    readonly tags: string[],
    readonly createdBy: UserDto,
    readonly comments: CommentDto[]
  ) {}
}
