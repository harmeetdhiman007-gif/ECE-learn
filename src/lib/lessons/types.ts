import type { CircuitModel, Component, Vec } from '../sim/types.js';
import type { CircuitCheck } from '../sim/engine.js';
import type { GateDef } from '../digital.js';

export interface InfoStep {
  type: 'info';
  id: string;
  title: string;
  body: string;
}

export interface QuizStep {
  type: 'quiz';
  id: string;
  prompt: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
  xp: number;
}

export interface CircuitStep {
  type: 'circuit';
  id: string;
  prompt: string;
  instruction: string;
  circuit: CircuitModel;
  task: 'fix-break' | 'build';
  check: CircuitCheck;
  xp: number;
}

// Decode a resistor from its color bands.
export interface BandsStep {
  type: 'bands';
  id: string;
  prompt: string;
  instruction: string;
  value: number; // the resistor value (ohms) being decoded
  explanation: string;
  xp: number;
}

// Put the steps of a process in the correct order.
export interface OrderStep {
  type: 'order';
  id: string;
  prompt: string;
  instruction: string;
  items: string[]; // displayed (shuffled) text
  correctOrder: string[]; // the item text sequence that is correct
  explanation: string;
  xp: number;
}

// Build a working circuit by placing components from a palette onto the bench.
export interface BuildSlot {
  id: string;
  pos: Vec;
  dir: 'v' | 'h';
  required: 'wire' | 'resistor' | 'resistor-high' | 'led' | 'switch' | 'any';
}

export interface BuildStep {
  type: 'build';
  id: string;
  prompt: string;
  instruction: string;
  base: Component[]; // fixed parts (battery, wires, loads already mounted)
  slots: BuildSlot[];
  palette: { label: string; component: Omit<Component, 'a' | 'b'> }[];
  check: CircuitCheck;
  xp: number;
}

// Predict what a logic circuit will output, then watch it fire.
export interface GateStep {
  type: 'gate';
  id: string;
  prompt: string;
  instruction: string;
  gate: GateDef; // the circuit to render (inputs + gate + LED)
  choices: string[];
  correctIndex: number;
  explanation: string;
  xp: number;
}

export type Step =
  | InfoStep
  | QuizStep
  | CircuitStep
  | BandsStep
  | OrderStep
  | BuildStep
  | GateStep;

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  subjectId: string;
  order: number;
  xpReward: number;
  level?: 'basic' | 'intermediate' | 'advanced';
  steps: Step[];
}

export interface Unit {
  id: string;
  title: string;
  lessonIds: string[];
}

export interface Subject {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  lessonIds: string[];
  units?: Unit[];
}