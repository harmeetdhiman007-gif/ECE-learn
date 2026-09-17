import type { PyqDifficulty, PyqPaper, PyqQuestion, PyqTrackId, PyqTrackMeta } from './types.js';
import { ECE_GENS } from './ece.js';
import { CSE_GENS } from './cse.js';
import { PCB_GENS } from './pcb.js';
import { VLSI_GENS } from './vlsi.js';
import { hashStr, mulberry32, difficultyOf, genPaperQuestions } from './gen.js';
import type { QuestionGen } from './gen.js';

export type {
  PyqDifficulty,
  PyqPaper,
  PyqQuestion,
  PyqTrackId,
  PyqTrackMeta,
} from './types.js';
export const QUESTIONS_PER_PAPER = 65;
export const PRACTICE_SET_SIZE = 25;

const GATE_YEARS = Array.from({ length: 20 }, (_, i) => 2005 + i); // 2005–2024
const PCB_EDITIONS = Array.from({ length: 20 }, (_, i) => i + 1); // 1–20

export const PYQ_TRACKS: Record<PyqTrackId, PyqTrackMeta> = {
  ece: {
    id: 'ece',
    exam: 'ECE',
    title: 'Electronics & Communication',
    emoji: '🔌',
    blurb:
      'Network Theory, Electronics, Analog & Digital, Signals, Control, Comm, Measurements — the full ECE paper split, 2005–2024.',
    gate: true,
    paperWord: 'Paper',
    years: GATE_YEARS,
  },
  cse: {
    id: 'cse',
    exam: 'CSE',
    title: 'Computer Science & IT',
    emoji: '💻',
    blurb:
      'DS & Algorithms, DBMS, OS, Networks, TOC, Compilers, CO, Discrete Math — the full CSE/IT paper split, 2005–2024.',
    gate: true,
    paperWord: 'Paper',
    years: GATE_YEARS,
  },
  pcb: {
    id: 'pcb',
    exam: 'PCB',
    title: 'PCB Design Studio',
    emoji: '📐',
    blurb:
      'Materials, layout & routing, DRC, manufacturing, assembly — board-design practice from the SiliconCAD curriculum.',
    gate: false,
    paperWord: 'Edition',
    years: PCB_EDITIONS,
  },
  vlsi: {
    id: 'vlsi',
    exam: 'VLSI',
    title: 'VLSI, FPGA & Verilog',
    emoji: '⚙️',
    blurb:
      'Verilog HDL, FPGA architecture, flip-flops & FSM, timing, standard cells, and the ASIC flow — chip design practice from the SiliconCAD curriculum.',
    gate: false,
    paperWord: 'Edition',
    years: PCB_EDITIONS,
  },
};

const GENS: Record<PyqTrackId, QuestionGen[]> = {
  ece: ECE_GENS,
  cse: CSE_GENS,
  pcb: PCB_GENS,
  vlsi: VLSI_GENS,
};

/** GATE exam tracks — real exam papers with AI explanations. */
export const GATE_TRACKS: PyqTrackId[] = ['ece', 'cse'];
/** Design studios — hands-on tool/design practice, not exam papers. */
export const STUDIO_TRACKS: PyqTrackId[] = ['pcb', 'vlsi'];

/** Route prefix for a track: GATE papers live under /pyq, studios under /studio. */
export function basePathForTrack(track: PyqTrackId): string {
  return PYQ_TRACKS[track].gate ? '/pyq' : '/studio';
}

export function getPyqTrack(id: string | undefined): PyqTrackMeta | null {
  if (!id || !(id in PYQ_TRACKS)) return null;
  return PYQ_TRACKS[id as PyqTrackId];
}

export function getPyqPaper(
  track: string | undefined,
  year: string | undefined,
): PyqPaper | null {
  const meta = getPyqTrack(track);
  if (!meta) return null;
  const y = Number(year);
  if (!meta.years.includes(y)) return null;
  return {
    year: y,
    exam: meta.exam,
    paperWord: meta.paperWord,
    questions: genPaperQuestions(meta.id, y, QUESTIONS_PER_PAPER, GENS[meta.id]),
  };
}

/** Total question count for a track (all papers × per-paper questions). */
export function countTrackQuestions(track: PyqTrackId): number {
  return PYQ_TRACKS[track].years.length * QUESTIONS_PER_PAPER;
}

export function trackOf(paper: PyqPaper): PyqTrackId {
  switch (paper.exam) {
    case 'ECE':
      return 'ece';
    case 'CSE':
      return 'cse';
    case 'VLSI':
      return 'vlsi';
    default:
      return 'pcb';
  }
}

export const PYQ_TIER_LABEL: Record<PyqDifficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

/** Question-count mix by difficulty for one representative paper of a track. */
export function pyqDifficultyMix(
  track: PyqTrackId,
): Record<PyqDifficulty, number> {
  const mix: Record<PyqDifficulty, number> = { easy: 0, medium: 0, hard: 0 };
  const paper = getPyqPaper(track, String(PYQ_TRACKS[track].years[0]));
  for (const q of paper?.questions ?? []) mix[q.difficulty]++;
  return mix;
}

/** Ordered subject list for a track, derived from its question families. */
export function getPyqSubjects(track: PyqTrackId): string[] {
  const seen: string[] = [];
  for (const g of GENS[track]) {
    if (!seen.includes(g.subject)) seen.push(g.subject);
  }
  return seen;
}

/** Generate `want` fresh questions from `gens`, all of one tier, all unique.
 *  Stops early when the family pool runs dry — the caller can then scale the
 *  set size down. Basis of subject practice and tier availability checks. */
export function generateTiered(
  gens: QuestionGen[],
  tier: PyqDifficulty,
  want: number,
  seedKey: string,
): PyqQuestion[] {
  if (gens.length === 0) return [];
  const out: PyqQuestion[] = [];
  const seen = new Set<string>();
  for (let pass = 0; pass < 240 && out.length < want; pass++) {
    const rng = mulberry32(hashStr(`${seedKey}:${pass}`));
    const gen = gens[Math.floor(rng() * gens.length)];
    const m = gen.make({ rng, year: 0, idx: pass });
    const q: PyqQuestion = {
      id: `${seedKey}-${pass}`,
      section: gen.subject,
      difficulty: difficultyOf(m),
      ...m,
    };
    if (q.difficulty !== tier || seen.has(q.prompt)) continue;
    seen.add(q.prompt);
    out.push(q);
  }
  return out;
}

/** Subject-wise tier availability for a track, probed with real generation. */
export function subjectsWithTiers(
  track: PyqTrackId,
): Array<{ subject: string; tiers: PyqDifficulty[] }> {
  const out: Array<{ subject: string; tiers: PyqDifficulty[] }> = [];
  const allTiers: PyqDifficulty[] = ['easy', 'medium', 'hard'];
  for (const subject of getPyqSubjects(track)) {
    const gens = GENS[track].filter((g) => g.subject === subject);
    const counts = new Map<PyqDifficulty, number>();
    for (const t of allTiers) {
      counts.set(t, generateTiered(gens, t, 6, `${track}:${subject}:${t}`).length);
    }
    let tiers = allTiers.filter((t) => (counts.get(t) ?? 0) >= 4);
    if (tiers.length === 0) {
      const best = allTiers
        .slice()
        .sort((a, b) => (counts.get(b) ?? 0) - (counts.get(a) ?? 0))[0];
      if ((counts.get(best) ?? 0) > 0) tiers = [best];
    }
    out.push({ subject, tiers });
  }
  return out;
}

/** On-demand unique practice set for one subject & tier, so tiers scale to
 *  thousands of fresh questions per track without extra papers. The set is
 *  as large as the pool allows, up to `count`. */
export function getPyqPractice(
  track: PyqTrackId,
  subject: string,
  tier: PyqDifficulty,
  count = PRACTICE_SET_SIZE,
): PyqQuestion[] {
  const gens = GENS[track].filter((g) => g.subject === subject);
  if (gens.length === 0) return [];
  return generateTiered(gens, tier, count, `${track}:${subject}:${tier}`);
}

export function makePracticePaper(
  track: PyqTrackId,
  subject: string,
  tier: PyqDifficulty,
): PyqPaper | null {
  const meta = PYQ_TRACKS[track];
  const questions = getPyqPractice(track, subject, tier);
  if (questions.length === 0) return null;
  return {
    year: 1,
    exam: meta.exam,
    paperWord: 'Set',
    title: `${meta.emoji} Practice · ${subject} · ${PYQ_TIER_LABEL[tier]}`,
    questions,
  };
}