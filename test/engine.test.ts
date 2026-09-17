import { simulate, checkCircuit } from '../src/lib/sim/engine.ts';
import type { CircuitModel } from '../src/lib/sim/types.ts';

let failures = 0;

function assert(name: string, cond: boolean) {
  if (cond) {
    console.log(`  ✓ ${name}`);
  } else {
    console.error(`  ✗ ${name}`);
    failures++;
  }
}

function near(a: number, b: number, tol = 1e-4) {
  return Math.abs(a - b) < tol;
}

// 1. Simple series circuit: 9V battery + 330Ω + LED
const series: CircuitModel = {
  components: [
    { id: 'bat1', kind: 'battery', a: { x: 1, y: 1 }, b: { x: 1, y: 4 }, value: 9 },
    { id: 'w1', kind: 'wire', a: { x: 1, y: 1 }, b: { x: 3, y: 1 } },
    { id: 'r1', kind: 'resistor', a: { x: 3, y: 1 }, b: { x: 4, y: 1 }, value: 330 },
    { id: 'led1', kind: 'led', a: { x: 4, y: 1 }, b: { x: 4, y: 4 }, color: '#ffdd00' },
    { id: 'w2', kind: 'wire', a: { x: 4, y: 4 }, b: { x: 1, y: 4 } },
  ],
};

console.log('Series LED circuit:');
const r = simulate(series);
assert('simulation succeeds', r !== null);
assert('LED conducts', (r?.componentCurrents.get('led1') ?? 0) > 0);
const iMa = (r?.componentCurrents.get('led1') ?? 0) * 1000;
console.log(`  LED current ≈ ${iMa.toFixed(2)} mA (expected ~21.2 mA)`);
assert('LED current ≈ 21.2 mA', r !== null && near(iMa, 21.2, 0.5));
assert('checkCircuit led:conducting passes', checkCircuit(series, 'led:conducting'));

// 2. Open circuit (broken wire): LED should NOT conduct
console.log('Broken wire:');
const broken: CircuitModel = {
  components: series.components.map((c) =>
    c.id === 'w2' ? { ...c, broken: true } : c,
  ),
};
const r2 = simulate(broken);
assert('LED does NOT conduct', (r2?.componentCurrents.get('led1') ?? 0) <= 1e-6);
assert('checkCircuit fails', !checkCircuit(broken, 'led:conducting'));

// 3. Pure resistor network ring: 9V across 100Ω should give 90mA
console.log('Ohm test (resistor only):');
const resistorOnly: CircuitModel = {
  components: [
    { id: 'bat1', kind: 'battery', a: { x: 0, y: 0 }, b: { x: 0, y: 2 }, value: 9 },
    { id: 'r1', kind: 'resistor', a: { x: 0, y: 0 }, b: { x: 2, y: 0 }, value: 100 },
    { id: 'r0', kind: 'resistor', a: { x: 2, y: 0 }, b: { x: 2, y: 2 }, value: 0.001 },
    { id: 'w0', kind: 'wire', a: { x: 2, y: 2 }, b: { x: 0, y: 2 } },
  ],
};
const r3 = simulate(resistorOnly);
const iR = r3?.componentCurrents.get('bat1') ?? 0;
console.log(`  Battery current ≈ ${(iR * 1000).toFixed(2)} mA (expected ~90 mA)`);
assert('I ≈ V/R = 9/100 = 90 mA', near(Math.abs(iR) * 1000, 90, 2));

// 4. Switch open blocks current; closed allows it
console.log('Switch:');
const withSwitch: CircuitModel = {
  components: [
    { id: 'bat1', kind: 'battery', a: { x: 0, y: 0 }, b: { x: 0, y: 2 }, value: 9 },
    { id: 'sw1', kind: 'switch', a: { x: 0, y: 0 }, b: { x: 1, y: 0 }, closed: false },
    { id: 'r1', kind: 'resistor', a: { x: 1, y: 0 }, b: { x: 1, y: 2 }, value: 100 },
    { id: 'w1', kind: 'wire', a: { x: 1, y: 2 }, b: { x: 0, y: 2 } },
  ],
};
assert('open switch blocks current', (simulate(withSwitch)?.componentCurrents.get('bat1') ?? 0) < 1e-6);
const closedSw = { ...withSwitch, components: withSwitch.components.map((c) => (c.id === 'sw1' ? { ...c, closed: true } : c)) };
assert('closed switch allows current', Math.abs(simulate(closedSw)?.componentCurrents.get('bat1') ?? 0) > 0.01);

// 5. Two series resistors add
console.log('Series resistors:');
const twoR: CircuitModel = {
  components: [
    { id: 'bat1', kind: 'battery', a: { x: 0, y: 0 }, b: { x: 0, y: 2 }, value: 10 },
    { id: 'r1', kind: 'resistor', a: { x: 0, y: 0 }, b: { x: 1, y: 0 }, value: 100 },
    { id: 'r2', kind: 'resistor', a: { x: 1, y: 0 }, b: { x: 1, y: 2 }, value: 100 },
    { id: 'w1', kind: 'wire', a: { x: 1, y: 2 }, b: { x: 0, y: 2 } },
  ],
};
const iTwo = simulate(twoR)?.componentCurrents.get('bat1') ?? 0;
console.log(`  I = ${(iTwo * 1000).toFixed(2)} mA (expected 50 mA)`);
assert('R_total = 200Ω → I = 50 mA', near(Math.abs(iTwo) * 1000, 50, 2));

if (failures === 0) {
  console.log('\nALL TESTS PASSED');
} else {
  console.error(`\n${failures} TEST(S) FAILED`);
  process.exit(1);
}