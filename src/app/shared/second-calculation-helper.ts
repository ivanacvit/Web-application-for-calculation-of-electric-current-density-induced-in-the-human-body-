export function calculationHelper(
  frequency: number,
  u: number,
  r1: number,
  c1: number,
  r2: number,
  c2: number,
  armLength: number,
  armSurface: number,
  bodyLength: number,
  bodySurface: number,
  legLength: number,
  legSurface: number
) {
  const armResistance = armLength / (0.8 * armSurface);
  const bodyResistance = bodyLength / (0.52 * bodySurface);
  const legResistance = legLength / (0.8 * legSurface);
  const resistance = armResistance + bodyResistance + 0.5 * legResistance;

  const Zc1 = -1 / (2 * Math.PI * frequency * c1);
  const Z1Real = (r1 * Zc1 * Zc1) / (r1 * r1 + Zc1 * Zc1);
  const Z1Imaginary = (r1 * r1 * Zc1) / (r1 * r1 + Zc1 * Zc1);

  const Zc2 = -1 / (2 * Math.PI * frequency * c2);
  const Z2Real = (r2 * Zc2 * Zc2) / (r2 * r2 + Zc2 * Zc2);
  const Z2Imaginary = (r2 * r2 * Zc2) / (r2 * r2 + Zc2 * Zc2);

  const ZReal = 2 * Z1Real + 2 * Z2Real + resistance;
  const ZImaginary = 2 * Z1Imaginary + 2 * Z2Imaginary;

  const Z = Math.sqrt(ZReal * ZReal + ZImaginary * ZImaginary);

  const I = u / Z;
  const armEnergyDensity = I / armSurface;
  const bodyEnergyDensity = I / bodySurface;
  const legEnergyDensity = I / legSurface;

  console.log(
    'I, izracunaj gustocaStrujeKrozRuku, gustocaStrujeKrozTrup, gustocaStrujeKrozNogu:',
    I,
    armEnergyDensity,
    bodyEnergyDensity,
    legEnergyDensity
  );

  return {
    I: I,
    armEnergyDensity,
    bodyEnergyDensity,
    legEnergyDensity
  };
}
