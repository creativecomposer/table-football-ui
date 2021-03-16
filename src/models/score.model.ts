export type TeamScore = {
  player1: number;
  player2: number;
};

export class ScoreModel {
  constructor(
    public team1: TeamScore = { player1: 0, player2: 0 },
    public team2: TeamScore = { player1: 0, player2: 0 }
  ) {}
}
