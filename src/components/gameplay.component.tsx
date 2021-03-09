import React, { FunctionComponent } from 'react';
import './gameplay.component.scss';

type GameplayProps = {
  onFinish: () => void;
  onDiscard: () => void;
};

export const Gameplay: FunctionComponent<GameplayProps> = (props: GameplayProps) => {
  const { onFinish, onDiscard } = props;

  const handleSubmit = () => {
    onFinish();
  };

  const handleDiscard = () => {
    onDiscard();
  };

  return (
    <form className="gameplay" onSubmit={handleSubmit}>
      <div className="gameplay__title">
        <span>Team 1 vs Team 2</span>
      </div>
      <fieldset className="gameplay__team1">
        <legend>Team 1</legend>
        <label>
          Player 1
          <input type="number" min="0" max="10" className="edit" />
        </label>
        <label>
          Player 2
          <input type="number" min="0" max="10" className="edit" />
        </label>
        <label>Goal Total 0</label>
      </fieldset>
      <fieldset className="gameplay__team2">
        <legend>Team 2</legend>
        <label>
          Player 1
          <input type="number" min="0" max="10" className="edit" />
        </label>
        <label>
          Player 2
          <input type="number" min="0" max="10" className="edit" />
        </label>
        <label>Goal Total 0</label>
      </fieldset>
      <div className="gameplay__cta">
        <input type="submit" className="button button--primary" value="Finish & Save Game*" />
        <input type="button" className="button" value="Discard Game" onClick={handleDiscard} />
      </div>
      <p className="gameplay__help">* The team with more total goals is considered the winner.</p>
    </form>
  );
};
