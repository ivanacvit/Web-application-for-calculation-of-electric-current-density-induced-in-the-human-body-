import { CalculationData, CalculationResult } from './calculation-types';

export function calculationHelper(frequency: number, data: CalculationData): CalculationResult {
  const armResistance = data.armLength / (0.8 * data.armSurface);
  const bodyResistance = data.upperBodyLength / (0.52 * data.upperBodySurface);
  const resistance = 2 * armResistance + bodyResistance;

  const Zc1 = -1 / (2 * Math.PI * frequency * data.c1);
  const Z1Real = (data.r1 * Zc1 * Zc1) / (data.r1 * data.r1 + Zc1 * Zc1);
  const Z1Imaginary = (data.r1 * data.r1 * Zc1) / (data.r1 * data.r1 + Zc1 * Zc1);

  const Zc2 = -1 / (2 * Math.PI * frequency * data.c2);
  const Z2Real = (data.r2 * Zc2 * Zc2) / (data.r2 * data.r2 + Zc2 * Zc2);
  const Z2Imaginary = (data.r2 * data.r2 * Zc2) / (data.r2 * data.r2 + Zc2 * Zc2);

  const ZReal = 2 * Z1Real + 2 * Z2Real + resistance;
  const ZImaginary = 2 * Z1Imaginary + 2 * Z2Imaginary;

  const Z = Math.sqrt(ZReal * ZReal + ZImaginary * ZImaginary);

  const I = data.u / Z;
  const armEnergyDensity = I / data.armSurface;
  const bodyEnergyDensity = I / data.upperBodySurface;

  return {
    I: I,
    armEnergyDensity,
    bodyEnergyDensity,
  };
}

