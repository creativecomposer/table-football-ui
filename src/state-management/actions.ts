import { Dispatch } from 'redux';
import { ReducerAction } from 'definitions';
import { GameModel } from 'models/game.model';
import { PlayerModel } from 'models/player.model';

export enum ActionTypes {
  ADD_GAME = 'ADD_GAME',
  ADD_PLAYER = 'ADD_PLAYER',
  UPDATE_PLAYER = 'UPDATE_PLAYER',
}

export const addGame = (dispatch: Dispatch, game: GameModel): void => {
  dispatch({ type: ActionTypes.ADD_GAME, payload: game });
  dispatch(updatePlayer(game.team1.player1));
  dispatch(updatePlayer(game.team2.player1));
  if (game.team1.player2.name !== '') {
    dispatch(updatePlayer(game.team1.player2));
  }
  if (game.team2.player2.name !== '') {
    dispatch(updatePlayer(game.team2.player2));
  }
};

export const addPlayer = (player: PlayerModel): ReducerAction => ({ type: ActionTypes.ADD_PLAYER, payload: player });

export const updatePlayer = (player: PlayerModel): ReducerAction => ({
  type: ActionTypes.UPDATE_PLAYER,
  payload: player,
});
