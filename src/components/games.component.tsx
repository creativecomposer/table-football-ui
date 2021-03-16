import React, { FunctionComponent, useState } from 'react';
import { Prompt } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './games.component.scss';
import { CreateGame } from 'components/create-game.component';
import { Gameplay } from 'components/gameplay.component';
import { GameModel } from 'models/game.model';
import { GameScore } from 'definitions';
import { tallyResults } from 'business-logic/score-calculation';
import { addGame } from 'state-management/actions';

export const Games: FunctionComponent = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameData, setGameData] = useState(new GameModel());
  const reduxDispatch = useDispatch();

  const handleGameStart = (game: GameModel) => {
    setGameData(game);
    setGameStarted(true);
  };

  const handleGameDiscard = () => {
    setGameStarted(false);
  };

  const handleGameFinish = (score: GameScore): void => {
    addGame(reduxDispatch, tallyResults(gameData, score));
    setGameStarted(false);
  };

  return (
    <div className="page-wrapper">
      <h2 className="page-title">Start / Create a Game</h2>
      {gameStarted ? (
        <Gameplay data={gameData} onDiscard={handleGameDiscard} onFinish={handleGameFinish} />
      ) : (
        <CreateGame onGameStarted={handleGameStart} />
      )}
      <Prompt when={gameStarted} message="Game will be discarded. Do you want to continue?" />
    </div>
  );
};
