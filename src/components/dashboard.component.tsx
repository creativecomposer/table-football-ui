import React from 'react';
import { Link } from 'react-router-dom';
import './dashboard.component.scss';
import { GenericKeyValuePair } from 'definitions';
import { usePlayers } from 'state-management/use-players.hook';
import { PlayerModel } from 'models/player.model';
import { getWinRatio } from 'business-logic/score-calculation';

const sortWinRatioDsc = (a: PlayerModel, b: PlayerModel) => {
  const aRatio = getWinRatio(a.gamesPlayed, a.wins);
  const bRatio = getWinRatio(b.gamesPlayed, b.wins);
  if (aRatio > bRatio) {
    return -1;
  }
  if (bRatio > aRatio) {
    return 1;
  }
  return 0;
};

export function Dashboard() {
  const objPlayers: GenericKeyValuePair = usePlayers();

  const getPlayerRows = () => {
    const sortedPlayers = Object.values(objPlayers).sort(sortWinRatioDsc);
    return sortedPlayers.map((player: PlayerModel) => (
      <tr className="table__row" key={player.name}>
        <td className="table__cell">{player.name}</td>
        <td className="table__cell">{player.gamesPlayed}</td>
        <td className="table__cell">{player.wins}</td>
        <td className="table__cell">{player.losses}</td>
        <td className="table__cell">{getWinRatio(player.gamesPlayed, player.wins)}</td>
        <td className="table__cell">{player.goalsFor}</td>
        <td className="table__cell">{player.goalsAgainst}</td>
        <td className="table__cell">{player.goalsFor - player.goalsAgainst}</td>
      </tr>
    ));
  };

  return (
    <div className="page-wrapper">
      <h2 className="page-title">Dashboard</h2>
      <table className="table">
        <thead>
          <tr className="table__row">
            <th className="table__th">Player Name</th>
            <th className="table__th">Games Played</th>
            <th className="table__th">Wins</th>
            <th className="table__th">Losses</th>
            <th className="table__th">Win Ratio</th>
            <th className="table__th">GF</th>
            <th className="table__th">GA</th>
            <th className="table__th">GD</th>
          </tr>
        </thead>
        <tbody>{getPlayerRows()}</tbody>
      </table>
      {Object.keys(objPlayers).length === 0 && (
        <div className="nostats">
          <p className="nostats__msg">No stats exist. Begin by starting a game at</p>
          <button type="button" className="button">
            <Link to="/games">Start Game</Link>
          </button>
        </div>
      )}
    </div>
  );
}
