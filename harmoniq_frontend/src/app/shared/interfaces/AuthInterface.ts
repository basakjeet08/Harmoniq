import { Observable } from 'rxjs';
import { User } from '../Models/User';

export interface AuthInterface {
  getUser(): User | undefined;

  getUserFromLocal(): User | undefined;

  getUserSubject(): Observable<User | undefined>;

  setUserInLocal(user: User): void;

  registerMember(user: { email: string; password: string }): Observable<User>;

  login(user: { email: string; password: string }): Observable<User>;

  logout(): void;
}
