export interface LevelInfo {
  level: number;
  title: string;
  xpIntoLevel: number;
  xpNeededForNext: number;
  totalXp: number;
}

const TITLES: string[] = [
  'Circuit Novice',
  'Circuit Rookie',
  'Wire Whisker',
  'Current Muse',
  'Circuit Apprentice',
  'Charge Chaser',
  'Ohm Enthusiast',
  'Solder Surgeon',
  'Volt Vanguard',
  'Circuit Engineer',
  'Bench Boss',
  'Ampere Ace',
  'Logic Legend',
  'Magnificent Mechanic',
  'Transistor Titan',
  'Embedded Elite',
  'Chip Champion',
  'Signal Sage',
  'PCB Pioneer',
  'Robot Ruler',
];

export function totalXpForLevel(level: number): number {
  if (level <= 1) return 0;
  let total = 0;
  for (let i = 1; i < level; i++) {
    total += 100 + (i - 1) * 50;
  }
  return total;
}

export function xpForLevel(level: number): number {
  return level <= 1 ? 100 : 100 + (level - 1) * 50;
}

export function getLevel(xp: number): LevelInfo {
  let level = 1;
  while (totalXpForLevel(level + 1) <= xp) level++;
  const floor = totalXpForLevel(level);
  const next = totalXpForLevel(level + 1);
  const need = next - floor;
  return {
    level,
    title: TITLES[Math.min(level - 1, TITLES.length - 1)],
    xpIntoLevel: xp - floor,
    xpNeededForNext: need,
    totalXp: xp,
  };
}

export function xpToNextLevel(xp: number): number {
  const info = getLevel(xp);
  return info.xpNeededForNext - info.xpIntoLevel;
}