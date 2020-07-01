import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { FireService } from '../services/fire.service';
import { Observable } from 'rxjs';
import { FeedbackActionTypes, FeedbackActions, LoadFeedbacks, QueryFeedbacksFromDb } from '../actions/feedback.actions';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { Feedback } from '../interfaces';


@Injectable()
export class FeedbackEffects {


  @Effect()
  queryFeedbacksFromDb$: Observable<Action> = this.actions$
    .pipe(
      ofType(FeedbackActionTypes.QueryFeedbacksFromDb),
      switchMap((actions: QueryFeedbacksFromDb) => {
        return this.fireService.getFeedbackAction(actions.payload.query)
          .pipe(
            map((documentChangeAction: DocumentChangeAction<Feedback>[]) => {
              const feedbacks = documentChangeAction.map(
                (action: DocumentChangeAction<Feedback>) => ({ id: action.payload.doc.id, ...action.payload.doc.data() })
              );
              return new LoadFeedbacks({ feedbacks });
            }),
          );
      })
    );

  // @Effect()
  // addMessageToDb$: Observable<Action> = this.actions$
  //   .pipe(
  //     // ofType(FeedbackActionTypes.QueryFeedbacksFromDb),
  //   );

  // @Effect()
  // listeningFirestoreFeedbacks$: Observable<Action> = this.actions$
  //   .pipe(
  //     ofType(FeedbackActionTypes.QueryFeedbacksFromDb),
  //     mergeMap((actions: QueryFeedbacksFromDb) => {
  //       return this.fireService.getFeedbackAction(actions.payload.query)
  //         .pipe(
  //           mergeMap(action => action),
  //           map((documentChangeAction: any) => {
  //             return {
  //               type: `[Feedback] ${documentChangeAction.type}`,
  //               payload: { feedback: { id: documentChangeAction.payload.doc.id, ...documentChangeAction.payload.doc.data() } }
  //             };
  //           }),
  //           // catchError(err => of(new LoadFiresFailure(err)))
  //         );
  //     })
  //   );

  constructor(
    private actions$: Actions,
    private fireService: FireService,
  ) { }
}
