import { Injectable } from '@angular/core';
import { AuthInterface } from '../interfaces/AuthInterface';
import { catchError, map, Observable, tap } from 'rxjs';
import { AuthResponse } from '../Models/auth/AuthResponse';
import { HttpClient } from '@angular/common/http';
import { ApiErrorHandlerService } from './api-error-handler.service';
import { ResponseWrapper } from '../Models/common/ResponseWrapper';
import {
  LOGIN_AS_GUEST,
  LOGIN_ENDPOINT,
  REGISTER_ENDPOINT,
} from '../constants/url-constants';
import { ProfileService } from './profile.service';

@Injectable({ providedIn: 'root' })
export class AuthService implements AuthInterface {
  // Injecting the necessary dependencies
  constructor(
    private http: HttpClient,
    private apiErrorHandler: ApiErrorHandlerService,
    private profileService: ProfileService
  ) {}

  // This function registers the user as a member
  registerMember(user: {
    email: string;
    password: string;
  }): Observable<AuthResponse> {
    return this.http
      .post<ResponseWrapper<AuthResponse>>(REGISTER_ENDPOINT, user)
      .pipe(
        map((response) => response.data),
        catchError(this.apiErrorHandler.handleApiError)
      );
  }

  // This function sends a login request for the user
  login(user: { email: string; password: string }): Observable<AuthResponse> {
    return this.http
      .post<ResponseWrapper<AuthResponse>>(LOGIN_ENDPOINT, user)
      .pipe(
        map((response) => response.data),
        tap((user: AuthResponse) => this.profileService.setUserInLocal(user)),
        catchError(this.apiErrorHandler.handleApiError)
      );
  }

  // This function sends a login request for the user as a guest
  loginAsGuest(): Observable<AuthResponse> {
    return this.http
      .post<ResponseWrapper<AuthResponse>>(LOGIN_AS_GUEST, null)
      .pipe(
        map((response) => response.data),
        tap((user: AuthResponse) => this.profileService.setUserInLocal(user)),
        catchError(this.apiErrorHandler.handleApiError)
      );
  }
}
