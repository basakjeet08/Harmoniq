import { Roles } from '../user/Roles';

export interface AuthResponse {
  id: string;
  name: string;
  email: string;
  role: Roles;
  avatar: string;

  token: string;
  refreshToken: string;
}
