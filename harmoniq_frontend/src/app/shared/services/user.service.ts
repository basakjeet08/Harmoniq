import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiErrorHandlerService } from './api-error-handler.service';
import { ProfileService } from './profile.service';
import { UserInterface } from '../interfaces/UserInterface';
import { catchError, map, Observable } from 'rxjs';
import { ResponseWrapper } from '../Models/common/ResponseWrapper';
import {
  DELETE_USER_ENDPOINT,
  FETCH_USER_BY_ID_ENDPOINT,
  UPDATE_USER_ENDPOINT,
  USER_AVATAR_FETCH_ALL_ENDPOINT,
} from '../constants/url-constants';
import { UserDto } from '../Models/user/UserDto';

@Injectable({ providedIn: 'root' })
export class UserService implements UserInterface {
  // Storing the urls
  private token: string;

  constructor(
    private http: HttpClient,
    private apiErrorHandler: ApiErrorHandlerService,
    profileService: ProfileService
  ) {
    // Storing the token in the variable
    this.token = profileService.getUser()?.token || 'Invalid Token';

    // Subscribing to the user changes
    profileService.getUserSubject().subscribe({
      next: (user) => (this.token = user?.token || 'Invalid Token'),
    });
  }

  // This function creates the headers required
  private getHeaders() {
    return {
      headers: new HttpHeaders({ Authorization: `Bearer ${this.token}` }),
    };
  }

  // This function fetches all the avatars available from the backend
  fetchAllAvatars(): Observable<string[]> {
    return this.http
      .get<ResponseWrapper<string[]>>(USER_AVATAR_FETCH_ALL_ENDPOINT)
      .pipe(
        map((response) => response.data),
        catchError(this.apiErrorHandler.handleApiError)
      );
  }

  // This function fetches the user data with the given id
  findUserById(id: string): Observable<UserDto> {
    return this.http
      .get<ResponseWrapper<UserDto>>(
        FETCH_USER_BY_ID_ENDPOINT.replace(':id', id)
      )
      .pipe(
        map((response) => response.data),
        catchError(this.apiErrorHandler.handleApiError)
      );
  }

  // This function updates the user details
  updateUser(user: UserDto): Observable<UserDto> {
    return this.http
      .patch<ResponseWrapper<UserDto>>(
        UPDATE_USER_ENDPOINT,
        user,
        this.getHeaders()
      )
      .pipe(
        map((response) => response.data),
        catchError(this.apiErrorHandler.handleApiError)
      );
  }

  // This function deletes the user from the database
  deleteUser(): Observable<void> {
    return this.http
      .delete<ResponseWrapper<void>>(DELETE_USER_ENDPOINT, this.getHeaders())
      .pipe(
        map((response) => response.data),
        catchError(this.apiErrorHandler.handleApiError)
      );
  }
}
