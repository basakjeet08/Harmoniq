import { Observable } from 'rxjs';
import { UserDto } from '../Models/user/UserDto';

export interface UserInterface {
  fetchAllAvatars(): Observable<string[]>;

  findUserById(id: string): Observable<UserDto>;

  updateUser(user: UserDto): Observable<UserDto>;

  deleteUser(): Observable<void>;
}
