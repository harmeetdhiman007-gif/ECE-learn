import type { GeneratedGroup, ModuleSpec } from './presets.js';
import { build } from './presets.js';

const MODULES: ModuleSpec[] = [
  // ── Charge & Current
  {
    key: 'ee-charge-01',
    unit: 'Charge & Current',
    title: 'What Charge Really Is',
    level: 'basic',
    body:
      'Electric charge is measured in coulombs (C). One electron carries about 1.6e-19 C of charge. When you say a wire carries a current, you really mean a coulomb of charge moving past a point every second — that is exactly one ampere (1 A = 1 C/s).',
    qs: [
      {
        p: 'One ampere of current means:',
        c: ['One coulomb of charge passing a point each second', 'One volt of pressure', 'One ohm of resistance', 'One watt of power'],
        a: 0,
        e: '1 A = 1 C/s. Charge flow rate is current.',
      },
      {
        p: 'The unit of electric charge is the:',
        c: ['Coulomb', 'Ampere', 'Volt', 'Joule'],
        a: 0,
        e: 'Charge is measured in coulombs; the ampere measures its flow.',
      },
    ],
  },
  {
    key: 'ee-charge-02',
    unit: 'Charge & Current',
    title: 'Voltage: Pressure for Charge',
    level: 'basic',
    body:
      'Voltage (potential difference) is the energy each coulomb of charge carries, measured in volts. One volt means one joule of energy per coulomb. A battery is a voltage source: its chemicals push charge around a circuit, like a pump pushing water.',
    qs: [
      {
        p: 'Voltage is best described as:',
        c: ['Energy per coulomb, pushing charge around', 'The number of electrons', 'The speed of current', 'The size of the wire'],
        a: 0,
        e: '1 V = 1 J/C. Voltage is the energy each coulomb carries.',
      },
      {
        p: 'If a battery is said to be 12 V, that means:',
        c: ['Each coulomb gains 12 joules inside the battery', 'It pushes 12 amps', 'It stores 12 coulombs', 'It resists 12 ohms'],
        a: 0,
        e: 'A 12 V source gives each coulomb 12 J of energy to drive around the circuit.',
      },
    ],
  },
  {
    key: 'ee-charge-03',
    unit: 'Charge & Current',
    title: 'George Simon Ohm and the Ohm',
    level: 'basic',
    body:
      'Ohm published the law that links voltage, current, and resistance: V = I × R. Resistance (ohms) is how hard a material resists the flow of charge. A 220 ohm resistor brand places a limit on current, protecting LEDs and ICs.',
    qs: [
      {
        p: 'Ohm\u2019s law in symbols is:',
        c: ['V = I \u00d7 R', 'V = I \u00f7 R', 'P = V \u00d7 R', 'I = V \u00d7 R'],
        a: 0,
        e: 'Voltage equals current times resistance: V = I × R.',
      },
      {
        p: 'A 9 V battery across a 450 ohm resistor drives:',
        c: ['20 mA', '50 mA', '450 mA', '9 A'],
        a: 0,
        e: 'I = V/R = 9/450 = 0.02 A = 20 mA.',
      },
    ],
  },
  {
    key: 'ee-charge-04',
    unit: 'Charge & Current',
    title: 'Conventional vs Electron Flow',
    level: 'basic',
    body:
      'By convention, current flows from positive to negative (conventional flow). Real electrons move the other way, but engineers drew arrows from + to − before electrons were discovered and the convention stuck. Diagrams and op-amp rules all use conventional flow.',
    qs: [
      {
        p: 'Conventional current flows from:',
        c: ['Positive to negative', 'Negative to positive', 'Ground to +', 'Only in AC'],
        a: 0,
        e: 'Convention says current leaves the + terminal, even though electrons drift opposite.',
      },
    ],
  },
  {
    key: 'ee-charge-05',
    unit: 'Charge & Current',
    title: 'Knife Switch to Transistor: Series vs Parallel',
    level: 'basic',
    body:
      'In series, components share one path, so the same current flows through each and voltages add. In parallel, components share two nodes, so they see the same voltage and currents add. The law of combinations falls straight out of these two statements.',
    qs: [
      {
        p: 'In a series circuit the same _______ flows through every component.',
        c: ['Current', 'Voltage', 'Power', 'Charge stored'],
        a: 0,
        e: 'Series = single path; current is identical everywhere in the loop.',
      },
      {
        p: 'In a parallel circuit every branch sees the same:',
        c: ['Voltage', 'Current', 'Resistance', 'Inductance'],
        a: 0,
        e: 'Parallel branches connect the same two nodes, so they share the same potential difference.',
      },
    ],
  },

  // ── Series & Parallel
  {
    key: 'ee-series-01',
    unit: 'Series & Parallel Combinations',
    title: 'Adding Resistors in Series',
    level: 'basic',
    body:
      'Series resistors simply add: R_total = R1 + R2 + ... For two resistors 220 and 330 ohm, the pair is 550 ohm. Because current is shared, total resistance is the sum of what the current has to push through.',
    qs: [
      {
        p: 'Three resistors 100, 200, 300 ohm in series total:',
        c: ['600 ohm', '300 ohm', '50 ohm', '200 ohm'],
        a: 0,
        e: 'Series sums resistances: 100+200+300 = 600 ohm.',
      },
    ],
  },
  {
    key: 'ee-series-02',
    unit: 'Series & Parallel Combinations',
    title: 'Parallel Resistors',
    level: 'basic',
    body:
      'Parallel resistors combine as 1/R_total = 1/R1 + 1/R2 + ... Two equal resistors in parallel give half: two 100 ohm in parallel = 50 ohm. Parallel always results in less resistance than the smallest branch.',
    qs: [
      {
        p: 'Two 100 ohm resistors in parallel equal:',
        c: ['50 ohm', '100 ohm', '200 ohm', '400 ohm'],
        a: 0,
        e: 'Two equal parallel resistors halve: 100/2 = 50 ohm.',
      },
      {
        p: 'Parallel resistance is always:',
        c: ['Less than the smallest branch', 'Equal to the largest branch', 'The sum of the branches', 'A negative number'],
        a: 0,
        e: 'Adding parallel paths gives charge more ways through, so resistance falls below the smallest branch.',
      },
    ],
  },
  {
    key: 'ee-series-03',
    unit: 'Series & Parallel Combinations',
    title: 'Voltage Dividers',
    level: 'basic',
    body:
      'Two series resistors split a voltage in proportion to their values: V_out = V_in × R2/(R1+R2). A 10k/10k pair halves a 5 V supply to 2.5 V. Dividers are the cheapest way to scale a signal down for an ADC pin.',
    qs: [
      {
        p: 'A divider of two equal resistors gives the output:',
        c: ['Half the input', 'Double the input', 'Zero', 'The input unchanged'],
        a: 0,
        e: 'R2/(R1+R2) = 1/2 when R1 = R2.',
      },
      {
        p: 'V_in = 12 V, R1 = R2 = 4.7k. V_out is:',
        c: ['6 V', '12 V', '3 V', '24 V'],
        a: 0,
        e: 'Equal resistors split evenly: 12 × 0.5 = 6 V.',
      },
    ],
  },
  {
    key: 'ee-series-04',
    unit: 'Series & Parallel Combinations',
    title: 'Current Dividers',
    level: 'basic',
    body:
      'Parallel resistors split current inversely with resistance: the smaller resistor carries the bigger share. With R1 and R2 in parallel, I1 = I_total × R2/(R1+R2). This is the mirror image of the voltage divider.',
    qs: [
      {
        p: 'Two parallel branches, 10 ohm and 90 ohm, fed by 1 A. The 10 ohm branch carries:',
        c: ['900 mA', '100 mA', '500 mA', '10 A'],
        a: 0,
        e: 'I1 = 1 × 90/(10+90) = 0.9 A = 900 mA; the smaller resistor takes more.',
      },
    ],
  },
  {
    key: 'ee-series-05',
    unit: 'Series & Parallel Combinations',
    title: 'Series and Parallel Networks',
    level: 'intermediate',
    body:
      'Real circuits nest series and parallel. Solve from the inside out: collapse the most nested group first, redraw, repeat until one equivalent resistor remains. Then work backwards with the divider rules to find every branch current and voltage.',
    qs: [
      {
        p: 'To simplify a mixed network, first:',
        c: ['Collapse the most nested parallel group', 'Add everything up front', 'Ignore the battery', 'Remove the smallest resistor'],
        a: 0,
        e: 'Reduce innermost groups to one resistance each, redraw, and repeat.',
      },
    ],
  },

  // ── Kirchhoff's Laws
  {
    key: 'ee-kir-01',
    unit: "Kirchhoff's Laws",
    title: 'KCL: Current at a Node',
    level: 'basic',
    body:
      'Kirchhoff\u2019s Current Law: charge cannot pile up at a node, so the sum of currents entering equals the sum leaving. If 2 mA enters a junction from the left and 1.5 mA leaves to the right, the remaining 0.5 mA must leave another way.',
    qs: [
      {
        p: 'Three currents meet at a node: 3 mA and 2 mA enter. How much leaves?',
        c: ['5 mA', '1 mA', '3 mA', '6 mA'],
        a: 0,
        e: 'KCL: total in (5 mA) must equal total out.',
      },
    ],
  },
  {
    key: 'ee-kir-02',
    unit: "Kirchhoff's Laws",
    title: 'KVL: Energy Around a Loop',
    level: 'basic',
    body:
      'Kirchhoff\u2019s Voltage Law: around any closed loop the voltage rises equal the voltage drops. Pick a direction, add the voltages with sign, and the sum is zero. This is why a 9 V battery distributes 9 V total across the resistors in a loop.',
    qs: [
      {
        p: 'A loop has a 9 V source and two resistors. If one drops 3 V, the other drops:',
        c: ['6 V', '3 V', '9 V', '12 V'],
        a: 0,
        e: 'KVL: rises = drops, so 9 = 3 + 6.',
      },
    ],
  },
  {
    key: 'ee-kir-03',
    unit: "Kirchhoff's Laws",
    title: 'Solving Loops with KVL',
    level: 'intermediate',
    body:
      'For one loop with one battery you already know the answer (V=IR). For two or three loops, write a KVL equation per loop and a KCL equation per node, then solve the linear system. Unknowns are branch currents; the equations are independent.',
    qs: [
      {
        p: 'A circuit with 3 unknown branch currents needs how many independent equations?',
        c: ['3', '1', '6', '9'],
        a: 0,
        e: 'Number of unknowns must equal number of independent equations.',
      },
    ],
  },

  // ── Power & Energy
  {
    key: 'ee-pow-01',
    unit: 'Power & Energy',
    title: 'P = V × I',
    level: 'basic',
    body:
      'Electrical power is the rate of energy use: P = V × I in watts. A 9 V device pulling 0.5 A consumes 4.5 W. Using Ohm\u2019s law you can rewrite it as P = I²×R or P = V²/R — whichever pair of values you know.',
    qs: [
      {
        p: 'A 12 V heater draws 2 A. Its power is:',
        c: ['24 W', '6 W', '12 W', '48 W'],
        a: 0,
        e: 'P = V×I = 12×2 = 24 W.',
      },
      {
        p: 'A 5 V rail powers 3 A. Power delivered:',
        c: ['15 W', '8 W', '5 W', '1.6 W'],
        a: 0,
        e: '5 × 3 = 15 W.',
      },
    ],
  },
  {
    key: 'ee-pow-02',
    unit: 'Power & Energy',
    title: 'Energy in Watt-Hours and Joules',
    level: 'basic',
    body:
      'Energy is power × time. One joule is one watt for one second; a watt-hour is a watt for an hour (3600 J). Batteries are rated in watt-hours or milliamp-hours at a nominal voltage: a 3.7 V 2000 mAh cell stores roughly 7.4 Wh.',
    qs: [
      {
        p: 'A 10 W bulb on for 5 hours uses:',
        c: ['50 Wh', '10 Wh', '5 Wh', '500 Wh'],
        a: 0,
        e: '10 W × 5 h = 50 Wh.',
      },
      {
        p: 'A 3.7 V 2000 mAh battery stores about:',
        c: ['7.4 Wh', '740 Wh', '2 Wh', '0.74 Wh'],
        a: 0,
        e: 'Wh = V × Ah = 3.7 × 2.0 = 7.4 Wh.',
      },
    ],
  },
  {
    key: 'ee-pow-03',
    unit: 'Power & Energy',
    title: 'Efficiency',
    level: 'intermediate',
    body:
      'Efficiency is useful output power over input power, usually as a percentage. A switching converter at 90% efficiency turning 10 W input to 9 W output wastes only 1 W as heat; linear regulators can waste far more.',
    qs: [
      {
        p: 'Input 20 W, output 18 W. Efficiency is:',
        c: ['90%', '70%', '110%', '2%'],
        a: 0,
        e: '18/20 = 0.9 = 90%.',
      },
    ],
  },

  // ── Network Theorems
  {
    key: 'ee-net-01',
    unit: 'Network Theorems',
    title: 'Superposition',
    level: 'intermediate',
    body:
      'Superposition says: in a linear circuit with multiple sources, compute the response from each source (other sources off — replace voltage sources with short circuits, current sources with open circuits), then add the results. It only works on linear elements.',
    qs: [
      {
        p: 'For superposition, a voltage source you are not using must be:',
        c: ['Short-circuited', 'Left as-is', 'Open-circuited', 'Doubled'],
        a: 0,
        e: 'Kill voltage sources with a short; kill current sources with an open.',
      },
    ],
  },
  {
    key: 'ee-net-02',
    unit: 'Network Theorems',
    title: 'Thevenin Equivalents',
    level: 'intermediate',
    body:
      'Any two-terminal network of resistors and sources can collapse to one voltage source V_th in series with one resistance R_th. V_th is the open-circuit voltage; R_th is the resistance seen from the terminals with sources killed.',
    qs: [
      {
        p: 'The saying for an ideal Thevenin source is:',
        c: ['One voltage source + one series resistor', 'Two voltage sources', 'Three parallel loads', 'A current source + coil'],
        a: 0,
        e: 'Thevenin reduces any linear two-terminal network to V_th in series with R_th.',
      },
    ],
  },
  {
    key: 'ee-net-03',
    unit: 'Network Theorems',
    title: 'Norton Equivalents',
    level: 'intermediate',
    body:
      'The dual of Thevenin is Norton: a current source I_N in parallel with resistance R_N. The two are interchangeable by source transformation: V_th = I_N × R_N, and both resistances are the same R_th = R_N.',
    qs: [
      {
        p: 'A Norton equivalent consists of:',
        c: ['A current source in parallel with a resistor', 'A current source in series with a resistor', 'A voltage source only', 'Two resistors only'],
        a: 0,
        e: 'Norton: current source with parallel resistance; sibling to Thevenin.',
      },
    ],
  },
  {
    key: 'ee-net-04',
    unit: 'Network Theorems',
    title: 'Maximum Power Transfer',
    level: 'intermediate',
    body:
      'A source delivers maximum power to a load when the load resistance equals the Thevenin resistance of the source. This is why speaker and antenna impedances are matched. At that point efficiency is only 50%, so power engineers usually avoid it.',
    qs: [
      {
        p: 'A source has R_th = 8 ohm. Max power goes to a load of:',
        c: ['8 ohm', '4 ohm', '16 ohm', '0 ohm'],
        a: 0,
        e: 'Match the load to the source resistance for maximum power transfer.',
      },
    ],
  },

  // ── Capacitors & RC
  {
    key: 'ee-cap-01',
    unit: 'Capacitors & RC Circuits',
    title: 'The Capacitor Stores Energy in an Electric Field',
    level: 'basic',
    body:
      'A capacitor is two conductors separated by a dielectric. It stores energy in the electric field between the plates, and resists sudden voltage change: Q = C × V. Farads describe how many coulombs it holds per volt. Practical values are microfarads and picofarads.',
    qs: [
      {
        p: 'Capacitance Q = C × V means a 10 uF cap at 5 V holds:',
        c: ['50 uC', '2 uC', '5 uC', '0.5 uC'],
        a: 0,
        e: 'Q = C×V = 10e-6 × 5 = 50 microcoulombs.',
      },
      {
        p: 'A capacitor blocks DC in the steady state because:',
        c: ['Charge stops moving once it is fully charged', 'It is a resistor', 'It heats up', 'It is an inductor'],
        a: 0,
        e: 'Once charged to the applied voltage, no more charge flows — an open circuit at DC.',
      },
    ],
  },
  {
    key: 'ee-cap-02',
    unit: 'Capacitors & RC Circuits',
    title: 'RC Time Constant',
    level: 'intermediate',
    body:
      'A resistor and capacitor together charge with a time constant tau = R × C seconds. After one tau the voltage reaches 63% of its final value; after 5 tau it is essentially there (99%). An RC pair is the simplest timer in electronics.',
    qs: [
      {
        p: 'R = 10k, C = 100 uF. The time constant tau is:',
        c: ['1 s', '100 ms', '10 s', '1000 s'],
        a: 0,
        e: 'tau = R×C = 10,000 × 100e-6 = 1 s.',
      },
      {
        p: 'After one time constant an RC charge has reached:',
        c: ['63% of final', '50% of final', '99% of final', '100% of final'],
        a: 0,
        e: '1 − e^−1 = 63.2%.',
      },
    ],
  },
  {
    key: 'ee-cap-03',
    unit: 'Capacitors & RC Circuits',
    title: 'Capacitors in Series and Parallel',
    level: 'basic',
    body:
      'Parallel capacitors add (each adds plate area). Series capacitors combine like parallel resistors: 1/C = 1/C1 + 1/C2. Two 100 uF in parallel = 200 uF; in series = 50 uF. Always watch the voltage rating in series — it splits.',
    qs: [
      {
        p: 'Two 100 uF capacitors in parallel give:',
        c: ['200 uF', '50 uF', '100 uF', '1000 uF'],
        a: 0,
        e: 'Parallel capacitance adds.',
      },
      {
        p: 'Two 47 uF capacitors in series give:',
        c: ['23.5 uF', '94 uF', '47 uF', '4.7 uF'],
        a: 0,
        e: '1/C = 1/47 + 1/47 → C = 23.5 uF.',
      },
    ],
  },
  {
    key: 'ee-cap-04',
    unit: 'Capacitors & RC Circuits',
    title: 'RC Low-Pass Filter',
    level: 'intermediate',
    body:
      'An RC low-pass filter passes low frequencies and attenuates high ones. The corner frequency is f_c = 1/(2πRC). Above f_c the output rolls off at 20 dB per decade. This is how input filtering and decoupling work on every board.',
    qs: [
      {
        p: 'R = 1k, C = 0.1 uF. The corner frequency is about:',
        c: ['1.6 kHz', '16 kHz', '160 Hz', '16 MHz'],
        a: 0,
        e: 'f_c = 1/(2πRC) = 1/(2π × 1000 × 1e-7) ≈ 1.59 kHz.',
      },
    ],
  },

  // ── Inductors & RLC
  {
    key: 'ee-ind-01',
    unit: 'Inductors & RLC Circuits',
    title: 'The Inductor Stores Energy in a Magnetic Field',
    level: 'basic',
    body:
      'An inductor resists changes in current by storing energy in its magnetic field. The voltage across it is V = L × dI/dt. Because it opposes sudden current change, an inductor acts like a short to DC and an open to very high frequencies.',
    qs: [
      {
        p: 'At DC steady state an ideal inductor looks like:',
        c: ['A short circuit', 'An open circuit', 'A capacitor', 'A resistor'],
        a: 0,
        e: 'With dI/dt = 0 the inductor drops no voltage — a short.',
      },
    ],
  },
  {
    key: 'ee-ind-02',
    unit: 'Inductors & RLC Circuits',
    title: 'RL Time Constant',
    level: 'intermediate',
    body:
      'With a resistor and inductor in series, current builds with time constant tau = L/R. One tau reaches 63% of the final current. Big inductors with small resistors mean slow current rise — important when switching motors or relays.',
    qs: [
      {
        p: 'L = 10 mH, R = 100 ohm. tau equals:',
        c: ['100 us', '10 us', '1 s', '10 ms'],
        a: 0,
        e: 'tau = L/R = 0.01/100 = 100 microseconds.',
      },
    ],
  },
  {
    key: 'ee-ind-03',
    unit: 'Inductors & RLC Circuits',
    title: 'Series RLC Resonance',
    level: 'advanced',
    body:
      'A series LC circuit resonates at f_r = 1/(2π√(LC)). At resonance the inductive and capacitive reactances cancel, impedance is minimum (just R), and the current peaks. Selectivity is measured by Q = ωL/R — higher Q, narrower bandwidth.',
    qs: [
      {
        p: 'LC resonance: when is impedance minimum in a series RLC?',
        c: ['At the resonant frequency', 'At DC', 'At very high frequency', 'Never'],
        a: 0,
        e: 'At resonance X_L and X_C cancel, leaving only R.',
      },
      {
        p: 'The resonant formula is:',
        c: ['f = 1/(2π√(LC))', 'f = 2π√(LC)', 'f = RC', 'f = L/C'],
        a: 0,
        e: '1/(2π√(LC)) is the natural frequency.',
      },
    ],
  },

  // ── AC Signals
  {
    key: 'ee-ac-01',
    unit: 'AC Signals & Reactance',
    title: 'Sinusoids: Peak and RMS',
    level: 'basic',
    body:
      'Mains power is a sine wave. Its peak value differs from its effective (RMS) value: for a sine, V_rms = V_peak / √2. A 230 V RMS supply actually peaks near 325 V. Meters and power math use RMS; scopes show peak.',
    qs: [
      {
        p: 'A sine with 10 V peak has an RMS of about:',
        c: ['7.07 V', '10 V', '14.1 V', '5 V'],
        a: 0,
        e: '10/√2 ≈ 7.07 V RMS.',
      },
      {
        p: 'RMS value of a pure sine is:',
        c: ['Peak divided by root 2', 'Peak times root 2', 'Peak', 'Zero'],
        a: 0,
        e: 'V_peak/√2 is the equivalent heating value.',
      },
    ],
  },
  {
    key: 'ee-ac-02',
    unit: 'AC Signals & Reactance',
    title: 'Capacitive Reactance',
    level: 'intermediate',
    body:
      'A capacitor\u2019s opposition to AC is reactance X_C = 1/(2πfC). It is large at low frequency (blocks DC) and small at high frequency (passes AC). Reactance is imaginary: the current leads the voltage by 90 degrees.',
    qs: [
      {
        p: 'As frequency rises, X_C:',
        c: ['Falls', 'Rises', 'Stays constant', 'Goes negative'],
        a: 0,
        e: 'X_C = 1/(2πfC); higher f means lower reactance.',
      },
    ],
  },
  {
    key: 'ee-ac-03',
    unit: 'AC Signals & Reactance',
    title: 'Inductive Reactance',
    level: 'intermediate',
    body:
      'Opposite to capacitance, inductive reactance X_L = 2πfL rises with frequency, so an inductor is a short at DC and increasingly blocks high-frequency currents. The current through an ideal inductor lags the voltage by 90 degrees.',
    qs: [
      {
        p: 'At high frequency an ideal inductor:',
        c: ['Blocks more current', 'Conducts easily', 'Becomes a capacitor', 'Has zero reactance'],
        a: 0,
        e: 'X_L = 2πfL grows with f, fighting current changes.',
      },
    ],
  },
  {
    key: 'ee-ac-04',
    unit: 'AC Signals & Reactance',
    title: 'Impedance and Phasors',
    level: 'advanced',
    body:
      'Impedance Z combines resistance and reactance as a complex number: Z = R + jX. In AC analysis each element is a phasor and the same divider rules work, but with complex arithmetic. Magnitude |Z| = √(R² + X²).',
    qs: [
      {
        p: 'Z = 3 + j4 ohm has magnitude:',
        c: ['5 ohm', '7 ohm', '12 ohm', '1 ohm'],
        a: 0,
        e: '√(3²+4²) = √25 = 5 ohm.',
      },
    ],
  },
  {
    key: 'ee-ac-05',
    unit: 'AC Signals & Reactance',
    title: 'Power Factor',
    level: 'advanced',
    body:
      'In AC, real power is P = V×I×cos(phi), where phi is the phase between voltage and current. With only resistors cos(phi) = 1; motors and transformers have lagging current that lowers power factor and increases line losses. Power factor correction adds capacitors.',
    qs: [
      {
        p: 'A purely resistive AC load has a power factor of:',
        c: ['1', '0', '0.5', '2'],
        a: 0,
        e: 'No phase shift, so cos(0) = 1.',
      },
    ],
  },

  // ── Diodes in Circuits
  {
    key: 'ee-dio-01',
    unit: 'Diodes in Circuits',
    title: 'Rectification',
    level: 'intermediate',
    body:
      'Because a diode only conducts one way, it turns AC into pulsing DC. Half-wave rectification uses one diode and wastes half the cycle; full-wave uses four (a bridge) to use both halves. The output still ripples and needs filtering.',
    qs: [
      {
        p: 'A full-wave bridge rectifier uses how many diodes?',
        c: ['4', '1', '2', '8'],
        a: 0,
        e: 'A bridge is four diodes arranged so both half-cycles pass.',
      },
      {
        p: 'Half-wave rectified sine average voltage is about:',
        c: ['V_peak/pi', 'V_peak', '2×V_peak', 'Zero'],
        a: 0,
        e: 'The average of rectified half cycle is V_peak/π.',
      },
    ],
  },
  {
    key: 'ee-dio-02',
    unit: 'Diodes in Circuits',
    title: 'The 0.7 V Silicon Drop',
    level: 'basic',
    body:
      'A conducting silicon diode holds about 0.7 V across itself, no matter the current (over a wide range). The drop is useful: clamp a signal, protect against reverse polarity, or shift a voltage reference by a fixed amount.',
    qs: [
      {
        p: 'A forward silicon diode drops roughly:',
        c: ['0.7 V', '0.1 V', '5 V', '1.4 V'],
        a: 0,
        e: 'Silicon junction voltage is ≈0.7 V; Schottky is lower (~0.3 V).',
      },
    ],
  },
  {
    key: 'ee-dio-03',
    unit: 'Diodes in Circuits',
    title: 'Zener Regulation',
    level: 'intermediate',
    body:
      'A Zener diode breaks down at a precise reverse voltage and holds it — the basis of crude voltage references and regulators. In a shunt regulator, a series resistor feeds the Zener, and the Zener clamps the load voltage.',
    qs: [
      {
        p: 'A Zener operates in:',
        c: ['Reverse breakdown', 'Forward conduction', 'Cut-off only', 'Saturation'],
        a: 0,
        e: 'Zeners exploit controlled reverse breakdown to clamp a voltage.',
      },
    ],
  },
  {
    key: 'ee-dio-04',
    unit: 'Diodes in Circuits',
    title: 'Clipper and Clamp Circuits',
    level: 'advanced',
    body:
      'A clipper cuts a signal at a threshold set by a diode (and bias); a clamp (clamper) shifts the whole waveform up or down without changing its shape. Both are used to condition signals for comparators and ADC input ranges.',
    qs: [
      {
        p: 'A diode clipper is used to:',
        c: ['Limit a signal to a threshold', 'Amplify a signal', 'Store charge', 'Generate power'],
        a: 0,
        e: 'Clippers limit excursions; clamps shift the DC level.',
      },
    ],
  },

  // ── Transistors (BJT)
  {
    key: 'ee-bjt-01',
    unit: 'Bipolar Transistors',
    title: 'The NPN Transistor as a Switch',
    level: 'basic',
    body:
      'An NPN transistor is a current-controlled switch: a small base current turns on a large collector current, Ic = beta × Ib. In saturation the collector-emitter voltage collapses to ~0.2 V, so the transistor acts like a closed switch to ground.',
    qs: [
      {
        p: 'In saturation an NPN acts like:',
        c: ['A closed switch to ground', 'An open switch', 'A 100 ohm resistor', 'A diode to +V'],
        a: 0,
        e: 'Vce(sat) ≈ 0.2 V — effectively a closed switch.',
      },
      {
        p: 'Ic = beta × Ib means a beta of 100 with 1 mA base drives:',
        c: ['100 mA collector', '1 mA collector', '10 mA collector', '100 A collector'],
        a: 0,
        e: '100 × 1 mA = 100 mA.',
      },
    ],
  },
  {
    key: 'ee-bjt-02',
    unit: 'Bipolar Transistors',
    title: 'Biasing for Linear Operation',
    level: 'intermediate',
    body:
      'To amplify, a BJT must sit in the active region with collector voltage around mid-rail. A voltage divider on the base sets the operating point and emitter feedback stabilizes it against beta and temperature swings.',
    qs: [
      {
        p: 'For linear amplification a BJT must operate in the:',
        c: ['Active region', 'Cut-off', 'Saturation', 'Reverse breakdown'],
        a: 0,
        e: 'Active region keeps the transistor a controllable current source.',
      },
    ],
  },
  {
    key: 'ee-bjt-03',
    unit: 'Bipolar Transistors',
    title: 'Common-Emitter Amplifier',
    level: 'advanced',
    body:
      'The common-emitter stage gives voltage gain roughly −R_C/R_E. Input at the base, output at the collector, emitter degenerated with a resistor. Its phase inversion (output flips) is a defining trait. Capacitors couple AC in and out.',
    qs: [
      {
        p: 'The common-emitter voltage gain is approximately:',
        c: ['−R_C/R_E', 'R_E/R_C', 'beta', '1'],
        a: 0,
        e: 'Gain ≈ −R_C/R_E; the minus sign is the 180° inversion.',
      },
    ],
  },
  {
    key: 'ee-bjt-04',
    unit: 'Bipolar Transistors',
    title: 'Emitter-Follower (Common Collector)',
    level: 'intermediate',
    body:
      'The emitter follower has unity gain (a bit less than 1) but huge current gain. Its output sits at base voltage minus 0.7 V and can drive heavy loads. It is the classic buffer: high input impedance, low output impedance.',
    qs: [
      {
        p: 'An emitter follower buffers because it has:',
        c: ['High input / low output impedance', 'Low input / high output impedance', 'Voltage gain of 100', 'Negative feedback loop'],
        a: 0,
        e: 'High impedance input and low impedance output transfer signal without loading.',
      },
    ],
  },

  // ── MOSFETs
  {
    key: 'ee-mos-01',
    unit: 'MOSFETs',
    title: 'Voltage-Controlled Switch',
    level: 'basic',
    body:
      'A MOSFET is controlled by voltage, not current: raise the gate-source voltage above the threshold V_th and the channel conducts. An N-channel MOSFET switches a load to ground; a P-channel switches it to the positive rail.',
    qs: [
      {
        p: 'A MOSFET switches based on:',
        c: ['Gate-source voltage', 'Base current', 'Collector current', 'Body temperature'],
        a: 0,
        e: 'MOSFET = voltage controlled; BJT = current controlled.',
      },
    ],
  },
  {
    key: 'ee-mos-02',
    unit: 'MOSFETs',
    title: 'Regions of Operation',
    level: 'intermediate',
    body:
      'An NMOS has three regions: cut-off (below threshold, off), triode (linear, small Vds, like a resistor), and saturation (constant current for amplifier use). In digital logic only cut-off and triode are used — saturation is for analog.',
    qs: [
      {
        p: 'A MOSFET used as an amplifier operates in:',
        c: ['Saturation', 'Triode', 'Cut-off', 'Breakdown'],
        a: 0,
        e: 'Saturation gives constant current — useful for gain.',
      },
    ],
  },
  {
    key: 'ee-mos-03',
    unit: 'MOSFETs',
    title: 'CMOS Inverter',
    level: 'basic',
    body:
      'A CMOS inverter is an N-channel and P-channel pair. Input high turns the N on and P off, pulling the output to ground; input low does the opposite. Static power is nearly zero because one transistor is always off.',
    qs: [
      {
        p: 'A CMOS inverter with input HIGH produces:',
        c: ['LOW', 'HIGH', 'A pulse', 'An open'],
        a: 0,
        e: 'NMOS on pulls output to 0, so the inverter flips the input.',
      },
      {
        p: 'CMOS static power is nearly zero because:',
        c: ['One stack transistor is always off', 'It uses no voltage', 'It is a capacitor', 'It turns off the clock'],
        a: 0,
        e: 'Complementary p/n stack means no DC path rails to ground.',
      },
    ],
  },

  // ── Op-Amps
  {
    key: 'ee-opa-01',
    unit: 'Op-Amps',
    title: 'The Operational Amplifier',
    level: 'basic',
    body:
      'An op-amp is a high-gain differential amplifier: out = A × (V+ − V−), with A typically 100,000 or more. Two golden rules let you analyze almost any circuit: (1) with feedback, the inputs sit at the same voltage; (2) inputs draw no current.',
    qs: [
      {
        p: 'The ideal op-amp input current is:',
        c: ['Zero', '1 mA', 'Infinite', 'The supply current'],
        a: 0,
        e: 'Field-effect inputs draw (almost) no current.',
      },
    ],
  },
  {
    key: 'ee-opa-02',
    unit: 'Op-Amps',
    title: 'Inverting Amplifier',
    level: 'intermediate',
    body:
      'The inverting amplifier gains −R_f/R_in. The summing junction (minus input) stays at virtual ground, so current through R_in flows to R_f. With R_f = 10k and R_in = 2k, the gain is −5.',
    qs: [
      {
        p: 'R_f = 10k, R_in = 2k gives an inverting gain of:',
        c: ['−5', '5', '−0.2', '12'],
        a: 0,
        e: '−R_f/R_in = −10k/2k = −5.',
      },
    ],
  },
  {
    key: 'ee-opa-03',
    unit: 'Op-Amps',
    title: 'Non-Inverting Amplifier',
    level: 'intermediate',
    body:
      'The non-inverting amplifier gains 1 + R_f/R_g and never inverts. With R_f = 9k and R_g = 1k the gain is 10. Input impedance is extremely high since the signal connects straight to the amplifier input.',
    qs: [
      {
        p: 'Gain = 1 + R_f/R_g. R_f = 9k, R_g = 1k gives:',
        c: ['10', '9', '1', '8'],
        a: 0,
        e: '1 + 9k/1k = 10.',
      },
    ],
  },
  {
    key: 'ee-opa-04',
    unit: 'Op-Amps',
    title: 'Summing and Difference',
    level: 'advanced',
    body:
      'The inverting summing amp outputs −(V1/R1 + V2/R2)×R_f — add signals with weighted resistors. The difference amp subtracts inputs, ideal for measuring a sensor differentially and rejecting common-mode noise.',
    qs: [
      {
        p: 'An inverting summing amplifier with two equal inputs R1 = R2 = R_f:',
        c: ['Outputs the negative sum', 'Outputs the difference', 'Halves the sum', 'Outputs nothing'],
        a: 0,
        e: 'Each input contributes −V×R_f/R; equal resistors give the negated sum.',
      },
    ],
  },
  {
    key: 'ee-opa-05',
    unit: 'Op-Amps',
    title: 'Comparator vs Amplifier',
    level: 'intermediate',
    body:
      'Without feedback an op-amp becomes a comparator: the output slams to one rail or the other depending on which input is higher. Add positive feedback (hysteresis) so the threshold differs for rising vs falling signals — no chattering.',
    qs: [
      {
        p: 'An op-amp used open-loop acts as a:',
        c: ['Comparator', 'Linear amplifier', 'Filter', 'Oscillator'],
        a: 0,
        e: 'Open loop, huge gain pushes the output to a rail — compare only.',
      },
    ],
  },

  // ── Power & Regulation
  {
    key: 'ee-psu-01',
    unit: 'Power Supplies & Regulation',
    title: 'Linear Regulators',
    level: 'basic',
    body:
      'A linear regulator (like a 7805) drops a higher voltage to a stable lower one and rejects ripple. The catch: wasted energy is (Vin − Vout) × I. From 12 V to 5 V at 1 A, that is 7 W of heat — fans and heatsinks territory.',
    qs: [
      {
        p: 'A 7805 converts 12 V to 5 V. At 1 A the waste heat is:',
        c: ['7 W', '5 W', '12 W', '2 W'],
        a: 0,
        e: '(12−5) × 1 = 7 W dissipated as heat.',
      },
    ],
  },
  {
    key: 'ee-psu-02',
    unit: 'Power Supplies & Regulation',
    title: 'Switching Converters (Buck)',
    level: 'advanced',
    body:
      'A buck converter chops the input with a switch, filters it through an inductor-capacitor pair, and regulates the average by switching duty. Efficiency reaches 90%+ because the switch is either fully on or fully off — little loss regardless of Vin/Vout ratio.',
    qs: [
      {
        p: 'A buck converter steps:',
        c: ['Voltage down', 'Voltage up', 'AC to DC only', 'Current down only'],
        a: 0,
        e: 'Buck = step-down; boost = step-up; buck-boost = either.',
      },
    ],
  },
  {
    key: 'ee-psu-03',
    unit: 'Power Supplies & Regulation',
    title: 'Decoupling Capacitors',
    level: 'intermediate',
    body:
      'ICs demand sudden current spikes; distant traces cannot deliver instantly. A small ceramic capacitor right at each power pin sources the spike. Values of 100 nF are common, with 1–10 uF bulk nearby. Bad decoupling shows up as glitches and EMI.',
    qs: [
      {
        p: 'A 100 nF decoupling cap should sit:',
        c: ['Right at the IC power pin', 'At the power connector only', 'In series with the signal', 'On the ground plane corner'],
        a: 0,
        e: 'Near the pin to minimize trace inductance between cap and pin.',
      },
    ],
  },

  // ── Sensors & Conversion
  {
    key: 'ee-snr-01',
    unit: 'Sensors & Signal Conversion',
    title: 'ADC: Turning Voltage into Numbers',
    level: 'basic',
    body:
      'An analog-to-digital converter samples a voltage and returns a binary number. Resolution is LSB = V_ref / 2^n. A 10-bit ADC with 5 V reference resolves about 4.88 mV per step. Sampling faster means more data — and more storage.',
    qs: [
      {
        p: 'V_ref = 5 V, 10-bit ADC. The LSB is about:',
        c: ['4.88 mV', '5 V', '48.8 mV', '0.5 V'],
        a: 0,
        e: '5/1024 ≈ 4.88 mV per count.',
      },
    ],
  },
  {
    key: 'ee-snr-02',
    unit: 'Sensors & Signal Conversion',
    title: 'Thermistors and Voltage Dividers',
    level: 'intermediate',
    body:
      'A thermistor changes resistance with temperature. Put it in a voltage divider and its resistance becomes a voltage the ADC can read. The relation is strongly nonlinear, so firmware converts via the Steinhart–Hart equation or a lookup table.',
    qs: [
      {
        p: 'To read an NTC thermistor with a microcontroller you usually:',
        c: ['Use it in a voltage divider into an ADC', 'Put it in parallel with a relay', 'Short it across the battery', 'Heat it first'],
        a: 0,
        e: 'The divider turns resistance change into readable voltage.',
      },
    ],
  },
  {
    key: 'ee-snr-03',
    unit: 'Sensors & Signal Conversion',
    title: 'Instrumentation Amplifier',
    level: 'advanced',
    body:
      'When a sensor signal rides on a large common-mode voltage, an instrument amp rejects the common part and amplifies only the difference. A single-gain resistor sets the gain (often 1 + 50k/Rg). Strain gauges and ECG use these.',
    qs: [
      {
        p: 'An instrumentation amplifier is best for:',
        c: ['Small differential signals with big common-mode noise', 'Switching 10 A loads', 'Rectifying AC mains', 'Storing energy'],
        a: 0,
        e: 'High CMRR isolates the tiny sensor signal from interference.',
      },
    ],
  },
// ── Audio circuits
  {
    key: 'ee-aud-01',
    unit: 'Audio & Drivers',
    title: 'Microphone and Preamps',
    level: 'basic',
    body:
      'A microphone produces tiny signal — mV to tens of mV. A preamp (op-amp with gain) lifts it to line level without adding much noise. Gain comes from the resistor ratio: Av = 1 + Rf/Rg for a non-inverting stage.',
    qs: [
      {
        p: 'A non-inverting amp gain is:',
        c: ['1 + Rf/Rg', 'Rf/Rg', 'Rg/Rf', 'Rf × Rg'],
        a: 0,
        e: 'Feedback ratio sets the non-inverting gain.',
      },
    ],
  },
  {
    key: 'ee-aud-02',
    unit: 'Audio & Drivers',
    title: 'Class A/B/C/D Amplifiers',
    level: 'intermediate',
    body:
      'Class A conducts always: pure but ~50% max efficient. Class B pushes/pulls half cycles (~60-78%). Class D switches a PWM into a filter — up to ~90% efficient, which is why Bluetooth speakers run Class D.',
    qs: [
      {
        p: 'Class D amplifiers get high efficiency by:',
        c: ['Switching transistors instead of linear conduction', 'Using bigger heatsinks', 'Lower supply voltage', 'Magnet speakers'],
        a: 0,
        e: 'Full-on/full-off states waste little power.',
      },
    ],
  },
  {
    key: 'ee-aud-03',
    unit: 'Audio & Drivers',
    title: 'Piezo Buzzers and Sounders',
    level: 'basic',
    body:
      'A piezo disc bends when driven by voltage and sounds a tone. Drive it with a square wave at the resonant frequency, or a self-oscillating buzzer just needs DC. Amplitude control is harder than you\u2019d think due to resonance.',
    qs: [
      {
        p: 'A piezo buzzer needs:',
        c: ['An AC/square drive at its frequency', 'Steady DC only', 'No power', 'A magnet'],
        a: 0,
        e: 'Alternating voltage makes the crystal flex and sing.',
      },
    ],
  },
  {
    key: 'ee-aud-04',
    unit: 'Audio & Drivers',
    title: 'Speaker Impedance and Power',
    level: 'intermediate',
    body:
      'Speakers are rated in ohms (4/8 Ω) and power (W). A stable amplifier must deliver current into the load: P = V²/R. An 8 Ω speaker at 3 W needs ~5 V RMS. Over-driving distorts and burns the coil.',
    qs: [
      {
        p: 'Power into a speaker is:',
        c: ['V²/R', 'V×R', 'I×R²', 'V/R'],
        a: 0,
        e: 'P = VI = V²/R.',
      },
    ],
  },
  {
    key: 'ee-aud-05',
    unit: 'Audio & Drivers',
    title: 'Audio Filters via RC',
    level: 'intermediate',
    body:
      'Audio paths use RC filters: a high-pass kills DC and hum, a low-pass kills hiss. Corner frequency f = 1/(2πRC). Cascading RC stages sharpens the slope but adds loss — that is why active filters in op-amps shine.',
    qs: [
      {
        p: 'RC low-pass corner frequency is:',
        c: ['1/(2πRC)', '2πRC', 'R×C', '1/R'],
        a: 0,
        e: 'Where the response drops 3 dB.',
      },
    ],
  },

  // ── Advanced power
  {
    key: 'ee-pwr2-01',
    unit: 'Power Electronics',
    title: 'Buck Converters',
    level: 'intermediate',
    body:
      'A buck converter steps voltage down efficiently: a switch chops supply through an LC filter. Duty cycle ≈ Vout/Vin. It converts 12 V to 5 V at 90% efficiency — far better than a linear regulator dropping the same 7 V.',
    qs: [
      {
        p: 'Buck converter output averages:',
        c: ['Vin × duty cycle', 'Vin + duty', 'Vin/duty', 'Always 5 V'],
        a: 0,
        e: 'The switch average equals Vout.',
      },
    ],
  },
  {
    key: 'ee-pwr2-02',
    unit: 'Power Electronics',
    title: 'Boost Converters',
    level: 'advanced',
    body:
      'A boost converter steps voltage up: the inductor stores energy while the switch is on, then dumps it into the load when off. Vout = Vin/(1 − duty). They power LED strings and white-backlight rails from 3.3 V.',
    qs: [
      {
        p: 'Boost output relation is:',
        c: ['Vin/(1 − duty)', 'Vin × duty', 'Vin/capacitance', 'Always 12 V'],
        a: 0,
        e: 'The inductor\u2019s energy-transfer lift.',
      },
    ],
  },
  {
    key: 'ee-pwr2-03',
    unit: 'Power Electronics',
    title: 'Buck-Boost and SEPIC',
    level: 'advanced',
    body:
      'A buck-boost or SEPIC converts up or down from the same circuit — handy when input wanders (a Li-ion cell, 3.0–4.2 V, must feed a fixed rail). SEPIC adds a capacitor coupling so the output polarity stays positive.',
    qs: [
      {
        p: 'Buck-boost/SEPIC are used when:',
        c: ['Input voltage can be above or below output', 'Input is fixed', 'Output must be negative', 'No inductor exists'],
        a: 0,
        e: 'Either-direction conversion for variable input.',
      },
    ],
  },
  {
    key: 'ee-pwr2-04',
    unit: 'Power Electronics',
    title: 'Linear vs Switching Summit',
    level: 'intermediate',
    body:
      'Linear regulators are simple, quiet, and perfect for small current; they burn (Vin−Vout)×I as heat. Switching converters are efficient but noisy and complex with inductors. The engineering call: where noiseless analog matters, linear; where watts matter, switching.',
    qs: [
      {
        p: 'A linear regulator dissipates:',
        c: ['(Vin − Vout) × I as heat', 'Vin × I', 'No heat', 'Only switching losses'],
        a: 0,
        e: 'The dropped voltage times current is wasted.',
      },
    ],
  },
  {
    key: 'ee-pwr2-05',
    unit: 'Power Electronics',
    title: 'Inductor Basics',
    level: 'intermediate',
    body:
      'An inductor stores energy in a magnetic field and resists current changes: V = L·dI/dt. It smooths current in switchers and blocks AC in chokes. Saturation — the core giving up — collapses inductance at high current.',
    qs: [
      {
        p: 'Inductor voltage relates to:',
        c: ['Rate of change of current', 'Absolute current', 'Resistance only', 'Capacitance'],
        a: 0,
        e: 'V = L dI/dt.',
      },
    ],
  },

  // ── Advanced semiconductor circuits
  {
    key: 'ee-adv-01',
    unit: 'Advanced Analog',
    title: 'Crystal Oscillators',
    level: 'intermediate',
    body:
      'A quartz crystal vibrates at a precise frequency (±ppm); a feedback amp with the crystal in the loop oscillates exactly there. Crystals are the stable clock source for MCUs and radios. Load capacitance shifts frequency — match it.',
    qs: [
      {
        p: 'Crystal frequency accuracy is:',
        c: ['Parts-per-million, very stable', 'Rough, ±20%', 'Unpredictable', 'Voltage locked'],
        a: 0,
        e: 'Mechanical resonance is extraordinarily stable.',
      },
    ],
  },
  {
    key: 'ee-adv-02',
    unit: 'Advanced Analog',
    title: 'Phase-Locked Loops',
    level: 'advanced',
    body:
      'A PLL compares a divided output to a reference and adjusts a VCO until they lock — producing multiplied, clean clocks. Synthesizers use the same idea: dividers set the frequency. Lock time and noise matter in radios.',
    qs: [
      {
        p: 'A PLL locks by:',
        c: ['Adjusting the VCO until phases match', 'Resonating a crystal', 'Filtering the clock', 'Turning off'],
        a: 0,
        e: 'Phase detector + loop filter steer the VCO.',
      },
    ],
  },
  {
    key: 'ee-adv-03',
    unit: 'Advanced Analog',
    title: 'Switched-Capacitor Circuits',
    level: 'advanced',
    body:
      'A switch toggling between two capacitors transfers fixed charge packets per cycle — an equivalent resistance without resistors. Voltage doublers and micro-power DC-DCs (charge pumps) are built this way. R_eq = 1/(f·C).',
    qs: [
      {
        p: 'Charge pumps convert voltage using:',
        c: ['Switched capacitors', 'Inductors necessarily', 'Transformers', 'Resistor ladders only'],
        a: 0,
        e: 'Charge packets transfer between capacitor stages.',
      },
    ],
  },
  {
    key: 'ee-adv-04',
    unit: 'Advanced Analog',
    title: 'Noise in Circuits',
    level: 'advanced',
    body:
      'Noise floors every design: thermal (√(4kTRB)), flicker (1/f, worse low-frequency), shot (current quanta). Signal-to-noise is set by the first stage — a noisy preamp can not be recovered later. Keep early gain clean.',
    qs: [
      {
        p: 'Thermal noise grows with:',
        c: ['Temperature and bandwidth', 'Voltage only', 'Switching rate', 'Pin count'],
        a: 0,
        e: '√(4kTRB): heat and bandwidth raise noise.',
      },
    ],
  },
  {
    key: 'ee-adv-05',
    unit: 'Advanced Analog',
    title: 'ESD Protection on Inputs',
    level: 'intermediate',
    body:
      'Every external input needs ESD protection: clamp diodes to the rails, series resistance, and TVSs for heavy abuse. Without it a fingertip on a pin can blow the input transistor. Add 1k series + clamps as the default recipe.',
    qs: [
      {
        p: 'ESD clamps direct surges:',
        c: ['Away from gate oxides to the rails', 'Into the crystal', 'Into the PCB traces', 'To the battery'],
        a: 0,
        e: 'Diodes/TVS shunt high spikes safely.',
      },
    ],
  },
];

let cache: GeneratedGroup | null = null;
export function electronics(): GeneratedGroup {
  cache ??= build('electronics', MODULES);
  return cache;
}