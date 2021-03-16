import { GameModel } from 'models/game.model';
import { ReducerAction } from 'definitions';
import { ActionTypes } from './actions';

export const initialGameState: GameModel[] = [];

export const gameReducer = (currentState = initialGameState, action: ReducerAction) => {
  switch (action.type) {
    case ActionTypes.ADD_GAME:
      return [...currentState, action.payload];
    default:
      return currentState;
  }
};
