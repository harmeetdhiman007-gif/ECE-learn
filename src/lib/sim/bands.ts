export const BAND_COLORS: Array<{
  name: string;
  hex: string;
  digit: number;
  mult: number;
}> = [
  { name: 'black', hex: '#111111', digit: 0, mult: 1 },
  { name: 'brown', hex: '#8a4a22', digit: 1, mult: 10 },
  { name: 'red', hex: '#d64545', digit: 2, mult: 100 },
  { name: 'orange', hex: '#f0832d', digit: 3, mult: 1_000 },
  { name: 'yellow', hex: '#f2d53c', digit: 4, mult: 10_000 },
  { name: 'green', hex: '#2e9e5b', digit: 5, mult: 100_000 },
  { name: 'blue', hex: '#3a7fd4', digit: 6, mult: 1_000_000 },
  { name: 'violet', hex: '#7a4fc4', digit: 7, mult: 10_000_000 },
  { name: 'grey', hex: '#8c9198', digit: 8, mult: 1 },
  { name: 'white', hex: '#e8e8e8', digit: 9, mult: 1 },
];

export interface Band { name: string; hex: string }

// Standard E12 values as two-digit mantissas.
const E12 = [10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82];

// Snap any target to the E12 family: mantissa (two digits, 10–99) times a power of ten.
// All real resistors you'll buy belong to this family, so it round-trips cleanly.
export function nearestE12(target: number): number {
  let x = Math.max(10, target);
  let zeros = 0;
  while (x >= 100) {
    x /= 10;
    zeros++;
  }
  let best = E12[0];
  let bestDiff = Infinity;
  for (const v of E12) {
    const diff = Math.abs(v - x);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = v;
    }
  }
  return best * 10 ** zeros;
}

export function resistorBands(value: number): Band[] {
  const v = nearestE12(value);
  let zeros = 0;
  let mantissa = v;
  while (mantissa >= 100) {
    mantissa /= 10;
    zeros++;
  }
  const d1 = Math.floor(mantissa / 10);
  const d2 = Math.floor(mantissa % 10);

  const c = (digit: number) =>
    BAND_COLORS.find((b) => b.digit === digit) ?? BAND_COLORS[0];
  const mult = BAND_COLORS.find((b) => b.mult === 10 ** zeros) ?? BAND_COLORS[0];
  return [
    { name: c(d1).name, hex: c(d1).hex },
    { name: c(d2).name, hex: c(d2).hex },
    { name: mult.name, hex: mult.hex },
    { name: 'gold', hex: '#d8a928' },
  ];
}

// Decodes a 4-band resistor to ohms (band names). gold/silver = multiplier too.
export function decodeBands(bands: string[]): number | null {
  if (bands.length !== 4) return null;
  const [b1, b2, b3] = bands;
  const d1 = BAND_COLORS.find((b) => b.name === b1)?.digit;
  const d2 = BAND_COLORS.find((b) => b.name === b2)?.digit;
  let mult = BAND_COLORS.find((b) => b.name === b3)?.mult;
  if (b3 === 'gold') mult = 0.1;
  if (b3 === 'silver') mult = 0.01;
  if (d1 === undefined || d2 === undefined || mult === undefined) return null;
  return (d1 * 10 + d2) * mult;
}

export function formatOhms(value: number): string {
  if (value >= 1_000_000) return (value / 1_000_000).toFixed(2).replace(/\.?0+$/, '') + ' MΩ';
  if (value >= 1_000) return (value / 1_000).toFixed(1).replace(/\.?0+$/, '') + ' kΩ';
  return String(value) + ' Ω';
}