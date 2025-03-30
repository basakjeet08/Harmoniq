import { Roles } from './Roles';

export interface UserDto {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  role?: Roles;
  avatar?: string;
}
