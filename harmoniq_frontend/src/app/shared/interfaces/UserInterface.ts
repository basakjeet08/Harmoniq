import { Observable } from 'rxjs';

export interface UserInterface {
  fetchAllAvatars(): Observable<string[]>;
}
