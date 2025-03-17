import { UserDto } from '../user/UserDto';

class ThreadHistoryItem {
  constructor(readonly id: string, readonly description: string) {}
}

export class ThreadHistoryResponse {
  constructor(
    readonly createdBy: UserDto,
    readonly threadList: ThreadHistoryItem[]
  ) {}
}
