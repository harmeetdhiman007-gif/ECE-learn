import type { GeneratedGroup, ModuleSpec } from './presets.js';
import { build } from './presets.js';

const MODULES: ModuleSpec[] = [
  // ── Materials
  {
    key: 'sc-mat-01',
    unit: 'Semiconductor Materials',
    title: 'Conductors, Insulators, Semiconductors',
    level: 'basic',
    body:
      'Materials are classed by how easily electrons flow: conductors (metals) have a sea of free electrons, insulators bind their electrons tightly, and semiconductors sit in between — barely conducting at all by themselves. That "almost" is what makes them tunable.',
    qs: [
      {
        p: 'Silicon\u2019s resistivity at room temperature is:',
        c: ['Between a metal and an insulator', 'Lower than copper', 'Zero', 'Infinite'],
        a: 0,
        e: 'Intrinsic semiconductors are neither good conductors nor insulators.',
      },
      {
        p: 'In a metal, conduction happens through:',
        c: ['A sea of free electrons', 'Holes only', 'Ionic lattice movement', 'Photons'],
        a: 0,
        e: 'Metals conduct via free conduction electrons.',
      },
    ],
  },
  {
    key: 'sc-mat-02',
    unit: 'Semiconductor Materials',
    title: 'Doping: Adding Impurities',
    level: 'basic',
    body:
      'Doping adds a few parts-per-million of impurity atoms. Phosphorus (5 valence electrons) donates extra electrons → n-type. Boron (3 valence electrons) creates missing-electron "holes" → p-type. Doping changes conductivity by orders of magnitude.',
    qs: [
      {
        p: 'A pentavalent impurity like phosphorus creates:',
        c: ['An n-type material with extra electrons', 'A p-type material', 'An insulator', 'A superconductor'],
        a: 0,
        e: 'Five valence electrons leave one free electron per atom.',
      },
      {
        p: 'Holes are best imagined as:',
        c: ['Missing electrons that act like positive charge', 'Protons', 'Free neutrons', 'Empty atoms'],
        a: 0,
        e: 'A hole moves as a positive charge as electrons shuffle in.',
      },
    ],
  },
  {
    key: 'sc-mat-03',
    unit: 'Semiconductor Materials',
    title: 'Silicon vs Germanium vs GaAs',
    level: 'intermediate',
    body:
      'Silicon dominates because its oxide is a great insulator (finFET era included) and it is cheap. Germanium has higher electron mobility but a leaky native oxide. GaAs and GaN shine for high frequency and power, at higher cost.',
    qs: [
      {
        p: 'Silicon won the materials race mainly due to:',
        c: ['Its excellent native oxide and low cost', 'Highest mobility ever', 'Being a superconductor', 'Its radioactivity'],
        a: 0,
        e: 'SiO2 insulation + abundance made silicon the mainstream.',
      },
    ],
  },
  {
    key: 'sc-mat-04',
    unit: 'Semiconductor Materials',
    title: 'Carrier Drift and Diffusion',
    level: 'advanced',
    body:
      'Carriers move two ways: drift follows an electric field (proportional to mobility), diffusion moves from high to low concentration. Current in a device is drift + diffusion; the diode equation and transistor operation both spring from these two.',
    qs: [
      {
        p: 'Drift current is driven by:',
        c: ['An electric field', 'A concentration gradient', 'Temperature only', 'Light'],
        a: 0,
        e: 'Drift = field-driven; diffusion = gradient-driven.',
      },
    ],
  },

  // ── PN Junction
  {
    key: 'sc-pn-01',
    unit: 'PN Junctions',
    title: 'Depletion Region',
    level: 'basic',
    body:
      'Join p and n material and electrons diffuse into the p side, recombining and leaving a charge-free zone called the depletion region. A built-in voltage appears across it. Reverse bias widens it; forward bias shrinks it toward conduction.',
    qs: [
      {
        p: 'The depletion region is:',
        c: ['An area stripped of free carriers', 'Filled with free electrons', 'A metal contact', 'An air gap'],
        a: 0,
        e: 'Diffusion and recombination denude the junction of carriers.',
      },
      {
        p: 'Forward bias on a PN junction:',
        c: ['Narrows the depletion region', 'Widens it', 'Does nothing', 'Reverses the material'],
        a: 0,
        e: 'Forward voltage fights the built-in potential, shrinking the barrier.',
      },
    ],
  },
  {
    key: 'sc-pn-02',
    unit: 'PN Junctions',
    title: 'The Diode Equation',
    level: 'intermediate',
    body:
      'The diode current follows I = Is(e^(V/nVt) − 1). Below the knee the current is tiny; above ~0.7 V silicon it rises exponentially. Vt ≈ 26 mV at room temperature. Is is the tiny saturation current set by the junction.',
    qs: [
      {
        p: 'Silicon diode current rises sharply:',
        c: ['Above about 0.7 V', 'Below 0.1 V', 'Only at breakdown', 'Only reverse'],
        a: 0,
        e: 'Exponential term explodes past the ~0.7 V knee.',
      },
    ],
  },
  {
    key: 'sc-pn-03',
    unit: 'PN Junctions',
    title: 'Reverse Breakdown',
    level: 'intermediate',
    body:
      'Reverse-bias the junction far enough and it breaks down: avalanche (impact ionization at high field) or Zener (quantum tunneling in heavily doped junctions). Both are destructive unless current is limited — or deliberately used as a reference.',
    qs: [
      {
        p: 'Avalanche breakdown is caused by:',
        c: ['Impact ionization from high electric field', 'Heat only', 'Too much forward current', 'Poor soldering'],
        a: 0,
        e: 'Accelerated carriers smash into atoms, creating more carriers.',
      },
    ],
  },
  {
    key: 'sc-pn-04',
    unit: 'PN Junctions',
    title: 'Junction Capacitance',
    level: 'advanced',
    body:
      'The depletion region stores charge like a capacitor, so a reverse-biased junction has voltage-variable capacitance. Varactor diodes exploit this for tuning, and the same Cj slows switching in digital circuits.',
    qs: [
      {
        p: 'Reverse junction capacitance:',
        c: ['Decreases as reverse voltage rises', 'Increases with reverse voltage', 'Is constant', 'Is zero'],
        a: 0,
        e: 'Wider depletion → lower capacitance as Vr grows.',
      },
    ],
  },

  // ── Diode Families
  {
    key: 'sc-dio-01',
    unit: 'Diode Families',
    title: 'Schottky Diodes',
    level: 'intermediate',
    body:
      'A Schottky diode is a metal-to-semiconductor junction. Its forward drop is only ~0.3 V and it switches extremely fast because it stores no stored charge (majority carrier only). Great for power rectification and clamping in switching supplies.',
    qs: [
      {
        p: 'A Schottky diode\u2019s forward drop is typically:',
        c: ['0.3 V', '0.7 V', '1.4 V', '5 V'],
        a: 0,
        e: 'Metal-semiconductor barrier is smaller than a PN barrier.',
      },
    ],
  },
  {
    key: 'sc-dio-02',
    unit: 'Diode Families',
    title: 'LEDs and Photodiodes',
    level: 'basic',
    body:
      'Forward current in an LED recombines electrons and holes to emit photons — the wavelength set by the band gap (red ~1.8 V, blue ~3 V, near IR lower). A photodiode does the reverse: light creates carriers, a measurable photocurrent.',
    qs: [
      {
        p: 'LED photon energy depends mainly on:',
        c: ['The semiconductor band gap', 'The package size', 'The current direction', 'The lead length'],
        a: 0,
        e: 'Light color comes from the energy gap the junction emits across.',
      },
    ],
  },
  {
    key: 'sc-dio-03',
    unit: 'Diode Families',
    title: 'LASER Basics',
    level: 'advanced',
    body:
      'A laser diode is an LED with mirrored facets forming an optical cavity. Above threshold, stimulated emission produces coherent, focused light — the engine of fiber communication and optical storage. Pump current dramatically above threshold for power.',
    qs: [
      {
        p: 'Stimulated emission makes laser light:',
        c: ['Coherent', 'Incoherent', 'Random', 'Polarized only'],
        a: 0,
        e: 'Photons trigger identical photons → coherent beam.',
      },
    ],
  },
  {
    key: 'sc-dio-04',
    unit: 'Diode Families',
    title: 'Tunnel and PIN Diodes',
    level: 'advanced',
    body:
      'A tunnel diode is so heavily doped that electrons tunnel through the junction, giving a region of negative resistance — usable for microwave oscillators. A PIN diode has an intrinsic layer: its resistance drops with forward bias, making it a fast RF switch.',
    qs: [
      {
        p: 'A PIN diode is often used as:',
        c: ['An RF switch with bias-controlled resistance', 'A voltage regulator', 'A light sensor', 'An inductor'],
        a: 0,
        e: 'The intrinsic layer lets bias tune ohmic resistance at RF.',
      },
    ],
  },

  // ── BJT Device Physics
  {
    key: 'sc-bjt-01',
    unit: 'BJT Theory',
    title: 'The Transistor Structure',
    level: 'basic',
    body:
      'An NPN transistor is two back-to-back diodes sharing a thin p-type base. Forward-bias the emitter-base junction and electrons flow into the base; the thin base and reverse-biased base-collector junction pull nearly all of them into the collector.',
    qs: [
      {
        p: 'In an NPN, the heavily doped terminal is the:',
        c: ['Emitter', 'Base', 'Collector', 'Substrate'],
        a: 0,
        e: 'The emitter is heavily doped to supply carriers efficiently.',
      },
    ],
  },
  {
    key: 'sc-bjt-02',
    unit: 'BJT Theory',
    title: 'Beta and Current Relations',
    level: 'intermediate',
    body:
      'Most emitter electrons race to the collector, so Ic ≈ alpha × Ie and Ic = beta × Ib. beta ranges from tens to hundreds. Because beta varies wildly between parts, good designs avoid depending on its exact value.',
    qs: [
      {
        p: 'Ic = beta × Ib. beta = 150, Ib = 20 uA gives:',
        c: ['3 mA', '1.5 mA', '6 mA', '300 mA'],
        a: 0,
        e: '150 × 20 uA = 3000 uA = 3 mA.',
      },
    ],
  },
  {
    key: 'sc-bjt-03',
    unit: 'BJT Theory',
    title: 'Cut-off, Active, Saturation',
    level: 'basic',
    body:
      'Three operating zones: cut-off (base unpowered — switch open), active (base-emitter forward, collector reverse — amplifier), saturation (both junctions forward — switch closed). The transistor is a lever between them driven by base current.',
    qs: [
      {
        p: 'For hard switching on/off, a BJT alternates between:',
        c: ['Cut-off and saturation', 'Active and breakover', 'Saturation and avalanche', 'Two cut-off points'],
        a: 0,
        e: 'Switches drive the edge: fully off or fully on.',
      },
    ],
  },
  {
    key: 'sc-bjt-04',
    unit: 'BJT Theory',
    title: 'Early Effect and Output Resistance',
    level: 'advanced',
    body:
      'Early effect: as Vce rises, the collector-base depletion region widens and the effective base narrows, so collector current rises slightly even above saturation. It shows up as a finite output resistance and a tilt in the I-V curves.',
    qs: [
      {
        p: 'The Early effect causes Ic to:',
        c: ['Rise slowly with Vce', 'Stay constant always', 'Fall with Vce', 'Oscillate'],
        a: 0,
        e: 'Base narrowing lets a little more current through as Vce rises.',
      },
    ],
  },

  // ── BJT Circuits
  {
    key: 'sc-bjta-01',
    unit: 'BJT Circuits',
    title: 'Fixed-Base Biasing',
    level: 'intermediate',
    body:
      'Fixed bias: one resistor from supply to base sets Ib = (Vcc − 0.7)/Rb. It is simple but unstable — beta and temperature shifts move the operating point wildly. Acceptable for switches, poor for amplifiers.',
    qs: [
      {
        p: 'Ib with Vcc = 9 V, Rb = 100k, Vbe = 0.7 V is:',
        c: ['83 uA', '9 mA', '900 uA', '8.3 uA'],
        a: 0,
        e: '(9 − 0.7)/100k = 83 uA.',
      },
    ],
  },
  {
    key: 'sc-bjta-02',
    unit: 'BJT Circuits',
    title: 'Emitter-Stabilized Bias',
    level: 'intermediate',
    body:
      'Adding an emitter resistor creates negative feedback: if Ic rises, Ie and the emitter voltage rise, reducing Vbe and pulling Ic back down. This stabilizes the operating point against beta and temperature without needing precision components.',
    qs: [
      {
        p: 'The emitter resistor\u2019s main job is:',
        c: ['Stabilizing the bias point', 'Increasing gain', 'Blocking DC', 'Shunting AC to ground'],
        a: 0,
        e: 'Negative feedback from Re rejects beta/temperature drift.',
      },
    ],
  },
  {
    key: 'sc-bjta-03',
    unit: 'BJT Circuits',
    title: 'Voltage-Divider Bias Design',
    level: 'advanced',
    body:
      'A stiff voltage divider on the base sets the base voltage, and the emitter resistor then sets Ie ≈ (Vb − 0.7)/Re. Design for Ie, choose Re, derive the divider. If the divider current is ≥10× Ib it is "stiff" and stable.',
    qs: [
      {
        p: 'For Vb, Ie is roughly:',
        c: ['(Vb − 0.7)/Re', 'Vb/Re', 'beta × Ib', '(Vb − 0.7) × Re'],
        a: 0,
        e: 'Emitter current flows through Re at Vb − 0.7 V.',
      },
    ],
  },
  {
    key: 'sc-bjta-04',
    unit: 'BJT Circuits',
    title: 'Darlington Pair',
    level: 'advanced',
    body:
      'Two transistors stacked so the first\u2019s emitter feeds the second\u2019s base multiply beta: beta_total ≈ beta1 × beta2. A Darlington switches big loads from tiny base current — at the cost of an extra 0.7 V of drop.',
    qs: [
      {
        p: 'A Darlington of beta 50 and 100 has combined beta about:',
        c: ['5000', '150', '50', '2'],
        a: 0,
        e: '50 × 100 = 5000.',
      },
    ],
  },

  // ── MOSFET Devices
  {
    key: 'sc-mos-01',
    unit: 'MOSFET Devices',
    title: 'How a MOSFET Channel Forms',
    level: 'basic',
    body:
      'Above the threshold voltage Vth, positive gate voltage attracts electrons under the oxide, forming an inversion channel between source and drain. Below Vth the channel is empty and the transistor is off. The gate is an insulated electrode.',
    qs: [
      {
        p: 'Inversion happens when the gate voltage:',
        c: ['Exceeds the threshold Vth', 'Is below zero', 'Equals the drain', 'Is shorted to source'],
        a: 0,
        e: 'Vgs above Vth induces the conducting channel.',
      },
    ],
  },
  {
    key: 'sc-mos-02',
    unit: 'MOSFET Devices',
    title: 'Saturation Current Equation',
    level: 'advanced',
    body:
      'In saturation, Ids = (1/2)·k·(W/L)·(Vgs − Vth)². Doubling the width doubles current; transistor scaling is fundamentally this equation. The square law dominates analog design and explains why size and threshold matter.',
    qs: [
      {
        p: 'Doubling the W/L ratio of a saturated MOSFET:',
        c: ['Doubles drain current', 'Quadruples it', 'Halves it', 'No change'],
        a: 0,
        e: 'Id is proportional to W/L in the square law.',
      },
    ],
  },
  {
    key: 'sc-mos-03',
    unit: 'MOSFET Devices',
    title: 'Body Effect',
    level: 'advanced',
    body:
      'The substrate voltage shifts the threshold: a reverse source-body voltage increases Vth. In stacked logic and source-followers the body effect raises thresholds and slows transitions — why triple-well processes isolate bodies.',
    qs: [
      {
        p: 'A reverse bias between source and body:',
        c: ['Raises the threshold voltage', 'Lowers it', 'Creates a short', 'Does nothing'],
        a: 0,
        e: 'Body bias deepens depletion, raising Vth.',
      },
    ],
  },
  {
    key: 'sc-mos-04',
    unit: 'MOSFET Devices',
    title: 'Subthreshold Leakage',
    level: 'advanced',
    body:
      'Below Vth the MOSFET is not perfectly off: a small subthreshold current leaks source-to-drain, growing exponentially as Vth falls. Low-power chips trade speed for threshold to cut this leakage, and power gates switch off idle blocks.',
    qs: [
      {
        p: 'Subthreshold leakage gets worse when:',
        c: ['Vth is lowered', 'Vth is raised', 'Supply is removed', 'Temperature falls'],
        a: 0,
        e: 'Lower thresholds = more off-state leak; the leakage is exponential.',
      },
    ],
  },

  // ── IC Fabrication
  {
    key: 'sc-fab-01',
    unit: 'IC Fabrication',
    title: 'Fabrication Flow',
    level: 'intermediate',
    body:
      'Chips are built layer by layer on a silicon wafer: oxidation, deposition, lithography (mask + resist + light), etching, and Doping (implant). Hundreds of steps create billions of transistors. Yield = the fraction of chips that work.',
    qs: [
      {
        p: 'Lithography transfers a pattern onto the wafer using:',
        c: ['A mask exposed onto photoresist', 'Acid etching of copper', 'A mechanical drill', 'Magnetic fields'],
        a: 0,
        e: 'Light/UV copies the mask through a lens onto resist.',
      },
    ],
  },
  {
    key: 'sc-fab-02',
    unit: 'IC Fabrication',
    title: 'Moore\u2019s Law and Scaling',
    level: 'basic',
    body:
      'Scaling shrinks every dimension, roughly doubling transistor density every couple of generations. Smaller devices switch faster and use less energy per transition, but leakage, wires, and lithography limit push to single-digit nanometers.',
    qs: [
      {
        p: 'Scaling transistors smaller generally makes them:',
        c: ['Faster and lower energy', 'Slower and hotter', 'More radioactive', 'Bigger'],
        a: 0,
        e: 'Smaller capacitance/charge → faster, cheaper switching (historically).',
      },
    ],
  },
  {
    key: 'sc-fab-03',
    unit: 'IC Fabrication',
    title: 'Short-Channel Effects',
    level: 'advanced',
    body:
      'When channel length approaches the depletion depth, the gate loses control: threshold drops (DIBL), leakage rises, and off-state current worsens. FinFETs and GAA wrap the gate around fins to restore electrostatic control.',
    qs: [
      {
        p: 'A key short-channel symptom is:',
        c: ['Threshold roll-off and leakage', 'Faster switching', 'Zero leakage', 'Bigger oxide'],
        a: 0,
        e: 'Loss of gate control lowers Vth and raises off-current.',
      },
    ],
  },
  {
    key: 'sc-fab-04',
    unit: 'IC Fabrication',
    title: 'Packaging',
    level: 'intermediate',
    body:
      'After fabrication, chips are packaged: die attach, wire bonding or flip-chip (solder bump) connection, molding, and lead formation. Packaging adds signal delay and heat limits — advanced packages go through-silicon-via and fan-out.',
    qs: [
      {
        p: 'Flip-chip connects the die using:',
        c: ['Solder bumps on the die face', 'Gold wires from edges', 'Glue dots', 'Magnetic contacts'],
        a: 0,
        e: 'Bumps let the die sit face-down — low inductance, high pins.',
      },
    ],
  },

  // ── Power Devices
  {
    key: 'sc-pow-01',
    unit: 'Power Semiconductor Devices',
    title: 'SCR (Thyristor) Basics',
    level: 'intermediate',
    body:
      'An SCR is a four-layer PNPN switch that latches on once triggered and stays on until current drops below its holding value. It switches huge AC power with a tiny gate pulse — the backbone of phase-control rectification.',
    qs: [
      {
        p: 'An SCR turns off only when:',
        c: ['Anode current falls below the holding current', 'The gate is powered off', 'It is heated', 'Commutating voltage is applied to the gate'],
        a: 0,
        e: 'Latched on, the gate loses control; the anode current must drop.',
      },
    ],
  },
  {
    key: 'sc-pow-02',
    unit: 'Power Semiconductor Devices',
    title: 'Triac and Diac',
    level: 'advanced',
    body:
      'A triac behaves like two SCRs in reverse parallel on one chip — AC switching in both halves from one gate. A diac (bidirectional trigger diode) fires at a set breakover, used as the trigger for triac dimmers.',
    qs: [
      {
        p: 'A triac conducts:',
        c: ['In both AC half-cycles', 'Only in the positive half', 'Only DC', 'Never'],
        a: 0,
        e: 'It is the AC bidirectional controllable switch.',
      },
    ],
  },
  {
    key: 'sc-pow-03',
    unit: 'Power Semiconductor Devices',
    title: 'IGBT: The Hybrid Switch',
    level: 'advanced',
    body:
      'An IGBT combines MOSFET gate drive with bipolar conduction: high input impedance plus low on-resistance at high voltage. It is the workhorse of inverters, motor drives, and EVs where neither pure power MOSFETs nor BJTs win.',
    qs: [
      {
        p: 'IGBT is best described as:',
        c: ['MOSFET gate + BJT conduction', 'A reverse diode', 'A magnetics device', 'An SCR trigger'],
        a: 0,
        e: 'Voltage-controlled input, current-handling output.',
      },
    ],
  },

  // ── Photonics
  {
    key: 'sc-pho-01',
    unit: 'Photonics & Displays',
    title: 'Photovoltaic Effect',
    level: 'intermediate',
    body:
      'Light absorbed near a PN junction creates electron-hole pairs; the built-in field sweeps them apart, producing a voltage and current. That is a solar cell. Efficiency is limited: above the band-gap energy is wasted as heat, below it nothing is absorbed.',
    qs: [
      {
        p: 'A solar cell converts:',
        c: ['Photons into electron-hole pairs collected by the junction', 'Heat into magnetism', 'Sound into current', 'Friction into charge'],
        a: 0,
        e: 'Photons generate carriers; junction separates them.',
      },
    ],
  },
  {
    key: 'sc-pho-02',
    unit: 'Photonics & Displays',
    title: 'OLED vs LCD',
    level: 'intermediate',
    body:
      'OLED pixels emit their own light per subpixel — perfect blacks and fast response, but blue emitters age faster. LCD backlights a layer and blocks light through liquid crystal pixels, needing color filters and polarizers.',
    qs: [
      {
        p: 'An OLED pixel:',
        c: ['Emits light itself', 'Blocks a backlight', 'Reflects ambient light', 'Uses a CRT beam'],
        a: 0,
        e: 'Self-emissive organic diodes produce light directly.',
      },
    ],
  },
  {
    key: 'sc-pho-03',
    unit: 'Photonics & Displays',
    title: 'Image Sensors (CCD/CMOS)',
    level: 'advanced',
    body:
      'Each pixel is a photodiode that collects charge for an exposure, then the charge is read out. CCDs shift charge serially (high quality, slow); CMOS sensors read each pixel directly with per-pixel amplifiers (fast, integrated, standard).',
    qs: [
      {
        p: 'Modern smartphone cameras use:',
        c: ['CMOS image sensors', 'CCD exclusively', 'Vacuum tubes', 'X-ray film'],
        a: 0,
        e: 'CMOS sensors integrate ADC and logic, cheap and fast.',
      },
    ],
  },
// ── Advanced devices
  {
    key: 'sc-adv-01',
    unit: 'Advanced Devices',
    title: 'FinFET and GAA',
    level: 'advanced',
    body:
      'Classic planar transistors lose gate control below ~20 nm. FinFETs wrap the gate around a fin; gate-all-around (GAA) stacks nanosheets for full perimeter control. Every "3D transistor" claim is about electrostatic control, not clock speed.',
    qs: [
      {
        p: 'FinFETs exist to:',
        c: ['Restore gate control at small geometries', 'Raise the supply voltage', 'Remove silicon', 'Add pins'],
        a: 0,
        e: 'Wrapped gates suppress short-channel leakage.',
      },
    ],
  },
  {
    key: 'sc-adv-02',
    unit: 'Advanced Devices',
    title: 'CMOS Image Pixel',
    level: 'advanced',
    body:
      'A CMOS pixel is a photodiode plus transistors per pixel: reset, transfer, source-follower readout, and row select. Rolling vs global shutter changes motion artifacts. Pixel design is a fight between sensitivity, noise, and area.',
    qs: [
      {
        p: 'A CMOS image pixel contains:',
        c: ['A photodiode plus readout transistors', 'Only a lens', 'A CRT', 'Lasers'],
        a: 0,
        e: 'Per-pixel amplification on the same die.',
      },
    ],
  },
  {
    key: 'sc-adv-03',
    unit: 'Advanced Devices',
    title: 'Bandgap References',
    level: 'advanced',
    body:
      'A bandgap reference combines a PTAT voltage with a CTAT (complementary) diode drop to produce a near-temperature-independent ~1.2 V reference. Every ADC and voltage regulator leans on one. Millivolts of drift affect every measurement.',
    qs: [
      {
        p: 'A bandgap reference cancels:',
        c: ['Temperature drift of the voltage', 'Noise only', 'The clock', 'Capacitance'],
        a: 0,
        e: 'PTAT + CTAT sum to a flat output.',
      },
    ],
  },
  {
    key: 'sc-adv-04',
    unit: 'Advanced Devices',
    title: 'Power MOSFET On-Resistance',
    level: 'advanced',
    body:
      'A power MOSFET is millions of parallel cells; total drain-source resistance Rds(on) sets conduction loss P = I squared times Rds. Balancing breakdown voltage against Rds is the design tension: higher-voltage parts have thicker, more resistive drift regions.',
    qs: [
      {
        p: 'Conduction loss in a power MOSFET is:',
        c: ['I squared times Rds(on)', 'V times I', 'I/R', 'R times C'],
        a: 0,
        e: 'Resistive drop across the on-channel.',
      },
    ],
  },
  {
    key: 'sc-adv-05',
    unit: 'Advanced Devices',
    title: 'Junction Temperature and Thermal',
    level: 'intermediate',
    body:
      'Every device heats: Tj = Ta + thetaJA times power. Junction temperature limits lifetime and derating. A package thermal resistance (thetaJA in C/W) is the budget for how much power you can burn before the silicon cooks.',
    qs: [
      {
        p: 'Junction temperature is estimated as:',
        c: ['Ta + thetaJA times power', 'Ta minus power', 'thetaJA only', 'Voltage times time'],
        a: 0,
        e: 'Ambient plus thermal-rise product.',
      },
    ],
  },
  {
    key: 'sc-adv-06',
    unit: 'Advanced Devices',
    title: 'Series vs Parallel Power Parts',
    level: 'intermediate',
    body:
      'Parallelizing MOSFETs halves conduction loss by sharing current but adds gate-drive challenges; series stacking shares voltage but needs stacked drives. The right count balances cost, drive complexity, and thermal spread.',
    qs: [
      {
        p: 'Parallel MOSFETs mainly reduce:',
        c: ['Effective on-resistance', 'Voltage per device', 'Gate charge', 'All switching loss'],
        a: 0,
        e: 'Current splits across parallel channels.',
      },
    ],
  },

  // ── Optoelectronics
  {
    key: 'sc-pho2-01',
    unit: 'Optoelectronics Deep Dive',
    title: 'Phototransistor Circuits',
    level: 'intermediate',
    body:
      'A phototransistor is a photodiode into a transistor base: light makes base current, which amplifies into collector current. With a series resistor it makes a light-controlled switch. Response is slower than a photodiode, but gain is built in.',
    qs: [
      {
        p: 'Phototransistors amplify:',
        c: ['Light into a larger current', 'Voltage only', 'Sound into light', 'Heat'],
        a: 0,
        e: 'Internal transistor gain turns photon current into big Ic.',
      },
    ],
  },
  {
    key: 'sc-pho2-02',
    unit: 'Optoelectronics Deep Dive',
    title: 'Optocoupler Isolation',
    level: 'intermediate',
    body:
      'An optocoupler sends a signal across an isolation barrier with light: no galvanic connection, so noise and ground loops cannot cross. The CTR (current transfer ratio) tells you how much output current you get per input current.',
    qs: [
      {
        p: 'Optocouplers isolate by transferring:',
        c: ['Light between two circuits', 'Magnetic coupling', 'Wire bridges', 'Charge pumps'],
        a: 0,
        e: 'The LED-to-photodetector light path flies the signal.',
      },
    ],
  },
  {
    key: 'sc-pho2-03',
    unit: 'Optoelectronics Deep Dive',
    title: 'OLED Aging and Burn-in',
    level: 'advanced',
    body:
      'Blue OLED emitters degrade fastest, and every pixel ages differently, producing burn-in. Pixel compensation circuits estimate wear and boost faded subpixels. Long-life displays are as much about compensation as chemistry.',
    qs: [
      {
        p: 'OLED burn-in is mainly from:',
        c: ['Uneven blue emitter aging', 'The glass polarizer', 'Backlight LEDs', 'Moisture'],
        a: 0,
        e: 'Blue pixels die faster and wear differs per pixel.',
      },
    ],
  },
  {
    key: 'sc-pho2-04',
    unit: 'Optoelectronics Deep Dive',
    title: 'Laser Safety Notes',
    level: 'intermediate',
    body:
      'Lasers are built to focus power, and the eye focuses it onto a point — the blink reflex is far too slow. Classes scale harm; above Class 1 you must control exposure. Interlocks and eye protection are part of the optical design.',
    qs: [
      {
        p: 'The eye is vulnerable to lasers because:',
        c: ['It focuses the beam to a point', 'It is magnetic', 'It emits light', 'It is cold'],
        a: 0,
        e: 'The lens concentrates the beam on the retina.',
      },
    ],
  },
  {
    key: 'sc-pho2-05',
    unit: 'Optoelectronics Deep Dive',
    title: 'Spectrometers in ICs',
    level: 'advanced',
    body:
      'A spectrometer-on-a-chip: a grating disperses light and a pixel array images the spectrum. Applications include color sensors, gas detection, and fluorescence. Sensitivity and resolution are chip-area trades.',
    qs: [
      {
        p: 'A chip spectrometer separates light by:',
        c: ['Wavelength through a grating', 'Polarization only', 'Speed', 'Heat'],
        a: 0,
        e: 'Dispersion spreads wavelengths across pixels.',
      },
    ],
  },

  // ── Reliability and packaging
  {
    key: 'sc-rel-01',
    unit: 'Reliability & Packaging',
    title: 'Failure Modes in Chips',
    level: 'advanced',
    body:
      'Silicon fails predictably under stress: electromigration (metal migration at high current), hot-carrier injection (oxide damage), and bias-temperature instability (threshold shift). Wear-out models size reliability budgets.',
    qs: [
      {
        p: 'Electromigration damages:',
        c: ['Metal wires under sustained current', 'The package body', 'The lens', 'The crystal'],
        a: 0,
        e: 'Electron wind migrates atoms, hollowing thin wires.',
      },
    ],
  },
  {
    key: 'sc-rel-02',
    unit: 'Reliability & Packaging',
    title: 'COB and Wire Bonding',
    level: 'intermediate',
    body:
      'Chip-on-board (COB) bonds the bare die directly to the PCB — cheap for modules but hard to rework. Wire bonding connects die pads to lead frames; bond wires add inductance and are the first crack victims in thermal cycling.',
    qs: [
      {
        p: 'Wire bonds connect:',
        c: ['Die pads to package leads', 'Only power rails', 'The lens to the die', 'Nothing'],
        a: 0,
        e: 'Fine gold/copper wires bridge die to frame.',
      },
    ],
  },
  {
    key: 'sc-rel-03',
    unit: 'Reliability & Packaging',
    title: 'IPC Ratings for Devices',
    level: 'intermediate',
    body:
      'Semiconductor ratings define safe use: absolute maximum ratings (never exceed, even briefly), recommended operating conditions, and derating curves. Operating at the abs-max "because it works now" is how parts die young.',
    qs: [
      {
        p: 'Absolute maximum ratings:',
        c: ['Must never be exceeded', 'Are suggestions', 'Can be doubled', 'Only apply overseas'],
        a: 0,
        e: 'Exceeding them voids reliability, sometimes instantly.',
      },
    ],
  },
  {
    key: 'sc-rel-04',
    unit: 'Reliability & Packaging',
    title: 'Why Dies Are Getting Thin',
    level: 'advanced',
    body:
      'Thin dies bend, stack, and cool better — which is why advanced packaging grinds wafers thin. But thin = fragile: handling and thermal mismatch crack them. Thinning is a packaging superpower with real fracture risk.',
    qs: [
      {
        p: 'Dies are thinned mainly to:',
        c: ['Enable stacking, stacking and cooling', 'Raise voltage', 'Increase logic speed', 'Save masks'],
        a: 0,
        e: 'Thin dies fit stacked 3D packages.',
      },
    ],
  },
];

let cache: GeneratedGroup | null = null;
export function semiconductors(): GeneratedGroup {
  cache ??= build('semiconductors', MODULES);
  return cache;
}