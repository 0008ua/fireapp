import { Action } from '@ngrx/store';

export enum NavigationActionTypes {
  MoveTo = '[Navigation] Move to',
  AppearedOnScreen = '[Navigation] Appeared On Screen',
}

export class MoveToNavigations implements Action {
  readonly type = NavigationActionTypes.MoveTo;

  constructor(public elementId: string) { }
}

export class AppearedOnScreenNavigations implements Action {
  readonly type = NavigationActionTypes.AppearedOnScreen;

  constructor(public elementId: string) { }
}


export type NavigationActions =
  MoveToNavigations |
  AppearedOnScreenNavigations;
