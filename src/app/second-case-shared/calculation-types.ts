export class CalculationData {
  u: number;
  r1: number;
  c1: number;
  r2: number;
  c2: number;
  armLength: number;
  armSurface: number;
  bodyLength: number;
  bodySurface: number;
  legLength: number;
  legSurface: number;
}

export class CalculationResult {
  I: number;
  armEnergyDensity: number;
  bodyEnergyDensity: number;
  legEnergyDensity: number;
}
