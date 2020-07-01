import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  elementOnScreen$ = new ReplaySubject<string>(1);
  scrollTo$ = new ReplaySubject<string>(1);

  constructor() { }

  onElementOnScreen() {
    return this.elementOnScreen$ as Observable<string>;
  }

  onScrollTo() {
    return this.scrollTo$ as Observable<string>;
  }

}
