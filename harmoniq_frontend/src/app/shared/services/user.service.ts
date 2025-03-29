import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiErrorHandlerService } from './api-error-handler.service';
import { ProfileService } from './profile.service';
import { UserInterface } from '../interfaces/UserInterface';
import { catchError, map, Observable } from 'rxjs';
import { ResponseWrapper } from '../Models/common/ResponseWrapper';
import { USER_AVATAR_FETCH_ALL_ENDPOINT } from '../constants/url-constants';

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
}
