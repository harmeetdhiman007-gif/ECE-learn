export type GateKind = 'and' | 'or' | 'not' | 'nand' | 'nor' | 'xor';

export interface GateDef {
  kind: GateKind;
  in1: boolean | null; // null = left input, false/true = forced level
  in2: boolean | null;
}

export function gateOutput(kind: GateKind, a: boolean, b: boolean): boolean {
  switch (kind) {
    case 'and':
      return a && b;
    case 'or':
      return a || b;
    case 'nand':
      return !(a && b);
    case 'nor':
      return !(a || b);
    case 'xor':
      return a !== b;
    case 'not':
      return !a;
  }
}

export const GATE_LABELS: Record<GateKind, string> = {
  and: 'AND',
  or: 'OR',
  not: 'NOT',
  nand: 'NAND',
  nor: 'NOR',
  xor: 'XOR',
};

export const GATE_LEGEND: Record<GateKind, string> = {
  and: 'Output ON only when BOTH inputs are ON',
  or: 'Output ON when EITHER input is ON',
  not: 'Inverts the input (1 → 0, 0 → 1)',
  nand: 'Output OFF only when BOTH inputs are ON',
  nor: 'Output ON only when NEITHER input is ON',
  xor: 'Output ON when inputs DIFFER',
};

export function gateTruthTable(kind: GateKind): [boolean, boolean, boolean][] {
  const rows: [boolean, boolean, boolean][] = [];
  for (const a of [false, true]) {
    for (const b of [false, true]) {
      rows.push([a, b, gateOutput(kind, a, b)]);
    }
  }
  return rows;
}