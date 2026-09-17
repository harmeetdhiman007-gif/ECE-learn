import type { PyqPaper, PyqTrackId, PyqTrackMeta } from './types.js';
import { ECE_GENS } from './ece.js';
import { CSE_GENS } from './cse.js';
import { PCB_GENS } from './pcb.js';
import { genPaperQuestions } from './gen.js';
import type { QuestionGen } from './gen.js';

export type { PyqPaper, PyqQuestion, PyqTrackId, PyqTrackMeta } from './types.js';
export const QUESTIONS_PER_PAPER = 65;

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
};

const GENS: Record<PyqTrackId, QuestionGen[]> = {
  ece: ECE_GENS,
  cse: CSE_GENS,
  pcb: PCB_GENS,
};

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
  return paper.exam === 'ECE' ? 'ece' : paper.exam === 'CSE' ? 'cse' : 'pcb';
}