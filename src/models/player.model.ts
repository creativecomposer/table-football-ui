export class PlayerModel {
  constructor(
    public name: string = '',
    public goalsFor: number = 0,
    public goalsAgainst: number = 0,
    public wins: number = 0,
    public losses: number = 0,
    public gamesPlayed: number = 0
  ) {}
}
