import { applyMiddleware, combineReducers, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { initialGameState, gameReducer } from './game.reducer';
import { initialPlayerState, playerReducer } from './player.reducer';

const logger = createLogger({ collapsed: true });

const rootReducer = combineReducers({ games: gameReducer, players: playerReducer });

export function createReduxStore() {
  const store = createStore(
    rootReducer,
    { games: initialGameState, players: initialPlayerState },
    applyMiddleware(logger)
  );

  return store;
}
