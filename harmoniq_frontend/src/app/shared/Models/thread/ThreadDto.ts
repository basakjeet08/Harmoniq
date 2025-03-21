import { UserDto } from '../user/UserDto';

export class ThreadDto {
  constructor(
    readonly id: string,
    readonly description: string,
    readonly createdBy: UserDto
  ) {}
}
