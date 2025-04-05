import { Observable } from 'rxjs';
import { AuthResponse } from '../Models/auth/AuthResponse';
import { UserDto } from '../Models/user/UserDto';

export interface AuthInterface {
  registerMember(user: UserDto): Observable<AuthResponse>;

  login(user: UserDto): Observable<AuthResponse>;

  loginAsGuest(): Observable<AuthResponse>;
}
