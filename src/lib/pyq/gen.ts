import type { PyqDifficulty, PyqQuestion } from './types.js';

export interface GenCtx {
  rng: () => number;
  year: number;
  idx: number;
}

export interface QuestionGen {
  subject: string;
  make: (ctx: GenCtx) => {
    prompt: string;
    choices: string[];
    answer: number;
    aiExplanation: string;
  };
}

export function hashStr(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const pick = <T>(rng: () => number, arr: T[]): T =>
  arr[Math.floor(rng() * arr.length)];

export const int = (rng: () => number, lo: number, hi: number): number =>
  lo + Math.floor(rng() * (hi - lo + 1));

export const fmt = (x: number, d = 1): string => {
  const p = 10 ** d;
  const r = Math.round(x * p) / p;
  return Number.isInteger(r) ? String(r) : r.toFixed(d);
};

/** Deterministic difficulty for a generated question: recall = easy,
 *  one/two-number computation = medium, multi-parameter analysis = hard. */
export function difficultyOf(q: {
  prompt: string;
  choices: string[];
  answer: number;
}): PyqDifficulty {
  const numTokens = (q.prompt.match(/\d[\d.,]*/g) ?? []).length;
  if (!/\d/.test(q.choices[q.answer])) return 'easy';
  return numTokens <= 2 ? 'medium' : 'hard';
}

export function mc(
  rng: () => number,
  correct: string,
  wrong: string[],
): { choices: string[]; answer: number } {
  const seen = new Set<string>([correct]);
  const uniq: string[] = [];
  for (const w of wrong) {
    if (!seen.has(w)) {
      seen.add(w);
      uniq.push(w);
    }
  }
  const pad = ['None of the above', 'All of the above', 'Insufficient information'];
  for (const p of pad) {
    if (uniq.length >= 3) break;
    if (!seen.has(p)) {
      seen.add(p);
      uniq.push(p);
    }
  }
  const all = [{ t: correct, c: true }, ...uniq.slice(0, 3).map((t) => ({ t, c: false }))];
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  return { choices: all.map((o) => o.t), answer: all.findIndex((o) => o.c) };
}

export interface PaperOptions {
  /** Restrict generated questions to one difficulty tier. */
  tier?: PyqDifficulty;
}

export function genPaperQuestions(
  track: string,
  year: number,
  count: number,
  gens: QuestionGen[],
  opts?: PaperOptions,
): PyqQuestion[] {
  const out: PyqQuestion[] = [];
  const usedPrompts = new Set<string>();
  for (let i = 0; i < count; i++) {
    let made: PyqQuestion | null = null;
    let last: PyqQuestion | null = null;
    const passLimit = opts?.tier ? 60 : 1;
    for (let pass = 0; pass < passLimit && !made; pass++) {
      for (let attempt = 0; attempt < 80; attempt++) {
        const rng = mulberry32(hashStr(`pyq:${track}:${year}:${i}:${attempt}:${pass}`));
        const gen =
          attempt < 24 ? gens[Math.floor(rng() * gens.length)] : gens[attempt % gens.length];
        const m = gen.make({ rng, year, idx: i });
        const q: PyqQuestion = {
          id: `${track}-${year}-${i}`,
          section: gen.subject,
          difficulty: difficultyOf(m),
          ...m,
        };
        last = q;
        if (opts?.tier && q.difficulty !== opts.tier) continue;
        if (!usedPrompts.has(q.prompt)) {
          usedPrompts.add(q.prompt);
          made = q;
          break;
        }
      }
    }
    usedPrompts.add(last!.prompt);
    out.push(made ?? last!);
  }
  return out;
}