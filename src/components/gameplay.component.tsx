import React, { FunctionComponent, useReducer } from 'react';
import './gameplay.component.scss';
import { GameModel } from 'models/game.model';
import { GameScore } from 'definitions';

type GameplayProps = {
  data: GameModel;
  onFinish: (score: GameScore) => void;
  onDiscard: () => void;
};

type ReducerAction = {
  type: string;
  payload: any;
};

const initialScore: GameScore = {
  team1: {
    player1: 0,
    player2: 0,
  },
  team2: {
    player1: 0,
    player2: 0,
  },
};

const scoreReducer = (state: any, action: ReducerAction) => {
  switch (action.type) {
    case 'team1Player1':
      return { ...state, team1: { ...state.team1, player1: action.payload } };
    case 'team1Player2':
      return { ...state, team1: { ...state.team1, player2: action.payload } };
    case 'team2Player1':
      return { ...state, team2: { ...state.team2, player1: action.payload } };
    case 'team2Player2':
      return { ...state, team2: { ...state.team2, player2: action.payload } };
  }
};

export const Gameplay: FunctionComponent<GameplayProps> = (props: GameplayProps) => {
  const { data, onFinish, onDiscard } = props;
  const [score, dispatch] = useReducer(scoreReducer, initialScore);

  const onInputChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const eventTarget = event.currentTarget;
    dispatch({ type: eventTarget.name, payload: parseInt(eventTarget.value) });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onFinish(score);
  };

  const handleDiscard = () => {
    onDiscard();
  };

  return (
    <form className="gameplay" onSubmit={handleSubmit}>
      <div className="gameplay__title">
        <span>
          {data?.team1.name} vs {data?.team2.name}
        </span>
      </div>
      <fieldset className="gameplay__team1">
        <legend>{data?.team1.name}</legend>
        <label>
          {data?.team1.player1.name}
          <input
            type="number"
            min="0"
            max="10"
            name="team1Player1"
            onChange={onInputChange}
            value={score.team1.player1}
            className="edit gameplay__goal"
          />
        </label>
        {data?.team1.player2.name && (
          <label>
            {data?.team1.player2.name}
            <input
              type="number"
              min="0"
              max="10"
              name="team1Player2"
              onChange={onInputChange}
              value={score.team1.player2}
              className="edit gameplay__goal"
            />
          </label>
        )}
        <label>Goal Total {score.team1.player1 + score.team1.player2}</label>
      </fieldset>
      <fieldset className="gameplay__team2">
        <legend>{data?.team2.name}</legend>
        <label>
          {data?.team2.player1.name}
          <input
            type="number"
            min="0"
            max="10"
            name="team2Player1"
            onChange={onInputChange}
            value={score.team2.player1}
            className="edit gameplay__goal"
          />
        </label>
        {data?.team2.player2.name && (
          <label>
            {data?.team2.player2.name}
            <input
              type="number"
              min="0"
              max="10"
              name="team2Player2"
              onChange={onInputChange}
              value={score.team2.player2}
              className="edit gameplay__goal"
            />
          </label>
        )}
        <label>Goal Total {score.team2.player1 + score.team2.player2}</label>
      </fieldset>
      <div className="gameplay__cta">
        <input type="submit" className="button button--primary" value="Finish & Save Game*" />
        <input type="button" className="button" value="Discard Game" onClick={handleDiscard} />
      </div>
      <p className="gameplay__help">* The team with more total goals is considered the winner.</p>
    </form>
  );
};
