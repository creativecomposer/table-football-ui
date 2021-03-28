import { GenericKeyValuePair, ReducerAction } from 'definitions';
import { ActionTypes } from './actions';
import { getUpdatedPlayerStats } from 'business-logic/score-calculation';
import { PlayerModel } from 'models/player.model';

export const initialPlayerState: GenericKeyValuePair = Object.create(null);

export const playerReducer = (currentState = initialPlayerState, action: ReducerAction) => {
  switch (action.type) {
    case ActionTypes.ADD_PLAYER:
      return { ...currentState, [action.payload.name]: action.payload };
    case ActionTypes.LOAD_PLAYERS:
      return loadPlayers(action.payload);
    case ActionTypes.UPDATE_PLAYER:
      return updatePlayer(currentState, action.payload);
    default:
      return currentState;
  }
};

const loadPlayers = (players: PlayerModel[]): GenericKeyValuePair => {
  const nextState = Object.create(null);
  players.forEach((player: PlayerModel) => (nextState[player.name] = player));
  return nextState;
};

const updatePlayer = (currentState: GenericKeyValuePair, playerToUpdate: PlayerModel): GenericKeyValuePair => {
  const player = currentState[playerToUpdate.name];
  if (player) {
    return { ...currentState, [playerToUpdate.name]: getUpdatedPlayerStats(player, playerToUpdate) };
  }
  return currentState;
};
