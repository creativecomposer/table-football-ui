import React, { FunctionComponent, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import './create-game.component.scss';
import { Selector } from 'components/selector.component';
import { GameModel } from 'models/game.model';
import { TeamModel } from 'models/team.model';
import { PlayerModel } from 'models/player.model';
import { GenericKeyValuePair, ReducerAction } from 'definitions';
import { addPlayer, addTeam } from 'state-management/actions';
import { usePlayers, useTeams } from 'state-management/use-players.hook';

type CreateGameProps = {
  onGameStarted: (game: GameModel) => void;
};

const gameReducer = (state: GameModel, action: ReducerAction): GameModel => {
  switch (action.type) {
    case 'description':
      return { ...state, description: action.payload };
    case 'team1':
      return { ...state, team1: teamReducer(state.team1, { type: 'name', payload: action.payload }) };
    case 'team1Player1':
      return { ...state, team1: teamReducer(state.team1, { type: 'player1', payload: action.payload }) };
    case 'team1Player2':
      return { ...state, team1: teamReducer(state.team1, { type: 'player2', payload: action.payload }) };
    case 'team2':
      return { ...state, team2: teamReducer(state.team2, { type: 'name', payload: action.payload }) };
    case 'team2Player1':
      return { ...state, team2: teamReducer(state.team2, { type: 'player1', payload: action.payload }) };
    case 'team2Player2':
      return { ...state, team2: teamReducer(state.team2, { type: 'player2', payload: action.payload }) };
    default:
      return state;
  }
};

const teamReducer = (state: TeamModel, action: ReducerAction) => {
  switch (action.type) {
    case 'name':
      return { ...state, name: action.payload };
    case 'player1':
      return { ...state, player1: playerReducer(state.player1, { type: 'name', payload: action.payload }) };
    case 'player2':
      return { ...state, player2: playerReducer(state.player1, { type: 'name', payload: action.payload }) };
    default:
      return state;
  }
};

const playerReducer = (state: PlayerModel, action: ReducerAction) => {
  switch (action.type) {
    case 'name':
      return { ...state, name: action.payload };
    default:
      return state;
  }
};

export const CreateGame: FunctionComponent<CreateGameProps> = (props: CreateGameProps) => {
  const { onGameStarted } = props;
  const [state, updateGame] = useReducer(gameReducer, new GameModel());
  const [errorMessage, setErrorMessage] = useState('');
  const reduxDispatch = useDispatch();
  const objPlayers: GenericKeyValuePair = usePlayers();
  const players: string[] = Object.keys(objPlayers);
  const teams = Object.keys(useTeams());

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (
      state.description === '' ||
      state.team1.name === '' ||
      state.team2.name === '' ||
      state.team1.player1.name === '' ||
      state.team2.player1.name === ''
    ) {
      setErrorMessage('Enter description and at least one player per team');
      return;
    }
    onGameStarted(state);
  };

  const onDescriptionChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const eventTarget = event.currentTarget;
    onItemChange(eventTarget.name, eventTarget.value);
  };

  const onItemChange = (name: string, value: string) => {
    updateGame({ type: name, payload: value });
    setErrorMessage('');
  };

  const onNewTeam = (name: string, value: string) => {
    const newTeam = new TeamModel(value);
    reduxDispatch(addTeam(newTeam));
    onItemChange(name, value);
  };

  const onNewPlayer = (name: string, value: string) => {
    const newPlayer = new PlayerModel(value);
    reduxDispatch(addPlayer(newPlayer));
    onItemChange(name, value);
  };

  return (
    <form className="start-game" onSubmit={handleSubmit}>
      <label className="start-game__description">
        Game description
        <input
          type="text"
          className="edit"
          minLength={1}
          maxLength={20}
          name="description"
          value={state.description}
          onChange={onDescriptionChange}
        />
      </label>
      <fieldset className="start-game__team1">
        <legend>Team 1</legend>
        <Selector
          onChange={onItemChange}
          onNew={onNewTeam}
          options={teams}
          label="Team"
          name="team1"
          value={state.team1.name}
        />
        <Selector
          label="Player 1"
          name="team1Player1"
          options={players}
          value={state.team1.player1.name}
          onChange={onItemChange}
          onNew={onNewPlayer}
        />
        <Selector
          label="Player 2"
          name="team1Player2"
          options={players}
          value={state.team1.player2.name}
          onChange={onItemChange}
          onNew={onNewPlayer}
        />
      </fieldset>
      <fieldset className="start-game__team2">
        <legend>Team 2</legend>
        <Selector
          onChange={onItemChange}
          onNew={onNewTeam}
          options={teams}
          label="Team"
          name="team2"
          value={state.team2.name}
        />
        <Selector
          label="Player 1"
          name="team2Player1"
          options={players}
          value={state.team2.player1.name}
          onChange={onItemChange}
          onNew={onNewPlayer}
        />
        <Selector
          label="Player 2"
          name="team2Player2"
          options={players}
          value={state.team2.player2.name}
          onChange={onItemChange}
          onNew={onNewPlayer}
        />
      </fieldset>
      {errorMessage !== '' && <p className="error start-game__error-message">{errorMessage}</p>}
      <div className="start-game__cta">
        <input type="submit" className="button button--primary" value="Start Game" />
      </div>
    </form>
  );
};
