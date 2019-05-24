export interface IHumanBody {
  description: string;
  id: number;
  armLength: number;
  armSurface: number;
  upperBodyLength: number;
  upperBodySurface: number;
  bodyLength: number;
  bodySurface: number;
  legLength: number;
  legSurface: number;
  image: string;
}

export class HumanBody implements IHumanBody {
  constructor(
    public description: string,
    public id: number,
    public armLength: number,
    public armSurface: number,
    public upperBodyLength: number,
    public upperBodySurface: number,
    public bodyLength: number,
    public bodySurface: number,
    public legLength: number,
    public legSurface: number,
    public image: string
  ) {}
}
