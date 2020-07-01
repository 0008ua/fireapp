import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { FeedbackActions, FeedbackActionTypes } from '../actions/feedback.actions';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Feedback } from '../interfaces';

export const feedbacksFeatureKey = 'feedbacks';

export interface FeedbackState extends EntityState<Feedback> {
  feedbacks: Feedback[];
}

export const adapter: EntityAdapter<Feedback> = createEntityAdapter<Feedback>();

export const initialState: FeedbackState = adapter.getInitialState({
  feedbacks: []
});


export function feedbackReducer(
  state = initialState,
  action: FeedbackActions
): FeedbackState {
  switch (action.type) {
    case FeedbackActionTypes.AddFeedback: {
      return adapter.addOne(action.payload.feedback, state);
    }

    case FeedbackActionTypes.UpsertFeedback: {
      return adapter.upsertOne(action.payload.feedback, state);
    }

    case FeedbackActionTypes.AddFeedbacks: {
      return adapter.addMany(action.payload.feedbacks, state);
    }

    case FeedbackActionTypes.UpsertFeedbacks: {
      return adapter.upsertMany(action.payload.feedbacks, state);
    }

    case FeedbackActionTypes.UpdateFeedback: {
      return adapter.updateOne(action.payload.feedback, state);
    }

    case FeedbackActionTypes.UpdateFeedbacks: {
      return adapter.updateMany(action.payload.feedbacks, state);
    }

    case FeedbackActionTypes.DeleteFeedback: {
      console.log('delete', action.payload.id);
      return adapter.removeOne(action.payload.id, state);
    }

    case FeedbackActionTypes.DeleteFeedbacks: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case FeedbackActionTypes.LoadFeedbacks: {
      return adapter.addAll(action.payload.feedbacks, state);
    }

    case FeedbackActionTypes.ClearFeedbacks: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
