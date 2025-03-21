import { Observable } from 'rxjs';
import { AuthResponse } from '../Models/auth/AuthResponse';

export interface AuthInterface {
  registerMember(user: {
    email: string;
    password: string;
  }): Observable<AuthResponse>;

  login(user: { email: string; password: string }): Observable<AuthResponse>;

  loginAsGuest(): Observable<AuthResponse>;
}
