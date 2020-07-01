import { Action } from '@ngrx/store';
import { NavigationActionTypes, NavigationActions } from '../actions/navigation.actions';

export const navigationFeatureKey = 'navigation';

export interface NavigationState {
  appearedSection: string;
  moveToSection: string;
}

export const initialState: NavigationState = {
  appearedSection: 'section1',
  moveToSection: 'section1'
};

export function navigationReducer(state = initialState, action: NavigationActions): NavigationState {
  let newState: NavigationState;
  switch (action.type) {
    case NavigationActionTypes.MoveTo:
      newState = { ...state, moveToSection: action.elementId };
      console.log('state move', newState);
      return newState;
    case NavigationActionTypes.AppearedOnScreen:
      newState = { ...state, appearedSection: action.elementId };
      console.log('state appear', newState);
      return newState;
    default:
      return state;
  }
}

