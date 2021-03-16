import { GenericKeyValuePair, ReducerAction } from 'definitions';
import { ActionTypes } from './actions';

export const initialTeamState: GenericKeyValuePair = Object.create(null);

export const teamReducer = (currentState = initialTeamState, action: ReducerAction) => {
  switch (action.type) {
    case ActionTypes.ADD_TEAM:
      return { ...currentState, [action.payload.name]: action.payload };
    default:
      return currentState;
  }
};
