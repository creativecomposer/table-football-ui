import { TeamModel } from 'models/team.model';

export class GameModel {
  constructor(
    public description: string = '',
    public team1: TeamModel = new TeamModel(),
    public team2: TeamModel = new TeamModel(),
    public startTime: Date | undefined = undefined,
    public endTime: Date | undefined = undefined,
    public winner: string = ''
  ) {}
}
