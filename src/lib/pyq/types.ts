export type PyqTrackId = 'ece' | 'cse' | 'pcb';
export type PyqExam = 'ECE' | 'CSE' | 'PCB';

export interface PyqQuestion {
  id: string;
  section: string;
  prompt: string;
  choices: string[];
  answer: number;
  aiExplanation: string;
}

export interface PyqPaper {
  year: number;
  exam: PyqExam;
  paperWord: 'Paper' | 'Edition';
  questions: PyqQuestion[];
}

export interface PyqTrackMeta {
  id: PyqTrackId;
  exam: PyqExam;
  title: string;
  emoji: string;
  blurb: string;
  gate: boolean;
  paperWord: 'Paper' | 'Edition';
  years: number[];
}