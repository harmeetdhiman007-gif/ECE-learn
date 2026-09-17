import type { Lesson, Step } from '../types.js';

export type Level = 'basic' | 'intermediate' | 'advanced';

export const LEVEL_TEXT: Record<Level, string> = {
  basic: 'Basics',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

export interface QuizSpec {
  p: string;
  c: string[];
  a: number;
  e: string;
}

export interface ModuleSpec {
  key: string;
  unit: string;
  title: string;
  sub?: string;
  level: Level;
  body: string;
  body2?: string;
  qs?: QuizSpec[];
}

export interface UnitGroup {
  id: string;
  title: string;
  lessonIds: string[];
}

export interface GeneratedGroup {
  lessons: Lesson[];
  units: UnitGroup[];
}

export function makeLesson(subjectId: string, m: ModuleSpec, order: number): Lesson {
  const steps: Step[] = [];
  steps.push({ type: 'info', id: `${m.key}-i1`, title: m.title, body: m.body });
  if (m.body2) {
    steps.push({
      type: 'info',
      id: `${m.key}-i2`,
      title: `${m.title} — continued`,
      body: m.body2,
    });
  }
  for (let i = 0; i < (m.qs ?? []).length; i++) {
    const q = (m.qs ?? [])[i];
    steps.push({
      type: 'quiz',
      id: `${m.key}-q${i + 1}`,
      prompt: q.p,
      choices: q.c,
      correctIndex: q.a,
      explanation: q.e,
      xp: 10,
    });
  }
  return {
    id: m.key,
    title: m.title,
    subtitle: m.sub ?? LEVEL_TEXT[m.level],
    subjectId,
    order,
    xpReward: m.level === 'basic' ? 30 : m.level === 'intermediate' ? 50 : 70,
    level: m.level,
    steps,
  };
}

export function build(
  subjectId: string,
  modules: ModuleSpec[],
): GeneratedGroup {
  const lessons = modules.map((m, i) => makeLesson(subjectId, m, i + 1));
  const units: UnitGroup[] = [];
  let cur: UnitGroup | null = null;
  for (const m of modules) {
    if (!cur || cur.title !== m.unit) {
      cur = { id: `g-${subjectId}-u${units.length + 1}`, title: m.unit, lessonIds: [] };
      units.push(cur);
    }
    cur.lessonIds.push(m.key);
  }
  return { lessons, units };
}