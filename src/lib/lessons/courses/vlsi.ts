import type { GeneratedGroup, ModuleSpec } from './presets.js';
import { build } from './presets.js';

const MODULES: ModuleSpec[] = [
  // ── IC Design Flow
  {
    key: 'vl-flow-01',
    unit: 'IC Design Flow',
    title: 'The ASIC Flow',
    level: 'basic',
    body:
      'The ASIC flow: specification → RTL → functional verification → logic synthesis → place & route → physical verification → mask → fab. Each stage feeds the next; late-stage errors are exponentially more expensive to fix.',
    qs: [
      {
        p: 'The correct front-to-back order is:',
        c: ['Spec, RTL, verify, synthesize, place/route', 'Place, RTL, synthesize, spec', 'Fab, RTL, verify', 'Spec, fab, verify'],
        a: 0,
        e: 'Design intent precedes implementation at each step.',
      },
    ],
  },
  {
    key: 'vl-flow-02',
    unit: 'IC Design Flow',
    title: 'RTL vs Gate Level',
    level: 'basic',
    body:
      'RTL (register transfer level) describes what happens per clock cycle — a behavioral contract. Gate level is an actual netlist of logic elements. Synthesis translates RTL into gates; simulation at gate level checks the reality.',
    qs: [
      {
        p: 'RTL describes:',
        c: ['Behavior per clock cycle', 'Physical transistor sizes', 'Mask patterns', 'Bond wires'],
        a: 0,
        e: 'RTL = transfer of data between registers.',
      },
    ],
  },
  {
    key: 'vl-flow-03',
    unit: 'IC Design Flow',
    title: 'Design Constraint Importance',
    level: 'advanced',
    body:
      'Constraints (clock definition, input/output delays, false/regenerated paths) tell the tools what performance means. Lie to the constraints and the tools spend effort in the wrong places. Constraints are half the design.',
    qs: [
      {
        p: 'Without constraints the synthesis tool:',
        c: ['Optimizes without a performance target', 'Fails instantly', 'Skips to fab', 'Adds test logic'],
        a: 0,
        e: 'No target ⇒ arbitrary optimization.',
      },
    ],
  },
  {
    key: 'vl-flow-04',
    unit: 'IC Design Flow',
    title: 'Toolchain Overview',
    level: 'intermediate',
    body:
      'A typical commercial front-end: design compiler (synthesis), Innovus/Icicle (P&R), Vernoin/Primetime (timing), plus simulators. Open source: Yosys (synthesis), GrayWolf/nextpnr (P&R), Simulation like Icarus/Verilator.',
    qs: [
      {
        p: 'Synthesis tool\u2019s core input is:',
        c: ['RTL plus constraints and a library', 'A netlist only', 'A layout', 'Verification tests'],
        a: 0,
        e: 'RTL + library + constraints → gates.',
      },
    ],
  },

  // ── Digital Fdn
  {
    key: 'vl-dig-01',
    unit: 'Digital Foundations for VLSI',
    title: 'CMOS Inverter: The Cell',
    level: 'basic',
    body:
      'The CMOS inverter is a pMOS pull-up and nMOS pull-down: input high turns n on (output low), input low turns p on (output high). Exactly one is on in steady state — the reason CMOS idle power is nearly zero.',
    qs: [
      {
        p: 'In a CMOS inverter with input high:',
        c: ['nMOS on, output low', 'pMOS on, output low', 'Both on', 'Both off'],
        a: 0,
        e: 'n pulls the output to ground.',
      },
    ],
  },
  {
    key: 'vl-dig-02',
    unit: 'Digital Foundations for VLSI',
    title: 'Standard Cells',
    level: 'intermediate',
    body:
      'A standard cell library contains pre-verified functions (NAND, XOR, flop, mux) with known area, delay, and power. P&R places and routes these cells like tiles. Library quality drives circuit quality.',
    qs: [
      {
        p: 'Standard cells provide:',
        c: ['Pre-characterized logic with known timings', 'Only wires', 'Only capacitors', 'Mask data'],
        a: 0,
        e: 'Logic + timing/power abstracts are prepackaged.',
      },
    ],
  },
  {
    key: 'vl-dig-03',
    unit: 'Digital Foundations for VLSI',
    title: 'Propagation Delay',
    level: 'intermediate',
    body:
      'Delay comes from charging load capacitance through the driving resistance: tp ≈ R × C. Wider transistors drive harder but add input capacitance (and area). Speed is a capacitive-fight: more drive vs more load.',
    qs: [
      {
        p: 'Propagation delay in CMOS scales:',
        c: ['With the load capacitance', 'With the clock frequency only', 'With pin count', 'Not at all'],
        a: 0,
        e: 'C × R time constants set the delay.',
      },
    ],
  },
  {
    key: 'vl-dig-04',
    unit: 'Digital Foundations for VLSI',
    title: 'Static vs Dynamic Power',
    level: 'intermediate',
    body:
      'Dynamic power = α C V² f (switching activity × capacitance × voltage² × frequency). Static/leakage power flows even when idle. Lowering voltage squares dynamic power but worsens leakage — the modern power wall.',
    qs: [
      {
        p: 'Dynamic power grows:',
        c: ['With V²', 'Linearly with V only', 'With V⁴', 'Not at all'],
        a: 0,
        e: 'CV²f — voltage dominates the cost.',
      },
    ],
  },
  {
    key: 'vl-dig-05',
    unit: 'Digital Foundations for VLSI',
    title: 'Noise Margins',
    level: 'advanced',
    body:
      'Noise margin is the voltage gap between output and input logic thresholds: NMH and NML. Margins guard against ground-bounce, coupling, and processing variation. Thin margins = marginal chips.',
    qs: [
      {
        p: 'Noise margin measures:',
        c: ['Voltage gap between output and input thresholds', 'Signal fanout', 'Capacitance', 'Clock skew'],
        a: 0,
        e: 'Immunity to injected noise.',
      },
    ],
  },

  // ── HDL
  {
    key: 'vl-hdl-01',
    unit: 'HDL & RTL Coding',
    title: 'Verilog Modules and Ports',
    level: 'basic',
    body:
      'A Verilog module declares inputs/outputs and behavior: `module top(input a, b, output y); assign y = a & b; endmodule`. Ports face the rest of the chip; bodies are inside. Modules are the building blocks of hierarchy.',
    qs: [
      {
        p: 'Verilog module ports connect:',
        c: ['Design blocks to each other', 'Only to testbenches', 'To power rails', 'Only internally'],
        a: 0,
        e: 'Ports are the interface of a block.',
      },
    ],
  },
  {
    key: 'vl-hdl-02',
    unit: 'HDL & RTL Coding',
    title: 'always_ff and always_comb',
    level: 'intermediate',
    body:
      'SystemVerilog separates intent: always_ff @(posedge clk) describes sequential logic; always_comb describes pure combinational. always_ff = flip-flop, always_comb = wire with edges. Mixing them confuses both tools and readers.',
    qs: [
      {
        p: 'always_ff @(posedge clk) implies:',
        c: ['Flip-flop logic', 'Combinational logic', 'Only wires', 'No logic'],
        a: 0,
        e: 'The sensitivity list makes it edge-triggered.',
      },
    ],
  },
  {
    key: 'vl-hdl-03',
    unit: 'HDL & RTL Coding',
    title: 'Registers in RTL',
    level: 'basic',
    body:
      '`logic q; always_ff @(posedge clk) q <= d;` creates a register. Nonblocking assignments (<=) evaluate concurrently, modeling flops correctly. Using blocking (=) in sequential logic spawns races.',
    qs: [
      {
        p: 'Nonblocking (<=) assignments in always_ff model:',
        c: ['Concurrent flip-flop updates', 'Instant wires', 'Combinational logic', 'Timing hazards'],
        a: 0,
        e: 'All rhs read, then lhs update — flop behavior.',
      },
    ],
  },
  {
    key: 'vl-hdl-04',
    unit: 'HDL & RTL Coding',
    title: 'Parameters and Generate',
    level: 'intermediate',
    body:
      'Parameters make modules reusable: `parameter W = 8;` changes width per instance. generate loops replicate logic for width-scalable datapaths. Both cut duplicated code down to one module source.',
    qs: [
      {
        p: 'Parameters allow:',
        c: ['One module instantiated at different sizes', 'Only two modules ever', 'Fixed widths', 'Nothing'],
        a: 0,
        e: 'Parameterize width/time/etc per instance.',
      },
    ],
  },
  {
    key: 'vl-hdl-05',
    unit: 'HDL & RTL Coding',
    title: 'FSM Coding Style',
    level: 'intermediate',
    body:
      'Classic 3-process or 2-process FSM: sequential state register + combinational next-state/output. Encode states with localparam; avoid latches by assigning defaults in the comb block.',
    qs: [
      {
        p: 'A two-process FSM separates:',
        c: ['State register from next-state/output logic', 'Clock from reset', 'Verification from RTL', 'Two clocks'],
        a: 0,
        e: 'Sequential + comb blocks separated cleanly.',
      },
    ],
  },
  {
    key: 'vl-hdl-06',
    unit: 'HDL & RTL Coding',
    title: 'Latches You Did Not Ask For',
    level: 'intermediate',
    body:
      'If a combinational always_comb omits an assignment on some path, the synthesis tool infers a latch — memory you never wanted. Complete all assignments (defaults first) or a spooky latch hides in the gate list.',
    qs: [
      {
        p: 'A missing assignment in always_comb causes:',
        c: ['An unintended latch', 'A flip-flop', 'A short circuit', 'Nothing'],
        a: 0,
        e: 'Incomplete assignments signal "hold value".',
      },
    ],
  },
  {
    key: 'vl-hdl-07',
    unit: 'HDL & RTL Coding',
    title: 'Testbench Building Blocks',
    level: 'basic',
    body:
      'A testbench is Verilog that is not synthesizable: instantiate the DUT, generate clocks/resets, drive stimuli with delays, check outputs with assertions. `$display` prints; `$finish` ends simulation.',
    qs: [
      {
        p: 'A testbench\u2019s role is to:',
        c: ['Verify the design by simulation', 'Become the silicon', 'Generate masks', 'Drive a camera'],
        a: 0,
        e: 'Stimulus + checks around the DUT.',
      },
    ],
  },
  {
    key: 'vl-hdl-08',
    unit: 'HDL & RTL Coding',
    title: 'Synthesis vs Simulation Mismatch',
    level: 'advanced',
    body:
      'Simulation can pass while synthesis builds something different — because of latches, incomplete sensitivity lists, variable delays, or non-synthesizable constructs (# delays, initial). Constrain RTL to synthesizable constructs and simulate what you will actually synthesize.',
    qs: [
      {
        p: 'Simulation-only constructs like # delays:',
        c: ['Are ignored by synthesis', 'Make silicon faster', 'Map to resistors', 'Become flip-flops'],
        a: 0,
        e: 'Synthesis tools reject or skip them.',
      },
    ],
  },

  // ── Microarchitecture
  {
    key: 'vl-arch-01',
    unit: 'Microarchitecture',
    title: 'Architecture vs Microarchitecture',
    level: 'intermediate',
    body:
      'Architecture is what software sees (ISA: instructions, registers). Microarchitecture is how it is built inside (pipeline stages, forwarding, caches, branch prediction). Same ISA, radically different microarchitectures.',
    qs: [
      {
        p: 'The ISA is:',
        c: ['The programmer-visible interface', 'The physical layout', 'The clock tree', 'The package'],
        a: 0,
        e: 'Software contract; the micro-arch is internal.',
      },
    ],
  },
  {
    key: 'vl-arch-02',
    unit: 'Microarchitecture',
    title: 'Pipeline Stages',
    level: 'intermediate',
    body:
      'A classic RISC pipeline: fetch → decode → execute → memory → writeback, with registers between stages. Instruction throughput rises (1 per cycle) but hazards appear: each stage adds cycles of latency.',
    qs: [
      {
        p: 'Pipelining improves:',
        c: ['Throughput', 'Per-instruction latency always', 'Cache size', 'Clock phases'],
        a: 0,
        e: 'More instructions complete per clock overall.',
      },
    ],
  },
  {
    key: 'vl-arch-03',
    unit: 'Microarchitecture',
    title: 'Data and Control Hazards',
    level: 'advanced',
    body:
      'Data hazards: an instruction needs a value the previous one is still producing. Control hazards hit at branches (pipeline fills with wrong-path work). Fixes: forwarding, stalling, and branch prediction.',
    qs: [
      {
        p: 'Forwarding resolves data hazards by:',
        c: ['Feeding a result before writeback', 'Inserting NOPs', 'Flushing everything', 'Double-clocking'],
        a: 0,
        e: 'Shortcut the result to the consumer early.',
      },
    ],
  },
  {
    key: 'vl-arch-04',
    unit: 'Microarchitecture',
    title: 'Caches: Why They Work',
    level: 'intermediate',
    body:
      'Caches exploit locality: recently-accessed memory (temporal) and nearby addresses (spatial) are likely reused. A cache line fetches a chunk, so misses cost a line, not a byte. Hit rate drives effective speed.',
    qs: [
      {
        p: 'Spatial locality means:',
        c: ['Nearby addresses are likely used soon', 'Data is random', 'All data is RAM', 'The cache is huge'],
        a: 0,
        e: 'Programs walk memory sequentially — fetch blocks.',
      },
    ],
  },
  {
    key: 'vl-arch-05',
    unit: 'Microarchitecture',
    title: 'Cache Miss Types',
    level: 'advanced',
    body:
      'The 3 Cs: compulsory (first touch), capacity (working set too big), conflict (addresses collide in the same set). Time-multiplexing associativity fights conflicts; larger caches fight capacity. A perfectly regular access pattern never misses twice.',
    qs: [
      {
        p: 'The compulsory miss happens:',
        c: ['On first ever access to a line', 'Always after a hit', 'On eviction only', 'Never'],
        a: 0,
        e: 'The cold start of every line.',
      },
    ],
  },
  {
    key: 'vl-arch-06',
    unit: 'Microarchitecture',
    title: 'Branch Prediction',
    level: 'advanced',
    body:
      'Branches break throughput; predictors guess the outcome so the pipeline never stalls. Simple 2-bit saturating counters predict with hysteresis; modern predictors track history (TAGE). Wrong guesses cost a flush.',
    qs: [
      {
        p: 'Branch predictors exist to:',
        c: ['Keep the pipeline filled', 'Count loops', 'Replace caches', 'Score instructions'],
        a: 0,
        e: 'Predict and fetch without waiting.',
      },
    ],
  },

  // ── Verification
  {
    key: 'vl-ver-01',
    unit: 'Verification',
    title: 'Why Verification Is Half the Effort',
    level: 'basic',
    body:
      'Chip re-spins cost millions and months; a mask error found in silicon is catastrophic. Verification teams typically outnumber RTL designers. "The chip is only as correct as its tests prove."',
    qs: [
      {
        p: 'Verification\u2019s main value is:',
        c: ['Catching bugs before tapeout', 'Reducing mask cost', 'Speeding RTL', 'Decorative checks'],
        a: 0,
        e: 'Early detection avoids million-dollar re-spins.',
      },
    ],
  },
  {
    key: 'vl-ver-02',
    unit: 'Verification',
    title: 'Functional Simulation',
    level: 'basic',
    body:
      'Simulation executes the model in software: fast iteration on behavior, no timing noise. It is the workhorse of unit-level verification. Event-driven simulators process RTL signals per delta cycle.',
    qs: [
      {
        p: 'Simulation runs the design:',
        c: ['In software, cycle by cycle', 'On real silicon', 'In hardware', 'In the fab'],
        a: 0,
        e: 'Software event simulation of the model.',
      },
    ],
  },
  {
    key: 'vl-ver-03',
    unit: 'Verification',
    title: 'Assertions',
    level: 'advanced',
    body:
      'Assertions are Boolean contracts: `assert property (@(posedge clk) req |=> ##1 ack);`. They monitor behavior continuously and report failures instantly, catching bugs directed testbenches miss.',
    qs: [
      {
        p: 'SVA assertions mainly:',
        c: ['Continuously monitor protocol behavior', 'Replace the clock', 'Synthesize logic', 'Speed up sim'],
        a: 0,
        e: 'They are monitors that flag violations.',
      },
    ],
  },
  {
    key: 'vl-ver-04',
    unit: 'Verification',
    title: 'Coverage-Driven Verification',
    level: 'advanced',
    body:
      'Coverage asks "did we test it?": line/branch/toggle/FSM-state coverage and functional coverage of interesting scenarios. Aim for the coverage the design cares about; 100% line coverage on boring code is theater.',
    qs: [
      {
        p: 'Coverage metrics answer:',
        c: ['What part of the design was exercised', 'How fast it runs', 'Its power', 'Its area'],
        a: 0,
        e: 'Measure of the test quality, not the design.',
      },
    ],
  },
  {
    key: 'vl-ver-05',
    unit: 'Verification',
    title: 'UVM Basics',
    level: 'advanced',
    body:
      'UVM (Universal Verification Methodology) structures verification: test → environment → agents → sequences → driver/monitor/scoreboard. Standardized structure, random stimulus, end-to-end. Big chips run UVM testbenches for months.',
    qs: [
      {
        p: 'UVM drives stimulus through:',
        c: ['Sequences and DRIVERs to the DUT', 'Direct register writes only', 'Random mask blobs', 'Files'],
        a: 0,
        e: 'Layered, reusable stimulus architecture.',
      },
    ],
  },
  {
    key: 'vl-ver-06',
    unit: 'Verification',
    title: 'Formal Verification',
    level: 'advanced',
    body:
      'Formal verification mathematically proves properties hold for all input sequences — no simulation exhaustiveness limit. Great for control logic and protocol properties; hard on huge datapaths. Exhaustive proof vs endless sampling.',
    qs: [
      {
        p: 'Formal proves a property for:',
        c: ['All possible inputs', 'A random subset', 'One test', 'The clock only'],
        a: 0,
        e: 'Math exhaustiveness over the state space.',
      },
    ],
  },
  {
    key: 'vl-ver-07',
    unit: 'Verification',
    title: 'Gate-Level Simulation',
    level: 'advanced',
    body:
      'After synthesis, simulate the netlist back-annotated with delays: gate-level sim exposes timing races, glitches, and structural errors invisible in RTL. Slower and uglier, but it is the reality check before the tapeout.',
    qs: [
      {
        p: 'Gate-level simulation verifies:',
        c: ['The timing/layout-annotated real netlist', 'Only RTL behavior', 'The mask cost', 'Nothing'],
        a: 0,
        e: 'True structure + delays, closer to silicon.',
      },
    ],
  },

  // ── Synthesis & P&R
  {
    key: 'vl-syn-01',
    unit: 'Synthesis & Implementation',
    title: 'Logic Synthesis in One Idea',
    level: 'intermediate',
    body:
      'Synthesis compiles RTL into logic, optimizes with Boolean algebra, and maps it onto the library cells. It respects your constraints: meet the target clock while minimizing area and power. The result is still just gates.',
    qs: [
      {
        p: 'Synthesis maps RTL to:',
        c: ['Library cells via boolean optimization', 'Transistor layout directly', 'Verification', 'Wires'],
        a: 0,
        e: 'RTL → logic → library-gated netlist.',
      },
    ],
  },
  {
    key: 'vl-syn-02',
    unit: 'Synthesis & Implementation',
    title: 'Timing-Driven Synthesis',
    level: 'advanced',
    body:
      'Synthesis optimizes the critical path: the longest path between flops decides the fastest clock (Fmax = 1/Tcritical). Tools budget delays across the netlist and resize/restructure gates on the slowest path first.',
    qs: [
      {
        p: 'The critical path determines:',
        c: ['The maximum clock frequency', 'The pin count', 'The power rail', 'The die size'],
        a: 0,
        e: 'Longest path sets minimum cycle time.',
      },
    ],
  },
  {
    key: 'vl-syn-03',
    unit: 'Synthesis & Implementation',
    title: 'Floorplanning',
    level: 'advanced',
    body:
      'Placement begins with a floorplan: assign macro blocks, RAM, IO, and hard IP to regions, build the power grid. Good floorplan = short critical wires; bad floorplan = a routed disaster. Rearranged late = everything redoes.',
    qs: [
      {
        p: 'A floorplan arranges:',
        c: ['Macros, RAM, and IO regions before cell placement', 'Only transparent cells', 'The package pins', 'The PCB'],
        a: 0,
        e: 'High-level block positioning guides the rest.',
      },
    ],
  },
  {
    key: 'vl-syn-04',
    unit: 'Synthesis & Implementation',
    title: 'Clock Tree Synthesis',
    level: 'advanced',
    body:
      'CTS builds balanced buffers so the clock reaches every flip-flop at nearly the same time (skew ~tens of ps). Unbalanced trees create wrong captures. Buffering the clock is a huge fraction of chip power.',
    qs: [
      {
        p: 'Clock tree synthesis balances:',
        c: ['Clock arrival at every flip-flop', 'Data path lengths', 'Pin currents', 'Memory sizes'],
        a: 0,
        e: 'Balanced delivery reduces skew.',
      },
    ],
  },
  {
    key: 'vl-syn-05',
    unit: 'Synthesis & Implementation',
    title: 'Routing',
    level: 'advanced',
    body:
      'Routing wires every cell pin through metal layers: global routing assigns channels, detailed routing draws exact tracks. Route congestion in one region stalls everything; routers detour into nearby lanes.',
    qs: [
      {
        p: 'Routing connects:',
        c: ['Cell pins via metal tracks', 'Only power pins', 'The package', 'The mask writer'],
        a: 0,
        e: 'Metal wires link the placed cells.',
      },
    ],
  },
  {
    key: 'vl-syn-06',
    unit: 'Synthesis & Implementation',
    title: 'DRC and LVS',
    level: 'advanced',
    body:
      'Physical verification: DRC (design rules: widths, spacings, enclosures) and LVS (layout vs schematic: does the geometry really match my netlist?). Violations = fab rejects or silent chip failure. Clean DRC/LVS before signoff.',
    qs: [
      {
        p: 'LVS checks:',
        c: ['The layout matches the intended netlist', 'Only widths', 'The clock tree', 'Package cost'],
        a: 0,
        e: 'Geometry extracted must equal logic intent.',
      },
    ],
  },
  {
    key: 'vl-syn-07',
    unit: 'Synthesis & Implementation',
    title: 'Antenna Effect',
    level: 'advanced',
    body:
      'During plasma etching, a long metal wire acts like an antenna: accumulating charge that can punch the thin gate oxide. Antenna rules limit wire-per diffusion connection and add diodes/jumpers — a process-induced design rule.',
    qs: [
      {
        p: 'The antenna effect risks:',
        c: ['Damage to gate oxide during fab', 'Slower clocks', 'More power', 'More pins'],
        a: 0,
        e: 'Charge collects on long wires, harming gates.',
      },
    ],
  },

  // ── Timing
  {
    key: 'vl-tmg-01',
    unit: 'Timing Analysis',
    title: 'Setup and Hold Again',
    level: 'intermediate',
    body:
      'Setup: data must arrive before the clock edge by the setup time. Hold: data must stay stable after the edge by the hold time. Timing analysis checks every launch-capture flop pair across all paths.',
    qs: [
      {
        p: 'Setup failure at a flip-flop happens when:',
        c: ['Data arrives too late before the edge', 'Data wiggles after the edge only', 'The clock never runs', 'Power is low'],
        a: 0,
        e: 'Late data cannot be captured reliably.',
      },
    ],
  },
  {
    key: 'vl-tmg-02',
    unit: 'Timing Analysis',
    title: 'Combinational Path Timing',
    level: 'intermediate',
    body:
      'Path delay = clock-to-Q + combinational delay + setup. The tool sums the worst-case over cells and wires, checking it against the clock period. Margins (slack) tell you how much room you have.',
    qs: [
      {
        p: 'Negative slack means:',
        c: ['The path violates the timing target', 'The path is fast', 'Extra margin exists', 'No path exists'],
        a: 0,
        e: 'The delay exceeds the allowed window.',
      },
    ],
  },
  {
    key: 'vl-tmg-03',
    unit: 'Timing Analysis',
    title: 'Clock Skew',
    level: 'advanced',
    body:
      'Clock skew: different flip-flops see the edge at different times (routing, CTS imbalance). Skew can actually help setup (allow more time) but can break hold — the classic race condition.',
    qs: [
      {
        p: 'Beneficial skew can:',
        c: ['Help setup but risk hold', 'Always speed chips up', 'Remove wires', 'Add flops'],
        a: 0,
        e: 'Arrival offsets trade setup for hold margins.',
      },
    ],
  },
  {
    key: 'vl-tmg-04',
    unit: 'Timing Analysis',
    title: 'Clock Gating',
    level: 'intermediate',
    body:
      'When logic is idle, gate its clock off instead of toggling every flop: an AND of enable and clock with an integrated latch to avoid glitches. Clock gating is the single biggest dynamic power lever.',
    qs: [
      {
        p: 'Clock gating cuts power by:',
        c: ['Stopping idle block clocks', 'Lowering voltage', 'Shrinking transistors', 'Cooling the die'],
        a: 0,
        e: 'No toggling → no dynamic power in idle.',
      },
    ],
  },
  {
    key: 'vl-tmg-05',
    unit: 'Timing Analysis',
    title: 'Clock Domain Crossing',
    level: 'advanced',
    body:
      'Signals crossing between independent clocks need synchronizers: without them, metastability crops up. A two-flop synchronizer gives the value a full cycle to settle. Every CDC boundary is a design risk to sign.',
    qs: [
      {
        p: 'CDC signals are made safe by:',
        c: ['Synchronizers / handshake structures', 'Stronger pull-ups', 'Longer wires', 'More clocks'],
        a: 0,
        e: 'Metastable values need time to settle.',
      },
    ],
  },
  {
    key: 'vl-tmg-06',
    unit: 'Timing Analysis',
    title: 'Ocv and Margins',
    level: 'advanced',
    body:
      'On-chip variation (OCV): neighboring transistors are not identical (voltage, temperature, process gradients). STA adds derates to launch vs capture paths so the "equal" worst cases still check out. Margin = reality vs paper.',
    qs: [
      {
        p: 'OCV accounts for:',
        c: ['Manufacturing variation between nearby cells', 'Clock jitter only', 'Battery aging', 'Pin corrosion'],
        a: 0,
        e: 'Local process differences are modeled as derates.',
      },
    ],
  },
  {
    key: 'vl-tmg-07',
    unit: 'Timing Analysis',
    title: 'Timing Signoff',
    level: 'advanced',
    body:
      'Signoff: STA over all corners (process/voltage/temp) plus parasitic extraction and EM/IR checks. The signoff flow is the contract with the foundry: declare the chip works at these corners. Ship it wrong here and the mask is wrong.',
    qs: [
      {
        p: 'Timing signoff runs over:',
        c: ['Multiple process/voltage/temperature corners', 'One bench setting', 'The package only', 'Cheap simulators'],
        a: 0,
        e: 'Worst-case corners guarantee yield across fab.',
      },
    ],
  },

  // ── Physical
  {
    key: 'vl-phy-01',
    unit: 'Physical & Process Aspects',
    title: 'IR Drop and EM',
    level: 'advanced',
    body:
      'Power delivery has resistance: current through the grid drops voltage (IR drop) and stresses wires (electromigration, EM). Signoff checks Vmin at the cell and current density constraints in metals if the grid is too thin.',
    qs: [
      {
        p: 'IR drop causes:',
        c: ['Local voltage sag at cells', 'Faster clocks', 'Fewer pins', 'More memory'],
        a: 0,
        e: 'Grid resistance steals rail voltage.',
      },
    ],
  },
  {
    key: 'vl-phy-02',
    unit: 'Physical & Process Aspects',
    title: 'Parasitic Capacitance and Resistance',
    level: 'intermediate',
    body:
      'Every wire has resistance and capacitance to neighbors (RC). Delays that were logic-only in RTL balloon with wire RC — especially in long routes, where RC delay dominates gate delay.',
    qs: [
      {
        p: 'Wire parasitics mainly add:',
        c: ['Delay that grows with length', 'Nothing at all', 'Voltage gain', 'Logic functions'],
        a: 0,
        e: 'Long wires are slow RC lines.',
      },
    ],
  },
  {
    key: 'vl-phy-03',
    unit: 'Physical & Process Aspects',
    title: 'Multiple Threshold Cells',
    level: 'advanced',
    body:
      'Libraries ship high-VT (low-leak) and low-VT (fast but leaky) cells. Synthesis uses the mix: low-VT only on critical paths, high-VT elsewhere. The same function, tuned for speed vs idle power.',
    qs: [
      {
        p: 'Low-VT cells trade:',
        c: ['Speed for leakage', 'Leakage for area', 'Area for speed only', 'Nothing'],
        a: 0,
        e: 'Faster switching costs idle leakage.',
      },
    ],
  },
  {
    key: 'vl-phy-04',
    unit: 'Physical & Process Aspects',
    title: 'Multi-Die and Chiplets',
    level: 'advanced',
    body:
      'Beyond a reticle limit and yield economics, same-die is not always best: chiplets bond multiple dies side by side in one package — smaller, better yielded, cheaper. Interconnect between dies (uBumps, silicon bridges) becomes the new challenge.',
    qs: [
      {
        p: 'Chiplets exist because:',
        c: ['Big dies are costly and low-yield', 'Wires are faster', 'Software needs it', 'The fab prefers it'],
        a: 0,
        e: 'Smaller dies yield better; packaging reunites them.',
      },
    ],
  },
  {
    key: 'vl-phy-05',
    unit: 'Physical & Process Aspects',
    title: 'Pad Ring and ESD',
    level: 'intermediate',
    body:
      'The chip\u2019s I/O pad ring carries electrostatic-discharge (ESD) protection: clamps between pad and rails shunt human/machine static before it reaches gate oxides. No ESD protection = every touch kills the chip.',
    qs: [
      {
        p: 'ESD clamps at pads protect:',
        c: ['Thin gate oxides from static discharge', 'The package pins', 'The PCB traces', 'The battery'],
        a: 0,
        e: 'Divert static away from the transistors.',
      },
    ],
  },
  {
    key: 'vl-phy-06',
    unit: 'Physical & Process Aspects',
    title: 'Testing vs Verification',
    level: 'intermediate',
    body:
      'Verification proves the design is correct; testing checks the manufactured chip actually matches (fabrication defects). Test patterns run through scan chains on every chip. You cannot "debug" a bad fab — you screen it out.',
    qs: [
      {
        p: 'Chip testing primarily detects:',
        c: ['Manufacturing defects', 'RTL bugs', 'Specification changes', 'Software bugs'],
        a: 0,
        e: 'Each die is screened for physical faults.',
      },
    ],
  },
  {
    key: 'vl-phy-07',
    unit: 'Physical & Process Aspects',
    title: 'Scan Chains',
    level: 'advanced',
    body:
      'DFT replaces flops with scan flops chainable into a scan register: shift test patterns in, capture one cycle, shift results out. Scan makes every chip\u2019s internals observable and controllable — the engine of test.',
    qs: [
      {
        p: 'Scan chains enable:',
        c: ['Shifting test patterns through all flops', 'Faster boot', 'Lower power', 'Smaller dies'],
        a: 0,
        e: 'Serial access to internal state for testing.',
      },
    ],
  },
  {
    key: 'vl-phy-08',
    unit: 'Physical & Process Aspects',
    title: 'Fault Models',
    level: 'advanced',
    body:
      'The stuck-at fault model pretends defects show up as wires stuck to 0 or 1 — simple and covers most opens/shorts. Transition/at-speed tests catch delay faults. Test coverage % = how many modeled faults the patterns detect.',
    qs: [
      {
        p: 'The stuck-at model represents:',
        c: ['Wires stuck to a fixed logic level', 'Shrunk transistors', 'Clock glitches', 'Software typos'],
        a: 0,
        e: 'A simple, useful abstraction of defects.',
      },
    ],
  },
// ── Memories and analog-adjacent blocks
  {
    key: 'vl-mem-01',
    unit: 'Memories & Special Blocks',
    title: 'SRAM 6T Cell',
    level: 'intermediate',
    body:
      'The 6-transistor SRAM cell cross-couples two inverters and uses two pass transistors for read/write. Writes are fought and reads are fragile: the bitline must not flip the stored bit. Cell design is a delicate transistor-sizing puzzle.',
    qs: [
      {
        p: 'An SRAM cell stores a bit in:',
        c: ['A cross-coupled inverter pair', 'A capacitor', 'A fuse', 'An inductor'],
        a: 0,
        e: 'Positive feedback holds the value statically.',
      },
    ],
  },
  {
    key: 'vl-mem-02',
    unit: 'Memories & Special Blocks',
    title: 'DRAM Refresh Logic',
    level: 'intermediate',
    body:
      'DRAM capacitors leak, so row refresh (activate + rewrite) runs on a schedule — every few ms per row. Refresh steals bandwidth and power. Design centers on keeping cells alive amid row hammer and disturb.',
    qs: [
      {
        p: 'DRAM needs refresh because:',
        c: ['Its cells leak charge', 'It is magnetic', 'It overheats', 'It is cheap'],
        a: 0,
        e: 'Stored charge decays between refreshes.',
      },
    ],
  },
  {
    key: 'vl-mem-03',
    unit: 'Memories & Special Blocks',
    title: 'Content-Addressable Memory',
    level: 'advanced',
    body:
      'CAM compares all entries against the query in parallel and returns the match address — associative lookup in one cycle. Used in routing tables, TLBs, and caches. Parallel comparison costs a transistor wall compared to RAM.',
    qs: [
      {
        p: 'CAM searches:',
        c: ['All entries in parallel for a match', 'Sequentially with a loop', 'Only exact RAM reads', 'Nothing'],
        a: 0,
        e: 'Associative parallel match = one cycle.',
      },
    ],
  },
  {
    key: 'vl-mem-04',
    unit: 'Memories & Special Blocks',
    title: 'Sigma-Delta ADC',
    level: 'advanced',
    body:
      'A sigma-delta ADC oversamples at a high rate, noise-shapes quantization error away from the band of interest, and decimates to a precise, slower result. Audio and instrumentation ADCs live on this — 16-24 bits at low bandwidth.',
    qs: [
      {
        p: 'Sigma-delta ADCs get high resolution from:',
        c: ['Oversampling and noise shaping', 'Bigger transistors', 'Faster clocks always', 'Parallel cells'],
        a: 0,
        e: 'Trade sample rate for in-band precision.',
      },
    ],
  },
  {
    key: 'vl-mem-05',
    unit: 'Memories & Special Blocks',
    title: 'DAC Topologies',
    level: 'advanced',
    body:
      'DACs map digital to voltage: resistor strings (monotonic, big), R-2R ladders (compact), current-steering (fast, high-spec), and sigma-delta (audio). Output buffering and glitch energy decide real performance.',
    qs: [
      {
        p: 'R-2R ladders are popular because they:',
        c: ['Use only two resistor values', 'Use three values', 'Skip resistors', 'Need inductors'],
        a: 0,
        e: 'Two values scale and sum with one topology.',
      },
    ],
  },
  {
    key: 'vl-mem-06',
    unit: 'Memories & Special Blocks',
    title: 'SAR ADC',
    level: 'intermediate',
    body:
      'A successive-approximation ADC tries bits one at a time with one comparator and a DAC: 12 bits, 12 steps. Balanced speed/power/area — the default MCU ADC. Speed is limited by DAC settling and comparator noise.',
    qs: [
      {
        p: 'SAR ADCs decide bits:',
        c: ['One at a time from MSB down', 'All in parallel', 'Randomly', 'Never'],
        a: 0,
        e: 'Bitwise binary search against the DAC.',
      },
    ],
  },
  {
    key: 'vl-mem-07',
    unit: 'Memories & Special Blocks',
    title: 'On-Chip LDO Regulators',
    level: 'advanced',
    body:
      'Chips often run an internal low-dropout regulator to clean and split supplies: bandgap reference, error amp, pass device. The PSRR and stability (ESR) recipe is subtle. Digital and analog blocks share one die but need clean rails.',
    qs: [
      {
        p: 'On-die LDOs mainly:',
        c: ['Regulate and filter internal supplies', 'Drive speakers', 'Add memory', 'Replace clocks'],
        a: 0,
        e: 'Clean internal rails partition noise.',
      },
    ],
  },
  {
    key: 'vl-mem-08',
    unit: 'Memories & Special Blocks',
    title: 'Sense Amplifiers',
    level: 'advanced',
    body:
      'Reading DRAM/SRAM, the bitline moves only millivolts; a sense amplifier regenerates that to full logic rails. It is an analog kick amplifier at the heart of every memory. Imbalance and offset are trimmed to work at the margin.',
    qs: [
      {
        p: 'Sense amplifiers:',
        c: ['Turn a tiny bitline swing into full logic', 'Store a bit statically', 'Count clocks', 'Drive the pads'],
        a: 0,
        e: 'Regeneration of the millivolt signal.',
      },
    ],
  },
  {
    key: 'vl-mem-09',
    unit: 'Memories & Special Blocks',
    title: 'DLL vs PLL on Chip',
    level: 'advanced',
    body:
      'A DLL aligns clock phases with a delay line (no frequency change); a PLL multiplies frequency. DDR read/write timing uses DLLs to center data; CPUs and transceivers use PLLs to generate high-speed clocks. Pick by need.',
    qs: [
      {
        p: 'A DLL adjusts:',
        c: ['Clock phase, not frequency', 'Frequency only', 'Voltage', 'Nothing'],
        a: 0,
        e: 'Aligns edges for data timing.',
      },
    ],
  },
  {
    key: 'vl-mem-10',
    unit: 'Memories & Special Blocks',
    title: 'Clock Dividers and Counters',
    level: 'intermediate',
    body:
      'Divide a clock by N with ripple dividers (simple, skewy) or synchronous counters (clean). Integer-only division forces fractional-N PLLs for odd ratios. Dividers are the plumbing that feeds every peripheral clock.',
    qs: [
      {
        p: 'Synchronous counters divide clocks:',
        c: ['With all flops ticking together', 'Cascade-style with skew', 'Never', 'Only by even N'],
        a: 0,
        e: 'One clock edges all stages in step.',
      },
    ],
  },

  // ── Frontier topics
  {
    key: 'vl-fut-01',
    unit: 'Frontier & Careers',
    title: 'Approximate Computing',
    level: 'advanced',
    body:
      'Some workloads tolerate slightly wrong answers (ML, images, search): skip precision, drop insignificant inputs, or use inexact units to save power/area. Error bounds are the design artifact — decide how wrong is too wrong.',
    qs: [
      {
        p: 'Approximate computing trades:',
        c: ['Accuracy for savings where tolerated', 'Speed for exactness', 'Nothing', 'Security for power'],
        a: 0,
        e: 'Acceptable-error workloads save resources.',
      },
    ],
  },
  {
    key: 'vl-fut-02',
    unit: 'Frontier & Careers',
    title: 'In-Memory Computing',
    level: 'advanced',
    body:
      'Classic von-Neumann moves data to the ALU; that data movement dominates energy. In-memory computing performs math where the data sits (analog dot-products in arrays, digital-logic-in-memory) — a promising ML energy play.',
    qs: [
      {
        p: 'In-memory computing reduces:',
        c: ['Data movement energy', 'Error rates', 'The clock', 'Transistors'],
        a: 0,
        e: 'Compute near the array, not across the bus.',
      },
    ],
  },
  {
    key: 'vl-fut-03',
    unit: 'Frontier & Careers',
    title: 'Silicon Photonics',
    level: 'advanced',
    body:
      'Photonic chips route light in waveguides: lasers, modulators, and detectors on silicon. Data centers already use them for interconnect; the promise is board-and-chip level optics. Thermal and packaging problems are being solved.',
    qs: [
      {
        p: 'Silicon photonics moves data using:',
        c: ['Light in on-chip waveguides', 'Electrons exclusively', 'Radio links', 'Acoustic waves'],
        a: 0,
        e: 'Optical signaling on the die/packaging.',
      },
    ],
  },
  {
    key: 'vl-fut-04',
    unit: 'Frontier & Careers',
    title: 'Dark Silicon',
    level: 'advanced',
    body:
      'With power limits, only a fraction of a chip\u2019s transistors can run at full speed at once — the rest must stay cool ("dark"). Result: heterogeneous cores, power-gating, and the end of naive clock scaling.',
    qs: [
      {
        p: 'Dark silicon means:',
        c: ['Parts cannot run simultaneously under the power budget', 'Black colored dies', 'No heatsinks', 'Broken LEDs'],
        a: 0,
        e: 'Power wall sleeps some silicon at any time.',
      },
    ],
  },
  {
    key: 'vl-fut-05',
    unit: 'Frontier & Careers',
    title: 'Perpetual Microcontrollers',
    level: 'advanced',
    body:
      'Energy-harvesting MCUs run on milliwatts of scavenged power (solar, RF, vibration) with power-micromanaging state machines. Every cycle counts and sleep is the default. The design skill: amortize idle power to near zero.',
    qs: [
      {
        p: 'Harvesting MCUs are built for:',
        c: ['Micro-ampere average operation', 'Megawatt outputs', 'Overclocking', 'Only USB plugs'],
        a: 0,
        e: 'Tiny harvested energy forces extreme frugality.',
      },
    ],
  },
  {
    key: 'vl-fut-06',
    unit: 'Frontier & Careers',
    title: 'Open-Source Silicon',
    level: 'intermediate',
    body:
      'The open PDK (SkyWater 130, GF 180) plus tools (Yosys, OpenLane) let anyone tape out a real chip; tiny-tapeout shuttles run community designs. Skills you learn with open tools transfer to commercial flows.',
    qs: [
      {
        p: 'Open PDKs enable:',
        c: ['Fab access and EDA tools for anyone', 'Only software', 'Free unmask access', 'Cloud GPUs'],
        a: 0,
        e: 'Community silicon runs on open chiplets.',
      },
    ],
  },
  {
    key: 'vl-fut-07',
    unit: 'Frontier & Careers',
    title: 'Design Roles in Chips',
    level: 'basic',
    body:
      'Chip teams split into roles: RTL designers (architecture in code), verification engineers (prove it), physical design (layout/signoff), DFT (testability), and CAD (tooling). Most teams are verification-heavy for good reason.',
    qs: [
      {
        p: 'The most numerous role on a modern chip project is usually:',
        c: ['Verification', 'Layout drafting', 'Marketing', 'Procurement'],
        a: 0,
        e: 'Proof-of-correctness needs the headcount.',
      },
    ],
  },
  {
    key: 'vl-fut-08',
    unit: 'Frontier & Careers',
    title: 'Portfolio From Your Desk',
    level: 'intermediate',
    body:
      'You can learn VLSI without a fab: write RTL, verify with unit/formal tools, synthesize with open tools, and even tape out through shuttle programs. A working project beats any certificate.',
    qs: [
      {
        p: 'Learning VLSI at home is feasible via:',
        c: ['Open tools plus shuttle tapeouts', 'Buying a foundry', 'Reading only', 'Video game emulators'],
        a: 0,
        e: 'Real tools run on real (subsidized) silicon.',
      },
    ],
  },
];

let cache: GeneratedGroup | null = null;
export function vlsi(): GeneratedGroup {
  cache ??= build('vlsi', MODULES);
  return cache;
}