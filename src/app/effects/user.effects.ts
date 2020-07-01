import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { Action } from '@ngrx/store';
import { UserActions, UserActionTypes, GetUser, Authenticated, NotAuthenticated, AuthError, GoogleLogin } from '../actions/user.actions';
import { map, switchMap, delay, catchError } from 'rxjs/operators';
import { FireService } from '../services/fire.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { User } from '../interfaces';



@Injectable()
export class UserEffects {

  @Effect()
  getUser: Observable<Action> = this.actions$.pipe(
    ofType(UserActionTypes.getUser),

    map((action: GetUser) => action.payload),
    switchMap(payload => this.afAuth.authState.pipe(
      map(authData => {
        if (authData) {
          // User logged in
          const user = new User(
            authData.uid,
            authData.displayName,
            authData.photoURL,
            );

          return new Authenticated({ user });
        } else {
          // User not logged in
          return new NotAuthenticated();
        }
      })
    )),
    catchError(err => of(new AuthError()))
  );

  @Effect()
  login: Observable<Action> = this.actions$.pipe(
    ofType(UserActionTypes.googleLogin),
    map((action: UserActions) => action.payload),
    switchMap(payload => from(this.fireService.googleSignin()).pipe(
      // successful login
      map(credential => new GetUser()))),
    catchError(err => of(new AuthError({ error: err.message })))
  );

  @Effect()
  logout: Observable<Action> = this.actions$.pipe(
    ofType(UserActionTypes.logout),
    map((action: UserActions) => action.payload),
    switchMap(payload => of(this.afAuth.auth.signOut()).pipe(
      map(authData => new NotAuthenticated()),
      catchError(err => of(new AuthError({ error: err.message })))
    ))
  );

  constructor(
    private actions$: Actions,
    private fireService: FireService,
    private afAuth: AngularFireAuth,
  ) { }

}
