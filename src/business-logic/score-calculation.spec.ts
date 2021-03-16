import { GameModel } from 'models/game.model';
import { TeamModel } from 'models/team.model';
import { PlayerModel } from 'models/player.model';
import { ScoreModel } from 'models/score.model';
import { tallyResults } from 'business-logic/score-calculation';

describe('Score Calculation', () => {
  it('should mark team1 as winner if it got more goals than team2', () => {
    const winner = 'A team';
    const team1Player1 = new PlayerModel('Altaf');
    const team2Player1 = new PlayerModel('Alex');
    const team1 = new TeamModel(winner, team1Player1);
    const team2 = new TeamModel('A1 team', team2Player1);
    const score = new ScoreModel({ player1: 2, player2: 1 }, { player1: 1, player2: 0 });
    const game = new GameModel('World Championship 2022', team1, team2);
    tallyResults(game, score);
    expect(game.winner).toBe(winner);
  });

  it('should mark team2 as winner if it got more goals than team1', () => {
    const winner = 'A1 team';
    const team1Player1 = new PlayerModel('Altaf');
    const team2Player1 = new PlayerModel('Alex');
    const team1 = new TeamModel('A Team', team1Player1);
    const team2 = new TeamModel(winner, team2Player1);
    const score = new ScoreModel({ player1: 2, player2: 0 }, { player1: 3, player2: 0 });
    const game = new GameModel('World Championship 2022', team1, team2);
    tallyResults(game, score);
    expect(game.winner).toBe(winner);
  });

  it('should mark draw if both teams got same number of goals', () => {
    const winner = 'draw';
    const team1Player1 = new PlayerModel('Martin Luther King Jr.');
    const team1Player2 = new PlayerModel('Gandhi');
    const team2Player1 = new PlayerModel('Tim Crow');
    const team2Player2 = new PlayerModel('Godse');
    const team1 = new TeamModel('A Team', team1Player1, team1Player2);
    const team2 = new TeamModel('A1 team', team2Player1, team2Player2);
    const score = new ScoreModel({ player1: 2, player2: 1 }, { player1: 3, player2: 0 });
    const game = new GameModel('World Championship 2022', team1, team2);
    tallyResults(game, score);
    expect(game.winner).toBe(winner);
  });

  it('should increase first team players wins if first team is winner', () => {
    const team1Player1 = new PlayerModel('Martin Luther King Jr.', 5, 4, 2, 0);
    const team1Player2 = new PlayerModel('Gandhi', 8, 1, 3, 1);
    const team2Player1 = new PlayerModel('Tim Crow');
    const team2Player2 = new PlayerModel('Godse');
    const team1 = new TeamModel('Cooler Team', team1Player1, team1Player2);
    const team2 = new TeamModel('Terror team', team2Player1, team2Player2);
    const score = new ScoreModel({ player1: 2, player2: 1 }, { player1: 1, player2: 0 });
    const game = new GameModel('World Championship 1948', team1, team2);
    tallyResults(game, score);
    expect(team1Player1.wins).toBe(3);
    expect(team1Player2.wins).toBe(4);
  });

  it('should increase second team players wins if second team is winner', () => {
    const team1Player1 = new PlayerModel('Altaf', 1, 2, 2, 0);
    const team2Player1 = new PlayerModel('Alex', 2, 5, 1, 1);
    const team1 = new TeamModel('A Team', team1Player1);
    const team2 = new TeamModel('A1 Team', team2Player1);
    const score = new ScoreModel({ player1: 2, player2: 0 }, { player1: 3, player2: 0 });
    const game = new GameModel('World Championship 2022', team1, team2);
    tallyResults(game, score);
    expect(team2Player1.wins).toBe(2);
    expect(team1Player1.wins).toBe(2);
  });

  it('should increase first team players losses if second team is winner', () => {
    const team1Player1 = new PlayerModel('Martin Luther King Jr.', 5, 4, 2, 0);
    const team1Player2 = new PlayerModel('Gandhi', 8, 1, 3, 1);
    const team2Player1 = new PlayerModel('Tim Crow');
    const team2Player2 = new PlayerModel('Godse');
    const team1 = new TeamModel('Cooler Team', team1Player1, team1Player2);
    const team2 = new TeamModel('Terror team', team2Player1, team2Player2);
    const score = new ScoreModel({ player1: 1, player2: 1 }, { player1: 2, player2: 1 });
    const game = new GameModel('World Championship 1948', team1, team2);
    tallyResults(game, score);
    expect(team1Player1.losses).toBe(1);
    expect(team1Player2.losses).toBe(2);
  });

  it('should increase second team players losses if first team is winner', () => {
    const team1Player1 = new PlayerModel('Martin Luther King Jr.', 5, 4, 2, 0);
    const team1Player2 = new PlayerModel('Gandhi', 8, 1, 3, 1);
    const team2Player1 = new PlayerModel('Tim Crow', 0, 0, 0, 0);
    const team2Player2 = new PlayerModel('Godse');
    const team1 = new TeamModel('Cooler Team', team1Player1, team1Player2);
    const team2 = new TeamModel('Terror team', team2Player1, team2Player2);
    const score = new ScoreModel({ player1: 2, player2: 1 }, { player1: 1, player2: 0 });
    const game = new GameModel('World Championship 1948', team1, team2);
    tallyResults(game, score);
    expect(team2Player1.losses).toBe(1);
    expect(team2Player2.losses).toBe(1);
  });

  it('should update first team players goalsFor', () => {
    const team1Player1 = new PlayerModel('Martin Luther King Jr.', 5, 4, 2, 0);
    const team1Player2 = new PlayerModel('Gandhi', 8, 1, 3, 1);
    const team2Player1 = new PlayerModel('Tim Crow');
    const team2Player2 = new PlayerModel('Godse');
    const team1 = new TeamModel('Cooler Team', team1Player1, team1Player2);
    const team2 = new TeamModel('Terror team', team2Player1, team2Player2);
    const score = new ScoreModel({ player1: 2, player2: 1 }, { player1: 1, player2: 0 });
    const game = new GameModel('World Championship 1948', team1, team2);
    tallyResults(game, score);
    expect(team1Player1.goalsFor).toBe(7);
    expect(team1Player2.goalsFor).toBe(9);
  });

  it('should update first team players goalsAgainst', () => {
    const team1Player1 = new PlayerModel('Martin Luther King Jr.', 5, 4, 2, 0);
    const team1Player2 = new PlayerModel('Gandhi', 8, 1, 3, 1);
    const team2Player1 = new PlayerModel('Tim Crow');
    const team2Player2 = new PlayerModel('Godse');
    const team1 = new TeamModel('Cooler Team', team1Player1, team1Player2);
    const team2 = new TeamModel('Terror team', team2Player1, team2Player2);
    const score = new ScoreModel({ player1: 2, player2: 1 }, { player1: 1, player2: 0 });
    const game = new GameModel('World Championship 1948', team1, team2);
    tallyResults(game, score);
    expect(team1Player1.goalsAgainst).toBe(5);
    expect(team1Player2.goalsAgainst).toBe(2);
  });

  it('should update second team players goalsFor', () => {
    const team1Player1 = new PlayerModel('Martin Luther King Jr.', 5, 4, 2, 0);
    const team1Player2 = new PlayerModel('Gandhi', 8, 1, 3, 1);
    const team2Player1 = new PlayerModel('Tim Crow');
    const team2Player2 = new PlayerModel('Godse');
    const team1 = new TeamModel('Cooler Team', team1Player1, team1Player2);
    const team2 = new TeamModel('Terror team', team2Player1, team2Player2);
    const score = new ScoreModel({ player1: 2, player2: 1 }, { player1: 1, player2: 0 });
    const game = new GameModel('World Championship 1948', team1, team2);
    tallyResults(game, score);
    expect(team2Player1.goalsFor).toBe(1);
    expect(team2Player2.goalsFor).toBe(0);
  });

  it('should update second team players goalsAgainst', () => {
    const team1Player1 = new PlayerModel('Martin Luther King Jr.', 5, 4, 2, 0);
    const team1Player2 = new PlayerModel('Gandhi', 8, 1, 3, 1);
    const team2Player1 = new PlayerModel('Tim Crow');
    const team2Player2 = new PlayerModel('Godse', 1, 1, 0, 3);
    const team1 = new TeamModel('Cooler Team', team1Player1, team1Player2);
    const team2 = new TeamModel('Terror team', team2Player1, team2Player2);
    const score = new ScoreModel({ player1: 2, player2: 1 }, { player1: 1, player2: 0 });
    const game = new GameModel('World Championship 1948', team1, team2);
    tallyResults(game, score);
    expect(team2Player1.goalsAgainst).toBe(3);
    expect(team2Player2.goalsAgainst).toBe(4);
  });

  it('should increment gamesPlayed for all players', () => {
    const team1Player1 = new PlayerModel('Martin Luther King Jr.', 5, 4, 2, 0, 10);
    const team1Player2 = new PlayerModel('Gandhi', 8, 1, 3, 1, 11);
    const team2Player1 = new PlayerModel('Tim Crow');
    const team2Player2 = new PlayerModel('Godse', 1, 1, 0, 3, 4);
    const team1 = new TeamModel('Cooler Team', team1Player1, team1Player2);
    const team2 = new TeamModel('Terror team', team2Player1, team2Player2);
    const score = new ScoreModel({ player1: 2, player2: 1 }, { player1: 1, player2: 0 });
    const game = new GameModel('World Championship 1948', team1, team2);
    tallyResults(game, score);
    expect(team1Player1.gamesPlayed).toBe(11);
    expect(team1Player2.gamesPlayed).toBe(12);
    expect(team2Player1.gamesPlayed).toBe(1);
    expect(team2Player2.gamesPlayed).toBe(5);
  });
});
