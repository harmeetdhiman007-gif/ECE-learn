import type { QuestionGen } from './gen.js';
import { fmt, int, mc, pick } from './gen.js';

function distinct<T>(rng: () => number, arr: T[]): [T, T] {
  const a = pick(rng, arr);
  let b = pick(rng, arr);
  while (b === a) b = pick(rng, arr);
  return [a, b];
}

const GENS: QuestionGen[] = [
  {
    subject: 'Network Theory',
    make: ({ rng }) => {
      const R = pick(rng, [1, 1.5, 2.2, 3.3, 4.7, 6.8, 10]);
      const C = pick(rng, [0.1, 0.22, 0.47, 1, 2.2, 4.7, 10]);
      const tauMs = R * C;
      const ms = tauMs >= 1;
      const v = fmt(ms ? tauMs : tauMs * 1000, ms ? 2 : 0);
      const unit = ms ? 'ms' : 'µs';
      return {
        prompt: `An RC circuit has R = ${R} kΩ and C = ${C} µF. What is its time constant?`,
        ...mc(rng, `${v} ${unit}`, [`${fmt((ms ? tauMs : tauMs * 1000) / 2, ms ? 2 : 0)} ${unit}`, `${fmt((ms ? tauMs : tauMs * 1000) * 2, ms ? 2 : 0)} ${unit}`, `${fmt((ms ? tauMs : tauMs * 1000) * 0.7, ms ? 2 : 0)} ${unit}`]),
        aiExplanation: `τ = R·C = ${R} kΩ × ${C} µF = ${fmt(tauMs, 2)} ms. After one τ the capacitor reaches ~63% of the final voltage.`,
      };
    },
  },
  {
    subject: 'Signals & Systems',
    make: ({ rng }) => {
      const L = pick(rng, [1, 4.7, 10, 22, 47, 100]);
      const C = pick(rng, [0.047, 0.1, 0.47, 1, 4.7, 10]);
      const f0 = 1 / (2 * Math.PI * Math.sqrt((L * 1e-3) * (C * 1e-6)));
      const k = f0 / 1000;
      return {
        prompt: `A series RLC circuit has L = ${L} mH and C = ${C} µF. Its resonant frequency (kHz) is:`,
        ...mc(rng, `${fmt(k, 2)} kHz`, [`${fmt(k / 2, 2)} kHz`, `${fmt(k * 2, 2)} kHz`, `${fmt(k * 0.25, 2)} kHz`]),
        aiExplanation: `f₀ = 1/(2π√(LC)) = 1/(2π√(${L} mH × ${C} µF)) ≈ ${fmt(k, 2)} kHz, where inductive and capacitive reactances cancel.`,
      };
    },
  },
  {
    subject: 'Network Theory',
    make: ({ rng }) => {
      const Vs = pick(rng, [9, 12, 24]);
      const [r1, r2] = distinct(rng, [1, 2.2, 3.3, 4.7, 6.8, 10, 22]);
      const vth = (Vs * r2) / (r1 + r2);
      return {
        prompt: `A ${Vs} V source feeds R1 = ${r1} kΩ in series with R2 = ${r2} kΩ. The Thevenin voltage at their junction is:`,
        ...mc(rng, `${fmt(vth, 1)} V`, [`${fmt((Vs * r1) / (r1 + r2), 1)} V`, `${fmt((Vs * r2) / r1, 1)} V`, `${fmt(Vs / 2, 1)} V`]),
        aiExplanation: `V_th is the open-circuit divider output: V_s·R2/(R1+R2) = ${Vs} × ${r2}/(${r1}+${r2}) ≈ ${fmt(vth, 1)} V.`,
      };
    },
  },
  {
    subject: 'Network Theory',
    make: ({ rng }) => {
      const V = pick(rng, [5, 6, 9, 12, 24]);
      const R = pick(rng, [220, 330, 470, 560, 1000, 2200]);
      const watts = (V * V) / R;
      const mW = watts < 1;
      const val = mW ? watts * 1000 : watts;
      const dec = mW ? 1 : 2;
      return {
        prompt: `A resistor of ${R} Ω carries ${V} V across it. How much power does it dissipate?`,
        ...mc(rng, `${fmt(val, dec)} ${mW ? 'mW' : 'W'}`, [`${fmt(val * 0.5, dec)} ${mW ? 'mW' : 'W'}`, `${fmt(val * 2, dec)} ${mW ? 'mW' : 'W'}`, `V·R = ${fmt(V * R, 0)}`]),
        aiExplanation: `P = V²/R = ${V}²/${R} = ${fmt(watts, 3)} W (≈ ${mW ? fmt(val, dec) + ' mW' : fmt(val, dec) + ' W'}). The V·R option confuses the formula.`,
      };
    },
  },
  {
    subject: 'Network Theory',
    make: ({ rng }) => {
      const It = pick(rng, [10, 20, 30, 50]);
      const [r1, r2] = distinct(rng, [1, 2.2, 3.3, 4.7, 6.8]);
      const i1 = (It * r2) / (r1 + r2);
      return {
        prompt: `Total current ${It} mA splits between parallel R1 = ${r1} kΩ and R2 = ${r2} kΩ. Current through R1 is:`,
        ...mc(rng, `${fmt(i1, 1)} mA`, [`${fmt((It * r1) / (r1 + r2), 1)} mA`, `${fmt((It * r2) / r1, 1)} mA`, `${fmt(i1 * 2, 1)} mA`]),
        aiExplanation: `Current divides inversely to resistance: I₁ = I_t·R2/(R1+R2) = ${It} × ${r2}/(${r1}+${r2}) ≈ ${fmt(i1, 1)} mA.`,
      };
    },
  },
  {
    subject: 'Network Theory',
    make: ({ rng }) => {
      const R = pick(rng, [1, 4.7, 10, 22]);
      const C = pick(rng, [1, 10, 100]);
      const fc = 1 / (2 * Math.PI * (R * 1e3) * (C * 1e-9));
      const k = fc / 1000;
      return {
        prompt: `An RC low-pass filter uses R = ${R} kΩ and C = ${C} nF. Its −3 dB cutoff frequency (kHz) is:`,
        ...mc(rng, `${fmt(k, 2)} kHz`, [`${fmt(k / 2, 2)} kHz`, `${fmt(k * 2, 2)} kHz`, `${fmt(k * 6.28, 2)} kHz`]),
        aiExplanation: `f_c = 1/(2πRC) = 1/(2π × ${R} kΩ × ${C} nF) ≈ ${fmt(k, 2)} kHz — at this point the output is at 0.707 (−3 dB).`,
      };
    },
  },
  {
    subject: 'Analog Circuits',
    make: ({ rng }) => {
      const Rf = pick(rng, [10, 22, 33, 47, 68, 100]);
      const R1 = pick(rng, [1, 2.2, 3.3, 4.7, 10]);
      const af = 1 + Rf / R1;
      return {
        prompt: `A non-inverting op-amp has R_f = ${Rf} kΩ and R₁ = ${R1} kΩ. Its closed-loop gain is:`,
        ...mc(rng, `${fmt(af, 1)}`, [`${fmt(Rf / R1, 1)} (inverting case)`, `${fmt(1 + (2 * Rf) / R1, 1)}`, `${fmt(Rf / R1 - 1, 1)}`]),
        aiExplanation: `Non-inverting gain A = 1 + R_f/R₁ = 1 + ${Rf}/${R1} ≈ ${fmt(af, 1)}. Plain R_f/R₁ is the inverting op-amp case.`,
      };
    },
  },
  {
    subject: 'Analog Circuits',
    make: ({ rng }) => {
      const Rf = pick(rng, [10, 22, 33, 47, 68, 100]);
      const R1 = pick(rng, [1, 2.2, 3.3, 4.7, 10]);
      const g = Rf / R1;
      return {
        prompt: `An inverting op-amp has R_f = ${Rf} kΩ and R₁ = ${R1} kΩ. The magnitude of its gain is:`,
        ...mc(rng, fmt(g, 1), [`${fmt(g + 1, 1)}`, `${fmt(g / 2, 1)}`, `${fmt(g * -1.5, 1)}`]),
        aiExplanation: `Inverting gain A = −R_f/R₁, magnitude ${fmt(g, 1)}; the non-inverting stage would be 1 + ${fmt(g, 1)}.`,
      };
    },
  },
  {
    subject: 'Electronic Devices',
    make: ({ rng }) => {
      const beta = pick(rng, [50, 100, 150, 200]);
      const Ib = pick(rng, [20, 40, 60, 80]);
      const mA = (beta * Ib) / 1000;
      return {
        prompt: `A BJT with β = ${beta} has base current ${Ib} µA. Its collector current is:`,
        ...mc(rng, `${fmt(mA, 2)} mA`, [`${fmt(mA * 2, 2)} mA`, `${fmt(Ib / beta, 3)} mA`, `${fmt(mA / 2, 2)} mA`]),
        aiExplanation: `I_c = β·I_b = ${beta} × ${Ib} µA = ${fmt(beta * Ib, 0)} µA = ${fmt(mA, 2)} mA (1000 µA = 1 mA).`,
      };
    },
  },
  {
    subject: 'Electronic Devices',
    make: ({ rng }) => {
      const Vs = pick(rng, [5, 6, 9, 12]);
      const vfs = [1.8, 2.0, 2.2, 3.2].filter((v) => v < Vs - 0.4);
      const Vf = pick(rng, vfs);
      const R = pick(rng, [220, 330, 470, 680, 1000]);
      const i = ((Vs - Vf) / R) * 1000;
      return {
        prompt: `An LED with forward drop ${Vf} V is fed ${Vs} V through ${R} Ω. The series current is:`,
        ...mc(rng, `${fmt(i, 1)} mA`, [`${fmt((Vs / R) * 1000, 1)} mA`, `${fmt(((Vs + Vf) / R) * 1000, 1)} mA`, `${fmt(i * 2, 1)} mA`]),
        aiExplanation: `I = (V_s − V_f)/R = (${Vs} − ${Vf})/${R} ≈ ${fmt(i, 1)} mA. Forgetting the forward drop overestimates the current.`,
      };
    },
  },
  {
    subject: 'Network Theory',
    make: ({ rng }) => {
      const C = pick(rng, [10, 100, 1000, 10000]);
      const V = pick(rng, [3.3, 5, 9, 12]);
      const q = (C * 1e-9) * V;
      const unit: [string, number] = q >= 1e-3 ? ['mC', 1e3] : q >= 1e-6 ? ['µC', 1e6] : ['nC', 1e9];
      const val = q * unit[1];
      const u = unit[0] as string;
      const f = (x: number) => `${fmt(x, 1)} ${u}`;
      return {
        prompt: `A ${C} nF capacitor is charged to ${V} V. The charge stored (in ${u}) is:`,
        ...mc(rng, f(val), [f(val / 2), f(val * 2), f((C * 1e-9 / V) * unit[1])]),
        aiExplanation: `Q = C·V = ${C} nF × ${V} V = ${fmt(q * 1e9, 0)} nC = ${f(val)}.`,
      };
    },
  },
  {
    subject: 'Signals & Systems',
    make: ({ rng }) => {
      const f = pick(rng, [1, 10, 100]);
      const C = pick(rng, [1, 10, 100, 1000]);
      const xc = 1 / (2 * Math.PI * (f * 1e3) * (C * 1e-9));
      const k = xc / 1000;
      return {
        prompt: `At ${f} kHz, a ${C} nF capacitor has a capacitive reactance of:`,
        ...mc(rng, `${fmt(k, 1)} kΩ`, [`${fmt(k / 2, 1)} kΩ`, `${fmt(k * 2, 1)} kΩ`, `${fmt(2 * Math.PI * (f * 1e3) * (C * 1e-9), 2)} kΩ`]),
        aiExplanation: `X_C = 1/(2πfC) = 1/(2π × ${f} kHz × ${C} nF) ≈ ${fmt(k, 1)} kΩ. It falls as frequency rises.`,
      };
    },
  },
  {
    subject: 'Signals & Systems',
    make: ({ rng }) => {
      const f = pick(rng, [1, 10, 100]);
      const L = pick(rng, [1, 10, 100]);
      const xl = 2 * Math.PI * (f * 1e3) * (L * 1e-3);
      return {
        prompt: `At ${f} kHz, a ${L} mH inductor has an inductive reactance of:`,
        ...mc(rng, `${fmt(xl, 1)} Ω`, [`${fmt(xl / 2, 1)} Ω`, `${fmt(xl * 2, 1)} Ω`, `${fmt(1 / (2 * Math.PI * (f * 1e3) * (L * 1e-3)), 3)} Ω`]),
        aiExplanation: `X_L = 2πfL = 2π × ${f} kHz × ${L} mH = ${fmt(xl, 1)} Ω. It rises linearly with frequency.`,
      };
    },
  },
  {
    subject: 'Digital Logic',
    make: ({ rng }) => {
      const n = pick(rng, [3, 4, 5, 8]);
      const max = 2 ** n - 1;
      return {
        prompt: `An n = ${n} flip-flop binary counter can count up to which maximum value?`,
        ...mc(rng, String(max), [String(2 ** n), String(2 ** n - 2), String(n)]),
        aiExplanation: `${n} flip-flops give 2ⁿ = ${2 ** n} states numbered 0 to ${max}, so the largest count is 2ⁿ − 1 = ${max}.`,
      };
    },
  },
  {
    subject: 'Digital Logic',
    make: ({ rng }) => {
      const cases = [
        { e: 'A + (A·B) simplifies to:', a: 'A', w: ['B', 'A·B', '1'] },
        { e: 'A·(A + B) simplifies to:', a: 'A', w: ['A + B', 'B', '1'] },
        { e: 'A·B + A·B′ simplifies to:', a: 'A', w: ['B', 'A·B', '1'] },
        { e: 'A + A′·B simplifies to:', a: 'A + B', w: ["A + B′", 'A', 'B'] },
        { e: '(A + B)·(A + B′) simplifies to:', a: 'A', w: ['B', 'A + B', '1'] },
        { e: 'A·(A′ + B) simplifies to:', a: 'A·B', w: ['A', 'B', '0'] },
      ];
      const c = pick(rng, cases);
      return {
        prompt: c.e,
        ...mc(rng, c.a, c.w),
        aiExplanation: `Absorption: A absorbs A·B, and A + A′B = A + B. Applying those laws gives ${c.a}.`,
      };
    },
  },
  {
    subject: 'Digital Logic',
    make: ({ rng }) => {
      const n = pick(rng, [2, 3, 4, 5]);
      return {
        prompt: `A decoder with ${n} select inputs has how many outputs?`,
        ...mc(rng, String(2 ** n), [String(n), String(n * n), String(2 * n)]),
        aiExplanation: `A decoder activates exactly one of 2ⁿ outputs; with ${n} select bits that is 2ⁿ = ${2 ** n} outputs.`,
      };
    },
  },
  {
    subject: 'Digital Logic',
    make: ({ rng }) => {
      const n = pick(rng, [2, 3, 4, 5]);
      return {
        prompt: `A multiplexer with ${n} select lines selects among how many data inputs?`,
        ...mc(rng, String(2 ** n), [String(n), String(n * 2), String(2 ** n - 1)]),
        aiExplanation: `A multiplexer with s select lines routes one of 2^s inputs to the output; here 2^${n} = ${2 ** n}.`,
      };
    },
  },
  {
    subject: 'Digital Logic',
    make: ({ rng }) => {
      const pat = pick(rng, ['1011', '1101', '0110', '1001', '1110']);
      const k = int(rng, 1, 3);
      let s = pat;
      for (let t = 0; t < k; t++) s = '0' + s.slice(0, -1);
      const left = pat.slice(k) + '0'.repeat(k);
      const rot = pat.slice(-k) + pat.slice(0, pat.length - k);
      return {
        prompt: `A 4-bit shift register holds ${pat}. After ${k} right-shift${k > 1 ? 's' : ''}, it reads:`,
        ...mc(rng, s, [left, rot, pat.slice(1) + '0']),
        aiExplanation: `Right shift moves bits down and inserts '0' on the left, dropping the LSB: ${pat} → after ${k} shift${k > 1 ? 's' : ''} reads ${s}.`,
      };
    },
  },
  {
    subject: 'Digital Logic',
    make: ({ rng }) => {
      const a = int(rng, 0, 1);
      const b = int(rng, 0, 1);
      const sum = a ^ b;
      const carry = a & b;
      return {
        prompt: `A half-adder receives A = ${a}, B = ${b}. Its outputs are:`,
        ...mc(rng, `Sum = ${sum}, Carry = ${carry}`, [`Sum = ${b}, Carry = ${a}`, `Sum = ${a}, Carry = ${0}`, `Sum = ${sum}, Carry = ${1 - carry}`]),
        aiExplanation: `Sum = A⊕B = ${a}⊕${b} = ${sum}; Carry = A·B = ${a}·${b} = ${carry}.`,
      };
    },
  },
  {
    subject: 'Signals & Systems',
    make: ({ rng }) => {
      const f = pick(rng, [2, 4, 8, 10]);
      return {
        prompt: `A signal contains frequencies up to ${f} kHz. The minimum sampling rate to avoid aliasing is:`,
        ...mc(rng, `${2 * f} kHz`, [`${f} kHz`, `${f / 2} kHz`, `${4 * f} kHz`]),
        aiExplanation: `The Nyquist–Shannon theorem says sample at ≥ 2× the highest frequency: 2 × ${f} kHz = ${2 * f} kHz.`,
      };
    },
  },
  {
    subject: 'Communications',
    make: ({ rng }) => {
      const Vc = pick(rng, [10, 20, 25, 40]);
      const vm = pick(rng, [2, 4, 6, 8].filter((v) => v < Vc));
      const m = (vm / Vc) * 100;
      return {
        prompt: `An AM wave has carrier amplitude ${Vc} V and message amplitude ${vm} V. Its modulation index is:`,
        ...mc(rng, `${fmt(m, 0)}%`, [`${fmt(m * 2, 0)}%`, `${fmt(m / 2, 0)}%`, `${fmt(100 - m, 0)}%`]),
        aiExplanation: `m = V_m/V_c = ${vm}/${Vc} = ${fmt(m, 0)}%. Overmodulation (m > 100%) causes envelope distortion.`,
      };
    },
  },
  {
    subject: 'Communications',
    make: ({ rng }) => {
      const fm = pick(rng, [3, 5, 10, 15]);
      return {
        prompt: `An AM broadcast carries audio up to ${fm} kHz. The required transmission bandwidth is:`,
        ...mc(rng, `${2 * fm} kHz`, [`${fm} kHz`, `${fm / 2} kHz`, `${4 * fm} kHz`]),
        aiExplanation: `AM bandwidth = 2 × highest modulating frequency = 2 × ${fm} kHz = ${2 * fm} kHz (both sidebands).`,
      };
    },
  },
  {
    subject: 'Measurements',
    make: ({ rng }) => {
      const G = pick(rng, [2, 10, 20, 50, 100, 1000]);
      const db = Math.round(20 * Math.log10(G) * 10) / 10;
      return {
        prompt: `A voltage gain of ${G} is expressed in dB as:`,
        ...mc(rng, `${fmt(db, 1)} dB`, [`${fmt(10 * Math.log10(G), 1)} dB`, `${fmt(20 * Math.log10(2 * G), 1)} dB`, `${fmt(20 * Math.log10(G / 2), 1)} dB`]),
        aiExplanation: `Voltage gain in dB = 20·log₁₀(G) = 20·log₁₀(${G}) ≈ ${fmt(db, 1)} dB. The 10·log₁₀ factor applies to power ratios.`,
      };
    },
  },
  {
    subject: 'Electronic Devices',
    make: ({ rng }) => ({
      prompt: `A ${pick(rng, ['5.1', '6.8', '9.1', '12'])} V zener diode in shunt regulation keeps its terminal voltage near Vz because it is biased:`,
      ...mc(rng, 'In reverse breakdown', ['In forward conduction', 'In cut-off', 'At saturation']),
      aiExplanation: 'Zeners regulate in reverse breakdown, where current changes a lot while voltage stays near Vz.',
    }),
  },
  {
    subject: 'Electronic Devices',
    make: ({ rng }) => {
      const v1 = pick(rng, ['1.8–2.0 V', '2.0–2.2 V']);
      return {
        prompt: `A typical ${pick(rng, ['red', 'green', 'orange', 'yellow'])} LED's forward voltage is about:`,
        ...mc(rng, v1, ['3.2–3.6 V', '0.6–0.7 V', '5 V']),
        aiExplanation: `Visible LEDs generally drop ${v1}; the 0.6–0.7 V figure is a silicon diode, and 3.2–3.6 V is a white/blue LED.`,
      };
    },
  },
  {
    subject: 'Analog Circuits',
    make: ({ rng }) => ({
      prompt: 'In a common-emitter BJT amplifier, β (or h_fe) describes the:',
      ...mc(rng, 'Small-signal current gain Ic/Ib', ['Voltage gain of the stage', 'Output impedance', 'Base-bias divider ratio']),
      aiExplanation: 'β = Ic/Ib is the transistor current gain; stage voltage gain depends on the collector load, not β alone.',
    }),
  },
  {
    subject: 'Signals & Systems',
    make: ({ rng }) => ({
      prompt: 'In DC steady state, an ideal inductor behaves as:',
      ...mc(rng, 'A short circuit (0 Ω)', ['An open circuit', 'A 1 kΩ resistor', 'A capacitor']),
      aiExplanation: 'di/dt = 0 at DC, so v = L·di/dt = 0: the inductor is a short. A capacitor would be the open circuit.',
    }),
  },
];

export const ECE_GENS = GENS;