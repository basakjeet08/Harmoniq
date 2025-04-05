import { UserDto } from '../user/UserDto';

export class ThreadHistoryItem {
  constructor(
    readonly id: string,
    readonly description: string,
    readonly tags: string[],
    readonly totalLikes: number,
    readonly totalComments: number
  ) {}
}

export class ThreadHistoryResponse {
  constructor(
    readonly createdBy: UserDto,
    readonly threadList: ThreadHistoryItem[]
  ) {}
}
