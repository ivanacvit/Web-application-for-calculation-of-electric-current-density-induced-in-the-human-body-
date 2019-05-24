export function calculate(
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
  const Z1_real = (r1 * Zc1 * Zc1) / (r1 * r1 + Zc1 * Zc1);
  const Z1_imaginary = (r1 * r1 * Zc1) / (r1 * r1 + Zc1 * Zc1);

  const Zc2 = -1 / (2 * Math.PI * frequency * c2);
  const Z2_real = (r2 * Zc2 * Zc2) / (r2 * r2 + Zc2 * Zc2);
  const Z2_imaginary = (r2 * r2 * Zc2) / (r2 * r2 + Zc2 * Zc2);

  const Z_real = 2 * Z1_real + 2 * Z2_real + resistance;
  const Z_imaginary = 2 * Z1_imaginary + 2 * Z2_imaginary;

  const Z = Math.sqrt(Z_real * Z_real + Z_imaginary * Z_imaginary);

  const I = u / Z;
  const armEnergyDensity = I / armSurface;
  const bodyEnergyDensity = I / bodySurface;
  const legEnergyDensity = I / legSurface;

  console.log(
    "I, izracunaj gustocaStrujeKrozRuku, gustocaStrujeKrozTrup, gustocaStrujeKrozNogu:",
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
