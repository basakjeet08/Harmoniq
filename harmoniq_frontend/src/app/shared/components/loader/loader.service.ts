import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  // Global Loader State related data
  private loaderState = new BehaviorSubject<boolean>(false);
  loaderState$ = this.loaderState.asObservable();

  // This function is used to start loading state
  startLoading() {
    this.loaderState.next(true);
  }

  // This function is used to end loading state
  endLoading() {
    this.loaderState.next(false);
  }
}
