import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { NavigationState, navigationReducer } from './navigation.reducer';
import { FeedbackState, feedbackReducer } from './feedback.reducer';
import * as fromFeedbacks from './feedback.reducer';
import { userReducer, UserState } from './user.reducer';

export interface State {
  navigation: NavigationState;
  feedbacks: FeedbackState;
  user: UserState;
}

export const reducers: ActionReducerMap<State> = {
  navigation: navigationReducer,
  feedbacks: feedbackReducer,
  user: userReducer,
};

export const getFeedbackState = createFeatureSelector<FeedbackState>('feedbacks');
export const getFeedbackIds = createSelector(getFeedbackState, fromFeedbacks.selectIds);
export const getFeedbackAll = createSelector(getFeedbackState, fromFeedbacks.selectAll);

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
