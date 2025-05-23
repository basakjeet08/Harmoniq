import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiErrorHandlerService } from './api-error-handler.service';
import { ProfileService } from './profile.service';
import { TagInterface } from '../interfaces/TagInterface';
import { catchError, map, Observable } from 'rxjs';
import { TagDto } from '../Models/tag/TagDto';
import { FETCH_ALL_TAGS_ENDPOINT } from '../constants/url-constants';
import { ResponseWrapper } from '../Models/common/ResponseWrapper';

@Injectable({ providedIn: 'root' })
export class TagService implements TagInterface {
  // Storing the urls
  private token: string;

  // Injecting the necessary dependencies
  constructor(
    private http: HttpClient,
    private apiErrorHandler: ApiErrorHandlerService,
    profileService: ProfileService,
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

  // This function fetches all the tags
  fetchAllTags(): Observable<TagDto[]> {
    return this.http
      .get<ResponseWrapper<TagDto[]>>(FETCH_ALL_TAGS_ENDPOINT, this.getHeaders())
      .pipe(
        map((response) => response.data),
        catchError(this.apiErrorHandler.handleApiError),
      );
  }
}
