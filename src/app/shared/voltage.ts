export interface IVoltage {
  U: number;
  R1: number;
  C1: number;
  R2: number;
  C2: number;
}

export class Voltage implements IVoltage {
  constructor(
    public U: number,
    public R1: number,
    public C1: number,
    public R2: number,
    public C2: number
  ) {}
}
