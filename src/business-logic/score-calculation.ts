import { GameModel } from 'models/game.model';
import { TeamModel } from 'models/team.model';
import { PlayerModel } from 'models/player.model';
import { ScoreModel, TeamScore } from 'models/score.model';

export const getWinRatio = (gamesPlayed: number, wins: number) => (wins === 0 ? 0 : wins / gamesPlayed);

export const getUpdatedPlayerStats = (currentStats: PlayerModel, statsToAdd: PlayerModel) => {
  return new PlayerModel(
    currentStats.name,
    currentStats.goalsFor + statsToAdd.goalsFor,
    currentStats.goalsAgainst + statsToAdd.goalsAgainst,
    currentStats.wins + statsToAdd.wins,
    currentStats.losses + statsToAdd.losses,
    currentStats.gamesPlayed + statsToAdd.gamesPlayed
  );
};

// TODO: ideally it is good to keep the function pure, so do deep copy of game and update it instead of mutating the game parameter.
export const tallyResults = (game: GameModel, score: ScoreModel): GameModel => {
  const team1Total = score.team1.player1 + score.team1.player2;
  const team2Total = score.team2.player1 + score.team2.player2;

  if (team1Total > team2Total) {
    game.winner = game.team1.name;
    game.team1.player1.wins++;

    updateIfPlayerExists(game.team1.player2);
    game.team2.player1.losses++;
    updateIfPlayerExists(game.team2.player2, false);
  } else if (team2Total > team1Total) {
    game.winner = game.team2.name;
    game.team2.player1.wins++;
    updateIfPlayerExists(game.team2.player2);

    game.team1.player1.losses++;
    updateIfPlayerExists(game.team1.player2, false);
  } else {
    game.winner = 'draw';
  }

  calculateGf(game.team1, score.team1);
  calculateGf(game.team2, score.team2);
  calculateGa(game.team1, team2Total);
  calculateGa(game.team2, team1Total);
  incrementGamesPlayed(game);

  return game;
};

const updateIfPlayerExists = (player: PlayerModel, won: boolean = true): PlayerModel => {
  if (player.name !== '') {
    player.wins = won ? player.wins + 1 : player.wins;
    player.losses = won ? player.losses : player.losses + 1;
  }
  return player;
};

const calculateGf = (team: TeamModel, teamScore: TeamScore) => {
  team.player1.goalsFor += teamScore.player1;
  team.player2.goalsFor += teamScore.player2;
};

const calculateGa = (team: TeamModel, goalsAgainst: number) => {
  team.player1.goalsAgainst += goalsAgainst;
  team.player2.goalsAgainst += goalsAgainst;
};

const incrementGamesPlayed = (game: GameModel) => {
  game.team1.player1.gamesPlayed++;
  game.team2.player1.gamesPlayed++;

  if (game.team1.player2.name !== '') {
    game.team1.player2.gamesPlayed++;
  }
  if (game.team2.player2.name !== '') {
    game.team2.player2.gamesPlayed++;
  }
};
