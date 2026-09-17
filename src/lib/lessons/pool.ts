import { ALL_LESSONS } from './catalog.js';
import type { Lesson, QuizStep, GateStep } from './types.js';

export interface PoolQuestion {
  stepId: string;
  lessonId: string;
  prompt: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
  xp: number;
}

function fromLesson(
  lesson: Lesson,
  step: QuizStep | GateStep,
): PoolQuestion {
  return {
    stepId: step.id,
    lessonId: lesson.id,
    prompt: step.prompt,
    choices: step.choices,
    correctIndex: step.correctIndex,
    explanation: step.explanation,
    xp: step.xp,
  };
}

// Standalone questions that keep Duel and Charge sessions varied beyond the
// lesson steps themselves.
const EXTRA_QUESTIONS: PoolQuestion[] = [
  {
    stepId: 'extra-charge',
    lessonId: 'l2',
    prompt: 'What do the electrons themselves do as they carry current?',
    choices: [
      'They move through the wire slowly, bumping along',
      'They teleport instantly',
      'They stay perfectly still',
      'They orbit the battery',
    ],
    correctIndex: 0,
    explanation:
      'Electrons drift slowly through the conductor, but the electric field pushes the whole chain at once — that is why the light seems instant.',
    xp: 10,
  },
  {
    stepId: 'extra-ohms',
    lessonId: 'l3',
    prompt: 'A 9V battery drives a 450Ω resistor. What current flows?',
    choices: ['50mA', '20mA', '100mA', '5mA'],
    correctIndex: 1,
    explanation: 'I = V ÷ R = 9 ÷ 450 = 0.02A = 20mA.',
    xp: 10,
  },
  {
    stepId: 'extra-series',
    lessonId: 'l4',
    prompt: 'In a series circuit, how much current flows through each component?',
    choices: [
      'The same current through all of them',
      'Less in the later ones',
      'More in the nearer ones',
      'Zero',
    ],
    correctIndex: 0,
    explanation:
      'Series means a single path — the same current flows through every component.',
    xp: 10,
  },
  {
    stepId: 'extra-switch',
    lessonId: 'l-switch',
    prompt: 'When a simple SPST switch is OPEN, what happens to the circuit?',
    choices: ['Current flows freely', 'Current is blocked', 'Voltage doubles', 'The battery charges'],
    correctIndex: 1,
    explanation:
      'An open switch is an air gap: no complete path exists, so current stops — like a valve turned off.',
    xp: 10,
  },
  {
    stepId: 'extra-led',
    lessonId: 'l-diode',
    prompt: 'An LED wired BACKWARDS in a simple 9V circuit will:',
    choices: ['Light up brighter', 'Block current and stay dark', 'Short the battery', 'Turn red'],
    correctIndex: 1,
    explanation:
      'LEDs are diodes: reverse biased they block current, so nothing lights (and nothing is damaged).',
    xp: 10,
  },
  {
    stepId: 'extra-tolerance',
    lessonId: 'l-bands',
    prompt: 'The fourth band on a 4-band resistor is GOLD. What does it tell you?',
    choices: ['The value is in gold', '±5% tolerance', 'It is a fuse', 'The wattage'],
    correctIndex: 1,
    explanation:
      'Gold = ±5% tolerance; silver = ±10%. The first three bands encode the digits and multiplier.',
    xp: 10,
  },
  {
    stepId: 'extra-pwm',
    lessonId: 'l-pwm',
    prompt: 'To dim an LED from a purely digital pin, you would most likely use:',
    choices: ['PWM', 'A bigger resistor only', 'More batteries', 'A magnet'],
    correctIndex: 0,
    explanation:
      'PWM switches the pin on and off thousands of times per second; the duty cycle sets the perceived brightness.',
    xp: 10,
  },
  {
    stepId: 'extra-loop',
    lessonId: 'l-loop',
    prompt: 'How many times does for (int i = 0; i < 4; i++) run its body?',
    choices: ['3', '4', '5', 'Forever'],
    correctIndex: 1,
    explanation: 'i = 0, 1, 2, 3 → four passes; at i = 4 the condition fails.',
    xp: 10,
  },
];

export function quizPool(): PoolQuestion[] {
  const out: PoolQuestion[] = [];
  for (const lesson of ALL_LESSONS) {
    for (const step of lesson.steps) {
      if (step.type === 'quiz' || step.type === 'gate') {
        out.push(fromLesson(lesson, step));
      }
    }
  }
  return out.concat(EXTRA_QUESTIONS);
}

export function quizPoolSize(): number {
  return quizPool().length;
}

export function randomQuizQuestions(
  n: number,
  excludeIds?: Set<string>,
): PoolQuestion[] {
  const pool = quizPool().filter((q) => !excludeIds?.has(q.stepId));
  if (pool.length === 0) return [];
  const out: PoolQuestion[] = [];
  const used = new Set<number>();
  let guard = 0;
  while (out.length < Math.min(n, pool.length) && guard++ < 200) {
    const idx = Math.floor(Math.random() * pool.length);
    if (used.has(idx)) continue;
    used.add(idx);
    out.push(pool[idx]);
  }
  return out;
}

export function getPoolQuestion(stepId: string): PoolQuestion | undefined {
  return quizPool().find((q) => q.stepId === stepId);
}