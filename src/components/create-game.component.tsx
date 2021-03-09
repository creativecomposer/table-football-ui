import React, { FunctionComponent } from 'react';
import './create-game.component.scss';

type CreateGameProps = {
  onGameStarted: () => void;
};

export const CreateGame: FunctionComponent<CreateGameProps> = (props: CreateGameProps) => {
  const { onGameStarted } = props;

  const handleSubmit = () => {
    console.log('game created');
    onGameStarted();
  };

  const onValueChange = (event: React.FormEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const eventTarget = event.currentTarget;
    console.log(eventTarget.value);
  };

  return (
    <form className="start-game" onSubmit={handleSubmit}>
      <label className="start-game__description">
        Game description
        <input type="text" className="edit" minLength={1} maxLength={20} onChange={onValueChange} />
      </label>
      <fieldset className="start-game__team1">
        <legend>Team 1</legend>
        <label>
          Name
          <select className="select" onChange={onValueChange}>
            <option>T1</option>
            <option>T2</option>
            <option>T3</option>
          </select>
          <input type="button" className="button" value="+" />
        </label>
        <label>
          Player 1
          <select className="select" onChange={onValueChange} />
          <input type="button" className="button" value="+" />
        </label>
        <label>
          Player 2
          <select className="select" onChange={onValueChange} />
          <input type="button" className="button" value="+" />
        </label>
      </fieldset>
      <fieldset className="start-game__team2">
        <legend>Team 2</legend>
        <label>
          Name
          <select className="select" onChange={onValueChange} />
          <input type="button" className="button" value="+" />
        </label>
        <label>
          Player 1
          <select className="select" onChange={onValueChange} />
          <input type="button" className="button" value="+" />
        </label>
        <label>
          Player 2
          <select className="select" onChange={onValueChange} />
          <input type="button" className="button" value="+" />
        </label>
      </fieldset>
      <div className="start-game__cta">
        <input type="submit" className="button button--primary" value="Start Game" />
      </div>
    </form>
  );
};
