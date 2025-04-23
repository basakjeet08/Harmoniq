import { Injectable } from '@angular/core';
import { AuthResponse } from '../Models/auth/AuthResponse';
import { Observable, Subject } from 'rxjs';
import { ProfileInterface } from '../interfaces/ProfileInterface';

@Injectable({ providedIn: 'root' })
export class ProfileService implements ProfileInterface {
  // local storage tokens
  private USER_DATA_TOKEN: string = 'USER_DATA';

  // User Subject which will transfer state data to all the required places
  private user: AuthResponse | undefined = undefined;
  private userSubject: Subject<AuthResponse | undefined> = new Subject<AuthResponse | undefined>();

  constructor() {
    this.user = this.getUserFromLocal();
    this.userSubject.next(this.user);
  }

  // This function returns the current user data
  getUser(): AuthResponse | undefined {
    return this.user ? { ...this.user } : undefined;
  }

  // This function returns the current User Observable
  getUserSubject(): Observable<AuthResponse | undefined> {
    return this.userSubject.asObservable();
  }

  // This function returns the current stored user in the local storage
  getUserFromLocal(): AuthResponse | undefined {
    const data: string | null = localStorage.getItem(this.USER_DATA_TOKEN);
    return data ? JSON.parse(data) : undefined;
  }

  // This function stores the user data to the local storage
  setUserInLocal(user: AuthResponse): void {
    this.user = user;
    this.userSubject.next(this.getUser());

    localStorage.setItem(this.USER_DATA_TOKEN, JSON.stringify(user));
  }

  // This function logs out the user
  logout(): void {
    this.user = undefined;
    this.userSubject.next(undefined);
    localStorage.removeItem(this.USER_DATA_TOKEN);
  }
}
