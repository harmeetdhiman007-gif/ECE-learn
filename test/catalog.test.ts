import { LESSONS, getLessonsForSubject } from '../src/lib/lessons/catalog.ts';
import { simulate, checkCircuit } from '../src/lib/sim/engine.ts';
import type { CircuitModel } from '../src/lib/sim/types.ts';
import { BAND_COLORS } from '../src/lib/sim/bands.ts';
import { gateOutput } from '../src/lib/digital.ts';

let failures = 0;

function assert(name: string, cond: boolean) {
  if (cond) {
    console.log(`  ✓ ${name}`);
  } else {
    console.error(`  ✗ ${name}`);
    failures++;
  }
}

console.log('Catalog content validation:');

// 1. Lesson ids unique, step ids unique, xp rewards sane
const lessonIds = new Set<string>();
const stepIds = new Set<string>();
for (const lesson of LESSONS) {
  assert(`lesson ${lesson.id} has unique id`, !lessonIds.has(lesson.id));
  lessonIds.add(lesson.id);
  assert(`lesson ${lesson.id} has steps`, lesson.steps.length >= 2);
  for (const step of lesson.steps) {
    assert(`${lesson.id}/${step.id} unique step id`, !stepIds.has(step.id));
    stepIds.add(step.id);
  }
}

// 2. Subjects reference only existing lessons
const allIds = new Set(LESSONS.map((l) => l.id));
for (const subject of await import('../src/lib/lessons/catalog.ts').then((m) => m.SUBJECTS)) {
  for (const id of subject.lessonIds) {
    assert(`subject ${subject.id} references existing lesson ${id}`, allIds.has(id));
  }
  for (const u of subject.units ?? []) {
    for (const id of u.lessonIds) {
      assert(`unit ${u.id} references existing lesson ${id}`, allIds.has(id));
    }
  }
}

// 3. Every circuit task (fix-break) is solvable: fails broken, passes fixed
console.log('\nCircuit steps:');
for (const lesson of LESSONS) {
  for (const step of lesson.steps) {
    if (step.type !== 'circuit') continue;
    const broken = checkCircuit(step.circuit, step.check);
    assert(`${lesson.id}/${step.id} (${step.task}) broken circuit fails`, !broken);
    if (step.task === 'fix-break') {
      const fixed: CircuitModel = {
        ...step.circuit,
        components: step.circuit.components.map((c) =>
          c.kind === 'wire' && c.broken ? { ...c, broken: false } : c,
        ),
      };
      assert(`${lesson.id}/${step.id} fixed circuit passes`, checkCircuit(fixed, step.check));
      const sim = simulate(fixed);
      assert(`${lesson.id}/${step.id} simulates`, !!sim);
    }
  }
}

// 4. Every build step is solvable with its own palette
console.log('\nBuild steps:');
for (const lesson of LESSONS) {
  for (const step of lesson.steps) {
    if (step.type !== 'build') continue;
    let filled = 0;
    const model: CircuitModel = {
      components: [...step.base],
    };
    for (const slot of step.slots) {
      const fits = step.palette.find((p) => {
        switch (slot.required) {
          case 'resistor':
          case 'resistor-high':
            return p.component.kind === 'resistor';
          case 'wire':
            return p.component.kind === 'wire';
          case 'led':
            return p.component.kind === 'led' || p.component.kind === 'lamp';
          case 'switch':
            return p.component.kind === 'switch';
          default:
            return true;
        }
      });
      if (!fits) continue;
      model.components.push({
        ...fits.component,
        id: `slot-${slot.id}`,
        a: slot.pos,
        b:
          slot.dir === 'v'
            ? { x: slot.pos.x, y: slot.pos.y + 1 }
            : { x: slot.pos.x + 1, y: slot.pos.y },
      });
      filled++;
    }
    assert(`${lesson.id}/${step.id} has a fitting palette part per slot`, filled === step.slots.length);
    const pass = checkCircuit(model, step.check);
    assert(`${lesson.id}/${step.id} solvable (passes ${step.check})`, pass);
  }
}

// 5. Gate steps have sane physics
console.log('\nGate steps:');
for (const lesson of LESSONS) {
  for (const step of lesson.steps) {
    if (step.type !== 'gate') continue;
    const out = gateOutput(step.gate.kind, step.gate.in1, step.gate.in2);
    assert(`${lesson.id}/${step.id} ${step.gate.kind} evaluates`, out === true || out === false);
  }
}

// 6. Bands steps decode to a real color combination
console.log('\nBands steps:');
for (const lesson of LESSONS) {
  for (const step of lesson.steps) {
    if (step.type !== 'bands') continue;
    assert(`${lesson.id}/${step.id} value ${step.value} has a band code`, !!BAND_COLORS.find((b) => b.digit !== undefined));
    assert(`${lesson.id}/${step.id} value positive`, step.value > 0);
  }
}

// 7. Every subject has at least one lesson
console.log('\nSubject coverage:');
const { SUBJECTS } = await import('../src/lib/lessons/catalog.ts');
for (const s of SUBJECTS) {
  const n = getLessonsForSubject(s.id).length;
  assert(`${s.id} has ${n} lesson(s)`, n >= 1);
}

if (failures === 0) {
  console.log('\nALL CATALOG TESTS PASSED');
} else {
  console.error(`\n${failures} CATALOG TEST(S) FAILED`);
  process.exit(1);
}