import type { GeneratedGroup, ModuleSpec } from './presets.js';
import { build } from './presets.js';

const MODULES: ModuleSpec[] = [
  // ── PCB Basics
  {
    key: 'pc-intro-01',
    unit: 'PCB Fundamentals',
    title: 'What a PCB Is',
    level: 'basic',
    body:
      'A PCB is an insulating board with copper traces connecting components. Layers stack: copper planes and signal layers separated by dielectric. The pattern is etched from a copper sheet, then components are soldered on.',
    qs: [
      {
        p: 'A PCB conducts signals through:',
        c: ['Copper traces on an insulating substrate', 'Air gaps', 'Solder only', 'Insulating resin'],
        a: 0,
        e: 'Copper traces are the wires of the board.',
      },
    ],
  },
  {
    key: 'pc-intro-02',
    unit: 'PCB Fundamentals',
    title: 'The Design Workflow',
    level: 'basic',
    body:
      'Flow: schematic → netlist → board layout (placement, routing) → design rules check (DRC) → fabrication files (Gerbers) → assembly. Mistakes found at layout are cheaper than mistakes found on hardware.',
    qs: [
      {
        p: 'Gerber files are used for:',
        c: ['Fabricating the PCB', 'Debugging firmware', 'Simulating the schematic', '3D printing the case'],
        a: 0,
        e: 'Gerbers describe copper layers to the fab.',
      },
    ],
  },
  {
    key: 'pc-intro-03',
    unit: 'PCB Fundamentals',
    title: 'Through-Hole vs SMD',
    level: 'basic',
    body:
      'Through-hole parts have leads in drilled holes — rugged, hand-solderable, but big. Surface-mount (SMD) parts sit on pads on the surface — tiny, low-parasitic, machine-placed. Modern designs are almost all SMD.',
    qs: [
      {
        p: 'SMD parts are mostly placed:',
        c: ['By pick-and-place machines', 'Only by hand', 'Inside the drill holes', 'On the back only'],
        a: 0,
        e: 'Assembly lines place tiny surface-mount parts.',
      },
    ],
  },
  {
    key: 'pc-intro-04',
    unit: 'PCB Fundamentals',
    title: 'Key Properties: Current & Voltage',
    level: 'basic',
    body:
      'Every trace has a current capacity (cross-section and copper weight) and a voltage rating (spacing/dielectric). A 1 mm trace on 1 oz copper carries roughly 1 A. Failing these = melted copper or arcing.',
    qs: [
      {
        p: 'A trace\u2019s current capacity depends on:',
        c: ['Its width, thickness, and copper weight', 'Its length only', 'Its color', 'The component count'],
        a: 0,
        e: 'Cross-section sets ampacity.',
      },
    ],
  },
  {
    key: 'pc-intro-05',
    unit: 'PCB Fundamentals',
    title: 'Units: mils and mm',
    level: 'basic',
    body:
      'Designers mix mils (thousandths of an inch) and mm. A "trace 10 mil wide" is 0.254 mm; a 20 mil drilled hole is common. PCB tools switch units; confusing them moves holes off pads. Pick one and be consistent.',
    qs: [
      {
        p: '10 mils equals:',
        c: ['0.254 mm', '10 mm', '0.025 cm', '100 mm'],
        a: 0,
        e: '1 mil = 0.0254 mm.',
      },
    ],
  },

  // ── Schematic
  {
    key: 'pc-sch-01',
    unit: 'Schematic Design',
    title: 'Symbols and Reference Designators',
    level: 'basic',
    body:
      'Each component gets a reference designator (R1, C3, U2) and a symbol that shows which pins connect. The library symbols must match the physical footprint or nothing fits. Libraries matter.',
    qs: [
      {
        p: 'A capacitor is typically designated:',
        c: ['C', 'R', 'U', 'L'],
        a: 0,
        e: 'C for capacitor, R for resistor, L for inductor, U for IC.',
      },
    ],
  },
  {
    key: 'pc-sch-02',
    unit: 'Schematic Design',
    title: 'Nets and Net Labels',
    level: 'basic',
    body:
      'A net is a set of pins connected by wires or labels of the same name. Net labels keep schematics readable without hundreds of crossing wires. Every net becomes a trace (or via route) in layout.',
    qs: [
      {
        p: 'Two pins connected by the same net name are:',
        c: ['Electrically identical', 'Unrelated', 'Always separate', 'Short-circuited by error'],
        a: 0,
        e: 'Same label = same node.',
      },
    ],
  },
  {
    key: 'pc-sch-03',
    unit: 'Schematic Design',
    title: 'Power and Ground Symbol',
    level: 'basic',
    body:
      'Power symbols (VCC, GND) are global nets shrunk to a stub — everywhere they appear connects together. Never leave pins floating: every input needs a defined level (pull-up/down or driver).',
    qs: [
      {
        p: 'A GND symbol connects:',
        c: ['Every GND symbol to the same global node', 'Only the nearest part', 'Nothing', 'Only the battery'],
        a: 0,
        e: 'Power flags are globally connected.',
      },
    ],
  },
  {
    key: 'pc-sch-04',
    unit: 'Schematic Design',
    title: 'Reading a Datasheet Pinout',
    level: 'intermediate',
    body:
      'The datasheet pinout shows pin names, functions, and alternate uses (e.g., PA9/USART1_TX). The schematic must handle every pin: power, decoupling, config straps, unconnected (NC) pins. Missing connections = ghost bugs.',
    qs: [
      {
        p: 'Ignoring a pin\u2019s required connection often causes:',
        c: ['Subtle unavailable features or damage', 'Faster firmware', 'Less power draw', 'It never matters'],
        a: 0,
        e: 'Unconnected required pins can float or starve.',
      },
    ],
  },
  {
    key: 'pc-sch-05',
    unit: 'Schematic Design',
    title: 'Decoupling Capacitors: Why',
    level: 'intermediate',
    body:
      'ICs draw fast current spikes when switching; the supply inductance cannot deliver them instantly, so the rail sags. A decoupling cap close to each IC supplies the transient locally. One 100 nF per IC is the baseline.',
    qs: [
      {
        p: 'Decoupling caps supply:',
        c: ['Fast current transients near the IC', 'Slow battery power', 'Signal isolation', 'Thermal relief'],
        a: 0,
        e: 'Local charge reservoir for switching spikes.',
      },
    ],
  },
  {
    key: 'pc-sch-06',
    unit: 'Schematic Design',
    title: 'Pull-Up and Pull-Down',
    level: 'basic',
    body:
      'An open-drain or floating pin needs a resistor to define its level: pull-up to VCC for default-high, pull-down to GND for default-low. Choose value to balance leakage vs speed (keys ~10k, I2C ~4.7k).',
    qs: [
      {
        p: 'An open-drain line needs:',
        c: ['A pull-up resistor', 'A pull-down always', 'A series diode', 'No resistor'],
        a: 0,
        e: 'The resistor gives the passive high level.',
      },
    ],
  },
  {
    key: 'pc-sch-07',
    unit: 'Schematic Design',
    title: 'Series Resistors for Protection',
    level: 'intermediate',
    body:
      'A series resistor limits inrush into a pin, slows edges (EMI), and protects against abuse. Common: 33 ohm in series with high-speed signals, current-limiting in LED strings, and ignition clamps for connectors.',
    qs: [
      {
        p: 'A series resistor on a signal line primarily:',
        c: ['Limits current and slows edges', 'Adds inductance', 'Short-circuits noise', 'Drops all voltage'],
        a: 0,
        e: 'It is a controlled impedance and limiter.',
      },
    ],
  },

  // ── Layout
  {
    key: 'pc-lay-01',
    unit: 'Layout & Routing',
    title: 'Component Placement First',
    level: 'intermediate',
    body:
      'Place rows from critical chips first: MCU center, crystals adjacent, power entry on the edge, connectors on the edge. Placement determines 80% of signal integrity. Routing comes after placement is settled.',
    qs: [
      {
        p: 'Good placement focuses first on:',
        c: ['The critical ICs and their support parts', 'Decorative symmetry', 'Board color', 'Label positions'],
        a: 0,
        e: 'Start with the heart of the design.',
      },
    ],
  },
  {
    key: 'pc-lay-02',
    unit: 'Layout & Routing',
    title: 'Trace Width for Current',
    level: 'intermediate',
    body:
      'Current capacity scales with trace cross-section. A common rule for outer layers: 1 oz copper, 10 mil ≈ 1 A (with temperature rise). Power pours widen the trace into a plane for amps of current.',
    qs: [
      {
        p: 'To carry 3 A safely you would:',
        c: ['Widen the trace or use a pour', 'Reduce copper weight', 'Lengthen the trace', 'Drill more holes'],
        a: 0,
        e: 'More cross-section handles more current.',
      },
    ],
  },
  {
    key: 'pc-lay-03',
    unit: 'Layout & Routing',
    title: 'Ground Planes',
    level: 'intermediate',
    body:
      'A solid ground plane on one layer gives signals a low-inductance return path and shields each other. Never split the ground plane across a critical signal. Star or solid-plane grounds cut noise reliably.',
    qs: [
      {
        p: 'A continuous ground plane:',
        c: ['Provides low impedance returns and shielding', 'Just uses up space', 'Increases noise only', 'Is only decorative'],
        a: 0,
        e: 'Planar returns minimize loop inductance.',
      },
    ],
  },
  {
    key: 'pc-lay-04',
    unit: 'Layout & Routing',
    title: 'Note 45° and Via Choices',
    level: 'basic',
    body:
      'Routing uses 45° corners (right angles can act as stuck-resist images and impedance discontinuities at high speed) and vias to switch layers. Each via adds inductance, so keep high-speed signals on one layer when possible.',
    qs: [
      {
        p: '45° corners are preferred over 90° because:',
        c: ['Right angles create impedance/resist artifacts', '45° is prettier only', '90° is illegal', 'Vias prefer it'],
        a: 0,
        e: 'Cleaner geometry, fewer etch/anomaly risks.',
      },
    ],
  },
  {
    key: 'pc-lay-05',
    unit: 'Layout & Routing',
    title: 'Clearance Rules',
    level: 'intermediate',
    body:
      'DRC checks clearances: minimum gap between tracks, pads, and copper. Smaller clearances allow denser boards but risk shorts during fabrication. Standard PCBs use 6–10 mil trace/space; fine-pitch goes tighter at a cost.',
    qs: [
      {
        p: 'The clearance rule prevents:',
        c: ['Accidental copper shorts', 'Trace heating', 'Component height issues', 'Solder wicking'],
        a: 0,
        e: 'Minimum spacing keeps pads/traces apart.',
      },
    ],
  },
  {
    key: 'pc-lay-06',
    unit: 'Layout & Routing',
    title: 'Thermal Reliefs',
    level: 'intermediate',
    body:
      'A pad connected to a large plane wicks away solder heat unless the connection is narrowed. Thermal relief spokes slow that heat loss so joints solder reliably. Ground pins on power front-ends use them constantly.',
    qs: [
      {
        p: 'Thermal reliefs exist to:',
        c: ['Make soldering to planes practical', 'Add noise', 'Lower resistance', 'Lengthen traces'],
        a: 0,
        e: 'Spokes restrict heat flow to the pour.',
      },
    ],
  },
  {
    key: 'pc-lay-07',
    unit: 'Layout & Routing',
    title: 'Tenting Vias',
    level: 'advanced',
    body:
      'Covering vias with solder mask ("tenting") prevents solder wicking up them, especially in castellations and exposed pads. Via-in-pad needs filling. Poor via handling causes solder bridges and cold joints.',
    qs: [
      {
        p: 'A tented via is protected from:',
        c: ['Solder wicking through the hole', 'Electrical shorts entirely', 'Heating', 'Signal crosstalk'],
        a: 0,
        e: 'Mask coverage keeps solder off the via.',
      },
    ],
  },

  // ── Stackup
  {
    key: 'pc-stack-01',
    unit: 'Layers & Stackups',
    title: '2-Layer vs 4-Layer',
    level: 'intermediate',
    body:
      '2-layer boards route signal on both copper sides — cheap but weak planes. 4-layer adds internal power and ground planes: better noise floor, cleaner returns, easier routing. For anything with ADC or RF, 4-layer pays for itself.',
    qs: [
      {
        p: 'A 4-layer board\u2019s hidden advantage is:',
        c: ['Solid internal power/ground planes', 'More silk-screen space', 'Cheaper materials', 'Faster firmware'],
        a: 0,
        e: 'Planar power distribution improves integrity.',
      },
    ],
  },
  {
    key: 'pc-stack-02',
    unit: 'Layers & Stackups',
    title: 'Stackup Symmetry',
    level: 'advanced',
    body:
      'Copper layers should be balanced symmetrically around the center to prevent board warping during reflow. A common 4-layer stack: signal / GND / power / signal. Unbalanced copper bows the board and stresses solder joints.',
    qs: [
      {
        p: 'Unbalanced layer copper causes:',
        c: ['Board warpage', 'Higher cost always', 'Slower JTAG', 'More vias'],
        a: 0,
        e: 'Asymmetric stress bends the laminate.',
      },
    ],
  },
  {
    key: 'pc-stack-03',
    unit: 'Layers & Stackups',
    title: 'Impedance-Controlled Traces',
    level: 'advanced',
    body:
      'High-speed signals (USB, DDR, RF) need controlled characteristic impedance (e.g., 50 ohm single-end, 90 ohm differential). The fab tunes trace width and dielectric spacing to hit the impedance. Specify it or expect reflections.',
    qs: [
      {
        p: 'Controlled impedance is critical for:',
        c: ['USB/DDR/RF transmission lines', 'LED resistor leads', 'Power switches', 'DIP sockets'],
        a: 0,
        e: 'Mismatched impedance reflects at gigabit edges.',
      },
    ],
  },
  {
    key: 'pc-stack-04',
    unit: 'Layers & Stackups',
    title: 'Copper Weight',
    level: 'basic',
    body:
      'Copper weight is the thickness: 1 oz ≈ 35 µm, 2 oz ≈ 70 µm. Heavier copper handles more current but etches with tighter minimum spacing. Mixed-weight boards need the fab to know already.',
    qs: [
      {
        p: '1 oz copper is roughly:',
        c: ['35 µm thick', '1 µm thick', '1 mm thick', '500 µm'],
        a: 0,
        e: 'Standard 1 oz cladding ≈ 34-36 µm.',
      },
    ],
  },
  {
    key: 'pc-stack-05',
    unit: 'Layers & Stackups',
    title: 'Solder Mask and Silkscreen',
    level: 'basic',
    body:
      'Solder mask (usually green) covers copper except pads; silkscreen prints reference designators and labels in white. Mask prevents solder bridges; silk identifies parts for hand assembly and debugging.',
    qs: [
      {
        p: 'Solder mask mainly prevents:',
        c: ['Bridges between adjacent pads', 'Trace corrosion only', 'Component tilt', 'Via tenting'],
        a: 0,
        e: 'It keeps solder where you want it: on pads.',
      },
    ],
  },

  // ── Power design
  {
    key: 'pc-pwr-01',
    unit: 'Power & Signal Integrity',
    title: 'Routing Power Rails',
    level: 'intermediate',
    body:
      'Power traces should be wide pours to a central point (star), then fan out. Avoid daisy-chained supplies where one load drags down another. Place bulk caps at the entry and decoupling at each IC.',
    qs: [
      {
        p: 'A star power topology:',
        c: ['Feeds each load from a common point', 'Chains loads in series', 'Uses one thin trace', 'Skips capacitors'],
        a: 0,
        e: 'A common feeding point isolates load currents.',
      },
    ],
  },
  {
    key: 'pc-pwr-02',
    unit: 'Power & Signal Integrity',
    title: 'Bulk vs Decoupling Capacitors',
    level: 'intermediate',
    body:
      'Bulk caps (10–100 µF) smooth low-frequency supply sag; decoupling caps (100 nF) catch high-frequency switching spikes at the IC. Different values resonate together for broadband energy delivery.',
    qs: [
      {
        p: 'Bulk electrolytic caps handle:',
        c: ['Low-frequency supply ripple', 'GHz transients', 'Only startup', 'Signal isolation'],
        a: 0,
        e: 'Large energy storage at lower frequency.',
      },
    ],
  },
  {
    key: 'pc-pwr-03',
    unit: 'Power & Signal Integrity',
    title: 'Ferrite Beads',
    level: 'advanced',
    body:
      'A ferrite bead presents increasing impedance with frequency — a modern resistor for noise. Placing one between the analog supply pin and the main rail keeps switching noise out of sensitive circuits.',
    qs: [
      {
        p: 'A ferrite bead filters:',
        c: ['High-frequency noise', 'DC current entirely', 'Only audio', 'Nothing'],
        a: 0,
        e: 'Frequency-dependent lossy impedance.',
      },
    ],
  },
  {
    key: 'pc-pwr-04',
    unit: 'Power & Signal Integrity',
    title: 'Return Path Integrity',
    level: 'advanced',
    body:
      'Every signal needs a return path right beneath it. A slot or split in the ground plane forces the return to detour, enlarging the loop — the number one cause of radiated EMI and ground bounce.',
    qs: [
      {
        p: 'A split ground plane under a fast trace:',
        c: ['Enlarges the return loop and radiates noise', 'Speeds the signal', 'Is required', 'Saves layers'],
        a: 0,
        e: 'The return current takes a long detour.',
      },
    ],
  },
  {
    key: 'pc-pwr-05',
    unit: 'Power & Signal Integrity',
    title: 'Crosstalk Basics',
    level: 'advanced',
    body:
      'Parallel traces couple energy through mutual capacitance/inductance (crosstalk). Aggressors spill into victims. Reduce it with spacing (3× rule), orthogonal routing between layers, and short parallel runs.',
    qs: [
      {
        p: 'Parallel long traces close together suffer:',
        c: ['Crosstalk', 'Lower resistance', 'Bridging legend', 'Clock drift'],
        a: 0,
        e: 'Coupling between neighbors grows with length.',
      },
    ],
  },
  {
    key: 'pc-pwr-06',
    unit: 'Power & Signal Integrity',
    title: 'Input Protection: TVS & PTC',
    level: 'intermediate',
    body:
      'Connector-bound interfaces get TVS diodes (clamp spikes to rails) and PTC fuses (auto-reset on overcurrent). Series resistance plus these parts absorbs ESD and mis-wiring before the MCU sees it.',
    qs: [
      {
        p: 'A TVS diode protects by:',
        c: ['Clamping transients to a safe voltage', 'Storing charge', 'Slowing the clock', 'Filtering audio'],
        a: 0,
        e: 'It conducts spikes away from the rail.',
      },
    ],
  },

  // ── Fabrication
  {
    key: 'pc-mfr-01',
    unit: 'Manufacturing & Assembly',
    title: 'Gerber and Drill Files',
    level: 'intermediate',
    body:
      'The fab needs Gerbers per layer plus drill files (Excellon) and a stackup spec. Include the fabrication notes: solder mask color, surface finish (ENIG vs HASL), copper weight, impedance tables. Incomplete files = delay or wrong boards.',
    qs: [
      {
        p: 'Excellon files carry:',
        c: ['Hole/drill data', 'Solder mask color', 'Component values', 'Firmware hex'],
        a: 0,
        e: 'Gerbers = copper; Excellon = drills.',
      },
    ],
  },
  {
    key: 'pc-mfr-02',
    unit: 'Manufacturing & Assembly',
    title: 'Solder Paste and Reflow',
    level: 'advanced',
    body:
      'Assembly: a stencil puts solder paste on pads, the pick-and-place seats parts, then a reflow oven melts the paste so surface tension aligns everything. Stencil apertures must match pad sizes (paste 1:1 or slightly smaller).',
    qs: [
      {
        p: 'Solder paste is applied through:',
        c: ['A stencil', 'A syringe one pad at a time', 'A brush', 'A laser'],
        a: 0,
        e: 'Stencils deposit paste in one pass.',
      },
    ],
  },
  {
    key: 'pc-mfr-03',
    unit: 'Manufacturing & Assembly',
    title: 'Hand Soldering Basics',
    level: 'basic',
    body:
      'Hand-solder with a temperature-controlled iron, flux, and the right tip: touch pad + lead, feed solder, let it flow to a fillet. Heat the joint, not the parts — 300-350 °C toward the pad, seconds only.',
    qs: [
      {
        p: 'A cold joint looks:',
        c: ['Dull and cracked', 'Bright and shiny', 'Missing entirely', 'Glassy'],
        a: 0,
        e: 'Poor wetting leaves a dull, unreliable joint.',
      },
    ],
  },
  {
    key: 'pc-mfr-04',
    unit: 'Manufacturing & Assembly',
    title: 'Panelization and V-Scores',
    level: 'advanced',
    body:
      'Small boards ship multiple-up on a panel with V-grooves or routed tabs. Panels balance placement and let machine assembly handle many units at once. Depaneling (snap or router) separates them later.',
    qs: [
      {
        p: 'V-grooves allow:',
        c: ['Scoring to snap boards apart', 'More copper layers', 'Smaller holes', 'Faster traces'],
        a: 0,
        e: 'Scored lines split panels cleanly.',
      },
    ],
  },
  {
    key: 'pc-mfr-05',
    unit: 'Manufacturing & Assembly',
    title: 'Surface Finishes',
    level: 'intermediate',
    body:
      'HASL is hot-air-leveled tin-lead (cheap, ok for prototyping); ENIG is nickel-gold (flat pads, fine-pitch and corrosion friendly). Finish affects flatness for BGAs and shelf life. Choose by pitch and environment.',
    qs: [
      {
        p: 'Fine-pitch BGA pads prefer:',
        c: ['Flat ENIG gold', 'Thick HASL', 'Bare copper', 'No finish at all'],
        a: 0,
        e: 'Flatness and solderability for tiny pads.',
      },
    ],
  },

  // ── Testing
  {
    key: 'pc-test-01',
    unit: 'Testing & Rework',
    title: 'Visual and Continuity Checks',
    level: 'basic',
    body:
      'Before powering, inspect bridges, lifted pads, reversed parts, and check power-to-ground resistance (should not be near zero). Continuity-test the supply rails. A short here is cheaper to fix than a burning chip.',
    qs: [
      {
        p: 'The first power-on check is:',
        c: ['No low-impedance short on VCC/GND', 'The LED brightness', 'Antenna tuning', 'Firmware flashing'],
        a: 0,
        e: 'A rail short is lethal before boot.',
      },
    ],
  },
  {
    key: 'pc-test-02',
    unit: 'Testing & Rework',
    title: 'In-Circuit Probe Points',
    level: 'intermediate',
    body:
      'Design test pads for oscilloscope probes: ground stubs near fast signals, dedicated test points for power and key nodes. Probe-friendly boards debug in minutes; probe-hostile boards debug in hours.',
    qs: [
      {
        p: 'Test points are mainly for:',
        c: ['Debug probes and measurements', 'Decorative layout', 'Cheaper fabrication', 'Faster assembly'],
        a: 0,
        e: 'Accessible nodes speed probing.',
      },
    ],
  },
  {
    key: 'pc-test-03',
    unit: 'Testing & Rework',
    title: 'Rework: Desoldering',
    level: 'basic',
    body:
      'Rework removes and replaces parts: hot air for SMD, braid wick for thin joints, soldering stations. A faulty decap nearby a chip is often found by gentle wiggle or reflow. Master removal before replacement.',
    qs: [
      {
        p: 'Hot air is best for removing:',
        c: ['Small SMD packages and components', 'Big connectors only', 'Through-hole bolts', 'Nothing'],
        a: 0,
        e: 'Warm air heats many joints at once.',
      },
    ],
  },
  {
    key: 'pc-test-04',
    unit: 'Testing & Rework',
    title: 'DFM Review',
    level: 'advanced',
    body:
      'Design for manufacturing means the fab can etch, drill, and solder your board first time: minimum trace/spacing/hole sized to production minimums, no acid traps, no orphan copper, good thermal reliefs, clear silkscreen.',
    qs: [
      {
        p: 'DFM aims to:',
        c: ['Make boards manufacturable first pass', 'Add more layers', 'Maximize cost', 'Hide the netlist'],
        a: 0,
        e: 'Production-friendly geometry avoids re-spins.',
      },
    ],
  },
// ── Advanced boards
  {
    key: 'pc-adv-01',
    unit: 'Advanced & Special Boards',
    title: 'Flexible PCBs',
    level: 'advanced',
    body:
      'Flex boards bend and fold to fit tight devices — hinges, wearables, robotics joints. Flex needs acrylic bonding, copper that tolerates bending (rolled annealed), and careful strain relief: fold zones must avoid pads and solder.',
    qs: [
      {
        p: 'Flex PCB advantages include:',
        c: ['Bending to fit, reducing connectors', 'Being stiffer', 'Thicker copper', 'Zero impedance'],
        a: 0,
        e: 'Folds replace wires and connectors.',
      },
    ],
  },
  {
    key: 'pc-adv-02',
    unit: 'Advanced & Special Boards',
    title: 'Blind and Buried Vias',
    level: 'advanced',
    body:
      'Blind vias connect an outer layer to an inner; buried vias join inner layers only. They save routing density on high-layer boards but add drill/lamination steps — cost climbs fast. Sequence for when ordinary vias cannot route.',
    qs: [
      {
        p: 'A blind via spans:',
        c: ['An outer layer to an internal layer', 'Only the two outer skins', 'Nothing', 'Every layer'],
        a: 0,
        e: 'Partial-depth interconnect between layers.',
      },
    ],
  },
  {
    key: 'pc-adv-03',
    unit: 'Advanced & Special Boards',
    title: 'Impedance Control on 2-Layer',
    level: 'advanced',
    body:
      'Without an internal plane, controlled-impedance traces on 2-layer boards run coax/coplanar-style with ground pour fences. It is workable for modest speeds but fragile — the plane layers are what make impedance easy.',
    qs: [
      {
        p: 'Stable impedance needs:',
        c: ['A known dielectric stack and reference plane', 'Random widths', 'Thick copper', 'Luck'],
        a: 0,
        e: 'Signal sees consistent surroundings only with planes.',
      },
    ],
  },
  {
    key: 'pc-adv-04',
    unit: 'Advanced & Special Boards',
    title: 'Panel Design for Yield',
    level: 'advanced',
    body:
      'Board shape, panelization, and process margins decide yields: rounded corners, generous minimums, equal copper balance, and panel rails with fiducials. Every DFM checkbox is a unit the fab does not scrap.',
    qs: [
      {
        p: 'Generous minimum clearances raise:',
        c: ['Manufacturing yield', 'Cost only', 'Trace resistance', 'Noise'],
        a: 0,
        e: 'Wider process windows tolerate variation.',
      },
    ],
  },
  {
    key: 'pc-adv-05',
    unit: 'Advanced & Special Boards',
    title: 'Mixed-Signal Partitioning',
    level: 'advanced',
    body:
      'Route analog and digital on the same board without making them enemies: separate regions, one-point star grounds, keep digital switching away from analog references, and never run digital traces over analog parts.',
    qs: [
      {
        p: 'Mixed-signal layout is best served by:',
        c: ['Partitioning regions with clean ground separation', 'Mixing everything randomly', 'One big pour', 'Shielding with tape'],
        a: 0,
        e: 'Separation contains interference.',
      },
    ],
  },
  {
    key: 'pc-adv-06',
    unit: 'Advanced & Special Boards',
    title: 'Power Sequencing',
    level: 'advanced',
    body:
      'Multi-rail chips define a power-on order; violating it latches or damages pins (rail-to-rail current). Add discharge resistors for rails that must fall, and power monitors to hold reset until every rail is valid.',
    qs: [
      {
        p: 'Power sequencing ensures:',
        c: ['Rails come up in the defined order', 'Shorter traces', 'Quieter clocks', 'More vias'],
        a: 0,
        e: 'Up/down order protects the silicon.',
      },
    ],
  },
  {
    key: 'pc-adv-07',
    unit: 'Advanced & Special Boards',
    title: 'Heatsinking and Copper Pour',
    level: 'advanced',
    body:
      'Exposed-pad packages dump heat into the board; a solid copper pour under them plus thermal vias spreads it. Cooler junctions = longer life and more allowed current. The copper under a power chip is its heatsink.',
    qs: [
      {
        p: 'Thermal vias under an exposed pad:',
        c: ['Carry heat away through the board', 'Carry only signals', 'Add noise', 'Block solder'],
        a: 0,
        e: 'Copper pillars conduct heat to the backside.',
      },
    ],
  },
  {
    key: 'pc-adv-08',
    unit: 'Advanced & Special Boards',
    title: 'Solder Stencil Design',
    level: 'advanced',
    body:
      'Stencil apertures size solder paste: too much paste → bridges and tombstoning; too little → cold joints. Fine-pitch pads may get smaller or split apertures. The stencil is the paste mask — treat it like one.',
    qs: [
      {
        p: 'Oversize stencil apertures cause:',
        c: ['Bridges and tombstoning', 'Cold joints always', 'Faster reflow', 'Cleaner pads'],
        a: 0,
        e: 'Too much paste shorts neighbors.',
      },
    ],
  },
  {
    key: 'pc-adv-09',
    unit: 'Advanced & Special Boards',
    title: 'Fiducials and Alignment',
    level: 'advanced',
    body:
      'Fiducial marks are bare-copper circles the pick-and-place camera locks onto for global and per-panel alignment. Without them, machine placement drifts. Every panel needs them, placed at opposing corners.',
    qs: [
      {
        p: 'Fiducials exist for:',
        c: ['Vision alignment of the machine', 'Impedance control', 'Heat dissipation', 'Decorative symmetry'],
        a: 0,
        e: 'Camera registration anchors placement.',
      },
    ],
  },
  {
    key: 'pc-adv-10',
    unit: 'Advanced & Special Boards',
    title: 'Design Rules Review (DRR)',
    level: 'advanced',
    body:
      'Before ordering, spend an hour re-deriving every constraint from the datasheets: pitch, current, voltage, thermal, impedance, fab capabilities. A found error here costs nothing; the same error after fab costs days.',
    qs: [
      {
        p: 'The cheapest bug to fix is:',
        c: ['One caught before fab', 'One found after reflow', 'One in the field', 'One in the case'],
        a: 0,
        e: 'Board-review mistakes are free to change.',
      },
    ],
  },
];

let cache: GeneratedGroup | null = null;
export function pcb(): GeneratedGroup {
  cache ??= build('pcb', MODULES);
  return cache;
}