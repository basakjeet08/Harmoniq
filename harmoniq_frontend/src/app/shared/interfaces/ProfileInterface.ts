import { Observable } from 'rxjs';
import { AuthResponse } from '../Models/auth/AuthResponse';

export interface ProfileInterface {
  getUser(): AuthResponse | undefined;

  getUserFromLocal(): AuthResponse | undefined;

  getUserSubject(): Observable<AuthResponse | undefined>;

  setUserInLocal(user: AuthResponse): void;

  logout(): void;
}
