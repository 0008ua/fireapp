import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'firebase';
import { Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { GetUser } from './actions/user.actions';
import { UserState } from './reducers/user.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  user$: Observable<UserState>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.store.dispatch(new GetUser());
  }
}
