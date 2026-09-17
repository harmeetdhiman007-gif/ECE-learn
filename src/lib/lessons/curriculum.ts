import type { GeneratedGroup } from './courses/presets.js';
import { electronics } from './courses/electronics.js';
import { digital } from './courses/digital.js';
import { semiconductors } from './courses/semiconductors.js';
import { embedded } from './courses/embedded.js';
import { programming } from './courses/programming.js';
import { pcb } from './courses/pcb.js';
import { robotics } from './courses/robotics.js';
import { vlsi } from './courses/vlsi.js';

const ALL: Record<string, () => GeneratedGroup> = {
  electronics,
  digital,
  semiconductors,
  embedded,
  programming,
  pcb,
  robotics,
  vlsi,
};

export function generatedLessons() {
  return Object.values(ALL).flatMap((g) => g().lessons);
}

export function generatedUnitsFor(subjectId: string) {
  return ALL[subjectId]()?.units ?? [];
}

export function generatedLessonCount() {
  return generatedLessons().length;
}