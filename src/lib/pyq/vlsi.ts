import type { QuestionGen } from './gen.js';
import { fmt, int, mc, pick } from './gen.js';

const GENS: QuestionGen[] = [
  // ── Verilog HDL ──────────────────────────────────────────
  {
    subject: 'Verilog HDL',
    make: ({ rng }) =>
      pick(rng, [
        {
          prompt: 'In Verilog, a signal declared as `reg` is best described as:',
          choices: ['A variable that stores a value across procedural assignments', 'A continuous-drive net like a wire', 'A physical register in the silicon', 'A module port of output type only'],
          answer: 0,
          aiExplanation: '`reg` is a variable that remembers a value assigned in always/initial blocks. It need not map to a real FF — synthesis decides.',
        },
        {
          prompt: 'Which of these is a legal way to hold a temporary value in Verilog?',
          choices: ['A `reg` assigned inside an always block', 'A `wire` driven by two always blocks', 'A continuous assign to a `reg`', 'A port used for input and output at once'],
          answer: 0,
          aiExplanation: 'Storage lives in regs/variables assigned procedurally. A wire is a continuous net and cannot be driven from two always blocks.',
        },
      ]),
  },
  {
    subject: 'Verilog HDL',
    make: ({ rng }) =>
      pick(rng, [
        {
          prompt: 'Inside a sequential always block, the clock-edge condition is written:',
          choices: ['always @(posedge clk)', 'always @(*)', 'assign @(posedge clk)', 'always (clk = 1)'],
          answer: 0,
          aiExplanation: 'Edge sensitivity uses @(posedge clk) or @(negedge clk). @(*) is the combinational sensitivity list.',
        },
        {
          prompt: 'An always block sensitive to the falling clock edge starts with:',
          choices: ['always @(negedge clk)', 'always @(posedge clk)', 'always @(clk or rst)', 'initial @(negedge clk)'],
          answer: 0,
          aiExplanation: 'negedge triggers on the 1→0 transition. The async reset is usually added as an extra edge in the sensitivity list.',
        },
      ]),
  },
  {
    subject: 'Verilog HDL',
    make: ({ rng }) =>
      pick(rng, [
        {
          prompt: 'In a sequential (clocked) always block, assignments to regs should use:',
          choices: ['Non-blocking assignments (<=)', 'Blocking assignments (=)', 'Continuous assigns', 'No assignment operator is allowed'],
          answer: 0,
          aiExplanation: 'Sequential logic uses non-blocking (<=) so all regs update from the old values simultaneously, avoiding races.',
        },
        {
          prompt: 'An example of a non-blocking assignment is:',
          choices: ['q <= d;', 'q = d;', 'assign q = d;', 'always q = d;'],
          answer: 0,
          aiExplanation: 'Non-blocking uses `<=` (q <= d). `=` is blocking (comb tables), `assign` drives nets.',
        },
      ]),
  },
  {
    subject: 'Verilog HDL',
    make: ({ rng }) =>
      pick(rng, [
        {
          prompt: 'Connecting ports by name in a module instantiation:',
          choices: ["Maps each .port(signal) explicitly, so order doesn't matter", 'Requires exact declaration order', 'Is only valid for output ports', 'Cannot be used with parameters'],
          answer: 0,
          aiExplanation: 'Named mapping (.a(wa), .b(wb)) is order-independent and self-documenting; positional mapping uses declaration order.',
        },
        {
          prompt: 'The clearest way to connect port `a` of instance u1 to wire `wa` is:',
          choices: ['u1 u1_inst (.a(wa));', 'u1 u1_inst (wa, ...);', 'u1 (a) ;', 'call u1.a = wa;'],
          answer: 0,
          aiExplanation: 'Named port connection `.a(wa)` ties the module port a to signal wa regardless of port order.',
        },
      ]),
  },
  {
    subject: 'Verilog HDL',
    make: ({ rng }) => {
      const n = pick(rng, [3, 4, 5, 8]);
      const max = 2 ** n - 1;
      return {
        prompt: `A bus declared as wire [${n - 1}:0] can represent unsigned values up to:`,
        ...mc(rng, String(max), [String(2 ** n), String(n), String(2 * n)]),
        aiExplanation: `An n-bit unsigned bus covers 0 to 2ⁿ−1 = 2^${n} − 1 = ${max}; 2ⁿ values total.`,
      };
    },
  },
  {
    subject: 'Verilog HDL',
    make: ({ rng }) =>
      pick(rng, [
        {
          prompt: 'SystemVerilog declares a synthesizable sequential block most cleanly with:',
          choices: ['always_ff @(posedge clk)', 'always @*', 'initial begin', 'assign q = d;'],
          answer: 0,
          aiExplanation: 'always_ff is the SystemVerilog keyword for sequential logic; always_comb covers combinational logic explicitly.',
        },
        {
          prompt: 'SystemVerilog combinational logic that reacts to any input change uses:',
          choices: ['always_comb', 'always_ff @(posedge clk)', 'assign only with delays', 'initial begin'],
          answer: 0,
          aiExplanation: 'always_comb is the unambiguous SystemVerilog way to write combinational logic without a hand-kept sensitivity list.',
        },
      ]),
  },
  {
    subject: 'Verilog HDL',
    make: ({ rng }) =>
      pick(rng, [
        {
          prompt: 'A `parameter` inside a module is used to:',
          choices: ['Override values at instantiation, e.g. defining a bus width', 'Store simulation runtime values', 'Declare physical pins', 'Tie a net to constant 0'],
          answer: 0,
          aiExplanation: 'Parameters are compile-time constants that can be overridden per instance, making modules reusable for different widths/counts.',
        },
        {
          prompt: 'A constant that cannot be overridden at instantiation is declared with:',
          choices: ['localparam', 'parameter', 'genvar', 'wire'],
          answer: 0,
          aiExplanation: 'localparam is a parameter that stays local (not overridable); `parameter` can be passed from the parent instance.',
        },
      ]),
  },
  {
    subject: 'Verilog HDL',
    make: ({ rng }) => {
      const n = pick(rng, [3, 4, 5]);
      return {
        prompt: `Adding two ${n}-bit numbers can produce a result needing at most:`,
        ...mc(rng, `${n + 1} bits`, [`${n} bits`, `${n * 2} bits`, `${n - 1} bits`]),
        aiExplanation: `The sum of two n-bit numbers fits in n+1 bits (carry out), e.g. the max ${2 ** n - 1} + ${2 ** n - 1} = ${2 ** (n + 1) - 2} needs ${n + 1} bits.`,
      };
    },
  },
  {
    subject: 'Verilog HDL',
    make: ({ rng }) =>
      pick(rng, [
        {
          prompt: 'The Verilog literal 4\'hF has a width of:',
          choices: ['4 bits', '16 bits', '8 bits', '1 bit'],
          answer: 0,
          aiExplanation: "The leading 4' sets the width — 4 bits wide, value 15. Width is fixed by the size prefix.",
        },
        {
          prompt: 'The value of the literal 3\'b101 is:',
          choices: ['5', '3', '101', '2'],
          answer: 0,
          aiExplanation: "3'b101 is a 3-bit binary literal: 1·4 + 0·2 + 1·1 = 5.",
        },
      ]),
  },
  {
    subject: 'Verilog HDL',
    make: ({ rng }) =>
      pick(rng, [
        {
          prompt: 'A continuous assignment `assign y = a & b;` drives a signal declared as:',
          choices: ['wire (a net)', 'reg', 'integer variable only', 'parameter'],
          answer: 0,
          aiExplanation: 'Continuous assigns drive nets (wire). `assign y = ...` is how combinational logic is wired together.',
        },
        {
          prompt: 'The ternary in `assign y = sel ? a : b;` implements:',
          choices: ['A 2:1 multiplexer', 'An AND gate', 'A full adder', 'A latch'],
          answer: 0,
          aiExplanation: 'The conditional operator selects one of two data inputs with a select — a 2:1 mux, hello FPGA classic.',
        },
      ]),
  },

  // ── FPGA Architecture ────────────────────────────────────
  {
    subject: 'FPGA Architecture',
    make: ({ rng }) =>
      pick(rng, [
        {
          prompt: 'At the heart of an FPGA configurable logic block (CLB) sits a:',
          choices: ['Look-up table (LUT) plus flip-flop', 'Hard-wired microprocessor core', 'Relay-based switch matrix', 'Flash memory array'],
          answer: 0,
          aiExplanation: 'Each CLB combines LUTs (which implement logic as a truth table) with flip-flops, so it can do combinational or sequential logic.',
        },
        {
          prompt: 'Which pair of resources forms the basic FPGA logic fabric?',
          choices: ['LUTs and flip-flops', 'Op-amps and resistors', 'Relays and switches', 'Hard drives and RAM sticks'],
          answer: 0,
          aiExplanation: 'The fabric is LUT+FF: LUTs perform combinational mapping and FFs store state; interconnect routes between them.',
        },
      ]),
  },
  {
    subject: 'FPGA Architecture',
    make: ({ rng }) => {
      const n = pick(rng, [3, 4, 5, 6]);
      return {
        prompt: `A ${n}-input lookup table can produce how many distinct output combinations?`,
        ...mc(rng, String(2 ** n), [String(n * 2), String(2 * n), String(n ** 2)]),
        aiExplanation: `An n-input LUT is programmed by 2ⁿ bits, one for each input combination: 2^${n} = ${2 ** n}.`,
      };
    },
  },
  {
    subject: 'FPGA Architecture',
    make: ({ rng }) =>
      pick(rng, [
        {
          prompt: 'The number of configuration bits a 4-input LUT stores is:',
          choices: ['16', '4', '8', '32'],
          answer: 0,
          aiExplanation: 'A 4-input LUT is a 16-entry truth table; it needs 2⁴ = 16 SRAM cells, one per input combination.',
        },
        {
          prompt: 'A 3-input LUT is configured with exactly this many bits:',
          choices: ['8', '3', '6', '16'],
          answer: 0,
          aiExplanation: 'A 3-input LUT has 2³ = 8 configuration bits — one per unique input pattern.',
        },
      ]),
  },
  {
    subject: 'FPGA Architecture',
    make: ({ rng }) =>
      pick(rng, [
        {
          prompt: 'What physically configures the routing and logic of an SRAM-based FPGA?',
          choices: ['A configuration bitstream loaded at startup', 'The operating system kernel', 'Copper jumpers soldered by hand', 'A one-time fuse mask'],
          answer: 0,
          aiExplanation: 'SRAM FPGAs are volatile: a bitstream programs the LUTs and routing muxes, and it must be reloaded after every power-up.',
        },
        {
          prompt: 'FPGA engineers call the file that programs a device the:',
          choices: ['Bitstream (.bit)', 'Netlist only', 'Kernel image', 'Makefile'],
          answer: 0,
          aiExplanation: 'Place-and-route produces a bitstream that configures all LUT values and routing switches for the whole device.',
        },
      ]),
  },
  {
    subject: 'FPGA Architecture',
    make: ({ rng }) =>
      pick(rng, [
        {
          prompt: 'Because it is SRAM-based, a typical FPGA after power-off:',
          choices: ['Loses its configuration and must be reprogrammed', 'Keeps logic until reprogrammed', 'Saves config in on-chip EEPROM by default', 'Boots the last design automatically without a loader'],
          answer: 0,
          aiExplanation: 'Volatile SRAM cells clear on power-down; most boards load the bitstream from flash at boot or via JTAG.',
        },
        {
          prompt: 'An SRAM-configuration FPGA is best described as:',
          choices: ['Volatile — needs the bitstream at every power-up', 'Non-volatile — keeps its design forever', 'Analog-tuned — not software configured', 'Slower than an ASIC only at reset'],
          answer: 0,
          aiExplanation: 'SRAM-based = volatile config. Non-volatile parts use flash or antifuse instead.',
        },
      ]),
  },
  {
    subject: 'FPGA Architecture',
    make: ({ rng }) => {
      const rem = pick(rng, ['dedicated on-chip memory blocks (BRAM)', 'DSP multiply-accumulate slices']);
      return {
        prompt: `${rem} in an FPGA are examples of:`,
        ...mc(rng, 'Hardened silicon blocks, not soft logic', ['Configurable LUTs', 'Fabric interconnect only', 'Internal test ports']),
        aiExplanation: `Hard IP like BRAM and DSP slices is physically fixed; LUT-based logic is soft and fully reconfigurable.`,
      };
    },
  },
  {
    subject: 'FPGA Architecture',
    make: ({ rng }) =>
      pick(rng, [
        {
          prompt: 'Distributing the clock across an FPGA is done by:',
          choices: ['Dedicated low-skew clock routing', 'Tying every FF to a data LUT', 'The application software', 'Random fabric wires only'],
          answer: 0,
          aiExplanation: 'Clock nets must reach every register at nearly the same time — FPGAs ship dedicated global/low-skew clock networks.',
        },
        {
          prompt: 'An FPGA global clock network is designed to:',
          choices: ['Minimize skew between all sequential elements', 'Maximize fanout of data paths', 'Reduce the number of LUTs', 'Store configuration bits'],
          answer: 0,
          aiExplanation: 'The global clock tree balances arrival times so all FFs see the edge together — keeping skew (and timing closure) manageable.',
        },
      ]),
  },

  // ── Digital Logic ────────────────────────────────────────
  {
    subject: 'Digital Logic',
    make: ({ rng }) =>
      pick(rng, [
        {
          prompt: 'A rising-edge D flip-flop stores the value of D:',
          choices: ['Only at the rising (0→1) clock edge', 'Continuously while the clock is high', 'At a level, transparently, like a latch', 'Only after the clock goes low'],
          answer: 0,
          aiExplanation: 'An edge-triggered FF samples D only on the active edge; between edges the output is frozen — unlike a level-sensitive latch.',
        },
        {
          prompt: 'The difference between a latch and a flip-flop is:',
          choices: ['Latches are level-sensitive; FFs are edge-triggered', 'Floating-point math', 'Power consumption only', 'Pin count'],
          answer: 0,
          aiExplanation: 'Latches pass data while enabled (level); FFs sample only on a clock edge. Edge-triggering enables safe synchronous design.',
        },
      ]),
  },
  {
    subject: 'Digital Logic',
    make: ({ rng }) => {
      const [j, k] = [int(rng, 0, 1), int(rng, 0, 1)];
      const next =
        j === 1 && k === 1
          ? 'Toggles'
          : j === 0 && k === 0
            ? 'Holds its state'
            : j === 1 && k === 0
              ? 'Sets to 1'
              : 'Clears to 0';
      return {
        prompt: `A JK flip-flop has J = ${j}, K = ${k}. Its next-state behaviour is to:`,
        ...mc(rng, next, ['Always toggle', 'Always reset', 'Copy the clock input']),
        aiExplanation: `J=1,K=1 toggles; J=0,K=0 holds; J=1,K=0 sets; J=0,K=1 clears. Here that means: ${next}.`,
      };
    },
  },
  {
    subject: 'Digital Logic',
    make: ({ rng }) =>
      pick(rng, [
        {
          prompt: 'In a Moore finite-state machine, the outputs depend only on:',
          choices: ['The current state', 'The current inputs', 'The previous clock frequency', 'The next-state equations'],
          answer: 0,
          aiExplanation: "Moore outputs are a function of state alone, so they're stable between edges; Mealy outputs depend on inputs too.",
        },
        {
          prompt: 'A Mealy FSM differs from a Moore FSM because its outputs:',
          choices: ['Depend on the current inputs as well as the state', 'Never update', 'Are registered at power-up', 'Cannot drive LEDs'],
          answer: 0,
          aiExplanation: 'Mealy: output = f(state, inputs), so changes can respond instantly to inputs; Moore: output = f(state) only.',
        },
      ]),
  },
  {
    subject: 'Digital Logic',
    make: ({ rng }) =>
      pick(rng, [
        {
          prompt: 'The state register in an FSM is usually built from:',
          choices: ['Flip-flops clocked by a common clock', 'Combinational LUTs only', 'Analog comparators', 'Unclocked SR latches'],
          answer: 0,
          aiExplanation: 'All state registers share one clock so they advance in lockstep; this synchronous design is the basis of sequential RTL.',
        },
        {
          prompt: 'Binary (vs one-hot) FSM encoding uses:',
          choices: ['Fewer flip-flops, more combinational logic', 'More flip-flops, no logic', 'No clock', 'No state register at all'],
          answer: 0,
          aiExplanation: 'Binary encoding packs state into log₂(n) FFs but needs decode logic; one-hot uses n FFs for simpler/safer next state.',
        },
      ]),
  },
  {
    subject: 'Digital Logic',
    make: ({ rng }) => {
      const n = pick(rng, [3, 4, 5]);
      const max = 2 ** n - 1;
      return {
        prompt: `A ${n}-bit binary counter has reached ${max} (its maximum). On the next clock edge it will read:`,
        ...mc(rng, '0', [String(max - 1), String(max + 1), String(2 ** n)]),
        aiExplanation: `An n-bit counter wraps to 0 after 2ⁿ−1: past ${max}, the register overflows back to 0.`,
      };
    },
  },
  {
    subject: 'Digital Logic',
    make: ({ rng }) => {
      const g0 = indexToGray(int(rng, 1, 14));
      const pals = grayVariant(g0);
      return {
        prompt: `Which sequence is a valid Gray-code walk for the values ${pals.a}, ${pals.b}?`,
        ...mc(rng, `${pals.a}, ${pals.b}`, [pals.wrong1, pals.wrong2, pals.wrong3]),
        aiExplanation: `Adjacent Gray codes differ in exactly one bit: ${pals.a} → ${pals.b} changes a single bit, so it is legal.`,
      };
    },
  },
  {
    subject: 'Digital Logic',
    make: ({ rng }) => {
      const [a, b] = [int(rng, 0, 1), int(rng, 0, 1)];
      return {
        prompt: `A half-adder receives A = ${a}, B = ${b}. Its outputs are:`,
        ...mc(rng, `Sum = ${a ^ b}, Carry = ${a & b}`, [`Sum = ${b}, Carry = ${a}`, `Sum = ${a}, Carry = 0`, `Sum = ${(a ^ b) ^ 1}, Carry = ${(a & b) ^ 1}`]),
        aiExplanation: `Sum = A⊕B = ${a}⊕${b} = ${a ^ b}; Carry = A·B = ${a}·${b} = ${a & b}.`,
      };
    },
  },

  // ── Timing & Synthesis ───────────────────────────────────
  {
    subject: 'Timing & Synthesis',
    make: ({ rng }) =>
      pick(rng, [
        {
          prompt: 'Setup time is the interval during which:',
          choices: ['Data must be stable before the clock edge arrives', 'The clock is allowed to be high', 'Data must stay stable after the clock edge', 'Outputs are tristated'],
          answer: 0,
          aiExplanation: 'Setup is data-before-edge; hold is data-after-edge. Violating either causes the FF to sample garbage (metastability risk).',
        },
        {
          prompt: 'To meet setup time, a launching FF must send data:',
          choices: ['Early enough for the capture FF to see it stable', 'At exactly the same instant as the clock', 'After the capture clock edge', 'Never — setup is automatic'],
          answer: 0,
          aiExplanation: 'Clock-to-Q + combinational delay + setup must fit inside the clock period, or the receiving FF samples an invalid value.',
        },
      ]),
  },
  {
    subject: 'Timing & Synthesis',
    make: ({ rng }) =>
      pick(rng, [
        {
          prompt: 'Hold time requires the input data to remain stable:',
          choices: ['For a short window after the clock edge', 'Before the clock edge only', 'For the entire clock period', 'Only in simulation, never in silicon'],
          answer: 0,
          aiExplanation: 'Hold constrains data after the edge; a path too fast (little delay) relative to the clock can break hold time.',
        },
        {
          prompt: 'A hold-time violation occurs when:',
          choices: ['Data changes too soon after the clock edge', 'Data arrives too late before the edge', 'The clock stops', 'The design is only combinational'],
          answer: 0,
          aiExplanation: 'Hold is broken when upstream data races through and changes the capture FF input before its hold window closes.',
        },
      ]),
  },
  {
    subject: 'Timing & Synthesis',
    make: ({ rng }) =>
      pick(rng, [
        {
          prompt: 'The maximum clock frequency of a design is set by:',
          choices: ['The longest (critical) path delay between registers', 'The shortest path in the circuit', 'The number of hierarchy levels', 'The size of the clock tree alone'],
          answer: 0,
          aiExplanation: 'f_max ≈ 1 / (T_clk-to-q + T_logic + T_setup). The critical path — slowest FF-to-FF path — is the bottleneck.',
        },
        {
          prompt: 'A place-and-route report shows the worst path takes 8 ns. The top clock frequency it supports is about:',
          choices: ['125 MHz', '8 MHz', '80 MHz', '12.5 MHz'],
          answer: 0,
          aiExplanation: 'f = 1/T = 1/8 ns = 125 MHz. Timing closure fails if you ask for more than the worst path allows.',
        },
      ]),
  },
  {
    subject: 'Timing & Synthesis',
    make: ({ rng }) => {
      const [tq, tl, su] = pick(rng, [
        [1, 4, 1],
        [2, 3, 1],
        [1, 2, 0.5],
        [0.5, 1.5, 0.5],
      ]);
      const period = tq + tl + su;
      return {
        prompt: `A register-to-register path has clock-to-Q ${tq} ns, combinational delay ${tl} ns, setup ${su} ns (all ns). The maximum clock frequency (MHz) is:`,
        ...mc(rng, fmt(1000 / period, 1), [fmt(1000 / (tq + su), 1), fmt(1000 / tl, 1), fmt(2000 / period, 1)]),
        aiExplanation: `T = Tcq + Tlogic + Tsetup = ${tq} + ${tl} + ${su} = ${period} ns → f = 1/${period} ns ≈ ${fmt(1000 / period, 1)} MHz.`,
      };
    },
  },
  {
    subject: 'Timing & Synthesis',
    make: ({ rng }) => {
      const Tclk = pick(rng, [8, 10, 12]);
      const Tlogic = pick(rng, [3, 4, 5]);
      const slack = Tclk - (1 + Tlogic + 1);
      const pos = slack >= 0;
      return {
        prompt: `A 100+ design uses a ${Tclk} ns clock. Path delay is 1 + ${Tlogic} + 1 ns (Tcq + logic + setup). The path slack is:`,
        ...mc(rng, `${pos ? '+' : ''}${fmt(slack, 1)} ns`, [`${fmt(slack - 1, 1)} ns`, `${fmt(pos ? slack + 2 : slack - 2, 1)} ns`, `${Tclk} ns`]),
        aiExplanation: `Slack = T_clk − (Tcq+Tlogic+Tsetup) = ${Tclk} − ${1 + Tlogic + 1} = ${fmt(slack, 1)} ns. Positive slack means the path closes.`,
      };
    },
  },
  {
    subject: 'Timing & Synthesis',
    make: ({ rng }) =>
      pick(rng, [
        {
          prompt: 'Clock skew between two flip-flops means:',
          choices: ['The clock edge arrives at the flip-flops at slightly different times', 'Two clocks with different frequencies', 'A missing clock pin', 'The clock tree has a bug in reset'],
          answer: 0,
          aiExplanation: 'Skew is the arrival-time difference of the same edge at different FFs. Large skew can cause hold-time failures.',
        },
        {
          prompt: 'Clock trees in modern FPGAs exist mainly to:',
          choices: ['Balance arrival times and cut skew', 'Add jitter on purpose', 'Multiply the clock by 100', 'Replace the reset network'],
          answer: 0,
          aiExplanation: 'Dedicated clock trees (and buffers) are engineered so every FF sees the same edge at nearly the same time.',
        },
      ]),
  },
  {
    subject: 'Timing & Synthesis',
    make: ({ rng }) =>
      pick(rng, [
        {
          prompt: 'A latch is unintentionally inferred when:',
          choices: ['A combinational always block omits else/assign for some input case', 'An always_ff block forgets its reset', 'Two regs are assigned the same value', 'A wire feeds a module output'],
          answer: 0,
          aiExplanation: 'Uncovered branches in a combinational block leave storage implied — the classic accidental-latch bug in RTL.',
        },
        {
          prompt: 'Synthesis would infer a latch if this always block:',
          choices: ['Assigns some outputs in only some branches', 'Assigns every output in every branch', 'Has no sensitivity list', 'Uses only parameters'],
          answer: 0,
          aiExplanation: 'If a defined output is not assigned on every path, a memory element is implied to hold its previous value.',
        },
      ]),
  },
  {
    subject: 'Timing & Synthesis',
    make: ({ rng }) =>
      pick(rng, [
        {
          prompt: 'HDL synthesis maps an RTL description onto:',
          choices: ['Standard cells (gates) or FPGA LUT logic', 'Transistor layouts by hand', 'Analog op-amp stages', 'A custom processor ISA'],
          answer: 0,
          aiExplanation: 'Logic synthesis translates RTL into gates/standard cells (ASIC) or LUT+FF fabrics (FPGA), optimizing area and timing.',
        },
        {
          prompt: 'The synthesis output consumed by FPGA place-and-route is usually a:',
          choices: ['Gate-level netlist', 'C++ source', 'PCB Gerber file', 'SystemVerilog testbench'],
          answer: 0,
          aiExplanation: 'Synthesis emits a netlist of primitives (gates/LUTs/FFs) that place-and-route then maps onto the actual fabric.',
        },
      ]),
  },

  // ── ASIC Flow ────────────────────────────────────────────
  {
    subject: 'ASIC Flow',
    make: ({ rng }) =>
      pick(rng, [
        {
          prompt: 'The typical first step after RTL design in an ASIC flow is:',
          choices: ['Logic synthesis to a gate-level netlist', 'Photo-lithographic tape-out', 'Wafer probing', 'Packaging selection'],
          answer: 0,
          aiExplanation: 'RTL → logic synthesis → DFT insertion → place & route → signoff → GDS tape-out. Synthesis is the first automated stage.',
        },
        {
          prompt: 'RTL-to-GDS flow order is best described as:',
          choices: ['Synthesis, DFT, placement, routing, signoff (GDS)', 'Tape-out, synthesis, routing, DFT', 'Routing, RTL, packaging, GDS', 'Placement before RTL always'],
          answer: 0,
          aiExplanation: 'The canonical flow: RTL → synthesis → DFT insert (scan) → floorplan/place → route → physical signoff → GDSII.',
        },
      ]),
  },
  {
    subject: 'ASIC Flow',
    make: ({ rng }) =>
      pick(rng, [
        {
          prompt: 'Place and route tools ultimately produce:',
          choices: ['A GDSII layout ready for mask fabrication', 'A Verilog simulation testbench', 'An FPGA configuration bitstream', 'A printed-circuit Gerber set'],
          answer: 0,
          aiExplanation: 'After floorplan, placement and routing, the tool emits GDSII — the geometry database sent to the mask shop.',
        },
        {
          prompt: 'The file format that goes to the semiconductor fab is:',
          choices: ['GDSII', 'VHDL', 'PNG', 'JSON'],
          answer: 0,
          aiExplanation: 'GDSII (or OASIS) streams the transistor/polygon geometry the mask shop needs to make photomasks.',
        },
      ]),
  },
  {
    subject: 'ASIC Flow',
    make: ({ rng }) =>
      pick(rng, [
        {
          prompt: 'Library standard cells are characterized in terms of:',
          choices: ['Delay, power and area across corners', 'Only their resistor colour bands', 'Their pin-to-board spacing', 'The compiler target language'],
          answer: 0,
          aiExplanation: 'Cell libraries ship timing arcs, power models and area data so synthesis and signoff can estimate performance.',
        },
        {
          prompt: 'Standard-cell libraries are checked across multiple corners to model:',
          choices: ['Voltage and temperature variation', 'Wire colour codes', 'Pin polarity only', 'Solder paste thickness'],
          answer: 0,
          aiExplanation: 'Process/voltage/temperature (PVT) corners let signoff verify delays hold under fast and slow silicon conditions.',
        },
      ]),
  },
  {
    subject: 'ASIC Flow',
    make: ({ rng }) =>
      pick(rng, [
        {
          prompt: 'To safely bring an asynchronous signal into a clock domain, designers add:',
          choices: ['Two cascaded flip-flops (a synchronizer)', 'A Schmitt trigger near the source', 'A single AND gate in the data path', 'An unclocked SR latch'],
          answer: 0,
          aiExplanation: 'A two-flip-flop synchronizer gives a metastable output a full cycle to settle before downstream logic samples it.',
        },
        {
          prompt: 'Metastability after sampling an async input is handled by:',
          choices: ['A two-flop synchronizer at the domain boundary', 'Removing all flip-flops', 'Using a combinatorial bubble', 'Adding ground loops'],
          answer: 0,
          aiExplanation: 'Two back-to-back FFs resolve metastable values to valid logic before they reach the rest of the synchronous design.',
        },
      ]),
  },
  {
    subject: 'ASIC Flow',
    make: ({ rng }) => {
      const dv = pick(rng, [2, 4, 8]);
      return {
        prompt: `A clock divider built from a mod-${dv} counter produces an output at:`,
        ...mc(rng, `${1 / dv}× the input frequency`, [`${dv}× the input frequency`, `2× the input frequency`, `The same frequency as the input`]),
        aiExplanation: `A mod-N counter wraps every N cycles, so the output toggles edge every N — the output is f_in/N = ${1 / dv}× f_in.`,
      };
    },
  },
];

function indexToGray(i: number): number {
  return i ^ (i >> 1);
}

function grayVariant(a: number) {
  const b = a ^ 1; // differs in the LSB
  return {
    a,
    b,
    wrong1: `${a}, ${a ^ 3}`,
    wrong2: `${a}, ${a << 1}`,
    wrong3: `${b}, ${a}`,
  };
}

export const VLSI_GENS = GENS;