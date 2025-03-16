import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ApiErrorHandlerInterface {
  handleApiError(error: HttpErrorResponse): Observable<never>;
}
