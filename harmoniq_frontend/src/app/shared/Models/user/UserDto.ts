import { Roles } from './Roles';

export class UserDto {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    readonly role: Roles
  ) {}
}
