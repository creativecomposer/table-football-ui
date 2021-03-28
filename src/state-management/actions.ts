import { Dispatch } from 'redux';
import { ReducerAction } from 'definitions';
import { GameModel } from 'models/game.model';
import { PlayerModel } from 'models/player.model';
import { TeamModel } from 'models/team.model';
import { doRequest } from 'utils/http-request';

export enum ActionTypes {
  ADD_GAME = 'ADD_GAME',
  ADD_PLAYER = 'ADD_PLAYER',
  LOAD_PLAYERS = 'LOAD_PLAYERS',
  UPDATE_PLAYER = 'UPDATE_PLAYER',
  ADD_TEAM = 'ADD_TEAM',
  LOAD_TEAMS = 'LOAD_TEAMS',
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

export const addPlayer = (dispatch: Dispatch, player: PlayerModel): void => {
  doRequest('http://localhost:8080/players', 'POST', player).then(
    (data) => console.log('Player added', data),
    (error) => console.error('Player add failed', error)
  );
  dispatch({ type: ActionTypes.ADD_PLAYER, payload: player });
};

export const loadPlayers = (players: PlayerModel[]): ReducerAction => ({
  type: ActionTypes.LOAD_PLAYERS,
  payload: players,
});

export const updatePlayer = (player: PlayerModel): ReducerAction => ({
  type: ActionTypes.UPDATE_PLAYER,
  payload: player,
});

export const addTeam = (team: TeamModel): ReducerAction => ({ type: ActionTypes.ADD_TEAM, payload: team });

export const loadTeams = (teams: TeamModel[]): ReducerAction => ({
  type: ActionTypes.LOAD_TEAMS,
  payload: teams,
});

export const fetchPlayers = (dispatch: Dispatch): void => {
  doRequest('http://localhost:8080/players').then(
    (data) => dispatch(loadPlayers(data.players)),
    (error) => console.error('Received', error)
  );
};

export const fetchTeams = (dispatch: Dispatch): void => {
  doRequest('http://localhost:8080/teams').then(
    (data) => dispatch(loadTeams(data.teams)),
    (error) => console.error('Received', error)
  );
};
