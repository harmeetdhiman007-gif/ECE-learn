import { LESSONS } from '../lessons/catalog.js';

export interface AchievementInput {
  xp: number;
  coins: number;
  streak: number;
  completedLessonIds: string[];
  completedStepIds: string[];
  duelsWon: number;
  labBuilds: number;
}

export interface Achievement {
  id: string;
  emoji: string;
  title: string;
  description: string;
}

export interface AchievementWithState extends Achievement {
  unlocked: boolean;
}

const gateStepIds = LESSONS.flatMap((l) =>
  l.steps.filter((s) => s.type === 'gate').map((s) => s.id),
);
const circuitStepIds = LESSONS.flatMap((s) =>
  s.steps.filter((st) => st.type === 'circuit').map((st) => st.id),
);

const DEFS: (Achievement & {
  test: (s: AchievementInput) => boolean;
})[] = [
  {
    id: 'first-spark',
    emoji: '🌱',
    title: 'First Spark',
    description: 'Complete your first lesson.',
    test: (s) => s.completedLessonIds.length >= 1,
  },
  {
    id: 'curriculum',
    emoji: '⚡',
    title: 'Curriculum',
    description: 'Complete 5 lessons.',
    test: (s) => s.completedLessonIds.length >= 5,
  },
  {
    id: 'graduate',
    emoji: '🎓',
    title: 'Graduate',
    description: `Complete all ${LESSONS.length} lessons.`,
    test: (s) => s.completedLessonIds.length >= LESSONS.length,
  },
  {
    id: 'volt',
    emoji: '🔋',
    title: 'Charged',
    description: 'Bank 200 XP.',
    test: (s) => s.xp >= 200,
  },
  {
    id: 'watt',
    emoji: '⚡',
    title: 'Wattpower',
    description: 'Bank 1,000 XP.',
    test: (s) => s.xp >= 1000,
  },
  {
    id: 'kilowatt',
    emoji: '🔥',
    title: 'Kilowatt',
    description: 'Bank 3,000 XP.',
    test: (s) => s.xp >= 3000,
  },
  {
    id: 'streak-3',
    emoji: '🔥',
    title: 'On Fire',
    description: 'Reach a 3-day streak.',
    test: (s) => s.streak >= 3,
  },
  {
    id: 'streak-7',
    emoji: '📈',
    title: 'Hot Streak',
    description: 'Reach a 7-day streak.',
    test: (s) => s.streak >= 7,
  },
  {
    id: 'streak-30',
    emoji: '👑',
    title: 'Legend',
    description: 'Reach a 30-day streak.',
    test: (s) => s.streak >= 30,
  },
  {
    id: 'rich',
    emoji: '🪙',
    title: 'Coin Hoarder',
    description: 'Hold 500 coins.',
    test: (s) => s.coins >= 500,
  },
  {
    id: 'duelist',
    emoji: '⚔️',
    title: 'Duelist',
    description: 'Win your first trainer duel.',
    test: (s) => s.duelsWon >= 1,
  },
  {
    id: 'town-champion',
    emoji: '🎖️',
    title: 'Town Champion',
    description: 'Win 5 trainer duels.',
    test: (s) => s.duelsWon >= 5,
  },
  {
    id: 'tinkerer',
    emoji: '🔧',
    title: 'Tinkerer',
    description: 'Save 3 of your own lab circuits.',
    test: (s) => s.labBuilds >= 3,
  },
  {
    id: 'volt-whisperer',
    emoji: '🧪',
    title: 'Volt Whisperer',
    description: 'Solve a circuit puzzle.',
    test: (s) =>
      s.completedStepIds.filter((id) => circuitStepIds.includes(id)).length >= 1,
  },
  {
    id: 'circuit-breaker',
    emoji: '🤖',
    title: 'Circuit Breaker',
    description: 'Solve 5 circuit puzzles.',
    test: (s) =>
      s.completedStepIds.filter((id) => circuitStepIds.includes(id)).length >= 5,
  },
  {
    id: 'gatekeeper',
    emoji: '🧠',
    title: 'Gatekeeper',
    description: 'Complete every digital gate step.',
    test: (s) =>
      gateStepIds.length > 0 &&
      gateStepIds.every((id) => s.completedStepIds.includes(id)),
  },
];

export function getAchievements(s: AchievementInput): AchievementWithState[] {
  return DEFS.map((d) => ({
    id: d.id,
    emoji: d.emoji,
    title: d.title,
    description: d.description,
    unlocked: d.test(s),
  }));
}