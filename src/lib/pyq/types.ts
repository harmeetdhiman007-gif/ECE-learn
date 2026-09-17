export type PyqTrackId = 'ece' | 'cse' | 'pcb' | 'vlsi';
export type PyqExam = 'ECE' | 'CSE' | 'PCB' | 'VLSI';
export type PyqDifficulty = 'easy' | 'medium' | 'hard';

export interface PyqQuestion {
  id: string;
  section: string;
  difficulty: PyqDifficulty;
  prompt: string;
  choices: string[];
  answer: number;
  aiExplanation: string;
}

export interface PyqPaper {
  year: number;
  exam: PyqExam;
  paperWord: 'Paper' | 'Edition' | 'Set';
  /** Custom display heading (used by synthetic practice papers). */
  title?: string;
  questions: PyqQuestion[];
}

export interface PyqTrackMeta {
  id: PyqTrackId;
  exam: PyqExam;
  title: string;
  emoji: string;
  blurb: string;
  gate: boolean;
  paperWord: 'Paper' | 'Edition' | 'Set';
  years: number[];
}