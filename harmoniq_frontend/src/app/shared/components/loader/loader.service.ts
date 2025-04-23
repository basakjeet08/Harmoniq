import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  // Global Loader State related data
  private loaderState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loaderState$: Observable<boolean> = this.loaderState.asObservable();

  // This function is used to start loading state
  startLoading(): void {
    this.loaderState.next(true);
  }

  // This function is used to end loading state
  endLoading(): void {
    this.loaderState.next(false);
  }
}
