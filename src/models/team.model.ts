import { PlayerModel } from 'models/player.model';

export class TeamModel {
  constructor(
    public name: string = '',
    public player1: PlayerModel = new PlayerModel(),
    public player2: PlayerModel = new PlayerModel()
  ) {}
}
