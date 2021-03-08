import React from 'react';
import './games.component.scss';

export function Games() {
  const handleSubmit = () => {
    console.log('form submitted');
  };

  const onValueChange = (event: React.FormEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const eventTarget = event.currentTarget;
    console.log(eventTarget.value);
  };

  return (
    <div className="page-wrapper">
      <h2 className="page-title">Start / Create a Game</h2>
      <form className="start-game" onSubmit={handleSubmit}>
        <label className="start-game__description">
          Game description
          <input type="text" minLength={1} maxLength={20} onChange={onValueChange} />
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
    </div>
  );
}
