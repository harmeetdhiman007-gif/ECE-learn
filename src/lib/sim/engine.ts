import type { CircuitModel, SimResult, Vec } from './types.js';

// ── helpers ──────────────────────────────────────────────────────────
function vecKey(v: Vec): string {
  return `${Math.round(v.x)},${Math.round(v.y)}`;
}

class UF {
  private p = new Map<string, string>();
  private r = new Map<string, number>();

  make(x: string): void {
    if (!this.p.has(x)) {
      this.p.set(x, x);
      this.r.set(x, 0);
    }
  }

  find(x: string): string {
    this.make(x);
    let root = x;
    while (this.p.get(root) !== root) root = this.p.get(root)!;
    let cur = x;
    while (this.p.get(cur) !== cur) {
      const nxt = this.p.get(cur)!;
      this.p.set(cur, root);
      cur = nxt;
    }
    return root;
  }

  union(a: string, b: string): void {
    this.make(a);
    this.make(b);
    const ra = this.find(a);
    const rb = this.find(b);
    if (ra === rb) return;
    if ((this.r.get(ra) ?? 0) < (this.r.get(rb) ?? 0)) {
      this.p.set(ra, rb);
    } else if ((this.r.get(ra) ?? 0) > (this.r.get(rb) ?? 0)) {
      this.p.set(rb, ra);
    } else {
      this.p.set(rb, ra);
      this.r.set(ra, (this.r.get(ra) ?? 0) + 1);
    }
  }
}

// ── Gaussian elimination with partial pivoting ───────────────────────
function solve(A: number[][], b: number[]): number[] | null {
  const n = A.length;
  const aug = A.map((row, i) => [...row, b[i]]);

  for (let col = 0; col < n; col++) {
    let maxRow = col;
    let maxVal = Math.abs(aug[col][col]);
    for (let row = col + 1; row < n; row++) {
      const v = Math.abs(aug[row][col]);
      if (v > maxVal) {
        maxVal = v;
        maxRow = row;
      }
    }
    if (maxVal < 1e-12) return null;
    if (maxRow !== col) {
      const tmp = aug[col];
      aug[col] = aug[maxRow];
      aug[maxRow] = tmp;
    }

    const pivot = aug[col][col];
    for (let row = col + 1; row < n; row++) {
      const f = aug[row][col] / pivot;
      for (let k = col; k <= n; k++) aug[row][k] -= f * aug[col][k];
    }
  }

  const x = new Array<number>(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let sum = aug[i][n];
    for (let j = i + 1; j < n; j++) sum -= aug[i][j] * x[j];
    x[i] = sum / aug[i][i];
  }
  return x;
}

// ── MNA simulator ────────────────────────────────────────────────────
export function simulate(model: CircuitModel, maxIter = 5): SimResult | null {
  const uf = new UF();

  // Build union-find from unbroken wires
  for (const c of model.components) {
    uf.make(vecKey(c.a));
    uf.make(vecKey(c.b));
    if (c.kind === 'wire' && !c.broken) uf.union(vecKey(c.a), vecKey(c.b));
  }

  // Ground: negative terminal of first battery, else first pin
  const firstBat = model.components.find((c) => c.kind === 'battery');
  const groundRaw = model.ground
    ? vecKey(model.ground)
    : firstBat
      ? vecKey(firstBat.b)
      : model.components.length > 0
        ? vecKey(model.components[0].a)
        : '0,0';
  const groundCanon = uf.find(groundRaw);

  // Collect all canonical node keys
  const canonSet = new Set<string>();
  for (const c of model.components) {
    canonSet.add(uf.find(vecKey(c.a)));
    canonSet.add(uf.find(vecKey(c.b)));
  }
  canonSet.add(groundCanon);

  // Map canonical → matrix index (ground = -1)
  const nodeIdx = new Map<string, number>();
  let n = 0;
  for (const k of canonSet) {
    nodeIdx.set(k, k === groundCanon ? -1 : n++);
  }

  const ni = (coord: Vec): number => nodeIdx.get(uf.find(vecKey(coord))) ?? -1;

  // Track LED / lamp on/off states (iterative convergence)
  const ledOn = new Map<string, boolean>();
  for (const c of model.components) {
    if (c.kind === 'led' || c.kind === 'lamp') ledOn.set(c.id, true);
  }

  for (let iter = 0; iter < maxIter; iter++) {
    // Collect active voltage sources
    const vs: { id: string; pi: number; mi: number; V: number }[] = [];
    for (const c of model.components) {
      const pi = ni(c.a);
      const mi = ni(c.b);
      if (c.kind === 'battery') {
        vs.push({ id: c.id, pi, mi, V: c.value ?? 9 });
      } else if ((c.kind === 'led' || c.kind === 'lamp') && ledOn.get(c.id)) {
        vs.push({ id: c.id, pi, mi, V: c.kind === 'led' ? 2.0 : 1.0 });
      }
    }

    const m = vs.length;
    const size = n + m;
    if (size === 0) break;

    const A: number[][] = Array.from({ length: size }, () =>
      new Array<number>(size).fill(0),
    );
    const b = new Array<number>(size).fill(0);

    // Stamp resistive elements (skip broken wires)
    for (const c of model.components) {
      if (
        c.kind === 'resistor' ||
        (c.kind === 'wire' && !c.broken) ||
        c.kind === 'switch'
      ) {
        const R =
          c.kind === 'wire'
            ? 0.001
            : c.kind === 'switch'
              ? (c.closed ?? true)
                ? 0.001
                : 1e9
              : (c.value ?? 1000);
        const G = 1 / R;
        const i = ni(c.a);
        const j = ni(c.b);
        if (i >= 0) A[i][i] += G;
        if (j >= 0) A[j][j] += G;
        if (i >= 0 && j >= 0) {
          A[i][j] -= G;
          A[j][i] -= G;
        }
      }
    }

    // Stamp voltage sources
    for (let k = 0; k < m; k++) {
      const { pi, mi, V } = vs[k];
      const row = n + k;
      if (pi >= 0) {
        A[pi][row] += 1;
        A[row][pi] += 1;
      }
      if (mi >= 0) {
        A[mi][row] -= 1;
        A[row][mi] -= 1;
      }
      b[row] = V;
    }

    const x = solve(A, b);
    if (!x) return null;

    // Check LED convergence
    let changed = false;
    for (let k = 0; k < m; k++) {
      if (ledOn.has(vs[k].id)) {
        const on = x[n + k] > 1e-6;
        if (ledOn.get(vs[k].id) !== on) {
          ledOn.set(vs[k].id, on);
          changed = true;
        }
      }
    }

    if (!changed) {
      const nodeVoltages = new Map<string, number>();
      for (const [key, idx] of nodeIdx) {
        nodeVoltages.set(key, idx >= 0 ? x[idx] : 0);
      }

      const componentCurrents = new Map<string, number>();
      const componentPowers = new Map<string, number>();
      for (let k = 0; k < m; k++) {
        componentCurrents.set(vs[k].id, x[n + k]);
      }

      // Power for resistive elements
      for (const c of model.components) {
        if (c.kind === 'resistor' || c.kind === 'switch') {
          const vi = ni(c.a) >= 0 ? x[ni(c.a)] : 0;
          const vj = ni(c.b) >= 0 ? x[ni(c.b)] : 0;
          const R =
            c.kind === 'switch'
              ? (c.closed ?? true)
                ? 0.001
                : 1e9
              : (c.value ?? 1000);
          componentPowers.set(c.id, (vi - vj) ** 2 / R);
        }
      }

      return { nodeVoltages, componentCurrents, componentPowers };
    }
  }
  return null;
}

// ── Circuit checks for lessons ───────────────────────────────────────
export type CircuitCheck =
  | 'led:conducting'
  | 'led:protected'
  | 'led:dim'
  | 'no-break'
  | 'circuit:complete';

export function checkCircuit(
  model: CircuitModel,
  check: CircuitCheck,
): boolean {
  switch (check) {
    case 'led:conducting': {
      const result = simulate(model);
      if (!result) return false;
      for (const c of model.components) {
        if (c.kind === 'led' || c.kind === 'lamp') {
          if ((result.componentCurrents.get(c.id) ?? 0) > 1e-6) return true;
        }
      }
      return false;
    }
    case 'led:protected': {
      // LED conducts AND at least one resistor is carrying current.
      if (!checkCircuit(model, 'led:conducting')) return false;
      const result = simulate(model);
      if (!result) return false;
      for (const c of model.components) {
        if (c.kind === 'resistor' && (result.componentPowers.get(c.id) ?? 0) > 1e-9) {
          return true;
        }
      }
      return false;
    }
    case 'led:dim': {
      // LED conducts within a safe 25 mA limit (so the chosen resistor is big enough).
      const result = simulate(model);
      if (!result) return false;
      let on = false;
      for (const c of model.components) {
        if (c.kind === 'led' || c.kind === 'lamp') {
          const i = result.componentCurrents.get(c.id) ?? 0;
          if (i > 1e-6) on = true;
          if (i > 0.025) return false;
        }
      }
      return on;
    }
    case 'no-break':
      return !model.components.some((c) => c.kind === 'wire' && c.broken);
    case 'circuit:complete': {
      const result = simulate(model);
      return result !== null && result.componentCurrents.size > 0;
    }
  }
}
