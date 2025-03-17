import { Observable } from 'rxjs';
import { AuthResponse } from '../Models/auth/AuthResponse';

export interface AuthInterface {
  getUser(): AuthResponse | undefined;

  getUserFromLocal(): AuthResponse | undefined;

  getUserSubject(): Observable<AuthResponse | undefined>;

  setUserInLocal(user: AuthResponse): void;

  registerMember(user: { email: string; password: string }): Observable<AuthResponse>;

  login(user: { email: string; password: string }): Observable<AuthResponse>;

  loginAsGuest(): Observable<AuthResponse>;

  logout(): void;
}
