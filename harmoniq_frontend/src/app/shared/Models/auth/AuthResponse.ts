import { Roles } from "../user/Roles";

export class AuthResponse {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    readonly role: Roles,

    readonly token: string,
    readonly refreshToken: string
  ) {}
}
