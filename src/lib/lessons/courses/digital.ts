import type { GeneratedGroup, ModuleSpec } from './presets.js';
import { build } from './presets.js';

const MODULES: ModuleSpec[] = [
  // ── Number Systems
  {
    key: 'dg-num-01',
    unit: 'Number Systems',
    title: 'Binary, Hex, and Back',
    level: 'basic',
    body:
      'Digital systems use binary (base 2), and engineers read it in compact hexadecimal (base 16). Four bits make one hex digit: 1010 = A, 1111 = F. Converting hex to binary is a per-digit replacement; converting to decimal uses powers of two.',
    qs: [
      {
        p: 'The hex value 0x3F in binary is:',
        c: ['0011 1111', '0011 0011', '1111 0000', '0000 1111'],
        a: 0,
        e: '3 = 0011, F = 1111, so 0x3F = 0011 1111.',
      },
      {
        p: 'How many bits are in one hexadecimal digit?',
        c: ['4', '2', '8', '16'],
        a: 0,
        e: 'Hex digits encode 0–15, exactly 4 bits.',
      },
    ],
  },
  {
    key: 'dg-num-02',
    unit: 'Number Systems',
    title: 'Signed Numbers: Two\u2019s Complement',
    level: 'intermediate',
    body:
      'Two\u2019s complement represents negatives so that subtraction is just addition. Flip all bits and add one: +5 (0101) becomes −5 (1011). The top bit is the sign. An n-bit two\u2019s complement range is −2^(n−1) to +2^(n−1)−1.',
    qs: [
      {
        p: 'In 4-bit two\u2019s complement, −5 is:',
        c: ['1011', '0101', '1101', '1001'],
        a: 0,
        e: '+5 = 0101 → invert → 1010 → +1 → 1011.',
      },
      {
        p: 'In 8-bit two\u2019s complement, the largest positive value is:',
        c: ['127', '128', '255', '256'],
        a: 0,
        e: '2^7 − 1 = 127; the sign bit stays 0.',
      },
    ],
  },
  {
    key: 'dg-num-03',
    unit: 'Number Systems',
    title: 'BCD: Binary-Coded Decimal',
    level: 'intermediate',
    body:
      'BCD stores each decimal digit as 4 bits (0–9), so 42 becomes 0100 0010. It wastes codes (1010–1111 unused) but keeps decimal math exact — great for calculators and clocks that display digits directly.',
    qs: [
      {
        p: 'Decimal 37 in BCD is:',
        c: ['0011 0111', '0010 0101', '100101', '1110 0111'],
        a: 0,
        e: '3 = 0011, 7 = 0111.',
      },
    ],
  },

  // ── Boolean Algebra
  {
    key: 'dg-boo-01',
    unit: 'Boolean Algebra & Gates',
    title: 'Truth Tables and Logic Gates',
    level: 'basic',
    body:
      'Every logic gate is a truth table: AND is 1 only when all inputs are 1; OR is 1 when any input is 1; XOR is 1 when exactly one differs; NOT flips. NAND and NOR are the inverted versions and each alone can build everything.',
    qs: [
      {
        p: 'XOR outputs 1 when:',
        c: ['Exactly one input is 1', 'Both are 1', 'Both are 0', 'Any input is 1'],
        a: 0,
        e: 'XOR = inputs differ.',
      },
      {
        p: 'NAND of 0 and 1 is:',
        c: ['1', '0', 'X', 'High-Z'],
        a: 0,
        e: 'AND(0,1) = 0, inverted = 1.',
      },
    ],
  },
  {
    key: 'dg-boo-02',
    unit: 'Boolean Algebra & Gates',
    title: 'De Morgan\u2019s Laws',
    level: 'intermediate',
    body:
      'De Morgan\u2019s laws restate inverted sums and products: NOT(A AND B) = (NOT A) OR (NOT B), and NOT(A OR B) = (NOT A) AND (NOT B). They are how engineers turn NAND/NOR into any function and bubble-push along wires.',
    qs: [
      {
        p: 'By De Morgan, NOT(A·B) equals:',
        c: ['NOT A + NOT B', 'NOT (A+B)', 'A·B', 'A + B'],
        a: 0,
        e: 'Inverting an AND flips to an OR of inverted inputs.',
      },
    ],
  },
  {
    key: 'dg-boo-03',
    unit: 'Boolean Algebra & Gates',
    title: 'Universal Gates: NAND Only',
    level: 'intermediate',
    body:
      'NAND alone can synthesize NOT, AND, OR — so any circuit is buildable from NAND gates. Tie both inputs together for NOT; the rest follows from De Morgan. NOR is equally universal. Real chips favour these because they are cheap and fast.',
    qs: [
      {
        p: 'A NAND gate wired with both inputs tied together behaves as:',
        c: ['A NOT gate', 'An AND gate', 'An OR gate', 'A latch'],
        a: 0,
        e: 'NOT(A AND A) = NOT A.',
      },
    ],
  },
  {
    key: 'dg-boo-04',
    unit: 'Boolean Algebra & Gates',
    title: 'Sum of Products and Karnaugh Maps',
    level: 'advanced',
    body:
      'Any truth table becomes a sum of products (OR of AND terms), one product per output-1 row. Karnaugh maps regroup adjacent 1s into larger implicants so you can spot and remove redundant literals — minimization for logic design.',
    qs: [
      {
        p: 'In sum-of-products form, each product term covers:',
        c: ['One row where output is 1', 'One row where output is 0', 'Every gate', 'The critical path'],
        a: 0,
        e: 'Each minterm matches an input combination producing 1.',
      },
    ],
  },

  // ── Combinational Building Blocks
  {
    key: 'dg-add-01',
    unit: 'Combinational Building Blocks',
    title: 'Half and Full Adders',
    level: 'basic',
    body:
      'A half adder adds two bits: XOR gives the sum, AND gives the carry. A full adder adds two bits plus an incoming carry, producing sum and carry-out — chain full adders for multi-bit addition. This is the skeleton of every ALU.',
    qs: [
      {
        p: 'The sum output of a half adder is:',
        c: ['A XOR B', 'A AND B', 'A OR B', 'NOT A'],
        a: 0,
        e: 'XOR of the inputs is the unsigned sum bit.',
      },
      {
        p: 'The carry output of a half adder is:',
        c: ['A AND B', 'A XOR B', 'A OR B', 'A NAND B'],
        a: 0,
        e: 'Carry is produced only when both inputs are 1.',
      },
    ],
  },
  {
    key: 'dg-add-02',
    unit: 'Combinational Building Blocks',
    title: 'Encoders and Decoders',
    level: 'basic',
    body:
      'A decoder turns a binary code into one-hot lines: 2 inputs → 4 outputs, exactly one active. An encoder does the reverse (one-hot in, code out). Decoders are everywhere: address decoding, seven-segment control, and K-matrix expansion.',
    qs: [
      {
        p: 'A 3-to-8 decoder has:',
        c: ['3 inputs, 8 outputs', '8 inputs, 3 outputs', '3 of each', '8 of each'],
        a: 0,
        e: '2^n outputs for n binary inputs: 2^3 = 8.',
      },
    ],
  },
  {
    key: 'dg-add-03',
    unit: 'Combinational Building Blocks',
    title: 'Multiplexers',
    level: 'basic',
    body:
      'A multiplexer (mux) selects one of many inputs with a select code. A 2:1 mux chooses between two data lines with one select bit; an 8:1 mux needs three select bits. Muxes route data, build PLDs, and universal logic too.',
    qs: [
      {
        p: 'An 8:1 mux needs how many select lines?',
        c: ['3', '2', '8', '4'],
        a: 0,
        e: '2^3 = 8, so three select bits address all inputs.',
      },
    ],
  },
  {
    key: 'dg-add-04',
    unit: 'Combinational Building Blocks',
    title: 'Comparators',
    level: 'intermediate',
    body:
      'A comparator checks whether A is greater than, less than, or equal to B. Bit-sliced comparators compare most-significant bit first; equality is an XNOR chain. Comparators gate everything from sorting networks to address matches.',
    qs: [
      {
        p: 'Equality of two 4-bit numbers is detected by a chain of:',
        c: ['XNOR gates ANDed together', 'XOR gates only', 'Inverters', 'Latches'],
        a: 0,
        e: 'Each bit must match (XNOR = 1); all must match.',
      },
    ],
  },
  {
    key: 'dg-add-05',
    unit: 'Combinational Building Blocks',
    title: 'Carry Lookahead vs Ripple',
    level: 'advanced',
    body:
      'Ripple carry passes the carry bit through every adder, so delay grows with word width. Carry lookahead computes carries from generate (G = A·B) and propagate (P = A XOR B) signals in parallel — much faster for wide adders.',
    qs: [
      {
        p: 'Carry lookahead speeds up addition by:',
        c: ['Computing carries in parallel', 'Using slower gates', 'Adding more ripple stages', 'Reducing the bits'],
        a: 0,
        e: 'Generate/propagate logic predicts carries without waiting.',
      },
    ],
  },

  // ── Sequential Elements
  {
    key: 'dg-flip-01',
    unit: 'Flip-Flops & Latches',
    title: 'SR Latch',
    level: 'basic',
    body:
      'Two cross-coupled NAND or NOR gates form an SR latch: Set forces output Q to 1, Reset forces it to 0, and with both inputs inactive it holds its last value. It is the simplest one-bit memory.',
    qs: [
      {
        p: 'An SR latch with S=1, R=0 sets:',
        c: ['Q = 1 (set state)', 'Q = 0 (reset state)', 'A race condition', 'Nothing'],
        a: 0,
        e: 'Asserting Set drives the output high and holds it.',
      },
    ],
  },
  {
    key: 'dg-flip-02',
    unit: 'Flip-Flops & Latches',
    title: 'D Flip-Flop: Edge-Triggered Memory',
    level: 'basic',
    body:
      'A D flip-flop captures its D input on the rising clock edge and holds it until the next edge — one bit of memory that updates synchronously with the clock. Everything in a synchronous design is buckets of D flip-flops.',
    qs: [
      {
        p: 'A D flip-flop updates its output:',
        c: ['Only on the clock edge', 'Whenever D changes', 'Continuously', 'On power-up'],
        a: 0,
        e: 'Edge-triggered: the flip-flop samples D at the edge.',
      },
    ],
  },
  {
    key: 'dg-flip-03',
    unit: 'Flip-Flops & Latches',
    title: 'JK and T Flip-Flops',
    level: 'intermediate',
    body:
      'The JK flip-flop removes the forbidden SR state: when J=K=1 the output toggles. Tie J and K together and you have a T flip-flop, the building block of binary counters — one toggle per clock edge.',
    qs: [
      {
        p: 'With J=K=1 a JK flip-flop will:',
        c: ['Toggle', 'Hold', 'Reset', 'Set'],
        a: 0,
        e: 'The 11 case toggles; T mode uses exactly that.',
      },
    ],
  },
  {
    key: 'dg-flip-04',
    unit: 'Flip-Flops & Latches',
    title: 'Flip-Flop vs Latch',
    level: 'basic',
    body:
      'Latches are level-sensitive: they follow the enable while it is high. Flip-flops are edge-triggered: they sample only at the transition. Designs that gate clocks against latches tend to glitch — that is why synchronous FPGAs push edge-triggered flops.',
    qs: [
      {
        p: 'A level-sensitive storage element is called a:',
        c: ['Latch', 'Flip-flop', 'Gated buffer', 'Mux'],
        a: 0,
        e: 'Latches follow enable level; flops sample edges.',
      },
    ],
  },

  // ── Registers & Counters
  {
    key: 'dg-reg-01',
    unit: 'Registers & Counters',
    title: 'Shift Registers',
    level: 'basic',
    body:
      'A shift register is a chain of D flip-flops. Each clock edge moves the bits one position: a bit entering at the first flip-flop climbs the register. Used for serial-to-parallel conversion, delays, and pattern generators.',
    qs: [
      {
        p: 'After 8 clock edges, a serial bit has moved through:',
        c: ['8 flip-flops', '1 flip-flop', '4 flip-flops', 'It disappears'],
        a: 0,
        e: 'Each edge advances every bit by one stage.',
      },
    ],
  },
  {
    key: 'dg-reg-02',
    unit: 'Registers & Counters',
    title: 'Counting Basics',
    level: 'basic',
    body:
      'A binary counter uses T flip-flops where each flip-flop toggles when all lower bits are 1. The result counts clock edges: 3 bits count 0–7 then wrap to 0. That wrap is a clock divider (÷8 for 3 bits).',
    qs: [
      {
        p: 'A 3-bit counter counts from:',
        c: ['0 to 7 then wraps', '0 to 8 then wraps', '1 to 8', '0 to 15'],
        a: 0,
        e: '2^3 = 8 states: 0..7.',
      },
    ],
  },
  {
    key: 'dg-reg-03',
    unit: 'Registers & Counters',
    title: 'Synchronous vs Ripple Counters',
    level: 'intermediate',
    body:
      'Ripple counters chain flip-flop clocks (each flop clocks the next), which is simple but slow — the count ripples in stages. Synchronous counters clock every flip-flop together with precomputed enable logic, so they settle in one clock time.',
    qs: [
      {
        p: 'A synchronous counter is faster because:',
        c: ['All flip-flops clock together', 'It uses fewer flip-flops', 'It has no gates', 'It counts twice'],
        a: 0,
        e: 'No cascaded clock delay; all stages advance simultaneously.',
      },
    ],
  },
  {
    key: 'dg-reg-04',
    unit: 'Registers & Counters',
    title: 'Mod-N Counters',
    level: 'intermediate',
    body:
      'Wrap a binary counter early to make mod-N counting (0..N−1). A mod-10 counter (decade counter) counts 0–9 and reset to 0 — the heart of clock and frequency-divider designs. Reset logic is combinational from the current state.',
    qs: [
      {
        p: 'A mod-10 counter that reaches 9, 9 resets to:',
        c: ['0', '1', '9', '10'],
        a: 0,
        e: 'Mod-N counts N states: 0..9 then back to 0.',
      },
    ],
  },
  {
    key: 'dg-reg-05',
    unit: 'Registers & Counters',
    title: 'Moore Machine Practice',
    level: 'advanced',
    body:
      'A Moore state machine drives outputs only from the current state, so outputs are glitch-free and depend on state, not level of input. Its outputs change one clock after the state changes — deterministic, at the price of latency.',
    qs: [
      {
        p: 'In a Moore machine outputs depend on:',
        c: ['Current state only', 'Inputs only', 'Both', 'The clock period'],
        a: 0,
        e: 'Moore: output = f(state); Mealy output = f(state, inputs).',
      },
    ],
  },

  // ── Memories
  {
    key: 'dg-mem-01',
    unit: 'Memories',
    title: 'SRAM vs DRAM',
    level: 'intermediate',
    body:
      'SRAM stores each bit in a six-transistor latch: fast but six transistors per bit. DRAM stores charge on a capacitor with one transistor: dense and cheap but it leaks, so it must be refreshed thousands of times per second.',
    qs: [
      {
        p: 'DRAM stores a bit as:',
        c: ['Charge on a capacitor', 'A flip-flop pair', 'A fuse', 'A magnetic domain'],
        a: 0,
        e: 'Capacitor charge leaks, forcing refresh cycles.',
      },
      {
        p: 'SRAM is faster than DRAM largely because:',
        c: ['It never needs refreshing', 'It stores more bits', 'It uses fewer pins', 'It is bigger'],
        a: 0,
        e: 'No refresh and no charge-sharing access makes SRAM quick.',
      },
    ],
  },
  {
    key: 'dg-mem-02',
    unit: 'Memories',
    title: 'ROM, PROM, EEPROM, Flash',
    level: 'intermediate',
    body:
      'Read-only memories store fixed programs: ROM is mask-programmed at the factory, PROM is one-time programmable, EEPROM and flash can be electrically erased and rewritten. Flash writes by sectors and wears out after many erase cycles.',
    qs: [
      {
        p: 'Flash memory is erased and written:',
        c: ['In blocks or sectors', 'One byte at a time always', 'Only at the factory', 'Never'],
        a: 0,
        e: 'Flash erases in large blocks; endurance is limited.',
      },
    ],
  },
  {
    key: 'dg-mem-03',
    unit: 'Memories',
    title: 'Address and Data Busses',
    level: 'advanced',
    body:
      'A memory chip is read by presenting an address and reading the data bus. A 16-bit address accesses 2^16 = 64K locations; 8 parallel data lines give a byte per access. Decoders map addresses onto banks of memory.',
    qs: [
      {
        p: 'A 16-bit address bus addresses how many locations?',
        c: ['65536', '16000', '256', '1024'],
        a: 0,
        e: '2^16 = 64k.',
      },
    ],
  },

  // ── Advanced Topics
  {
    key: 'dg-adv-01',
    unit: 'Advanced Sequential Design',
    title: 'Hazards and Glitches',
    level: 'advanced',
    body:
      'A hazard is a transient wrong output caused by unequal signal delays. Static-1 and static-0 hazards appear when a path switches through complementary logic that races. Adding redundant consensus terms in K-maps eliminates them.',
    qs: [
      {
        p: 'A glitch caused by unequal path delays is called a:',
        c: ['Hazard', 'Setup violation', 'Metastability', 'Hysteresis'],
        a: 0,
        e: 'Delay races produce momentary wrong outputs — hazards.',
      },
    ],
  },
  {
    key: 'dg-adv-02',
    unit: 'Advanced Sequential Design',
    title: 'Setup and Hold',
    level: 'advanced',
    body:
      'A flip-flop needs its data stable for a setup window before the edge and a hold window after. The longest combinational path decides the fastest safe clock. Violations cause metastability — random-looking outputs.',
    qs: [
      {
        p: 'Metastability is defeated in practice by:',
        c: ['A synchronizer of two flip-flops', 'Higher voltage', 'A pull-up', 'Longer wires'],
        a: 0,
        e: 'Two flops give the signal a full cycle to settle.',
      },
    ],
  },
  {
    key: 'dg-adv-03',
    unit: 'Advanced Sequential Design',
    title: 'Finite State Machine Encoding',
    level: 'advanced',
    body:
      'FSM state encodings trade logic for speed and area: one-hot uses one flip-flop per state (fast, no decode), binary is dense but needs decode logic, Gray minimizes switching between adjacent states. Tools choose from these for synthesis.',
    qs: [
      {
        p: 'One-hot FSM encoding uses:',
        c: ['One flip-flop per state', 'log2(N) flip-flops', 'No flip-flops', 'One flip-flop total'],
        a: 0,
        e: 'Only one state bit is high at a time — fast, state-hungry.',
      },
    ],
  },
  {
    key: 'dg-adv-04',
    unit: 'Advanced Sequential Design',
    title: 'Programmable Logic: PLD to FPGA',
    level: 'intermediate',
    body:
      'Programmable logic headed from simple PLDs (AND-OR arrays) to CPLDs (many macrocell islands) to FPGAs (tiles of LUTs and flip-flops wired by configurable routing). Designs are described in HDL and synthesized down to the fabric.',
    qs: [
      {
        p: 'An FPGA configurable block contains:',
        c: ['LUTs and flip-flops', 'Only gates', 'Only wires', 'A CPU core'],
        a: 0,
        e: 'LUT+FF blocks, connected by programmable interconnect.',
      },
    ],
  },
// ── More arithmetic & pipeline
  {
    key: 'dg-dp-01',
    unit: 'Data Path Design',
    title: 'Adders in Hardware',
    level: 'intermediate',
    body:
      'Adder architecture is a cost/speed menu: ripple (small, slow), carry-lookahead (fast, wide logic), carry-save (fast for many operands). The carry chain is the design\u2019s spine; what you choose defines the ALU\u2019s speed.',
    qs: [
      {
        p: 'Ripple carry adders are:',
        c: ['Small but slow (O(n) delay)', 'Fast everywhere', 'Only for 1 bit', 'Used in DSP always'],
        a: 0,
        e: 'Carry crawls through all bit slices.',
      },
    ],
  },
  {
    key: 'dg-dp-02',
    unit: 'Data Path Design',
    title: 'Multipliers',
    level: 'advanced',
    body:
      'Multiply is repeated-add-plus-shift; hardware multipliers use partial-product trees (Wallace/Dadda) to add many bits in parallel. Small multipliers are often LUT-packed or time-shared in FPGAs — size matters, DSPs care.',
    qs: [
      {
        p: 'A Wallace tree multiplies quickly by:',
        c: ['Adding partial products in parallel', 'Repeated ripple add', 'Doubling the clock', 'Using shift registers'],
        a: 0,
        e: 'Compressing the partial-product sum tree.',
      },
    ],
  },
  {
    key: 'dg-dp-03',
    unit: 'Data Path Design',
    title: 'Bus Tristate Logic',
    level: 'intermediate',
    body:
      'Many drivers on one wire need tri-state: high, low, or high-impedance (disconnected). Exactly one driver enables at a time; all others must be off or buses fight. FPGA/ASIC buses prefer muxes, but memory buses still tri-state.',
    qs: [
      {
        p: 'High-impedance output means:',
        c: ['The driver releases the bus', 'Strong high', 'Strong low', 'A short'],
        a: 0,
        e: 'OFF state: the wire floats to other drivers.',
      },
    ],
  },
  {
    key: 'dg-dp-04',
    unit: 'Data Path Design',
    title: 'Pipelining a Datapath',
    level: 'advanced',
    body:
      'Pipelining inserts registers to cut paths: latency rises, but throughput rises because stages overlap. A 3-stage pipeline multiplies throughput ~3× at the cost of latency + register area. It is the standard speed trick.',
    qs: [
      {
        p: 'Pipelining trades:',
        c: ['Latency and area for throughput', 'Throughput for latency only', 'Nothing', 'A clock for a reset'],
        a: 0,
        e: 'More stages = more latency, more parallel throughput.',
      },
    ],
  },

  // ── More sequential practice
  {
    key: 'dg-seq-01',
    unit: 'Dynamic & Practical Logic',
    title: 'Gated Clocks vs Enable',
    level: 'advanced',
    body:
      'Gating a clock with combinational logic creates glitches; instead, mux the data behind an enable at a free-running clock. In FPGAs prefer enable; in ASICs clock gating with an integrated latch is legitimate — but always check the gating cell.',
    qs: [
      {
        p: 'A glitch-free clock gate uses:',
        c: ['A latch in the enable path', 'A plain AND gate', 'No gates', 'A slower clock'],
        a: 0,
        e: 'The latch holds enable steady across the edge.',
      },
    ],
  },
  {
    key: 'dg-seq-02',
    unit: 'Dynamic & Practical Logic',
    title: 'Binary vs BCD Choice',
    level: 'intermediate',
    body:
      'Binary is compact internally; BCD is human-friendly on displays but wastes codes. Clocks and meters convert to BCD at the edge; internal math is binary wherever possible. Conversions cost — put them where they pay.',
    qs: [
      {
        p: 'BCD-on-Display is chosen because:',
        c: ['Each digit displays directly', 'It is denser', 'It is faster to add', 'It uses less power'],
        a: 0,
        e: '4 bits per decimal digit eases LED/LCD drives.',
      },
    ],
  },
  {
    key: 'dg-seq-03',
    unit: 'Dynamic & Practical Logic',
    title: 'One-Hot and Gray FSMs',
    level: 'advanced',
    body:
      'One-hot state encoding = one flop per state, decode-free and fast, area-heavy — the FPGA favorite. Gray encoding changes one bit per transition, cutting switching power and noise — used in asynchronous handshakes.',
    qs: [
      {
        p: 'Gray encoding benefits:',
        c: ['Minimum switching between adjacent states', 'Smallest area', 'No flops', 'Greatest speed'],
        a: 0,
        e: 'Single-bit hops reduce transitions.',
      },
    ],
  },
  {
    key: 'dg-seq-04',
    unit: 'Dynamic & Practical Logic',
    title: 'Metastability in Sync Design',
    level: 'advanced',
    body:
      'Signals crossing into an unsynchronized clock can land in the forbidden zone — metastability: the flop takes unbounded time to settle. Two-flop synchronizers give it a cycle to resolve. Every async input must sync.',
    qs: [
      {
        p: 'A two-flop synchronizer:',
        c: ['Gives one cycle for metastability to resolve', 'Cuts the clock', 'Adds delay only', 'Removes the flop'],
        a: 0,
        e: 'The second flop samples the settled value.',
      },
    ],
  },
  {
    key: 'dg-seq-05',
    unit: 'Dynamic & Practical Logic',
    title: 'Digital De-Glitching',
    level: 'advanced',
    body:
      'Glitches from unequal paths vanish by registering combinational outputs — anything you output to the "real world" (a bus, a DAC) should pass through a flop. Registered outputs are the standard personalities for clean timing.',
    qs: [
      {
        p: 'Output glitches are best removed by:',
        c: ['Registering the output', 'Adding buffers', 'Lowering voltage', 'Slowing the clock'],
        a: 0,
        e: 'A flop edge-samples a settled value.',
      },
    ],
  },

  // ── Practice & resources
  {
    key: 'dg-rs-01',
    unit: 'FPGA Practice',
    title: 'FPGA Building Blocks',
    level: 'intermediate',
    body:
      'FPGAs are arrays of configurable logic blocks (LUTs + flip-flops) and routing switches, plus hard blocks: BRAM, DSP slices, PLLs, transceivers. LUTs implement small functions; the flops register results. Design = fitting logic into tiles.',
    qs: [
      {
        p: 'A LUT stores:',
        c: ['A truth table of a small function', 'Only flip-flops', 'Program code', 'A whole ALU'],
        a: 0,
        e: 'Config memory evaluates any N-input function.',
      },
    ],
  },
  {
    key: 'dg-rs-02',
    unit: 'FPGA Practice',
    title: 'Floorplan and Resources',
    level: 'advanced',
    body:
      'FPGA designs consume slices/LUT/FF, BRAM bits, DSP blocks, and PLLs. A resource report tells you instantly whether the design fits. Imbalanced placement (all LUTs in one corner) hurts timing — let the tools floorplan.',
    qs: [
      {
        p: 'The resource report shows:',
        c: ['LUT/FF/BRAM/DSP usage vs capacity', 'Only power', 'The PCB area', 'Nothing useful'],
        a: 0,
        e: 'Fit check before struggling with timing.',
      },
    ],
  },
  {
    key: 'dg-rs-03',
    unit: 'FPGA Practice',
    title: 'Bitstream and Configuration',
    level: 'intermediate',
    body:
      'The bitstream configures every LUT and switch into your design. FPGAs load it from flash (SPI/parallel) or the host at boot (JTAG). Configuring wrong bits = logic soup; CRC and fallback images guard against corruption.',
    qs: [
      {
        p: 'A bitstream programs:',
        c: ['The FPGA\u2019s LUTs and routing', 'Only the pins', 'The power supply', 'The crystal'],
        a: 0,
        e: 'Configuration memory shapes the fabric.',
      },
    ],
  },
  {
    key: 'dg-rs-04',
    unit: 'FPGA Practice',
    title: 'Testing Your Design',
    level: 'intermediate',
    body:
      'Verify HDL with testbenches and assertions in simulation first; then on-board, use built-in logic analyzers (ILA/SignalTap) to watch internal signals live. Never flash a design you have not simulated — the board lies slowly.',
    qs: [
      {
        p: 'The safest order is:',
        c: ['Simulate, then validate on hardware', 'Flash first, debug last', 'No simulation', 'Only eyeballs'],
        a: 0,
        e: 'Catch logic bugs cheap before hardware.',
      },
    ],
  },
];

let cache: GeneratedGroup | null = null;
export function digital(): GeneratedGroup {
  cache ??= build('digital', MODULES);
  return cache;
}