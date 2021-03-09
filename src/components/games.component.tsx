import React, { useState } from 'react';
import './games.component.scss';
import { CreateGame } from 'components/create-game.component';
import { Gameplay } from 'components/gameplay.component';

export function Games() {
  const [gameStarted, setGameStarted] = useState(false);

  const handleGameStart = () => {
    setGameStarted(true);
  };

  const handleGameEnd = () => {
    setGameStarted(false);
  };

  return (
    <div className="page-wrapper">
      <h2 className="page-title">Start / Create a Game</h2>
      {gameStarted ? (
        <Gameplay onDiscard={handleGameEnd} onFinish={handleGameEnd} />
      ) : (
        <CreateGame onGameStarted={handleGameStart} />
      )}
    </div>
  );
}
