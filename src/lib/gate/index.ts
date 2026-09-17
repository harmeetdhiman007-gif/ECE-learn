/**
 * GATE ECE syllabus modules and pattern-based practice questions.
 *
 * The syllabus topics mirror the standard GATE ECE syllabus (Engineering
 * Mathematics, Network Theory, Electronic Devices, Analog Circuits, Digital
 * Circuits, Signals & Systems, Control Systems, Communications,
 * Electromagnetics, Measurements). All questions are original and written in
 * the style of GATE ECE — they are practice items, not reproductions of past
 * papers.
 */

export interface GateQuestion {
  id: string;
  prompt: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
}

export interface GateModule {
  id: string;
  name: string;
  emoji: string;
  weight: string;
  topics: string[];
  questions: GateQuestion[];
}

export const GATE_MODULES: GateModule[] = [
  {
    id: 'em',
    name: 'Engineering Mathematics',
    emoji: '📐',
    weight: '~10 marks',
    topics: [
      'Linear algebra & matrices: rank, eigenvalues, determinants',
      'Calculus: limits, continuity, differentiability',
      'Differential equations: first & second order',
      'Laplace transforms & their properties',
      'Probability, random variables & distributions',
      'Numerical methods: Newton–Raphson, trapezoidal rule',
    ],
    questions: [
      {
        id: 'em-1',
        prompt: 'The Laplace transform of t (for t ≥ 0) is:',
        choices: ['1/s', '1/s²', '1/(s+1)', 's'],
        correctIndex: 1,
        explanation:
          'L{t} = ∫₀^∞ t·e^(−st) dt = 1/s². In general L{t^n} = n! / s^(n+1).',
      },
      {
        id: 'em-2',
        prompt:
          'The number of phone calls arriving at a desk follows a Poisson distribution with mean 2 calls per hour. The probability that zero calls arrive in one hour is:',
        choices: ['e⁻²', '2e⁻²', '1 − e⁻²', 'e⁻¹'],
        correctIndex: 0,
        explanation:
          'For a Poisson random variable with mean λ, P(X = k) = e^(−λ)·λ^k/k!. Here λ = 2 and k = 0, so P(X=0) = e⁻².',
      },
      {
        id: 'em-3',
        prompt: 'For the matrix [[2, 1], [4, 2]], which statement is true?',
        choices: [
          'Determinant is 2 and rank is 2',
          'Determinant is 0 and rank is 1',
          'Determinant is 0 and rank is 2',
          'Determinant is 4 and rank is 1',
        ],
        correctIndex: 1,
        explanation:
          'det = 2×2 − 1×4 = 0, so the matrix is singular. Row 2 is 2× row 1, giving rank 1.',
      },
      {
        id: 'em-4',
        prompt: 'The value of ∫₀^∞ e^(−2t) dt is:',
        choices: ['1', '1/2', '2', '−1/2'],
        correctIndex: 1,
        explanation:
          '∫₀^∞ e^(−at) dt = 1/a. With a = 2 the integral evaluates to 1/2.',
      },
      {
        id: 'em-5',
        prompt:
          'Two fair six-sided dice are rolled. The probability that the sum is exactly 9 is:',
        choices: ['1/9', '1/12', '5/36', '1/6'],
        correctIndex: 0,
        explanation:
          'Favourable pairs: (3,6), (4,5), (5,4), (6,3) → 4 of 36 outcomes, so P = 4/36 = 1/9.',
      },
    ],
  },
  {
    id: 'networks',
    name: 'Network Theory',
    emoji: '🔌',
    weight: '~8 marks',
    topics: [
      'Node & mesh analysis, superposition, Thevenin & Norton theorems',
      'KCL & KVL',
      'RC / RL / RLC transient response',
      'Resonance, Q-factor, mutual inductance',
      'Two-port networks: Z, Y, h, ABCD parameters',
    ],
    questions: [
      {
        id: 'net-1',
        prompt:
          'A series RC network has R = 10 kΩ and C = 100 nF. The time constant τ is:',
        choices: ['1 ms', '0.1 ms', '10 ms', '100 ms'],
        correctIndex: 0,
        explanation:
          'τ = RC = 10×10³ × 100×10⁻⁹ = 1×10⁻³ s = 1 ms. After one time constant the capacitor charges to ~63% of the final value.',
      },
      {
        id: 'net-2',
        prompt:
          'Kirchhoff’s current law states that at any node, the algebraic sum of currents is:',
        choices: [
          'Equal to the voltage at the node',
          'Zero',
          'Proportional to resistance',
          'Maximum',
        ],
        correctIndex: 1,
        explanation:
          'KCL follows from charge conservation: the sum of currents entering a node equals the sum leaving, so the algebraic sum is zero.',
      },
      {
        id: 'net-3',
        prompt: 'A 12 V source drives a 4 Ω resistive load. The power delivered is:',
        choices: ['3 W', '36 W', '48 W', '144 W'],
        correctIndex: 1,
        explanation: 'P = V²/R = 12²/4 = 144/4 = 36 W.',
      },
      {
        id: 'net-4',
        prompt:
          'In Thevenin’s theorem, the equivalent resistance is found by:',
        choices: [
          'Shorting current sources and opening voltage sources',
          'Opening current sources and shorting voltage sources',
          'Shorting all sources',
          'Keeping all sources as they are',
        ],
        correctIndex: 1,
        explanation:
          'To compute R_th, independent voltage sources are replaced by shorts and current sources by opens.',
      },
      {
        id: 'net-5',
        prompt:
          'In DC steady state, an ideal inductor behaves like a:',
        choices: [
          'Short circuit',
          'Open circuit',
          'Resistor',
          'Current source',
        ],
        correctIndex: 0,
        explanation:
          'di/dt = 0 at DC steady state, so the inductor voltage V = L·di/dt = 0 — it acts as a short.',
      },
    ],
  },
  {
    id: 'ed',
    name: 'Electronic Devices',
    emoji: '🔬',
    weight: '~8 marks',
    topics: [
      'Semiconductor physics: doping, carrier concentration, diffusion',
      'PN junction: depletion region, capacitance, breakdown',
      'Diode characteristics, Zener diode',
      'BJT: regions of operation, biasing',
      'MOSFET: structure, threshold voltage, I–V characteristics',
      'LED & photodetectors',
    ],
    questions: [
      {
        id: 'ed-1',
        prompt: 'The typical forward voltage drop of a silicon diode is:',
        choices: ['0.3 V', '0.7 V', '1.1 V', '2.0 V'],
        correctIndex: 1,
        explanation:
          'Silicon diodes drop ~0.7 V in forward conduction; germanium is ~0.3 V.',
      },
      {
        id: 'ed-2',
        prompt: 'Applying a reverse bias to a PN junction:',
        choices: [
          'Narrows the depletion region',
          'Widens the depletion region',
          'Turns the diode on',
          'Has no effect on the depletion region',
        ],
        correctIndex: 1,
        explanation:
          'Reverse bias pulls carriers away from the junction, widening the depletion region and increasing the barrier voltage.',
      },
      {
        id: 'ed-3',
        prompt:
          'An ideal BJT in the active region has the base–emitter junction:',
        choices: [
          'Reverse biased and base–collector forward biased',
          'Forward biased and base–collector reverse biased',
          'Both forward biased',
          'Both reverse biased',
        ],
        correctIndex: 1,
        explanation:
          'Active mode means BE forward biased and BC reverse biased; saturation has both forward biased, cutoff both reverse.',
      },
      {
        id: 'ed-4',
        prompt: 'The intrinsic carrier concentration n_i of silicon:',
        choices: [
          'Decreases with temperature',
          'Increases strongly with temperature',
          'Is independent of temperature',
          'Drops to zero above 100°C',
        ],
        correctIndex: 1,
        explanation:
          'n_i ∝ T^(3/2)·e^(−Eg/2kT), which grows very quickly as temperature rises.',
      },
      {
        id: 'ed-5',
        prompt: 'A Zener diode is primarily used for:',
        choices: [
          'Rectification of AC',
          'Voltage regulation in reverse breakdown',
          'Light emission',
          'Amplification',
        ],
        correctIndex: 1,
        explanation:
          'Doped to break down at a precise reverse voltage, a Zener clamps the voltage across it — the basis of simple regulators.',
      },
    ],
  },
  {
    id: 'analog',
    name: 'Analog Circuits',
    emoji: '🛠️',
    weight: '~8 marks',
    topics: [
      'Op-amp circuits: inverting, non-inverting, follower, integrator',
      'Feedback concepts, stability, CMRR',
      'BJT & FET amplifiers: biasing, small-signal gain',
      'Oscillators & filters (first order)',
      'Comparators, Schmitt trigger',
    ],
    questions: [
      {
        id: 'an-1',
        prompt:
          'A non-inverting op-amp amplifier uses Rf = 10 kΩ and Ri = 1 kΩ. The voltage gain is:',
        choices: ['10', '11', '9', '−10'],
        correctIndex: 1,
        explanation:
          'Non-inverting gain = 1 + Rf/Ri = 1 + 10 = 11. (Inverting gain would be −Rf/Ri = −10.)',
      },
      {
        id: 'an-2',
        prompt: 'A voltage follower (buffer) has:',
        choices: [
          'Gain of −1',
          'Gain of +1 and very high input impedance',
          'Gain of 100',
          'Gain of +Rf/Ri',
        ],
        correctIndex: 1,
        explanation:
          'All output is fed back to the inverting input, giving unity gain with near-infinite input impedance and low output impedance.',
      },
      {
        id: 'an-3',
        prompt: 'A high CMRR in an op-amp means it can:',
        choices: [
          'Reject signals common to both inputs',
          'Amplify common-mode signals strongly',
          'Reject the differential signal',
          'Only work with single-ended inputs',
        ],
        correctIndex: 0,
        explanation:
          'CMRR = A_d/A_cm. High CMRR means common-mode (e.g. 50 Hz mains hum on both inputs) is heavily attenuated while the differential signal is amplified.',
      },
      {
        id: 'an-4',
        prompt:
          'An inverting amplifier has Rf = 50 kΩ and Ri = 10 kΩ. Its gain is:',
        choices: ['+5', '−5', '+6', '−0.2'],
        correctIndex: 1,
        explanation: 'Inverting gain = −Rf/Ri = −50k/10k = −5.',
      },
      {
        id: 'an-5',
        prompt: 'Negative feedback in an amplifier typically:',
        choices: [
          'Increases gain and reduces bandwidth',
          'Reduces gain and increases bandwidth',
          'Increases distortion',
          'Makes the gain depend on device parameters',
        ],
        correctIndex: 1,
        explanation:
          'Negative feedback trades gain for stability: gain drops by (1 + Aβ) but bandwidth and linearity improve, and dependence on device parameters falls.',
      },
    ],
  },
  {
    id: 'digital',
    name: 'Digital Circuits',
    emoji: '🧠',
    weight: '~8 marks',
    topics: [
      'Boolean algebra, De Morgan’s laws',
      'Combinational logic: adders, multiplexers, decoders',
      'Sequential logic: flip-flops, counters, registers',
      'Number systems, binary arithmetic',
      'Timing: setup/hold, clocked design',
    ],
    questions: [
      {
        id: 'dig-1',
        prompt: 'By De Morgan’s law, NOT(A OR B) equals:',
        choices: [
          '(NOT A) OR (NOT B)',
          '(NOT A) AND (NOT B)',
          'NOT (A AND B)',
          'A AND B',
        ],
        correctIndex: 1,
        explanation:
          "De Morgan: ¬(A∨B) = ¬A ∧ ¬B, and ¬(A∧B) = ¬A ∨ ¬B. NAND and NOR gates each realize the pair of rules.",
      },
      {
        id: 'dig-2',
        prompt: 'A half adder produces:',
        choices: [
          'Sum = A XOR B, carry = A AND B',
          'Sum = A AND B, carry = A OR B',
          'Sum = A OR B, carry = A XOR B',
          'Sum and carry both equal A AND B',
        ],
        correctIndex: 0,
        explanation:
          'The XOR gives the binary sum bit and AND gives the carry-out. A full adder adds a carry-in as well.',
      },
      {
        id: 'dig-3',
        prompt: 'A JK flip-flop toggles its output when:',
        choices: ['J = 0, K = 0', 'J = 1, K = 0', 'J = 0, K = 1', 'J = 1, K = 1'],
        correctIndex: 3,
        explanation:
          'J=K=1 puts the JK flip-flop in toggle mode: Q flips every clock edge. J=K=0 holds state.',
      },
      {
        id: 'dig-4',
        prompt: 'The output of a 4-input NAND gate is HIGH when:',
        choices: [
          'All inputs are HIGH',
          'At least one input is LOW',
          'Exactly two inputs are LOW',
          'All inputs are LOW',
        ],
        correctIndex: 1,
        explanation:
          'A NAND gate output is LOW only when every input is HIGH; any LOW input forces the output HIGH.',
      },
      {
        id: 'dig-5',
        prompt: 'A 3-to-8 decoder has:',
        choices: ['8 inputs, 3 outputs', '3 inputs, 8 outputs', '3 inputs, 4 outputs', '8 inputs, 8 outputs'],
        correctIndex: 1,
        explanation:
          'With n select inputs a decoder activates exactly one of 2ⁿ outputs. 3 inputs → 8 outputs.',
      },
    ],
  },
  {
    id: 'signals',
    name: 'Signals & Systems',
    emoji: '📈',
    weight: '~8 marks',
    topics: [
      'LTI systems: impulse response, convolution',
      'Fourier series & transforms',
      'Laplace transforms, region of convergence, poles & zeros',
      'Sampling & Nyquist criterion',
      'Z-transforms',
    ],
    questions: [
      {
        id: 'sig-1',
        prompt: 'The continuous-time Fourier transform of the unit impulse δ(t) is:',
        choices: ['1', '0', 'δ(ω)', 'jω'],
        correctIndex: 0,
        explanation:
          '∫δ(t)·e^(−jωt) dt = 1. An impulse contains all frequencies with equal weight.',
      },
      {
        id: 'sig-2',
        prompt:
          'A bandlimited signal has a maximum frequency of 4 kHz. The minimum safe sampling rate is:',
        choices: ['4 kHz', '6 kHz', '8 kHz', '16 kHz'],
        correctIndex: 2,
        explanation:
          'The Nyquist–Shannon criterion requires fs ≥ 2·f_max = 8 kHz to avoid aliasing.',
      },
      {
        id: 'sig-3',
        prompt: 'The Laplace transform of the unit step u(t) is:',
        choices: ['s', '1/s', '1/s²', 'e^(−s)'],
        correctIndex: 1,
        explanation:
          'L{u(t)} = ∫₀^∞ e^(−st) dt = 1/s, valid for Re(s) > 0.',
      },
      {
        id: 'sig-4',
        prompt: 'A continuous-time LTI system is stable when all poles of its transfer function lie:',
        choices: [
          'On the imaginary axis',
          'In the left half of the s-plane',
          'In the right half of the s-plane',
          'Anywhere in the s-plane',
        ],
        correctIndex: 1,
        explanation:
          'Poles in the left half-plane make the natural response decay to zero (bounded-input/bounded-output stable).',
      },
      {
        id: 'sig-5',
        prompt: 'Convolution of two signals is:',
        choices: [
          'Non-commutative',
          'Commutative: x(t)*h(t) = h(t)*x(t)',
          'Valid only for periodic signals',
          'Defined only in discrete time',
        ],
        correctIndex: 1,
        explanation:
          'Convolution is commutative, associative, and distributive — the defining operations for linear, time-invariant systems.',
      },
    ],
  },
  {
    id: 'control',
    name: 'Control Systems',
    emoji: '🎛️',
    weight: '~8 marks',
    topics: [
      'Transfer functions, block diagrams, signal flow graphs',
      'Time response: first & second order, damping',
      'Stability: Routh–Hurwitz criterion',
      'Root locus',
      'Frequency response: Bode plots, Nyquist',
      'State-space representation',
    ],
    questions: [
      {
        id: 'ctl-1',
        prompt: 'A second-order system with damping ratio ζ < 1 has a step response that is:',
        choices: [
          'Overdamped (no overshoot)',
          'Underdamped (oscillatory with overshoot)',
          'Critically damped',
          'Unstable always',
        ],
        correctIndex: 1,
        explanation:
          '0 < ζ < 1 gives complex conjugate poles and an oscillatory response that settles around the final value.',
      },
      {
        id: 'ctl-2',
        prompt: 'The Routh–Hurwitz criterion determines stability from:',
        choices: [
          'The coefficients of the characteristic equation',
          'The input waveform',
          'The output magnitude',
          'The plant nonlinearity',
        ],
        correctIndex: 0,
        explanation:
          'If every entry in the first column of the Routh array is positive, all closed-loop poles are in the left half-plane and the system is stable.',
      },
      {
        id: 'ctl-3',
        prompt: 'Closing a negative-feedback loop around a plant typically:',
        choices: [
          'Increases sensitivity to parameter changes',
          'Reduces steady-state error and sensitivity',
          'Always makes the system unstable',
          'Removes the need for a controller',
        ],
        correctIndex: 1,
        explanation:
          'Negative feedback trades a bit of gain for robustness: disturbance rejection improves and sensitivity to plant variation drops.',
      },
      {
        id: 'ctl-4',
        prompt: 'The poles of the closed-loop transfer function are the roots of:',
        choices: [
          'The numerator polynomial',
          '1 + G(s)H(s) = 0',
          'The open-loop zero polynomial',
          'The feedback path only',
        ],
        correctIndex: 1,
        explanation:
          'Closed-loop poles satisfy 1 + G(s)H(s) = 0 (the characteristic equation). Their location decides stability and response shape.',
      },
      {
        id: 'ctl-5',
        prompt: 'For a unit step input, a type-0 (no integrator) system has a:',
        choices: [
          'Zero steady-state error',
          'Finite, non-zero steady-state position error',
          'Ramp steady-state error of zero',
          'Diverging response',
        ],
        correctIndex: 1,
        explanation:
          'Type-0 systems track steps with a finite error 1/(1+Kp); type ≥ 1 gives zero steady-state position error.',
      },
    ],
  },
  {
    id: 'comm',
    name: 'Communications',
    emoji: '📡',
    weight: '~10 marks',
    topics: [
      'Analog modulation: AM, FM, PM; bandwidth, power',
      'Sampling, quantization, PCM',
      'Digital modulation: PSK, FSK, ASK, QAM',
      'Information theory: entropy, channel capacity',
      'Noise: thermal noise, SNR, noise figure',
    ],
    questions: [
      {
        id: 'com-1',
        prompt:
          'An AM signal with a modulating frequency f_m = 5 kHz occupies a bandwidth of:',
        choices: ['2.5 kHz', '5 kHz', '10 kHz', '20 kHz'],
        correctIndex: 2,
        explanation:
          'AM produces upper and lower sidebands around the carrier: B = 2·f_m = 10 kHz.',
      },
      {
        id: 'com-2',
        prompt:
          'By Carson’s rule, an FM signal with peak deviation Δf = 75 kHz and message frequency f_m = 15 kHz has an approximate bandwidth of:',
        choices: ['90 kHz', '150 kHz', '180 kHz', '300 kHz'],
        correctIndex: 2,
        explanation: 'B ≈ 2(Δf + f_m) = 2(75 + 15) = 180 kHz.',
      },
      {
        id: 'com-3',
        prompt: 'A signal has a power ratio S/N = 1000. Its SNR in dB is:',
        choices: ['10 dB', '20 dB', '30 dB', '100 dB'],
        correctIndex: 2,
        explanation: 'SNR(dB) = 10·log₁₀(1000) = 30 dB.',
      },
      {
        id: 'com-4',
        prompt: 'Thermal noise power across a system is proportional to:',
        choices: [
          'Bandwidth and absolute temperature',
          'Signal amplitude only',
          'Carrier frequency only',
          'Modulation index',
        ],
        correctIndex: 0,
        explanation:
          'N = k·T·B — Johnson–Nyquist noise grows with bandwidth B and absolute temperature T.',
      },
      {
        id: 'com-5',
        prompt:
          'PCM samples speech at 8 kHz with 8 bits per sample. The bit rate is:',
        choices: ['8 kb/s', '64 kb/s', '128 kb/s', '16 kb/s'],
        correctIndex: 1,
        explanation: 'Bit rate = fs × bits/sample = 8000 × 8 = 64 kb/s (classic telephony).',
      },
    ],
  },
  {
    id: 'emft',
    name: 'Electromagnetics',
    emoji: '🌊',
    weight: '~8 marks',
    topics: [
      'Maxwell’s equations in differential & integral form',
      'Electrostatics & magnetostatics, boundary conditions',
      'Plane wave propagation, intrinsic impedance',
      'Transmission lines: reflection, SWR',
      'Antennas & radiation basics',
    ],
    questions: [
      {
        id: 'emf-1',
        prompt: 'The intrinsic impedance of free space η₀ is approximately:',
        choices: ['50 Ω', '75 Ω', '120π ≈ 377 Ω', '600 Ω'],
        correctIndex: 2,
        explanation:
          'η₀ = √(μ₀/ε₀) ≈ 120π ≈ 377 Ω — the ratio of E to H for a plane wave in vacuum.',
      },
      {
        id: 'emf-2',
        prompt: 'A plane wave at 1 GHz in free space has a wavelength of:',
        choices: ['0.3 m', '0.6 m', '1 m', '3 m'],
        correctIndex: 0,
        explanation: 'λ = c/f = 3×10⁸ / 10⁹ = 0.3 m.',
      },
      {
        id: 'emf-3',
        prompt: 'Which Maxwell equation states that electric flux density diverges from charge?',
        choices: [
          '∇·D = ρᵥ',
          '∇×E = −∂B/∂t',
          '∇·B = 0',
          '∇×H = J + ∂D/∂t',
        ],
        correctIndex: 0,
        explanation:
          'Gauss’s law for electric fields: ∇·D = ρᵥ. The divergence of D equals the free charge density ρᵥ.',
      },
      {
        id: 'emf-4',
        prompt: 'Inside an ideal conductor in electrostatic equilibrium, the electric field is:',
        choices: [
          'Maximum',
          'Zero',
          'Equal to the surface field',
          'Undefined',
        ],
        correctIndex: 1,
        explanation:
          'Charge resides on the surface and the internal field is zero — otherwise free electrons would keep moving until it vanished.',
      },
      {
        id: 'emf-5',
        prompt: 'The skin depth of a conductor at high frequency:',
        choices: [
          'Increases with frequency',
          'Decreases with frequency',
          'Is independent of frequency',
          'Equals one wavelength',
        ],
        correctIndex: 1,
        explanation:
          'Skin depth δ = √(2/(ωμσ)) — higher frequency → shallower penetration into the conductor.',
      },
    ],
  },
  {
    id: 'inst',
    name: 'Measurements & Instrumentation',
    emoji: '📏',
    weight: '~5 marks',
    topics: [
      'Wheatstone bridge & null techniques',
      'Ammeters, voltmeters, wattmeters',
      'ADC/DAC: resolution, quantization error',
      'Oscilloscope measurements',
      'Sensors & transducers, loading effects',
    ],
    questions: [
      {
        id: 'ins-1',
        prompt: 'A Wheatstone bridge is balanced when:',
        choices: [
          'R₁/R₂ = R₃/R₄',
          'R₁ + R₂ = R₃ + R₄',
          'R₁ = R₂ only',
          'The supply voltage is zero',
        ],
        correctIndex: 0,
        explanation:
          'Null condition: R₁/R₂ = R₃/R₄ (equivalently R₁·R₄ = R₂·R₃). Unknowns are then found from known ratios.',
      },
      {
        id: 'ins-2',
        prompt: 'An ideal voltmeter should have:',
        choices: [
          'Very low resistance',
          'Very high resistance',
          'Zero resistance',
          'Resistance equal to the source',
        ],
        correctIndex: 1,
        explanation:
          'A high-impedance voltmeter draws negligible current, minimising the loading error across the device under test.',
      },
      {
        id: 'ins-3',
        prompt:
          'An 8-bit ADC covers 0–5 V. Its resolution is approximately:',
        choices: ['19.5 mV', '39 mV', '78 mV', '5 mV'],
        correctIndex: 0,
        explanation:
          'Resolution = range / 2ⁿ = 5 V / 256 ≈ 19.5 mV — the smallest voltage step it can distinguish.',
      },
      {
        id: 'ins-4',
        prompt: 'To measure the current through a branch, an ammeter must be connected:',
        choices: [
          'In parallel with the branch',
          'In series with the branch',
          'Across the supply',
          'With a series resistor',
        ],
        correctIndex: 1,
        explanation:
          'Series connection makes the full branch current flow through the meter; parallel connection would bypass the branch.',
      },
      {
        id: 'ins-5',
        prompt: 'An oscilloscope primarily displays:',
        choices: [
          'Voltage vs time (and XY modes)',
          'Frequency vs current',
          'Resistance vs temperature',
          'Only DC values',
        ],
        correctIndex: 0,
        explanation:
          'The vertical axis shows voltage amplitude and the horizontal axis time, revealing waveform shape, period, and phase in XY mode.',
      },
    ],
  },
];

export function getGateModule(id: string | undefined): GateModule | null {
  if (!id) return null;
  return GATE_MODULES.find((m) => m.id === id) ?? null;
}