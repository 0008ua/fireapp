import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Feedback } from '../interfaces';

export enum FeedbackActionTypes {
  QueryFeedbacksFromDb = '[Feedback] Query',
  LoadFeedbacks = '[Feedback] Load Feedbacks',
  AddFeedback = '[Feedback] added',
  UpsertFeedback = '[Feedback] Upsert Feedback',
  AddFeedbacks = '[Feedback] Add Feedbacks',
  UpsertFeedbacks = '[Feedback] Upsert Feedbacks',
  UpdateFeedback = '[Feedback] modifiedOne',
  UpdateFeedbacks = '[Feedback] modified',
  DeleteFeedback = '[Feedback] removed',
  DeleteFeedbacks = '[Feedback] Delete Feedbacks',
  ClearFeedbacks = '[Feedback] Clear Feedbacks'
}

// fires effect QueryFeedbacksFromDb$
export class QueryFeedbacksFromDb implements Action {
  readonly type = FeedbackActionTypes.QueryFeedbacksFromDb;
  constructor(public payload: { query: any }) { }
}

export class LoadFeedbacks implements Action {
  readonly type = FeedbackActionTypes.LoadFeedbacks;

  constructor(public payload: { feedbacks: Feedback[] }) {}
}

export class AddFeedback implements Action {
  readonly type = FeedbackActionTypes.AddFeedback;

  constructor(public payload: { feedback: Feedback }) {}
}

export class UpsertFeedback implements Action {
  readonly type = FeedbackActionTypes.UpsertFeedback;

  constructor(public payload: { feedback: Feedback }) {}
}

export class AddFeedbacks implements Action {
  readonly type = FeedbackActionTypes.AddFeedbacks;

  constructor(public payload: { feedbacks: Feedback[] }) {}
}

export class UpsertFeedbacks implements Action {
  readonly type = FeedbackActionTypes.UpsertFeedbacks;

  constructor(public payload: { feedbacks: Feedback[] }) {}
}

export class UpdateFeedback implements Action {
  readonly type = FeedbackActionTypes.UpdateFeedback;

  constructor(public payload: { feedback: Update<Feedback> }) {}
}

export class UpdateFeedbacks implements Action {
  readonly type = FeedbackActionTypes.UpdateFeedbacks;

  constructor(public payload: { feedbacks: Update<Feedback>[] }) {}
}

export class DeleteFeedback implements Action {
  readonly type = FeedbackActionTypes.DeleteFeedback;

  constructor(public payload: { id: string }) {}
}

export class DeleteFeedbacks implements Action {
  readonly type = FeedbackActionTypes.DeleteFeedbacks;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearFeedbacks implements Action {
  readonly type = FeedbackActionTypes.ClearFeedbacks;
}

export type FeedbackActions =
  QueryFeedbacksFromDb
 | LoadFeedbacks
 | AddFeedback
 | UpsertFeedback
 | AddFeedbacks
 | UpsertFeedbacks
 | UpdateFeedback
 | UpdateFeedbacks
 | DeleteFeedback
 | DeleteFeedbacks
 | ClearFeedbacks;
