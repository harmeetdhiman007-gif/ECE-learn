import type { Subject, Lesson } from './types.js';

// ── Circuit fixtures (all verified to simulate — see test/catalog.test.ts) ──
// Standard grid: battery up the left (x=1, y1→y3), top rail, resistor span,
// LED/lamp down the right (x=4), bottom rail back to battery negative.
const BAT_9V = {
  id: 'bat1',
  kind: 'battery' as const,
  a: { x: 1, y: 1 },
  b: { x: 1, y: 3 },
  value: 9,
};

const WIRE_TOP = {
  id: 'w0',
  kind: 'wire' as const,
  a: { x: 1, y: 1 },
  b: { x: 2, y: 1 },
};

const R330_SPAN = {
  id: 'r1',
  kind: 'resistor' as const,
  a: { x: 2, y: 1 },
  b: { x: 4, y: 1 },
  value: 330,
};

const LED_Y = {
  id: 'led1',
  kind: 'led' as const,
  a: { x: 4, y: 1 },
  b: { x: 4, y: 3 },
  color: '#ffdd00',
};

const MOTOR_LAMP = {
  id: 'm1',
  kind: 'lamp' as const,
  a: { x: 4, y: 1 },
  b: { x: 4, y: 3 },
};

const WIRE_BOTTOM_BROKEN = {
  id: 'w1',
  kind: 'wire' as const,
  a: { x: 4, y: 3 },
  b: { x: 1, y: 3 },
  broken: true,
};

// ── Subjects (real SiLo structure) ─────────────────────────────────
export const SUBJECTS: Subject[] = [
  {
    id: 'electronics',
    title: 'Electronics',
    description: 'Voltage, current, resistance, and the fundamentals of real circuits.',
    color: '#00ff88',
    icon: '⚡',
    lessonIds: ['l1', 'l2', 'l3', 'l4', 'l5', 'l-bands', 'l8', 'l6', 'l7', 'l-switch', 'l-build'],
    units: [
      { id: 'u-basics', title: 'Silicon Basics', lessonIds: ['l1', 'l2'] },
      { id: 'u-ohms-series', title: "Ohm's Law & Series", lessonIds: ['l3', 'l4', 'l8'] },
      { id: 'u-components', title: 'Components', lessonIds: ['l5', 'l-bands'] },
      { id: 'u-parallel-switches', title: 'Parallel & Switches', lessonIds: ['l6', 'l7', 'l-switch'] },
      { id: 'u-build', title: 'Draw & Build', lessonIds: ['l-build'] },
    ],
  },
  {
    id: 'digital',
    title: 'Digital Circuits',
    description: 'Logic gates, binary, and how chips make decisions.',
    color: '#f78166',
    icon: '💻',
    lessonIds: ['l-gate', 'l-andor', 'l-binary'],
    units: [
      { id: 'u-gates', title: 'Logic Gates', lessonIds: ['l-gate', 'l-andor'] },
      { id: 'u-binary', title: 'Binary', lessonIds: ['l-binary'] },
    ],
  },
  {
    id: 'semiconductors',
    title: 'Semiconductors',
    description: 'Diodes, transistors, and the building blocks of modern electronics.',
    color: '#da6882',
    icon: '🔬',
    lessonIds: ['l-diode', 'l-transistor'],
    units: [
      { id: 'u-diodes', title: 'Diodes', lessonIds: ['l-diode'] },
      { id: 'u-transistors', title: 'Transistors', lessonIds: ['l-transistor'] },
    ],
  },
  {
    id: 'embedded',
    title: 'Embedded Systems',
    description: 'Microcontrollers, sensors, and making circuits think.',
    color: '#7ee08a',
    icon: '🤖',
    lessonIds: ['l-arduino', 'l-pwm'],
    units: [
      { id: 'u-mcu', title: 'Microcontrollers', lessonIds: ['l-arduino', 'l-pwm'] },
    ],
  },
  {
    id: 'programming',
    title: 'Programming',
    description: 'Python and Arduino C++ — write the code that drives hardware.',
    color: '#58a6ff',
    icon: '⌨️',
    lessonIds: ['l-var', 'l-loop'],
    units: [
      { id: 'u-code-basics', title: 'Code Basics', lessonIds: ['l-var', 'l-loop'] },
    ],
  },
  {
    id: 'pcb',
    title: 'PCB Design',
    description: 'SiliconCAD — design real circuit boards.',
    color: '#d29922',
    icon: '📐',
    lessonIds: ['l-pcb', 'l-trace'],
    units: [
      { id: 'u-pcb-intro', title: 'Board Basics', lessonIds: ['l-pcb', 'l-trace'] },
    ],
  },
  {
    id: 'robotics',
    title: 'Robotics',
    description: 'Motors, sensors, and autonomous machines — SiLo World awaits.',
    color: '#9b59b6',
    icon: '🦾',
    lessonIds: ['l-motor', 'l-servo'],
    units: [
      { id: 'u-actuators', title: 'Making Things Move', lessonIds: ['l-motor', 'l-servo'] },
    ],
  },
];

// ── Lessons ──────────────────────────────────────────────────────────
export const LESSONS: Lesson[] = [
  // ─── L1: What is Electricity? ──────────────────────────────────────
  {
    id: 'l1',
    title: 'What is Electricity?',
    subtitle: 'The invisible force that powers everything.',
    subjectId: 'electronics',
    order: 1,
    xpReward: 30,
    steps: [
      {
        type: 'info',
        id: 'l1-s1',
        title: 'Electricity',
        body: "Electricity is the flow of tiny particles called electrons through a material. Think of it like water flowing through a pipe — except the \"pipe\" is a wire and the \"water\" is invisible.",
      },
      {
        type: 'info',
        id: 'l1-s2',
        title: 'A Circuit',
        body: "For electricity to flow, it needs a complete loop — called a circuit. If the loop is broken anywhere, current stops. That's why a lamp goes out when you flip the switch open.",
      },
      {
        type: 'info',
        id: 'l1-s3',
        title: 'The Three Essentials',
        body: "Every circuit needs three things: a source (like a battery) that pushes electrons, a conductor (wire) that carries them, and a load (like a lamp or LED) that does something useful with the energy.",
      },
      {
        type: 'quiz',
        id: 'l1-q1',
        prompt: 'What is a circuit?',
        choices: [
          'A type of battery',
          'A complete loop that allows electricity to flow',
          'A single wire connected to a light',
          'The same thing as voltage',
        ],
        correctIndex: 1,
        explanation:
          'A circuit is a complete, closed loop through which electric current can flow. Without a complete loop, current cannot move.',
        xp: 10,
      },
      {
        type: 'circuit',
        id: 'l1-c1',
        prompt: 'Fix the broken circuit!',
        instruction:
          'This circuit has a break in the wire. Tap the broken wire to reconnect it and light the LED.',
        circuit: {
          components: [
            BAT_9V,
            WIRE_TOP,
            R330_SPAN,
            LED_Y,
            WIRE_BOTTOM_BROKEN,
          ],
        },
        task: 'fix-break',
        check: 'led:conducting',
        xp: 20,
      },
    ],
  },

  // ─── L2: Voltage & Current ─────────────────────────────────────────
  {
    id: 'l2',
    title: 'Voltage & Current',
    subtitle: 'The push and the flow.',
    subjectId: 'electronics',
    order: 2,
    xpReward: 35,
    steps: [
      {
        type: 'info',
        id: 'l2-s1',
        title: 'Voltage (V)',
        body: "Voltage is the electrical pressure that pushes electrons through a circuit. A 9V battery pushes harder than a 1.5V AA. The unit is the Volt, named after Alessandro Volta.",
      },
      {
        type: 'info',
        id: 'l2-s2',
        title: 'Current (I)',
        body: "Current is the actual flow of electrons — how many pass a point each second. Measured in Amperes (Amps). A phone charger draws about 0.5A; a toaster might draw 10A.",
      },
      {
        type: 'quiz',
        id: 'l2-q1',
        prompt: 'Which one pushes electrons through a circuit?',
        choices: ['Current', 'Resistance', 'Voltage', 'Capacitance'],
        correctIndex: 2,
        explanation:
          "Voltage is the \"pressure\" that causes current to flow. Current is the result — the actual movement of charge.",
        xp: 10,
      },
      {
        type: 'quiz',
        id: 'l2-q2',
        prompt: 'Current is measured in:',
        choices: ['Volts', 'Ohms', 'Watts', 'Amperes'],
        correctIndex: 3,
        explanation:
          'Amperes (Amps) measure the rate of electron flow — how many electrons pass a point per second.',
        xp: 10,
      },
      {
        type: 'circuit',
        id: 'l2-c1',
        prompt: 'Complete the circuit!',
        instruction:
          'This battery is connected to an LED through a resistor, but the bottom wire is broken. Fix it!',
        circuit: {
          components: [
            BAT_9V,
            WIRE_TOP,
            R330_SPAN,
            LED_Y,
            WIRE_BOTTOM_BROKEN,
          ],
        },
        task: 'fix-break',
        check: 'led:conducting',
        xp: 15,
      },
    ],
  },

  // ─── L3: Ohm's Law ────────────────────────────────────────────────
  {
    id: 'l3',
    title: "Ohm's Law",
    subtitle: 'The most important equation in electronics.',
    subjectId: 'electronics',
    order: 3,
    xpReward: 40,
    steps: [
      {
        type: 'info',
        id: 'l3-s1',
        title: 'V = I × R',
        body: "Ohm's Law says voltage equals current times resistance. If you know any two values, you can calculate the third. It's the bread and butter of circuit analysis.",
      },
      {
        type: 'info',
        id: 'l3-s2',
        title: 'Putting it to work',
        body: "A 9V battery connected to a 330Ω resistor: I = V/R = 9/330 ≈ 0.027A = 27mA. That's enough to safely light an LED.",
      },
      {
        type: 'quiz',
        id: 'l3-q1',
        prompt: 'A 100Ω resistor has 2V across it. What is the current?',
        choices: ['0.02 A (20 mA)', '0.2 A (200 mA)', '200 A', '2 A'],
        correctIndex: 0,
        explanation:
          "Using Ohm's Law: I = V/R = 2/100 = 0.02A = 20mA. The formula rearranges to I = V/R.",
        xp: 10,
      },
      {
        type: 'quiz',
        id: 'l3-q2',
        prompt: 'If you double the voltage across a resistor, what happens to the current?',
        choices: [
          'It doubles',
          'It halves',
          'It stays the same',
          'It quadruples',
        ],
        correctIndex: 0,
        explanation:
          "Ohm's Law: I = V/R. If V doubles and R stays the same, I must also double.",
        xp: 10,
      },
      {
        type: 'circuit',
        id: 'l3-c1',
        prompt: 'Build a working LED circuit!',
instruction:
          'A 9V battery, a 330Ω resistor, and a yellow LED. The bottom wire is broken � tap it to fix the circuit and watch the LED glow!',
        circuit: {
          components: [
            BAT_9V,
            WIRE_TOP,
            R330_SPAN,
            LED_Y,
            WIRE_BOTTOM_BROKEN,
          ],
        },
        task: 'fix-break',
        check: 'led:conducting',
        xp: 20,
      },
    ],
  },

  // ─── L4: Series Circuits ───────────────────────────────────────────
  {
    id: 'l4',
    title: 'Series Circuits',
    subtitle: 'Components in a line — the same current flows through each.',
    subjectId: 'electronics',
    order: 4,
    xpReward: 40,
    steps: [
      {
        type: 'info',
        id: 'l4-s1',
        title: 'One Path',
        body: "In a series circuit, components are wired end-to-end so there's only one path for current. The same current flows through every component — but voltage is shared.",
      },
      {
        type: 'info',
        id: 'l4-s2',
        title: 'Voltage Divides',
        body: "If two identical resistors are in series across 9V, each gets 4.5V. The total resistance adds up: R_total = R1 + R2. More resistance means less current.",
      },
      {
        type: 'quiz',
        id: 'l4-q1',
        prompt:
          'Two 100Ω resistors are in series across a 10V battery. What is the total resistance?',
        choices: ['100Ω', '200Ω', '50Ω', '400Ω'],
        correctIndex: 1,
        explanation:
          'In series, resistances add: R_total = R1 + R2 = 100 + 100 = 200Ω.',
        xp: 10,
      },
      {
        type: 'quiz',
        id: 'l4-q2',
        prompt:
          'In a series circuit, what happens if one component fails open?',
        choices: [
          'The other components keep working',
          'The entire circuit stops working',
          'Only the failed component is affected',
          'The voltage increases',
        ],
        correctIndex: 1,
        explanation:
          'Since there is only one path for current, an open component breaks the entire circuit. Current drops to zero everywhere.',
        xp: 10,
      },
      {
        type: 'circuit',
        id: 'l4-c1',
        prompt: 'Two resistors in series!',
        instruction:
          'This circuit has two resistors (330Ω + 220Ω) in series with a 9V battery and a yellow LED. Fix the broken wire to light the LED!',
        circuit: {
          components: [
            BAT_9V,
            { id: 'r1', kind: 'resistor', a: { x: 1, y: 1 }, b: { x: 3, y: 1 }, value: 330 },
            { id: 'r2', kind: 'resistor', a: { x: 3, y: 1 }, b: { x: 4, y: 1 }, value: 220 },
            { id: 'led1', kind: 'led', a: { x: 4, y: 1 }, b: { x: 4, y: 3 }, color: '#ffdd00' },
            { id: 'w1', kind: 'wire', a: { x: 4, y: 3 }, b: { x: 1, y: 3 }, broken: true },
          ],
        },
        task: 'fix-break',
        check: 'led:conducting',
        xp: 20,
      },
    ],
  },

  // ─── L5: Resistors ────────────────────────────────────────────────
  {
    id: 'l5',
    title: 'Resistors',
    subtitle: 'How to limit current and divide voltage.',
    subjectId: 'electronics',
    order: 5,
    xpReward: 35,
    steps: [
      {
        type: 'info',
        id: 'l5-s1',
        title: 'What does a resistor do?',
        body: "A resistor opposes the flow of current. It's like narrowing a pipe — water still flows, but less of it. Resistors are measured in Ohms (Ω).",
      },
      {
        type: 'info',
        id: 'l5-s2',
        title: 'Why you need one',
        body: "An LED without a resistor will try to draw infinite current and burn out. A 330Ω resistor with a 9V battery limits current to about 20mA — perfect for an LED.",
      },
      {
        type: 'quiz',
        id: 'l5-q1',
        prompt: 'What happens if you remove the resistor from an LED circuit?',
        choices: [
          'The LED gets dimmer',
          'The LED draws too much current and burns out',
          'Nothing changes',
          'The battery dies faster but the LED is fine',
        ],
        correctIndex: 1,
        explanation:
          'Without a resistor, the LED has almost no opposition to current. It draws a huge current and destroys itself almost instantly.',
        xp: 10,
      },
      {
        type: 'quiz',
        id: 'l5-q2',
        prompt: 'Which resistor value limits current the most?',
        choices: ['100Ω', '330Ω', '1kΩ', '10Ω'],
        correctIndex: 2,
        explanation:
          "Higher resistance = more opposition = less current. 1kΩ (1000Ω) is the highest value here, so it limits current the most.",
        xp: 10,
      },
      {
        type: 'circuit',
        id: 'l5-c1',
        prompt: 'Protect the LED!',
        instruction:
          'This circuit has a 9V battery and a yellow LED — but no resistor! The LED would burn out. Replace the broken wire with a proper connection through the resistor (already placed) by tapping the break.',
        circuit: {
          components: [
            BAT_9V,
            { id: 'r1', kind: 'resistor', a: { x: 1, y: 1 }, b: { x: 3, y: 1 }, value: 330 },
            { id: 'led1', kind: 'led', a: { x: 3, y: 1 }, b: { x: 3, y: 3 }, color: '#ff4444' },
            { id: 'w1', kind: 'wire', a: { x: 3, y: 3 }, b: { x: 1, y: 3 }, broken: true },
          ],
        },
        task: 'fix-break',
        check: 'led:conducting',
        xp: 15,
      },
    ],
  },

  // ─── L-BANDS: Reading Resistor Bands ──────────────────────────────
  {
    id: 'l-bands',
    title: 'Reading Resistor Bands',
    subtitle: 'Decode the rainbow — every resistor tells its value.',
    subjectId: 'electronics',
    order: 6,
    xpReward: 45,
    steps: [
      {
        type: 'info',
        id: 'l-bands-s1',
        title: 'Color Bands',
        body: "Resistors use colored bands to indicate their value. The first two bands are digits, the third is a multiplier, and the fourth is tolerance. Gold means ±5%, silver means ±10%.",
      },
      {
        type: 'bands',
        id: 'l-bands-c1',
        prompt: 'Decode this resistor — what is its value?',
        instruction: 'Tap each band to cycle through the colors until you read the correct value.',
        value: 330,
        explanation:
          'Orange = 3, Orange = 3, Brown = ×10 → 33 × 10 = 330Ω, with gold (±5%) tolerance. The classic value for LED current limiting.',
        xp: 15,
      },
      {
        type: 'quiz',
        id: 'l-bands-q1',
        prompt: 'Which color represents the digit 3?',
        choices: ['Red', 'Orange', 'Yellow', 'Green'],
        correctIndex: 1,
        explanation:
          'Black=0, Brown=1, Red=2, Orange=3, Yellow=4, Green=5, Blue=6, Violet=7, Grey=8, White=9.',
        xp: 10,
      },
      {
        type: 'order',
        id: 'l-bands-o1',
        prompt: 'Put these steps in the right order for reading a 4-band resistor:',
        instruction: 'Use the arrows to reorder, then check.',
        items: [
          'Read the multiplier band',
          'Read the first two digit bands',
          'Note the tolerance band (gold/silver)',
        ],
        correctOrder: [
          'Read the first two digit bands',
          'Read the multiplier band',
          'Note the tolerance band (gold/silver)',
        ],
        explanation:
          'First decode the two digit bands (they give you the mantissa), then apply the multiplier (power of ten), and finally note the tolerance.',
        xp: 10,
      },
      {
        type: 'bands',
        id: 'l-bands-c2',
        prompt: 'Now decode this one:',
        instruction: 'Tap each band to set the colors.',
        value: 470,
        explanation:
          'Yellow=4, Violet=7, Brown=×10 → 47 × 10 = 470Ω. A common value for 5V LED circuits.',
        xp: 15,
      },
      {
        type: 'bands',
        id: 'l-bands-c4',
        prompt: 'One more — this one is a kilo:',
        instruction: 'Tap each band to set the colors. This resistor is 1000Ω, also written 1kΩ.',
        value: 1000,
        explanation:
          'Brown=1, Black=0, Red=×100 → 10 × 100 = 1000Ω = 1kΩ. A standard pull-up and audio value.',
        xp: 15,
      },
      {
        type: 'quiz',
        id: 'l-bands-q2',
        prompt: 'A resistor reads Brown, Black, Orange, Gold. What is its value and tolerance?',
        choices: ['1kΩ ±5%', '10kΩ ±5%', '100Ω ±10%', '10Ω ±5%'],
        correctIndex: 1,
        explanation:
          'Brown=1, Black=0, Orange=×1,000 → 10 × 1000 = 10,000Ω = 10kΩ. Gold means ±5% tolerance.',
        xp: 10,
      },
      {
        type: 'circuit',
        id: 'l-bands-c3',
        prompt: 'Fix the LED circuit!',
        instruction: 'The bottom wire is broken. Tap it to reconnect the circuit.',
        circuit: {
          components: [BAT_9V, WIRE_TOP, R330_SPAN, LED_Y, WIRE_BOTTOM_BROKEN],
        },
        task: 'fix-break',
        check: 'led:conducting',
        xp: 10,
      },
    ],
  },

  // ─── L-GATE: Introduction to Logic Gates ──────────────────────────
  {
    id: 'l-gate',
    title: 'What is a Logic Gate?',
    subtitle: 'The tiniest decision-maker in electronics.',
    subjectId: 'digital',
    order: 1,
    xpReward: 40,
    steps: [
      {
        type: 'info',
        id: 'l-gate-s1',
        title: 'Binary decisions',
        body: "A logic gate takes one or more binary inputs (0 or 1, OFF or ON) and produces a single output. It's the atomic building block of every computer — billions of them live inside your phone's processor.",
      },
      {
        type: 'info',
        id: 'l-gate-s2',
        title: 'The AND gate',
        body: "The AND gate outputs 1 only when BOTH inputs are 1. If either input is 0, the output is 0. Think of it like two light switches that both need to be ON for the light to work.",
      },
      {
        type: 'gate',
        id: 'l-gate-g1',
        prompt: 'An AND gate has inputs A=1 and B=0. What is the output?',
        instruction: 'Predict the answer, then run the circuit to check.',
        gate: { kind: 'and', in1: true, in2: false },
        choices: ['1 — LED ON', '0 — LED OFF'],
        correctIndex: 1,
        explanation:
          'AND gate: both inputs must be 1 for output = 1. Since B=0, the output is 0 and the LED stays off.',
        xp: 15,
      },
      {
        type: 'info',
        id: 'l-gate-s3',
        title: 'The OR gate',
        body: "The OR gate outputs 1 when AT LEAST ONE input is 1. It only outputs 0 when both inputs are 0. Think of two hallway lights wired in parallel — flip either switch and the light comes on.",
      },
      {
        type: 'gate',
        id: 'l-gate-g2',
        prompt: 'An OR gate has inputs A=0 and B=1. What is the output?',
        instruction: 'Predict the answer, then run the circuit to check.',
        gate: { kind: 'or', in1: false, in2: true },
        choices: ['1 — LED ON', '0 — LED OFF'],
        correctIndex: 0,
        explanation:
          'OR gate: if either input is 1, output = 1. Since B=1, the output is 1 and the LED lights up.',
        xp: 15,
      },
      {
        type: 'gate',
        id: 'l-gate-g3',
        prompt: 'A NOT gate has input A=1. What is the output?',
        instruction: 'Predict the answer, then run the circuit.',
        gate: { kind: 'not', in1: true, in2: null },
        choices: ['1 — LED ON', '0 — LED OFF'],
        correctIndex: 1,
        explanation:
          'NOT gate inverts its input. 1 becomes 0, so the LED stays off.',
        xp: 10,
      },
      {
        type: 'quiz',
        id: 'l-gate-q1',
        prompt: 'Which gate outputs 1 only when EVERY input is 1?',
        choices: ['OR', 'AND', 'NOT', 'Any of them'],
        correctIndex: 1,
        explanation:
          'AND requires every input to be 1 before it outputs 1. OR needs just one; NOT inverts a single input.',
        xp: 10,
      },
    ],
  },
// ─── L6: Parallel Circuits ─────────────────────────────────────────
  {
    id: 'l6',
    title: 'Parallel Circuits',
    subtitle: 'Many paths — each load gets the full battery voltage.',
    subjectId: 'electronics',
    order: 7,
    xpReward: 40,
    steps: [
      {
        type: 'info',
        id: 'l6-s1',
        title: 'More than one path',
        body: "In a parallel circuit, components are wired side by side, so current splits across multiple paths. Unlike a series circuit, if one branch is cut, the others keep working — like the lights in your home.",
      },
      {
        type: 'info',
        id: 'l6-s2',
        title: 'Voltage is the same',
        body: "Each parallel branch connects directly across the battery, so every branch sees the full voltage. Two LEDs in parallel across a 9V battery each receive the same voltage headroom — while the current is shared between them.",
      },
      {
        type: 'quiz',
        id: 'l6-q1',
        prompt:
          'Two identical resistors are in parallel across a 9V battery. What is the voltage across each one?',
        choices: ['4.5V', '2.25V', '9V', '0V'],
        correctIndex: 2,
        explanation:
          'Parallel branches connect directly across the source, so each branch gets the full 9V.',
        xp: 10,
      },
      {
        type: 'quiz',
        id: 'l6-q2',
        prompt:
          'In the ceiling lights you have at home, the bulb on the left blows out. What happens to the bulb on the right?',
        choices: [
          'It also blows out',
          'It stays on — the branches are independent',
          'It gets dimmer permanently',
          'It gets brighter',
        ],
        correctIndex: 1,
        explanation:
          'House wiring is parallel. Each branch is independent, so cutting one path does not stop the others.',
        xp: 10,
      },
      {
        type: 'circuit',
        id: 'l6-c1',
        prompt: 'Two parallel LEDs, one broken rail!',
        instruction:
          'This is a parallel circuit: two LEDs share the bottom rail. Tap the broken wire to reconnect it and light BOTH LEDs.',
        circuit: {
          components: [
            BAT_9V,
            WIRE_TOP,
            { id: 'wA', kind: 'wire', a: { x: 2, y: 1 }, b: { x: 3, y: 1 } },
            { id: 'r1', kind: 'resistor', a: { x: 3, y: 1 }, b: { x: 4, y: 1 }, value: 330 },
            { id: 'led1', kind: 'led', a: { x: 4, y: 1 }, b: { x: 4, y: 3 }, color: '#ffdd00' },
            { id: 'wB', kind: 'wire', a: { x: 3, y: 1 }, b: { x: 5, y: 1 } },
            { id: 'r2', kind: 'resistor', a: { x: 5, y: 1 }, b: { x: 6, y: 1 }, value: 330 },
            { id: 'led2', kind: 'led', a: { x: 6, y: 1 }, b: { x: 6, y: 3 }, color: '#ff4444' },
            { id: 'wC', kind: 'wire', a: { x: 4, y: 3 }, b: { x: 6, y: 3 } },
            { id: 'wRET', kind: 'wire', a: { x: 6, y: 3 }, b: { x: 1, y: 3 }, broken: true },
          ],
        },
        task: 'fix-break',
        check: 'led:conducting',
        xp: 20,
      },
    ],
  },

  // ─── L7: Series vs Parallel ────────────────────────────────────────
  {
    id: 'l7',
    title: 'Series vs Parallel',
    subtitle: 'Two classic wiring styles — and when to use each.',
    subjectId: 'electronics',
    order: 8,
    xpReward: 40,
    steps: [
      {
        type: 'info',
        id: 'l7-s1',
        title: 'One path vs many',
        body: "Series circuits give every component the same current; parallel circuits give every component the same voltage. Designers pick based on what they are powering.",
      },
      {
        type: 'quiz',
        id: 'l7-q1',
        prompt:
          'String lights wired end-to-end: one bulb dies and the whole string goes dark. What kind of wiring is that?',
        choices: ['Parallel', 'Series', 'Neither', 'Mixed'],
        correctIndex: 1,
        explanation:
          "End-to-end (one path) is a series circuit. A single open point stops the whole chain — that's why classic string lights all fail together.",
        xp: 10,
      },
      {
        type: 'quiz',
        id: 'l7-q2',
        prompt: 'Which wiring keeps the lights on when one bulb is removed?',
        choices: ['Series', 'Parallel', 'Both', 'Neither'],
        correctIndex: 1,
        explanation:
          'Parallel branches are independent: removing one bulb only cuts its own branch, the rest stay lit.',
        xp: 10,
      },
      {
        type: 'order',
        id: 'l7-o1',
        prompt: 'Sort these statements: series first, parallel second.',
        instruction: 'Arrange each pair so the series property comes before the parallel property.',
        items: [
          'Parallel: each branch carries the full voltage',
          'Series: one path for current',
          'Parallel: branches are independent',
          'Series: resistance adds along the path',
        ],
        correctOrder: [
          'Series: one path for current',
          'Series: resistance adds along the path',
          'Parallel: each branch carries the full voltage',
          'Parallel: branches are independent',
        ],
        explanation:
          'Series = one path, resistances add, current is shared. Parallel = full voltage per branch, independent paths.',
        xp: 10,
      },
      {
        type: 'circuit',
        id: 'l7-c1',
        prompt: 'Recognize the parallel circuit?',
        instruction:
          "Two LEDs in parallel with one broken rail. Tap the break and watch both branches light up — proving the branches are independent.",
        circuit: {
          components: [
            BAT_9V,
            WIRE_TOP,
            { id: 'wA', kind: 'wire', a: { x: 2, y: 1 }, b: { x: 3, y: 1 } },
            { id: 'r1', kind: 'resistor', a: { x: 3, y: 1 }, b: { x: 4, y: 1 }, value: 330 },
            { id: 'led1', kind: 'led', a: { x: 4, y: 1 }, b: { x: 4, y: 3 }, color: '#ffdd00' },
            { id: 'wB', kind: 'wire', a: { x: 3, y: 1 }, b: { x: 5, y: 1 } },
            { id: 'r2', kind: 'resistor', a: { x: 5, y: 1 }, b: { x: 6, y: 1 }, value: 330 },
            { id: 'led2', kind: 'led', a: { x: 6, y: 1 }, b: { x: 6, y: 3 }, color: '#59c2ff' },
            { id: 'wC', kind: 'wire', a: { x: 4, y: 3 }, b: { x: 6, y: 3 } },
            { id: 'wRET', kind: 'wire', a: { x: 6, y: 3 }, b: { x: 1, y: 3 }, broken: true },
          ],
        },
        task: 'fix-break',
        check: 'led:conducting',
        xp: 20,
      },
    ],
  },

  // ─── L8: Watts & Power ─────────────────────────────────────────────
  {
    id: 'l8',
    title: 'Power: Watts & Heat',
    subtitle: 'How much energy a component actually uses.',
    subjectId: 'electronics',
    order: 6,
    xpReward: 40,
    steps: [
      {
        type: 'info',
        id: 'l8-s1',
        title: 'P = V × I',
        body: "Power is how fast a component converts electrical energy. P = V × I. A 9V circuit pushing 0.5A is using 4.5 watts. Resistors turn this into heat — which is why big resistors have fat bodies.",
      },
      {
        type: 'quiz',
        id: 'l8-q1',
        prompt: 'A device runs on 12V and draws 2A. How much power does it use?',
        choices: ['6W', '12W', '24W', '144W'],
        correctIndex: 2,
        explanation: 'P = V × I = 12 × 2 = 24 watts.',
        xp: 10,
      },
      {
        type: 'quiz',
        id: 'l8-q2',
        prompt: 'The current through a 330Ω resistor is 27mA. Which power formula tells you how many watts it burns?',
        choices: ['P = V × I', 'P = I × R', 'P = V / I', 'P = R / I'],
        correctIndex: 0,
        explanation:
          'Power is always V × I. Combine with Ohm\'s law (V = I × R) to get P = I²·R when you only know current and resistance.',
        xp: 10,
      },
      {
        type: 'circuit',
        id: 'l8-c1',
        prompt: 'Watch the power work!',
        instruction:
          'A warm yellow LED circuit — fix the broken bottom wire and watch the LED light as the current does its work.',
        circuit: {
          components: [BAT_9V, WIRE_TOP, R330_SPAN, LED_Y, WIRE_BOTTOM_BROKEN],
        },
        task: 'fix-break',
        check: 'led:conducting',
        xp: 20,
      },
    ],
  },

  // ─── L-SWITCH: Switches ────────────────────────────────────────────
  {
    id: 'l-switch',
    title: 'Switches',
    subtitle: 'The simplest way to control a circuit.',
    subjectId: 'electronics',
    order: 9,
    xpReward: 40,
    steps: [
      {
        type: 'info',
        id: 'l-switch-s1',
        title: 'Open and closed',
        body: "A closed switch is a completed path — current flows. An open switch is a gap — current stops. The whole circuit obeys the switch: exactly like a break in a wire.",
      },
      {
        type: 'quiz',
        id: 'l-switch-q1',
        prompt: 'A switch is OPEN. What is the state of the circuit?',
        choices: [
          'Current flows normally',
          'Current is blocked — no loop is completed',
          'The battery charges faster',
          'Components get more voltage',
        ],
        correctIndex: 1,
        explanation:
          "An open switch is a physical gap. Without a continuous loop, current cannot flow.",
        xp: 10,
      },
      {
        type: 'build',
        id: 'l-switch-b1',
        prompt: 'Wire a switch into the circuit.',
        instruction:
          'The resistor is soldered in. Place a SWITCH in the gap between the resistor and the LED, then test the circuit.',
        base: [
          { id: 'bat1', kind: 'battery', a: { x: 1, y: 1 }, b: { x: 1, y: 3 }, value: 9 },
          { id: 'r1', kind: 'resistor', a: { x: 1, y: 1 }, b: { x: 2, y: 1 }, value: 330 },
          { id: 'led1', kind: 'led', a: { x: 3, y: 1 }, b: { x: 3, y: 3 }, color: '#ffdd00' },
          { id: 'w1', kind: 'wire', a: { x: 3, y: 3 }, b: { x: 1, y: 3 } },
        ],
        slots: [
          { id: 'sl-switch', pos: { x: 2, y: 1 }, dir: 'h', required: 'switch' },
        ],
        palette: [
          { label: 'Switch', component: { id: 'pal-switch', kind: 'switch' } },
        ],
        check: 'led:conducting',
        xp: 20,
      },
      {
        type: 'quiz',
        id: 'l-switch-q2',
        prompt: 'Two switches are wired in SERIES. One is left open. What happens?',
        choices: [
          'Current still flows through the closed switch',
          'No current flows anywhere',
          'The LED glows brighter',
          'The battery shorts out',
        ],
        correctIndex: 1,
        explanation:
          'Series switches act like AND: every switch must be closed or no current flows at all.',
        xp: 10,
      },
      {
        type: 'build',
        id: 'l-switch-b2',
        prompt: 'Two switches in series — an AND switch.',
        instruction:
          'Place BOTH switches in the top-rail gap. Because they are in series, the LED lights only while BOTH are closed.',
        base: [
          { id: 'bat1', kind: 'battery', a: { x: 1, y: 1 }, b: { x: 1, y: 3 }, value: 9 },
          { id: 'r1', kind: 'resistor', a: { x: 1, y: 1 }, b: { x: 2, y: 1 }, value: 330 },
          { id: 'led1', kind: 'led', a: { x: 4, y: 1 }, b: { x: 4, y: 3 }, color: '#ffdd00' },
          { id: 'w1', kind: 'wire', a: { x: 4, y: 3 }, b: { x: 1, y: 3 } },
        ],
        slots: [
          { id: 'sl-a', pos: { x: 2, y: 1 }, dir: 'h', required: 'switch' },
          { id: 'sl-b', pos: { x: 3, y: 1 }, dir: 'h', required: 'switch' },
        ],
        palette: [
          { label: 'Switch 1', component: { id: 'pal-sw1', kind: 'switch' } },
          { label: 'Switch 2', component: { id: 'pal-sw2', kind: 'switch' } },
        ],
        check: 'led:conducting',
        xp: 20,
      },
      {
        type: 'build',
        id: 'l-switch-b3',
        prompt: 'Two switches in parallel — an OR switch.',
        instruction:
          'The switches sit on separate branches. Place one on each branch; the LED lights when EITHER switch is closed.',
        base: [
          { id: 'bat1', kind: 'battery', a: { x: 1, y: 1 }, b: { x: 1, y: 3 }, value: 9 },
          { id: 'w0', kind: 'wire', a: { x: 1, y: 1 }, b: { x: 2, y: 1 } },
          { id: 'r1', kind: 'resistor', a: { x: 2, y: 1 }, b: { x: 3, y: 1 }, value: 330 },
          { id: 'w2', kind: 'wire', a: { x: 3, y: 1 }, b: { x: 4, y: 1 } },
          { id: 'w3', kind: 'wire', a: { x: 3, y: 1 }, b: { x: 5, y: 1 } },
          { id: 'w4', kind: 'wire', a: { x: 4, y: 2 }, b: { x: 5, y: 2 } },
          { id: 'led1', kind: 'led', a: { x: 4, y: 2 }, b: { x: 4, y: 3 }, color: '#ffdd00' },
          { id: 'w5', kind: 'wire', a: { x: 4, y: 3 }, b: { x: 1, y: 3 } },
        ],
        slots: [
          { id: 'sl-a', pos: { x: 4, y: 1 }, dir: 'v', required: 'switch' },
          { id: 'sl-b', pos: { x: 5, y: 1 }, dir: 'v', required: 'switch' },
        ],
        palette: [
          { label: 'Switch 1', component: { id: 'pal-sw1', kind: 'switch' } },
          { label: 'Switch 2', component: { id: 'pal-sw2', kind: 'switch' } },
        ],
        check: 'led:conducting',
        xp: 25,
      },
    ],
  },

  // ─── L-BUILD: Build your first circuit ─────────────────────────────
  {
    id: 'l-build',
    title: 'Build Your First Circuit',
    subtitle: 'Assemble a real working circuit, piece by piece.',
    subjectId: 'electronics',
    order: 10,
    xpReward: 45,
    steps: [
      {
        type: 'info',
        id: 'l-build-s1',
        title: 'Resistor → LED → ground',
        body: "The golden recipe: battery positive through a current-limiting resistor, into the LED's anode, and back to the battery negative. Get the order right and the LED glows safely.",
      },
      {
        type: 'build',
        id: 'l-build-b1',
        prompt: 'Assemble the classic LED circuit.',
        instruction:
          'Place a 330Ω resistor on the top rail, the yellow LED in the middle, and a wire on the bottom rail to complete the loop. Then test it.',
        base: [
          { id: 'bat1', kind: 'battery', a: { x: 1, y: 1 }, b: { x: 1, y: 3 }, value: 9 },
          { id: 'w0', kind: 'wire', a: { x: 2, y: 1 }, b: { x: 3, y: 1 } },
          { id: 'w1', kind: 'wire', a: { x: 4, y: 2 }, b: { x: 1, y: 2 } },
          { id: 'w2', kind: 'wire', a: { x: 1, y: 2 }, b: { x: 1, y: 3 } },
        ],
        slots: [
          { id: 'sl-r', pos: { x: 1, y: 1 }, dir: 'h', required: 'resistor' },
          { id: 'sl-led', pos: { x: 3, y: 1 }, dir: 'v', required: 'led' },
          { id: 'sl-w', pos: { x: 3, y: 2 }, dir: 'h', required: 'wire' },
        ],
        palette: [
          { label: '330Ω Resistor', component: { id: 'pal-resistor', kind: 'resistor', value: 330 } },
          { label: 'Yellow LED', component: { id: 'pal-led', kind: 'led', color: '#ffdd00' } },
          { label: 'Wire', component: { id: 'pal-wire', kind: 'wire' } },
        ],
        check: 'led:conducting',
        xp: 25,
      },
      {
        type: 'quiz',
        id: 'l-build-q1',
        prompt: 'In your build, which component stops the LED from burning out?',
        choices: ['The battery', 'The resistor', 'The wire', 'The switch'],
        correctIndex: 1,
        explanation:
          'The 330Ω resistor limits current to a safe ~20mA so the LED does not destroy itself.',
        xp: 10,
      },
      {
        type: 'quiz',
        id: 'l-build-q2',
        prompt: 'What happens if you build the LED circuit WITHOUT the resistor?',
        choices: [
          'Nothing — it works fine',
          'Too much current flows and the LED burns out',
          'The battery charges the LED',
          'The wires turn into superconductors',
        ],
        correctIndex: 1,
        explanation:
          'With no current limit the LED would draw far more than its ~20mA rating and burn out.',
        xp: 10,
      },
      {
        type: 'circuit',
        id: 'l-build-c1',
        prompt: 'Final test — fix the fault!',
        instruction:
          'Your freshly built circuit has developed a break in the bottom rail. Tap it to restore the circuit.',
        circuit: {
          components: [BAT_9V, WIRE_TOP, R330_SPAN, LED_Y, WIRE_BOTTOM_BROKEN],
        },
        task: 'fix-break',
        check: 'led:conducting',
        xp: 10,
      },
    ],
  },

  // ─── L-ANDOR: AND, OR & NOT ────────────────────────────────────────
  {
    id: 'l-andor',
    title: 'AND, OR & NOT',
    subtitle: 'The gates behind every decision a computer makes.',
    subjectId: 'digital',
    order: 2,
    xpReward: 40,
    steps: [
      {
        type: 'info',
        id: 'l-andor-s1',
        title: 'Three famous gates',
        body: 'AND (1 only when every input is 1), OR (1 when any input is 1), NOT (inverts its single input). Combining them, you can build any logic in existence.',
      },
      {
        type: 'gate',
        id: 'l-andor-g1',
        prompt: 'A NAND gate is "NOT AND": it gives the opposite. NAND with A=1, B=1 → what output?',
        instruction: 'Predict, then run the circuit to check.',
        gate: { kind: 'nand', in1: true, in2: true },
        choices: ['0 — LED OFF', '1 — LED ON'],
        correctIndex: 0,
        explanation:
          'AND(1,1) = 1, then NOT flips it: NAND(1,1) = 0. The LED stays off.',
        xp: 15,
      },
      {
        type: 'gate',
        id: 'l-andor-g2',
        prompt: 'A NOR gate is "NOT OR". NOR with A=0, B=0 → what output?',
        instruction: 'Predict, then run the circuit to check.',
        gate: { kind: 'nor', in1: false, in2: false },
        choices: ['0 — LED OFF', '1 — LED ON'],
        correctIndex: 1,
        explanation:
          'OR(0,0) = 0, then NOT flips it: NOR(0,0) = 1. The LED lights.',
        xp: 15,
      },
      {
        type: 'gate',
        id: 'l-andor-g3',
        prompt: 'An XOR gate outputs 1 when inputs DIFFER. XOR with A=1, B=1 → ?',
        instruction: 'Predict, then run the circuit to check.',
        gate: { kind: 'xor', in1: true, in2: true },
        choices: ['0 — LED OFF', '1 — LED ON'],
        correctIndex: 0,
        explanation:
          'XOR outputs 1 only for different inputs. Same-same (1,1) gives 0.',
        xp: 10,
      },
      {
        type: 'quiz',
        id: 'l-andor-q1',
        prompt:
          'A vending machine releases a snack when you press button A AND button B. Which gate matches that rule?',
        choices: ['OR', 'XOR', 'AND', 'NOT'],
        correctIndex: 2,
        explanation:
          "Both conditions must be true at once — that's exactly AND. OR would need just one button; XOR would need exactly one.",
        xp: 10,
      },
    ],
  },

  // ─── L-BINARY: Binary numbers ──────────────────────────────────────
  {
    id: 'l-binary',
    title: 'Binary: The Language of Computers',
    subtitle: 'Everything inside a chip is just 0s and 1s.',
    subjectId: 'digital',
    order: 3,
    xpReward: 40,
    steps: [
      {
        type: 'info',
        id: 'l-binary-s1',
        title: 'Two digits',
        body: "Computers use only two symbols: 0 and 1 — one bit. Because circuits are switches (off or on), binary fits hardware perfectly. Eight bits make one byte, and a byte can hold values from 0 to 255.",
      },
      {
        type: 'quiz',
        id: 'l-binary-q1',
        prompt: 'Binary uses only two symbols. What are they?',
        choices: ['C and V', '1 and 2', '0 and 1', 'HIGH and TRUE'],
        correctIndex: 2,
        explanation:
          'Binary means base-2: in a circuit, a bit is simply a switch that is OFF (0) or ON (1).',
        xp: 10,
      },
      {
        type: 'quiz',
        id: 'l-binary-q2',
        prompt: 'How many bits make one byte?',
        choices: ['2', '4', '8', '16'],
        correctIndex: 2,
        explanation:
          '8 bits = 1 byte. A byte can represent 256 different values (0–255) — like brightness levels or characters.',
        xp: 10,
      },
      {
        type: 'gate',
        id: 'l-binary-g1',
        prompt:
          'Add two one-bit numbers with an XOR: A=1, B=1. XOR gives the "sum bit" — what is it?',
        instruction: 'Predict, then run the circuit to check.',
        gate: { kind: 'xor', in1: true, in2: true },
        choices: ['0 — LED OFF', '1 — LED ON'],
        correctIndex: 0,
        explanation:
          '1 + 1 in binary = 10. The sum bit (XOR) is 0 and the carry bit is 1 — that is exactly how a half-adder works.',
        xp: 10,
      },
      {
        type: 'quiz',
        id: 'l-binary-q3',
        prompt: 'What is the decimal value of the binary number 101?',
        choices: ['3', '5', '6', '101'],
        correctIndex: 1,
        explanation:
          '101₂ = 4 + 0 + 1 = 5. Each digit is a power of two: the 4s, 2s, and 1s columns.',
        xp: 10,
      },
    ],
  },

  // ─── L-DIODE: Diodes ───────────────────────────────────────────────
  {
    id: 'l-diode',
    title: 'Diodes: One-Way Gates',
    subtitle: 'Let electrons through one way only.',
    subjectId: 'semiconductors',
    order: 1,
    xpReward: 35,
    steps: [
      {
        type: 'info',
        id: 'l-diode-s1',
        title: 'The one-way valve',
        body: "A diode is a one-way valve for current. It conducts easily in the forward direction and blocks current in reverse. That's why it has a stripe: the stripe marks the cathode (negative side).",
      },
      {
        type: 'info',
        id: 'l-diode-s2',
        title: 'Your first diode was an LED',
        body: "An LED is literally a light-emitting diode. It only lights when wired the right way around — forward bias. Flip it and no current flows at all. The longer leg is the anode (+).",
      },
      {
        type: 'quiz',
        id: 'l-diode-q1',
        prompt: 'Which statement about a diode is true?',
        choices: [
          'It conducts in both directions',
          'It conducts forward and blocks reverse current',
          'It blocks all current',
          'It stores charge like a battery',
        ],
        correctIndex: 1,
        explanation:
          'Diode = one-way valve. Forward biased it conducts; reverse biased it blocks.',
        xp: 10,
      },
      {
        type: 'quiz',
        id: 'l-diode-q2',
        prompt:
          'An LED has a LONGER and a SHORTER leg. Which is the anode (+) that should face the positive side?',
        choices: ['The shorter leg', 'The longer leg', 'Either leg', 'Neither — LEDs have no polarity'],
        correctIndex: 1,
        explanation:
          'The longer leg is the anode (+). Wire it toward positive and the LED conducts in forward bias.',
        xp: 10,
      },
      {
        type: 'order',
        id: 'l-diode-o1',
        prompt: 'Order the diode lesson:',
        instruction: 'Put the circuit facts in the correct order.',
        items: [
          'Check the cathode stripe',
          'Wiring the LED backwards blocks current',
          'Define a diode as a one-way valve',
        ],
        correctOrder: [
          'Define a diode as a one-way valve',
          'Wiring the LED backwards blocks current',
          'Check the cathode stripe',
        ],
        explanation:
          'Start from the definition, apply it to an LED, and use the stripe to wire it correctly.',
        xp: 10,
      },
    ],
  },

  // ─── L-TRANSISTOR: Transistors ─────────────────────────────────────
  {
    id: 'l-transistor',
    title: 'Transistors: Tiny Switches',
    subtitle: 'A small signal can control a big current.',
    subjectId: 'semiconductors',
    order: 2,
    xpReward: 40,
    steps: [
      {
        type: 'info',
        id: 'l-transistor-s1',
        title: 'The NPN switch',
        body: "An NPN transistor has three pins: base, collector, emitter. A tiny current into the BASE lets a much larger current flow from collector to emitter. It's like a switch you flip with a whisper.",
      },
      {
        type: 'info',
        id: 'l-transistor-s2',
        title: 'Made from sand',
        body: "Transistors are built from silicon — the same beach sand, refined. A modern processor packs billions of these switches into a chip smaller than your fingernail.",
      },
      {
        type: 'quiz',
        id: 'l-transistor-q1',
        prompt: 'What does a small base current control in an NPN transistor?',
        choices: [
          'The strength of the battery',
          'A larger current from collector to emitter',
          'The color of the LED',
          'Nothing — base is just a pin',
        ],
        correctIndex: 1,
        explanation:
          'A transistor amplifies: the small base current switches or controls the large collector→emitter current. This is how chips build amplifiers and logic.',
        xp: 10,
      },
      {
        type: 'quiz',
        id: 'l-transistor-q2',
        prompt: 'An NPN transistor uses a small base current to switch. Where does the controlled current flow?',
        choices: [
          'From emitter to base',
          'From collector to emitter',
          'From base to collector only',
          'Nowhere — it is a light detector',
        ],
        correctIndex: 1,
        explanation:
          'The base current allows a larger current from collector to emitter — the heart of amplification.',
        xp: 10,
      },
      {
        type: 'build',
        id: 'l-transistor-b1',
        prompt: 'Model a transistor with a switch.',
        instruction:
          "Think of the switch as the transistor's base: it controls whether the LED (representing the collector circuit) turns on. Place the switch and test.",
        base: [
          { id: 'bat1', kind: 'battery', a: { x: 1, y: 1 }, b: { x: 1, y: 3 }, value: 9 },
          { id: 'r1', kind: 'resistor', a: { x: 1, y: 1 }, b: { x: 2, y: 1 }, value: 330 },
          { id: 'led1', kind: 'led', a: { x: 3, y: 1 }, b: { x: 3, y: 3 }, color: '#59c2ff' },
          { id: 'w1', kind: 'wire', a: { x: 3, y: 3 }, b: { x: 1, y: 3 } },
        ],
        slots: [
          { id: 'sl-sw', pos: { x: 2, y: 1 }, dir: 'h', required: 'switch' },
        ],
        palette: [
          { label: 'Switch (base)', component: { id: 'pal-switch', kind: 'switch' } },
        ],
        check: 'led:conducting',
        xp: 20,
      },
    ],
  },

  // ─── L-ARDUINO: Intro to Arduino ───────────────────────────────────
  {
    id: 'l-arduino',
    title: 'Your First Microcontroller',
    subtitle: 'A tiny computer you can wire into anything.',
    subjectId: 'embedded',
    order: 1,
    xpReward: 40,
    steps: [
      {
        type: 'info',
        id: 'l-arduino-s1',
        title: 'What is an Arduino?',
        body: "An Arduino is a small board with a microcontroller — a real computer on a chip. It reads sensors, drives LEDs and motors, and runs your code. This is where circuits start to think.",
      },
      {
        type: 'info',
        id: 'l-arduino-s2',
        title: 'digitalWrite',
        body: "Pins on an Arduino can be set HIGH (5V, ON) or LOW (0V, OFF) with digitalWrite. Blinking an LED is the \"Hello World\" of embedded systems.",
      },
      {
        type: 'quiz',
        id: 'l-arduino-q1',
        prompt: 'What does digitalWrite(13, HIGH) do?',
        choices: [
          'Reads the sensor on pin 13',
          'Sets pin 13 to ON (5V)',
          'Deletes pin 13',
          'Charges the battery',
        ],
        correctIndex: 1,
        explanation:
          'digitalWrite sets a pin HIGH (on) or LOW (off). HIGH on an LED pin lights the LED.',
        xp: 10,
      },
      {
        type: 'quiz',
        id: 'l-arduino-q2',
        prompt: "On a classic Arduino board, what voltage does a pin sit at when it is HIGH?",
        choices: [
          '0V',
          '5V',
          '12V',
          'Whatever the battery is',
        ],
        correctIndex: 1,
        explanation:
          "Classic Arduino logic levels are ~5V for HIGH and 0V for LOW (newer boards often use 3.3V).",
        xp: 10,
      },
      {
        type: 'order',
        id: 'l-arduino-o1',
        prompt: 'Put the classic Blink sketch in order:',
        instruction: 'Arrange the code so the LED blinks forever.',
        items: [
          'digitalWrite(13, HIGH)',
          'delay(1000)',
          'setup(): pinMode(13, OUTPUT)',
          'digitalWrite(13, LOW)',
          'delay(1000) again',
        ],
        correctOrder: [
          'setup(): pinMode(13, OUTPUT)',
          'digitalWrite(13, HIGH)',
          'delay(1000)',
          'digitalWrite(13, LOW)',
          'delay(1000) again',
        ],
        explanation:
          'Setup configures the pin, then the loop turns the LED on, waits, turns it off, waits — forever.',
        xp: 10,
      },
    ],
  },

  // ─── L-PWM: PWM dimming ────────────────────────────────────────────
  {
    id: 'l-pwm',
    title: 'PWM: Faking Analog',
    subtitle: 'Flicker fast enough and the eye sees a dimmer LED.',
    subjectId: 'embedded',
    order: 2,
    xpReward: 35,
    steps: [
      {
        type: 'info',
        id: 'l-pwm-s1',
        title: 'Square waves',
        body: "Microcontrollers are digital, but motors and LEDs want analog. Pulse Width Modulation (PWM) switches a pin on and off very fast; the ON fraction (duty cycle) sets the perceived brightness or speed.",
      },
      {
        type: 'quiz',
        id: 'l-pwm-q1',
        prompt: 'A 75% duty cycle PWM signal is ON for:',
        choices: ['Three-quarters of each cycle', 'A quarter of each cycle', 'All the time', 'None of the time'],
        correctIndex: 0,
        explanation:
          'Duty cycle = fraction of each cycle the signal is HIGH. 75% ON makes an LED look ~75% as bright.',
        xp: 10,
      },
      {
        type: 'quiz',
        id: 'l-pwm-q2',
        prompt: 'Why does a PWM LED look dimmer instead of just flickering?',
        choices: [
          'It actually turns into a half-wave rectifier',
          'The switching is far too fast for your eye to notice',
          'PWM removes the resistor',
          'It does not — PWM always keeps full brightness',
        ],
        correctIndex: 1,
        explanation:
          'The switching happens hundreds of times per second — faster than your eye can perceive — so you integrate the flicker into brightness.',
        xp: 10,
      },
      {
        type: 'quiz',
        id: 'l-pwm-q3',
        prompt: 'A 25% duty cycle makes an LED appear how bright?',
        choices: ['About 25% brightness', 'Full brightness', 'Off permanently', 'Brighter than 100%'],
        correctIndex: 0,
        explanation:
          'Duty cycle ≈ perceived brightness. 25% ON means the LED is lit only a quarter of the time.',
        xp: 10,
      },
    ],
  },

  // ─── L-VAR: Variables ──────────────────────────────────────────────
  {
    id: 'l-var',
    title: 'Variables: Named Boxes',
    subtitle: 'Give a value a name and reuse it forever.',
    subjectId: 'programming',
    order: 1,
    xpReward: 35,
    steps: [
      {
        type: 'info',
        id: 'l-var-s1',
        title: 'A box with a label',
        body: "A variable is a labeled box that holds a value. Write brightness = 150 once, then use brightness everywhere. Change it in one place and the whole program follows.",
      },
      {
        type: 'info',
        id: 'l-var-s2',
        title: 'int for whole numbers',
        body: "In Arduino C++, int declares a whole number: int delayMs = 500;. Then delay(delayMs) waits half a second. Readable code starts with good names.",
      },
      {
        type: 'quiz',
        id: 'l-var-q1',
        prompt: 'What does int onTime = 1000; do?',
        choices: [
          'Starts a timer that fires after 1000ms',
          'Creates a variable named onTime holding 1000',
          'Deletes a pin',
          'Converts 1000 volts',
        ],
        correctIndex: 1,
        explanation:
          'It declares an integer variable onTime with the value 1000. You can use it later in the program.',
        xp: 10,
      },
      {
        type: 'quiz',
        id: 'l-var-q2',
        prompt: 'Why are named variables better than typing numbers everywhere?',
        choices: [
          'They run faster',
          'One change updates every use — code stays readable',
          'They use less memory',
          'There is no benefit',
        ],
        correctIndex: 1,
        explanation:
          'A named variable fixes the value in one place; change it once and the whole program uses the new value.',
        xp: 10,
      },
      {
        type: 'quiz',
        id: 'l-var-q3',
        prompt: 'After running: int a = 3; a = a + 2; — what is the value of a?',
        choices: ['3', '5', '2', '32'],
        correctIndex: 1,
        explanation:
          'The line reads the current value of a (3), adds 2, and stores the result (5) back into a.',
        xp: 10,
      },
    ],
  },

  // ─── L-LOOP: For loops ─────────────────────────────────────────────
  {
    id: 'l-loop',
    title: 'Loops: Do It Again',
    subtitle: 'Computers never get bored.',
    subjectId: 'programming',
    order: 2,
    xpReward: 35,
    steps: [
      {
        type: 'info',
        id: 'l-loop-s1',
        title: 'Repeat without typing',
        body: "A for loop repeats a block a set number of times. for (int i = 0; i < 3; i++) runs the body three times with i = 0, 1, 2. Perfect for sweeping LEDs or PWM steps.",
      },
      {
        type: 'quiz',
        id: 'l-loop-q1',
        prompt: 'How many times does for (int i = 0; i < 3; i++) run its body?',
        choices: ['2', '3', '4', 'Infinitely'],
        correctIndex: 1,
        explanation:
          'The loop runs while i < 3: i = 0, 1, 2 — three times total.',
        xp: 10,
      },
      {
        type: 'quiz',
        id: 'l-loop-q2',
        prompt: 'What is the value of i when this loop finishes: for (int i = 0; i < 3; i++)?',
        choices: ['2', '3', '4', 'The loop never finishes'],
        correctIndex: 1,
        explanation:
          'i increments to 3, the condition i < 3 fails, and the loop exits with i = 3.',
        xp: 10,
      },
      {
        type: 'order',
        id: 'l-loop-o1',
        prompt: 'Trace this loop: for (int i = 0; i < 2; i++) { print(i); }',
        instruction: 'Order the steps of one full execution of the loop.',
        items: [
          'i = 0',
          'i < 2? Yes — print 0',
          'i becomes 1',
          'i < 2? Yes — print 1',
          'i becomes 2',
          'i < 2? No — exit the loop',
        ],
        correctOrder: [
          'i = 0',
          'i < 2? Yes — print 0',
          'i becomes 1',
          'i < 2? Yes — print 1',
          'i becomes 2',
          'i < 2? No — exit the loop',
        ],
        explanation:
          'Each pass checks the condition, runs the body, then increments i. When the condition finally fails, the loop exits.',
        xp: 10,
      },
    ],
  },

  // ─── L-PCB: What is a PCB? ─────────────────────────────────────────
  {
    id: 'l-pcb',
    title: 'What is a PCB?',
    subtitle: 'Your circuit, flattened into a board.',
    subjectId: 'pcb',
    order: 1,
    xpReward: 35,
    steps: [
      {
        type: 'info',
        id: 'l-pcb-s1',
        title: 'Printed Circuit Board',
        body: "A PCB is a flat board with copper traces that replace wires, plus pads where components solder on. Every device — phone, toy, satellite — runs on boards like these.",
      },
      {
        type: 'info',
        id: 'l-pcb-s2',
        title: 'Layers',
        body: "Simple boards have one copper layer on top; complex ones stack many layers inside the board. A via is a plated hole that carries a signal between layers.",
      },
      {
        type: 'quiz',
        id: 'l-pcb-q1',
        prompt: 'What do copper traces do on a PCB?',
        choices: [
          'Cool the board down',
          'Connect components like wires',
          'Hold the battery',
          'Make the board scratch-proof',
        ],
        correctIndex: 1,
        explanation:
          'Traces are flat copper wires printed on the board. They carry signals and power between components.',
        xp: 10,
      },
      {
        type: 'quiz',
        id: 'l-pcb-q2',
        prompt: 'What holds components onto a PCB?',
        choices: [
          'Glue',
          'Solder and copper pads',
          'Screws',
          'Nothing — they just rest on the board',
        ],
        correctIndex: 1,
        explanation:
          'Components are soldered to copper pads on the board, which connects them to the traces.',
        xp: 10,
      },
      {
        type: 'order',
        id: 'l-pcb-o1',
        prompt: 'Put the PCB design flow in order:',
        instruction: 'Arrange the steps from idea to board.',
        items: [
          'Route the copper traces',
          'Draw the schematic',
          'Check the layout (DRC + 3D preview)',
          'Place the components on the board',
        ],
        correctOrder: [
          'Draw the schematic',
          'Place the components on the board',
          'Route the copper traces',
          'Check the layout (DRC + 3D preview)',
        ],
        explanation:
          "Schematic first, then component placement, then trace routing, then a final check — that's the standard flow in SiliconCAD.",
        xp: 10,
      },
    ],
  },

  // ─── L-TRACE: Traces & Copper ──────────────────────────────────────
  {
    id: 'l-trace',
    title: 'Traces & Copper',
    subtitle: 'Wires, flattened.',
    subjectId: 'pcb',
    order: 2,
    xpReward: 35,
    steps: [
      {
        type: 'info',
        id: 'l-trace-s1',
        title: 'Thick traces carry more',
        body: "Copper has resistance — thick, short traces carry more current without heating up. A power trace that is too thin gets hot and can burn a board. That's why PCB software warns you.",
      },
      {
        type: 'quiz',
        id: 'l-trace-q1',
        prompt: 'Why should a high-current trace be wide?',
        choices: [
          'It looks more professional',
          'Low resistance keeps it from overheating',
          'It bridges more layers',
          'Wider traces are cheaper',
        ],
        correctIndex: 1,
        explanation:
          'Wider copper = lower resistance = less heat for a given current. Skinny traces on power paths are a classic board-burning mistake.',
        xp: 10,
      },
      {
        type: 'quiz',
        id: 'l-trace-q2',
        prompt: 'What is a via?',
        choices: [
          'A solder pad',
          'A plated hole connecting copper layers',
          'A type of resistor',
          'A component mount',
        ],
        correctIndex: 1,
        explanation:
          'A via is a small plated hole that conducts between copper layers, letting traces cross without touching.',
        xp: 10,
      },
      {
        type: 'quiz',
        id: 'l-trace-q3',
        prompt: 'A thin trace on a power path gets HOT. What is the right fix?',
        choices: [
          'Make the trace wider',
          'Add more vias',
          'Cool it with a fan',
          'Run it nearer the board edge',
        ],
        correctIndex: 0,
        explanation:
          'Wider copper lowers resistance, so less heat is generated for the same current.',
        xp: 10,
      },
    ],
  },

  // ─── L-MOTOR: DC Motors ────────────────────────────────────────────
  {
    id: 'l-motor',
    title: 'DC Motors Spin',
    subtitle: 'Electricity becomes motion.',
    subjectId: 'robotics',
    order: 1,
    xpReward: 40,
    steps: [
      {
        type: 'info',
        id: 'l-motor-s1',
        title: 'Coil and magnet',
        body: "A DC motor spins because current through its internal coils creates a magnetic field that pushes against permanent magnets. Feed it more current and it spins faster — and draws more power.",
      },
      {
        type: 'info',
        id: 'l-motor-s2',
        title: 'Reversing the poles',
        body: "Swap the motor's two wires and it spins the other way. Motors only care which direction current flows through them, so reversing polarity reverses rotation.",
      },
      {
        type: 'quiz',
        id: 'l-motor-q1',
        prompt: 'How do you make a DC motor spin in reverse?',
        choices: [
          'Add a resistor in series',
          'Swap its two power wires',
          'Paint it a different color',
          'You cannot — motors only spin one way',
        ],
        correctIndex: 1,
        explanation:
          'Reversing the current direction reverses the magnetic field, flipping the spin direction.',
        xp: 10,
      },
      {
        type: 'quiz',
        id: 'l-motor-q2',
        prompt: 'What does increasing the current through a DC motor do?',
        choices: [
          'It spins slower',
          'It spins faster and draws more power',
          'It stops spinning',
          'It reverses direction',
        ],
        correctIndex: 1,
        explanation:
          'More current → a stronger magnetic field in the coils → more torque and speed (and higher power draw).',
        xp: 10,
      },
      {
        type: 'circuit',
        id: 'l-motor-c1',
        prompt: 'Power the motor!',
        instruction:
          "This lamp stands in for the motor (a rugged load). Reconnect the broken wire and it'll light like your robot's motor spinning.",
        circuit: {
          components: [BAT_9V, WIRE_TOP, R330_SPAN, MOTOR_LAMP, WIRE_BOTTOM_BROKEN],
        },
        task: 'fix-break',
        check: 'led:conducting',
        xp: 20,
      },
    ],
  },

  // ─── L-SERVO: Servo control ────────────────────────────────────────
  {
    id: 'l-servo',
    title: 'Servos: Precise Position',
    subtitle: 'Know your exact rotation angle.',
    subjectId: 'robotics',
    order: 2,
    xpReward: 35,
    steps: [
      {
        type: 'info',
        id: 'l-servo-s1',
        title: 'Moves to an exact angle',
        body: "A servo rotates a shaft to a precise angle (usually 0–180°). A pulse of a certain width tells it where to go — 1ms ≈ 0°, 1.5ms ≈ 90°, 2ms ≈ 180°. Robots use servos for arms, heads, and grippers.",
      },
      {
        type: 'info',
        id: 'l-servo-s2',
        title: 'Three wires',
        body: "Most servos have three wires: power (usually 5V), ground, and signal. The signal pin sends the position pulses from your microcontroller.",
      },
      {
        type: 'quiz',
        id: 'l-servo-q1',
        prompt: 'How does a servo know what angle to move to?',
        choices: [
          'By the voltage level',
          'By the width of the signal pulse',
          'By the number of rotations',
          'It guesses from the temperature',
        ],
        correctIndex: 1,
        explanation:
          'Pulse width encodes the angle: wider pulse → further rotation. 1.5ms is centered at 90°.',
        xp: 10,
      },
      {
        type: 'quiz',
        id: 'l-servo-q2',
        prompt: 'A hobby servo usually has three wires. Which of these is one of them?',
        choices: ['Signal', 'Data', 'Clock', 'Reset'],
        correctIndex: 0,
        explanation:
          'Servos use power, ground, and a signal wire that carries the position pulses.',
        xp: 10,
      },
    ],
  },
];

// ── Lookup helpers ───────────────────────────────────────────────────
export function getSubject(id: string): Subject | undefined {
  return SUBJECTS.find((s) => s.id === id);
}

export function getLesson(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}

export function getLessonsForSubject(subjectId: string): Lesson[] {
  return LESSONS.filter((l) => l.subjectId === subjectId).sort(
    (a, b) => a.order - b.order,
  );
}
