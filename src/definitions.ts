import { Dispatch, AnyAction } from 'redux';

export type GameScore = {
  team1: {
    player1: number;
    player2: number;
  };
  team2: {
    player1: number;
    player2: number;
  };
};

export type GenericKeyValuePair = {
  [key: string]: any;
};

export type ReducerAction = {
  type: string;
  payload: any;
};

export type ReduxPropsType = {
  dispatch: Dispatch<AnyAction>;
};

export type RootState = {
  games: any;
  players: GenericKeyValuePair;
  teams: GenericKeyValuePair;
};
