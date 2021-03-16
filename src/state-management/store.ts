import { applyMiddleware, combineReducers, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { initialGameState, gameReducer } from './game.reducer';
import { initialPlayerState, playerReducer } from './player.reducer';
import { initialTeamState, teamReducer } from './team.reducer';

const logger = createLogger({ collapsed: true });

const rootReducer = combineReducers({ games: gameReducer, players: playerReducer, teams: teamReducer });

export function createReduxStore() {
  const store = createStore(
    rootReducer,
    { games: initialGameState, players: initialPlayerState, teams: initialTeamState },
    applyMiddleware(logger)
  );

  return store;
}
