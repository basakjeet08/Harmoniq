import { Injectable } from '@angular/core';
import { AuthInterface } from '../interfaces/AuthInterface';
import { catchError, map, Observable, Subject, tap } from 'rxjs';
import { User } from '../Models/User';
import { HttpClient } from '@angular/common/http';
import { ApiErrorHandlerService } from './api-error-handler.service';
import { ResponseWrapper } from '../Models/ResponseWrapper';

@Injectable({ providedIn: 'root' })
export class AuthService implements AuthInterface {
  // Api URL and local storage tokens
  private URL = 'http://localhost:8080';
  private USER_DATA_TOKEN = 'USER_DATA';

  // User Subject which will transfer state data to all the required places
  private user: User | undefined = undefined;
  private userSubject = new Subject<User | undefined>();

  // Injecting the necessary dependencies
  constructor(
    private http: HttpClient,
    private apiErrorHandler: ApiErrorHandlerService
  ) {
    this.user = this.getUserFromLocal();
    this.userSubject.next(this.user);
  }

  // This function returns the current user data
  getUser(): User | undefined {
    return this.user ? { ...this.user } : undefined;
  }

  // This function returns the current User Observable
  getUserSubject(): Observable<User | undefined> {
    return this.userSubject.asObservable();
  }

  // This function returns the current stored user in the local storage
  getUserFromLocal(): User | undefined {
    const data = localStorage.getItem(this.USER_DATA_TOKEN);
    return data ? JSON.parse(data) : undefined;
  }

  // This function stores the user data to the local storage
  setUserInLocal(user: User): void {
    this.user = user;
    this.userSubject.next(this.getUser());

    localStorage.setItem(this.USER_DATA_TOKEN, JSON.stringify(user));
  }

  // This function registers the user as a member
  registerMember(user: { email: string; password: string }): Observable<User> {
    return this.http
      .post<ResponseWrapper<User>>(`${this.URL}/register/member`, user)
      .pipe(
        map((response) => response.data),
        catchError(this.apiErrorHandler.handleApiError)
      );
  }

  // This function sends a login request for the user
  login(user: { email: string; password: string }): Observable<User> {
    return this.http
      .post<ResponseWrapper<User>>(`${this.URL}/login`, user)
      .pipe(
        map((response) => response.data),
        tap((user: User) => this.setUserInLocal(user)),
        catchError(this.apiErrorHandler.handleApiError)
      );
  }

  // This function logs out the user
  logout(): void {
    this.user = undefined;
    this.userSubject.next(undefined);
    localStorage.removeItem(this.USER_DATA_TOKEN);
  }
}
