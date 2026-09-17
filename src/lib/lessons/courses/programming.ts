import type { GeneratedGroup, ModuleSpec } from './presets.js';
import { build } from './presets.js';

const MODULES: ModuleSpec[] = [
  // ── C Basics
  {
    key: 'pg-in-01',
    unit: 'Getting Started with C',
    title: 'What C Gives You',
    level: 'basic',
    body:
      'C gives direct access to memory and hardware with tiny runtime overhead. That is why chips run C: you control addresses, sizes, and layout. The cost is manual memory management — you are the one who must free what you allocate.',
    qs: [
      {
        p: 'C control of memory happens through:',
        c: ['Pointers and manual allocation', 'Automatic garbage collection', 'Managed runtimes', 'Virtual machines'],
        a: 0,
        e: 'C exposes addresses via pointers; you manage the heap.',
      },
    ],
  },
  {
    key: 'pg-in-02',
    unit: 'Getting Started with C',
    title: 'Hello, World and the Build',
    level: 'basic',
    body:
      '#include <stdio.h> brings in printf; main() is the entry point; the compiler turns it into machine code. printf writes to stdout — on a chip that is often retargeted to UART or semihosting.',
    qs: [
      {
        p: 'Every C program starts execution at:',
        c: ['main()', 'printf()', 'startup()', 'init_asm'],
        a: 0,
        e: 'The C runtime calls main after setup.',
      },
    ],
  },
  {
    key: 'pg-in-03',
    unit: 'Getting Started with C',
    title: 'Variables and Literals',
    level: 'basic',
    body:
      'A variable names a memory location of a fixed size. Literals are constants in the code. Assigning a value says "store it here"; reading says "fetch it". Types define sizes and the meaning of the bits.',
    qs: [
      {
        p: 'In C, a variable declaration:',
        c: ['Names a location with a type and stores a value', 'Only creates a function', 'Runs code', 'Formats text'],
        a: 0,
        e: 'Declaration + type = a named object in memory.',
      },
    ],
  },
  {
    key: 'pg-in-04',
    unit: 'Getting Started with C',
    title: 'The sizeof Operator',
    level: 'basic',
    body:
      'sizeof tells you bytes an object or type occupies. On many 32-bit MCUs: char 1, short 2, int and float 4, pointers 4. sizeof is compile-time — using it avoids hard-coding sizes that break on other platforms.',
    qs: [
      {
        p: 'On a 32-bit MCU, sizeof(int) is typically:',
        c: ['4', '1', '2', '8'],
        a: 0,
        e: '32-bit ints are 4 bytes.',
      },
    ],
  },
  {
    key: 'pg-in-05',
    unit: 'Getting Started with C',
    title: 'Comments and Style',
    level: 'basic',
    body:
      '// comments to end of line; /* */ block comments. Style matters in firmware: names say what things do, magic numbers become named constants, and short functions beat long ones. Readable code has fewer bugs.',
    qs: [
      {
        p: 'The best comment explains:',
        c: ['Why — the intent, not the syntax', 'Every line\'s keywords', 'The compiler version', 'Nothing'],
        a: 0,
        e: 'Intent survives; obvious code needs no line-by-line notes.',
      },
    ],
  },

  // ── Types & Operators
  {
    key: 'pg-tp-01',
    unit: 'Types, Operators & Control',
    title: 'Integer Types and Limits',
    level: 'basic',
    body:
      'Signed vs unsigned changes interpretation: an unsigned 8-bit holds 0–255, signed −128..127. <stdint.h> gives exact widths: uint8_t, int16_t, uint32_t. Use fixed-width typedefs for registers and protocol fields.',
    qs: [
      {
        p: 'uint8_t can hold:',
        c: ['0 to 255', '−128 to 127', '0 to 65535', '±32k'],
        a: 0,
        e: 'Unsigned 8-bit spans 0..255.',
      },
    ],
  },
  {
    key: 'pg-tp-02',
    unit: 'Types, Operators & Control',
    title: 'Arithmetic and Overflow',
    level: 'intermediate',
    body:
      'Integer arithmetic can overflow silently: 255 + 1 as uint8_t wraps to 0. Signed overflow is undefined behavior. For production code, check bounds or promote to wider types before summing counts and sizes.',
    qs: [
      {
        p: 'uint8_t 200 + 100 equals:',
        c: ['44', '300', 'undefined result', '100'],
        a: 0,
        e: '300 mod 256 = 44 — silent wraparound.',
      },
    ],
  },
  {
    key: 'pg-tp-03',
    unit: 'Types, Operators & Control',
    title: 'Bitwise Operators',
    level: 'basic',
    body:
      '&, |, ^, ~, <<, >> operate on bits: set a bit with reg |= (1u << n); clear with reg &= ~(1u << n); test with if (reg & mask). Bit fields pack several values in one register.',
    qs: [
      {
        p: 'To set bit 3 of x:',
        c: ['x |= (1u << 3)', 'x &= (1u << 3)', 'x ^= 3', 'x = 3'],
        a: 0,
        e: 'OR in the shifted mask.',
      },
    ],
  },
  {
    key: 'pg-tp-04',
    unit: 'Types, Operators & Control',
    title: 'Precedence Traps',
    level: 'intermediate',
    body:
      'Operator precedence silently changes meaning: (x & mask == 0) compares mask against 0 first! When in doubt, parenthesize the intent. Precedence bugs are the hardest to spot and cheapest to prevent.',
    qs: [
      {
        p: 'In C, x & mask == 0 is parsed as:',
        c: ['x & (mask == 0)', '(x & mask) == 0', 'x == (mask & 0)', 'Undefined'],
        a: 0,
        e: '== binds tighter than &, so mask == 0 evaluates first.',
      },
    ],
  },
  {
    key: 'pg-tp-05',
    unit: 'Types, Operators & Control',
    title: 'Compound Assignments',
    level: 'basic',
    body:
      'x += 5 is x = x + 5; there are equivalents for −, *, /, %, <<, >>, &, |, ^. They are clearer and match how humans read accumulation. They do exactly one read and one write of x.',
    qs: [
      {
        p: 'x <<= 2 is shorthand for:',
        c: ['x = x << 2', 'x = x >> 2', 'x *= 2 only', 'A syntax error'],
        a: 0,
        e: 'Shift-left assignment multiplies by 4 for integers.',
      },
    ],
  },
  {
    key: 'pg-tp-06',
    unit: 'Types, Operators & Control',
    title: 'if, else if, switch',
    level: 'basic',
    body:
      'if/else picks between branches; switch jumps on an integer value. switch with many cases compiles to a jump table — faster and cleaner than a chain of ifs. Always break; fallthrough is an accident unless deliberate.',
    qs: [
      {
        p: 'A switch on an integer state variable compiles typically to:',
        c: ['A jump table', 'A loop', 'A function call', 'Memory copy'],
        a: 0,
        e: 'Dense case ranges become indexed jumps.',
      },
    ],
  },
  {
    key: 'pg-tp-07',
    unit: 'Types, Operators & Control',
    title: 'for, while, do-while',
    level: 'basic',
    body:
      'for (init; condition; step) is the counted loop; while checks before each iteration; do-while always runs once. Infinite poll loops use while(1). Choosing the right loop makes intent obvious.',
    qs: [
      {
        p: 'A loop that must always run its body at least once should be:',
        c: ['do-while', 'for', 'while', 'An unrolled block'],
        a: 0,
        e: 'do-while tests at the bottom.',
      },
    ],
  },
  {
    key: 'pg-tp-08',
    unit: 'Types, Operators & Control',
    title: 'break and continue',
    level: 'basic',
    body:
      'break exits the current loop/switch immediately; continue skips the rest of the body and jumps to the next iteration. Use them to leave loops early on error conditions without flag variables.',
    qs: [
      {
        p: 'continue inside a for-loop:',
        c: ['Skips to the next iteration\'s step/condition', 'Exits the loop', 'Restarts from 0', 'Calls main'],
        a: 0,
        e: 'It skips remaining body code only.',
      },
    ],
  },

  // ── Functions
  {
    key: 'pg-fn-01',
    unit: 'Functions & Scope',
    title: 'Functions and Return Values',
    level: 'basic',
    body:
      'A function is a named block taking parameters and returning a value; its parameters and locals live on the stack. A well-factored function is small, does one thing, and is testable on its own.',
    qs: [
      {
        p: 'Function parameters are passed on:',
        c: ['The stack', 'The heap', 'Flash', 'Registers first, then stack typically'],
        a: 0,
        e: 'Args use registers with spill to the stack.',
      },
    ],
  },
  {
    key: 'pg-fn-02',
    unit: 'Functions & Scope',
    title: 'Pass by Value',
    level: 'basic',
    body:
      'C passes arguments by value: the callee gets a copy. Modifying a parameter inside a function does not change the caller\u2019s variable. To change caller state you pass a pointer.',
    qs: [
      {
        p: 'In C, function arguments are passed:',
        c: ['By value (a copy)', 'By reference always', 'By name', 'Through globals'],
        a: 0,
        e: 'Copies are made; pointers give reference behavior.',
      },
    ],
  },
  {
    key: 'pg-fn-03',
    unit: 'Functions & Scope',
    title: 'Prototypes and Headers',
    level: 'intermediate',
    body:
      'A prototype declares a function\u2019s signature before use, so the compiler checks calls. Headers (.h) hold prototypes and type definitions; one source file (.c) compiles to one object; the linker joins them. Header hygiene prevents ODR-style surprises.',
    qs: [
      {
        p: 'A function prototype is needed because:',
        c: ['The compiler checks argument types before the definition appears', 'The linker refuses ELF otherwise', 'Debuggers require it', 'Flash demands it'],
        a: 0,
        e: 'Prototypes enable compile-time type checking of calls.',
      },
    ],
  },
  {
    key: 'pg-fn-04',
    unit: 'Functions & Scope',
    title: 'Static Functions',
    level: 'intermediate',
    body:
      'static on a file-scope function or variable limits it to that translation unit — the link-time equivalent of private. It prevents name collisions and hides implementation details of a module.',
    qs: [
      {
        p: 'A static function is visible:',
        c: ['Only within its source file', 'To all files', 'Externally', 'Only to main'],
        a: 0,
        e: 'File-local symbol visibility.',
      },
    ],
  },
  {
    key: 'pg-fn-05',
    unit: 'Functions & Scope',
    title: 'Recursion',
    level: 'advanced',
    body:
      'A recursive function calls itself with a smaller problem until a base case. Elegant for trees and parsing, but each call burns stack — on a 2 KB RAM MCU deep recursion overflows silently. Prefer iterative versions in constrained systems.',
    qs: [
      {
        p: 'The danger of recursion in embedded code is:',
        c: ['Stack exhaustion', 'Slower math always', 'The linker failing', 'Floating point'],
        a: 0,
        e: 'Every frame uses stack; depth can overflow.',
      },
    ],
  },
  {
    key: 'pg-fn-06',
    unit: 'Functions & Scope',
    title: 'Inline and Speed',
    level: 'intermediate',
    body:
      'inline suggests the compiler substitute the body at the call site, saving call overhead at the price of code size. Modern compilers inline by themselves; let them, and reserve inline for hot tiny helpers.',
    qs: [
      {
        p: 'Inlining a function tends to:',
        c: ['Increase code size, reduce call overhead', 'Reduce code size', 'Slow execution', 'Add a stack frame'],
        a: 0,
        e: 'Copies the body; trades size for speed.',
      },
    ],
  },

  // ── Arrays & C Strings
  {
    key: 'pg-ar-01',
    unit: 'Arrays & Strings',
    title: 'Simple Arrays',
    level: 'basic',
    body:
      'An array stores N elements of one type contiguously: uint8_t buf[64]. Indexing from 0: buf[0] is first, buf[63] is last. Array access is pointer arithmetic under the hood: buf[i] is *(buf + i).',
    qs: [
      {
        p: 'uint8_t buf[64] has valid indices:',
        c: ['0 to 63', '1 to 64', '0 to 64', '31 to 63'],
        a: 0,
        e: 'Indices run 0..N−1.',
      },
    ],
  },
  {
    key: 'pg-ar-02',
    unit: 'Arrays & Strings',
    title: 'Bound Checking Is Yours',
    level: 'advanced',
    body:
      'C does not check array bounds; writing buf[100] on a 64-byte buffer silently corrupts adjacent memory. This is the root of most C vulnerabilities (buffer overruns). You are the bounds checker.',
    qs: [
      {
        p: 'Writing past an array end in C:',
        c: ['Corrupts adjacent memory silently', 'Always traps', 'Resizes the array', 'Prints a warning'],
        a: 0,
        e: 'No runtime check — the memory you hit is changed.',
      },
    ],
  },
  {
    key: 'pg-ar-03',
    unit: 'Arrays & Strings',
    title: 'C Strings Are Char Arrays',
    level: 'basic',
    body:
      'A C string is a char array ending in a \'\\0\' terminator. "Hi" occupies 3 bytes: \'H\', \'i\', 0. Copying, length, and concat all scan until the NUL. Forget NUL and memory walks off the end.',
    qs: [
      {
        p: 'The C string "Hi" occupies:',
        c: ['3 bytes', '2 bytes', '1 byte', '4 bytes'],
        a: 0,
        e: 'H, i, and the NUL terminator.',
      },
    ],
  },
  {
    key: 'pg-ar-04',
    unit: 'Arrays & Strings',
    title: 'String Functions and Safety',
    level: 'intermediate',
    body:
      'strcpy/strcat are unsafe — they run until NUL, so the destination can overflow. Use bounded variants: strncpy/strncat (careful: strncpy may omit NUL) or better snprintf. `strncpy(dst, src, sizeof(dst)); dst[sizeof(dst)-1] = 0;` for common patterns.',
    qs: [
      {
        p: 'The classic overflow with strcpy happens because:',
        c: ['It copies until the source NUL, ignoring the destination size', 'It adds padding', 'It uses the heap', 'It doubles bytes'],
        a: 0,
        e: 'No length argument: pure NUL-scan copy.',
      },
    ],
  },
  {
    key: 'pg-ar-05',
    unit: 'Arrays & Strings',
    title: 'snprintf for Formatting',
    level: 'intermediate',
    body:
      'snprintf writes a formatted string into a buffer with a hard size limit: snprintf(buf, sizeof(buf), "%d.%02d V", v/100, v%100). It always NUL-terminates (when size > 0). It abstracts away most string building.',
    qs: [
      {
        p: 'snprintf\u2019s key safety feature is:',
        c: ['A maximum buffer size argument', 'Faster output', 'Less flash', 'Automatic retry'],
        a: 0,
        e: 'It will not write more than the given size.',
      },
    ],
  },
  {
    key: 'pg-ar-06',
    unit: 'Arrays & Strings',
    title: 'Arrays Decay to Pointers',
    level: 'advanced',
    body:
      'Pass an array to a function and it "decays" to a pointer to its first element — the size information is lost inside the function. That is why functions need a length parameter: void fill(uint8_t *buf, size_t len).',
    qs: [
      {
        p: 'Passing an array to a function:',
        c: ['Decays to a pointer, size lost', 'Copies the whole array', 'Passes the size too', 'Always fails'],
        a: 0,
        e: 'The callee gets just a pointer to element 0.',
      },
    ],
  },
  {
    key: 'pg-ar-07',
    unit: 'Arrays & Strings',
    title: 'Multi-Dimensional Arrays',
    level: 'intermediate',
    body:
      'int m[4][6] is a 4×6 grid laid out row by row in memory (row-major). m[i][j] is at offset i*6 + j. Useful for image buffers and lookup tables; orientation mistakes corrupt the layout.',
    qs: [
      {
        p: 'Row-major means:',
        c: ['All of row 0 sits contiguously first', 'Columns come before rows', 'Data is interleaved', 'There is no order'],
        a: 0,
        e: 'Rows are contiguous runs in memory.',
      },
    ],
  },

  // ── Pointers & Memory
  {
    key: 'pg-ptr-01',
    unit: 'Pointers & Memory',
    title: 'What a Pointer Is',
    level: 'basic',
    body:
      'A pointer is a variable that holds an address. int *p; p = &x; *p reads the value at x. The * in a declaration says "pointer to"; the * in an expression dereferences. Addresses let code reach data without copying it.',
    qs: [
      {
        p: 'Given int x; int *p = &x; then *p is:',
        c: ['The value of x', 'The address of x', 'A copy of p', 'Undefined'],
        a: 0,
        e: 'Dereferencing p yields the object it points at.',
      },
    ],
  },
  {
    key: 'pg-ptr-02',
    unit: 'Pointers & Memory',
    title: 'Pointer Arithmetic',
    level: 'intermediate',
    body:
      'ptr + i advances by i * sizeof(*ptr) — the compiler scales for the type. Walking an array with a pointer is idiomatic: for (p = a; p < a + n; ++p). This is where C gets its speed on arrays.',
    qs: [
      {
        p: 'int *p; p += 1 advances by:',
        c: ['sizeof(int) bytes', '1 byte', '1 bit', 'sizeof(p) bytes'],
        a: 0,
        e: 'Scaling by the pointed-to type size.',
      },
    ],
  },
  {
    key: 'pg-ptr-03',
    unit: 'Pointers & Memory',
    title: 'Null Pointers',
    level: 'basic',
    body:
      'NULL is a pointer to nothing (0). Dereferencing NULL is a crash — on Cortex-M a BusFault. Check pointers from the outside world before use; every NULL you accept unchecked is a crash you invite.',
    qs: [
      {
        p: 'Dereferencing a NULL pointer:',
        c: ['Faults the processor', 'Returns zero safely', 'Is ignored', 'Allocates memory'],
        a: 0,
        e: 'Reading address 0 traps or corrupts.',
      },
    ],
  },
  {
    key: 'pg-ptr-04',
    unit: 'Pointers & Memory',
    title: 'Pointers to Pointers',
    level: 'advanced',
    body:
      'A pointer to a pointer (int **pp) is an address of a pointer. Needed when a function must change the caller\u2019s pointer itself (allocators), and it is the shape of argv[]. Double indirection confuses — annotate it clearly in memory diagrams.',
    qs: [
      {
        p: 'int **pp gives access to:',
        c: ['A pointer to a pointer to int', 'A double value', 'An int\u2019s high bits', 'A cast'],
        a: 0,
        e: 'Two levels of indirection.',
      },
    ],
  },
  {
    key: 'pg-ptr-05',
    unit: 'Pointers & Memory',
    title: 'Wild and Dangling Pointers',
    level: 'advanced',
    body:
      'A dangling pointer holds an address whose object has gone (freed stack frame, freed malloc). A wild pointer was never initialized. Both corrupt memory on use. Habit: set freed/out-of-scope pointers to NULL and re-check.',
    qs: [
      {
        p: 'A pointer to a function-local variable after return is:',
        c: ['Dangling', 'Valid', 'A literal', 'Static'],
        a: 0,
        e: 'The stack frame is gone; the address is invalid.',
      },
    ],
  },
  {
    key: 'pg-ptr-06',
    unit: 'Pointers & Memory',
    title: 'Function Pointers',
    level: 'advanced',
    body:
      'A function pointer names a function to call: void (*cb)(void) = myIsrHandler; cb();. The power: tables of handlers (state machine dispatch, command tables for CLI/UART). The risk: calling an invalid function pointer jumps to garbage.',
    qs: [
      {
        p: 'Function pointers enable:',
        c: ['Dispatch tables and callbacks', 'Only sorting numbers', 'Garbage collection', 'Larger integers'],
        a: 0,
        e: 'Runtime selection of what code runs.',
      },
    ],
  },
  {
    key: 'pg-ptr-07',
    unit: 'Pointers & Memory',
    title: 'Pointer-Cast Registers',
    level: 'intermediate',
    body:
      'Hardware registers are accessed via casted pointers: #define GPIOA ((volatile uint32_t *)0x48000000UL). The cast tells the compiler the address and type; volatile stops reordering. Every MMIO driver is pointer magic like this.',
    qs: [
      {
        p: 'MMIO macros work by:',
        c: ['Casting a numeric address to a volatile pointer', 'Calling the kernel', 'Using malloc', 'Reading a file'],
        a: 0,
        e: 'The address literal becomes a pointer you dereference.',
      },
    ],
  },

  // ── Heap
  {
    key: 'pg-hp-01',
    unit: 'Dynamic Memory',
    title: 'malloc and free',
    level: 'intermediate',
    body:
      'malloc(size) returns heap memory or NULL if none; free(ptr) returns it. Unused: leaks; double-free: corruption; use-after-free: undefined. On MCUs the heap is small and fragmentation real — prefer static buffers for steady workloads.',
    qs: [
      {
        p: 'malloc fails by returning:',
        c: ['NULL', 'Zero-filled memory', 'The last address', 'A trap'],
        a: 0,
        e: 'NULL means out of heap — check it.',
      },
    ],
  },
  {
    key: 'pg-hp-02',
    unit: 'Dynamic Memory',
    title: 'Fragmentation',
    level: 'advanced',
    body:
      'Repeated malloc/free of mixed sizes leaves small holes that are individually too small to satisfy new requests — the heap is "fragmented" yet mostly free. Chunky, uneven allocations are the classic cause; fixed-size pools dodge it.',
    qs: [
      {
        p: 'Fragmentation means:',
        c: ['Free space is scattered into unusable small gaps', 'No memory exists', 'The heap is too fast', 'RAM is fragmented off-chip'],
        a: 0,
        e: 'Many tiny free blocks that no request fits.',
      },
    ],
  },
  {
    key: 'pg-hp-03',
    unit: 'Dynamic Memory',
    title: 'Memory Pools',
    level: 'advanced',
    body:
      'A memory pool pre-splits a region into fixed-size blocks. Allocation is O(1) from a free list and cannot fragment. Best for network buffers and protocol stacks where sizes are bounded.',
    qs: [
      {
        p: 'A pool allocator eliminates:',
        c: ['Fragmentation', 'WAIT states', 'Heap overflow', 'Stack growth'],
        a: 0,
        e: 'Fixed blocks fit any request; no gaps.',
      },
    ],
  },

  // ── Structs & unions
  {
    key: 'pg-st-01',
    unit: 'Structs, Bitfields & Unions',
    title: 'Structs Group Data',
    level: 'basic',
    body:
      'A struct bundles related fields into one type: struct Sensor { uint16_t raw; uint8_t status; }. Access members with the dot operator. Structs make passing complex data clean and readable.',
    qs: [
      {
        p: 'Members of a struct variable are accessed with:',
        c: ['The dot operator', 'The arrow only', 'Pointer math', 'Array indexing'],
        a: 0,
        e: 's.member for structs; p->member for pointers.',
      },
    ],
  },
  {
    key: 'pg-st-02',
    unit: 'Structs, Bitfields & Unions',
    title: 'Struct Memory Layout and Padding',
    level: 'advanced',
    body:
      'Structs align members to their natural boundaries, inserting padding: {char, int} is 8 bytes on a 32-bit MCU, not 5. Reordering members by size cuts waste, and packed structs (GNU attribute) turn off padding for wire formats.',
    qs: [
      {
        p: 'struct { char a; uint32_t b; } on a 32-bit MCU is:',
        c: ['8 bytes with padding', '5 bytes', '4 bytes', '1 byte'],
        a: 0,
        e: 'The int aligns to 4, padding after the char.',
      },
    ],
  },
  {
    key: 'pg-st-03',
    unit: 'Structs, Bitfields & Unions',
    title: 'Bit Fields in Registers',
    level: 'intermediate',
    body:
      'Bit fields name sub-bit register fields: struct { uint8_t en:1; uint8_t mode:2; } cfg; Their layout is compiler-defined — fine for readability, dangerous for ABI. For hardware control use explicit masks/shifts instead.',
    qs: [
      {
        p: 'Bit fields make register fields readable but:',
        c: ['Their layout is implementation-defined', 'They are always faster', 'They remove the register', 'They use no memory'],
        a: 0,
        e: 'Layout/A.B.I. isn\u2019t standardized across compilers.',
      },
    ],
  },
  {
    key: 'pg-st-04',
    unit: 'Structs, Bitfields & Unions',
    title: 'Unions Reuse Memory',
    level: 'intermediate',
    body:
      'A union overlaps its members in memory: sizeof is the largest member. Cast the same bytes as bytes, uint16_t, or float. Protocols love unions to decode raw frames; the risk is reading the wrong interpretation.',
    qs: [
      {
        p: 'A union\u2019s size equals:',
        c: ['Its largest member', 'The sum of members', 'The first member', 'Zero'],
        a: 0,
        e: 'All members share one region sized for the biggest.',
      },
    ],
  },
  {
    key: 'pg-st-05',
    unit: 'Structs, Bitfields & Unions',
    title: 'Enums for States',
    level: 'basic',
    body:
      'enum gives names to integer constants: enum State { IDLE, RUN, FAULT };. In C an enum is int-sized; its values are compile-time. Enums beat magic numbers for state machines and options.',
    qs: [
      {
        p: 'After enum Color { RED, GREEN, BLUE }; the value of RED is:',
        c: ['0', '1', '2', 'Undefined'],
        a: 0,
        e: 'Enumerators start at 0 by default.',
      },
    ],
  },
  {
    key: 'pg-st-06',
    unit: 'Structs, Bitfields & Unions',
    title: 'typedef for Crisp Types',
    level: 'intermediate',
    body:
      'typedef invents aliases: typedef struct {...} sensor_t; makes declarations short. It does not create a new type — just a name. Use it for function-pointer signatures and hardware types to keep code readable.',
    qs: [
      {
        p: 'typedef declares:',
        c: ['An alias for an existing type', 'A new distinct type', 'A macro', 'A function'],
        a: 0,
        e: 'Alias only; the underlying type is unchanged.',
      },
    ],
  },

  // ── Storage & Preprocessor
  {
    key: 'pg-ss-01',
    unit: 'Storage Classes & Preprocessor',
    title: 'Automatic vs Static Storage',
    level: 'intermediate',
    body:
      'Local variables are automatic: born at entry, dead at exit, living on the stack. static locals live for the program\u2019s lifetime in RAM, retaining values between calls — one shared copy, initialized once.',
    qs: [
      {
        p: 'A static local variable persists:',
        c: ['Across all calls of the function', 'Only one call', 'In registers', 'In the cache'],
        a: 0,
        e: 'Static locals keep their value between invocations.',
      },
    ],
  },
  {
    key: 'pg-ss-02',
    unit: 'Storage Classes & Preprocessor',
    title: 'Global Variables and extern',
    level: 'intermediate',
    body:
      'A global defined in one .c used in another needs extern in the other: extern int g_counter;. Globals are shared memory — convenient, and the cause of coupling and race bugs. Prefer passed state where feasible.',
    qs: [
      {
        p: 'extern declares a variable that:',
        c: ['Is defined elsewhere, and shared', 'Is new here', 'Is const', 'Lives on the stack'],
        a: 0,
        e: 'extern = "it exists in another translation unit".',
      },
    ],
  },
  {
    key: 'pg-ss-03',
    unit: 'Storage Classes & Preprocessor',
    title: 'const for Protection',
    level: 'intermediate',
    body:
      'const promises the value will not change: read-only tables live in flash; pointers to const devices cannot be clobbered by mistake. const is a compile-time promise — the compiler enforces it (and can place data in ROM).',
    qs: [
      {
        p: 'const int table[] will typically be placed:',
        c: ['In read-only flash', 'On the stack', 'In the heap', 'In the cache'],
        a: 0,
        e: 'Const data can live in flash/ROM.',
      },
    ],
  },
  {
    key: 'pg-ss-04',
    unit: 'Storage Classes & Preprocessor',
    title: 'The Preprocessor',
    level: 'basic',
    body:
      'Before compilation, the preprocessor handles #include (paste file), #define (text substitution), #ifdef/#if (conditional compilation), #error. Macros are dangerous because they operate on tokens, not types — parentheses everything.',
    qs: [
      {
        p: '#define SQUARE(x) x*x with SQUARE(2+3) yields:',
        c: ['11', '25', '5', 'compile error'],
        a: 0,
        e: '2+3*2+3 = 11. Token substitution, no parentheses.',
      },
    ],
  },
  {
    key: 'pg-ss-05',
    unit: 'Storage Classes & Preprocessor',
    title: 'Include Guards',
    level: 'basic',
    body:
      'Headers can be included from many files; without a guard the types get declared twice. #ifndef FOO_H / #define FOO_H / ... / #endif prevents re-inclusion. Modern compilers also take #pragma once.',
    qs: [
      {
        p: 'An include guard prevents:',
        c: ['Double definition from repeated inclusion', 'Linker crashes', 'Slow compiles', 'Flash overflow'],
        a: 0,
        e: 'Multiple inclusion is rendered harmless.',
      },
    ],
  },
  {
    key: 'pg-ss-06',
    unit: 'Storage Classes & Preprocessor',
    title: 'Conditional Compilation',
    level: 'intermediate',
    body:
      '#ifdef DEBUG enables debug builds; #if defined(STM32F4) selects per-chip code; #if (F_CPU == 16000000UL) tunes timing constants. Kept out of production paths, conditionals ship deltas cleanly.',
    qs: [
      {
        p: 'Conditional compilation lets you:',
        c: ['Compile different code for different targets/configs', 'Run code twice', 'Skip linking', 'Erase flash'],
        a: 0,
        e: 'Preprocessor selects code blocks at build time.',
      },
    ],
  },

  // ── Embedded C Patterns
  {
    key: 'pg-emb-01',
    unit: 'Embedded C Patterns',
    title: 'Polling a Register',
    level: 'basic',
    body:
      'Polling spins in a loop checking a status bit: while (!(SR & RXNE));. Simple and greedy — CPU burns waiting. For short waits it beats setup complexity; for long waits use interrupts or DMA.',
    qs: [
      {
        p: 'Polling involves the CPU:',
        c: ['Spinning on a status flag', 'Doing other work', 'Sleeping deeply', 'Calling the OS'],
        a: 0,
        e: 'Busy-wait: check, check, check.',
      },
    ],
  },
  {
    key: 'pg-emb-02',
    unit: 'Embedded C Patterns',
    title: 'The Interrupt Handler Shape',
    level: 'intermediate',
    body:
      'ISRs should: disable the source, clear flags, act quickly, enable again. Share data with the main loop through volatile flags or queues. Never block (no long loops or malloc) inside an ISR.',
    qs: [
      {
        p: 'Inside an ISR you should avoid:',
        c: ['Long blocking work and malloc', 'Clearing flags', 'Writing volatile markers', 'Returning'],
        a: 0,
        e: 'Blocking starves other interrupts.',
      },
    ],
  },
  {
    key: 'pg-emb-03',
    unit: 'Embedded C Patterns',
    title: 'volatile Between ISR and Loop',
    level: 'intermediate',
    body:
      'A flag shared between an ISR and the main loop must be volatile: the main loop must re-read it each iteration, not keep it in a register. Without volatile the compiler may never notice the change.',
    qs: [
      {
        p: 'Shared ISR flag variables must be:',
        c: ['volatile', 'static const', 'register', 'extern inline'],
        a: 0,
        e: 'volatile forces fresh reads each access.',
      },
    ],
  },
  {
    key: 'pg-emb-04',
    unit: 'Embedded C Patterns',
    title: 'Simple State Machines',
    level: 'intermediate',
    body:
      'A state machine is a switch on a state variable, returning a new state: driving buttons, protocols, and UI all reduce to this. Draw the state diagram first; the code then falls out mechanically.',
    qs: [
      {
        p: 'State machines are suited for:',
        c: ['Protocols, buttons, and sequence-driven code', 'Number crunching', 'Deep recursion', 'Display gradients'],
        a: 0,
        e: 'Discrete states + events = sequence control.',
      },
    ],
  },
  {
    key: 'pg-emb-05',
    unit: 'Embedded C Patterns',
    title: 'Ring Buffers',
    level: 'intermediate',
    body:
      'A ring buffer is a fixed array with head and tail indices that wrap. UART RX → main loop RX consume through one. Always leave one slot free or track full vs empty — the classic off-by-one.',
    qs: [
      {
        p: 'A ring buffer is ideal for:',
        c: ['An ISR writing, the main loop reading', 'Sorting arrays', 'Bool toggles', 'Constant tables'],
        a: 0,
        e: 'Produces and consumers decouple at different rates.',
      },
    ],
  },
  {
    key: 'pg-emb-06',
    unit: 'Embedded C Patterns',
    title: 'Command Parsers',
    level: 'intermediate',
    body:
      'A UART CLI parser tokenizes a line, matches a command table (name + handler), and calls back. Function-pointer tables make adding commands a one-line affair — the bridge between a debug console and firmware.',
    qs: [
      {
        p: 'A command table pairs each command name with:',
        c: ['A handler function', 'An LED', 'A heap block', 'A struct copy'],
        a: 0,
        e: 'Match name → call the bound routine.',
      },
    ],
  },
  {
    key: 'pg-emb-07',
    unit: 'Embedded C Patterns',
    title: 'Watchdog Kicking Patterns',
    level: 'advanced',
    body:
      'Kick the watchdog once per main-loop cycle via a flag set by tasks after they finish a unit of work. Kicking from one happy path hides a hung task. Per-task checking catches real stalls.',
    qs: [
      {
        p: 'To catch individual hung tasks, the watchdog:',
        c: ['Should be kicked only when every task reports progress', 'Should always be kicked in main', 'Should be disabled', 'Is unrelated to tasks'],
        a: 0,
        e: 'A healthy-everywhere signal resets the timer.',
      },
    ],
  },

  // ── Data structures
  {
    key: 'pg-ds-01',
    unit: 'Data Structures in C',
    title: 'Linked Lists',
    level: 'intermediate',
    body:
      'A linked list nodes hold data + a next pointer. Insert/delete are O(1) once located, but traversal is sequential and nodes need allocator or pool management. Doubly-linked lists add a prev pointer for back-walks.',
    qs: [
      {
        p: 'A singly-linked list node contains:',
        c: ['Data plus a next pointer', 'Two data values', 'An array', 'A function'],
        a: 0,
        e: 'Data + forward link is the minimal node.',
      },
    ],
  },
  {
    key: 'pg-ds-02',
    unit: 'Data Structures in C',
    title: 'Queues and Stacks',
    level: 'intermediate',
    body:
      'A stack is last-in-first-out (push/pop, one end); a queue is first-in-first-out (enqueue at tail, dequeue at head). Both are trivial arrays in C with an index — and ring-buffer versions are thread-capable with care.',
    qs: [
      {
        p: 'A stack serves items in:',
        c: ['LIFO order', 'FIFO order', 'Random order', 'Sorted order'],
        a: 0,
        e: 'Last pushed, first popped.',
      },
    ],
  },
  {
    key: 'pg-ds-03',
    unit: 'Data Structures in C',
    title: 'Hash Tables and Lookups',
    level: 'advanced',
    body:
      'A hash table maps keys to slots by hashing: average O(1) lookups. Collisions need chaining (linked lists per slot) or open addressing. For fixed small key sets, a sorted array of {name→value} with binary search beats it.',
    qs: [
      {
        p: 'The average lookup in a well-proportioned hash table is:',
        c: ['O(1)', 'O(n)', 'O(log n)', 'Impossible'],
        a: 0,
        e: 'Direct hashing reaches the slot immediately on average.',
      },
    ],
  },
  {
    key: 'pg-ds-04',
    unit: 'Data Structures in C',
    title: 'Binary Search',
    level: 'intermediate',
    body:
      'On a sorted array, binary search halves the search range each step: O(log n). Lookup tables, calibration curves, and command parsers all benefit. Mis-stated mid-points are the classic bug: mid = low + (high−low)/2.',
    qs: [
      {
        p: 'Binary search on 1024 sorted items takes about:',
        c: ['10 comparisons', '512 comparisons', '1024 comparisons', '1 comparison'],
        a: 0,
        e: 'log2(1024) = 10.',
      },
    ],
  },
  {
    key: 'pg-ds-05',
    unit: 'Data Structures in C',
    title: 'Sorting in Embedded',
    level: 'intermediate',
    body:
      'Insertion sort is stable and fast on near-sorted small arrays; quicksort is O(n log n) typical but recurses (stack!). For tiny matrices a fixed-size pointer sort beats cleverness. Measure, then sort.',
    qs: [
      {
        p: 'Quicksort\u2019s embedded risk is:',
        c: ['Recursion depth / stack use', 'Too slow for one item', 'Needing floats', 'An extra UART'],
        a: 0,
        e: 'Its recursion burns stack on bad pivots.',
      },
    ],
  },
  {
    key: 'pg-ds-06',
    unit: 'Data Structures in C',
    title: 'Lookup Tables over Math',
    level: 'intermediate',
    body:
      'Computed values (sine, sqrt, gain curves) can be precomputed into const tables in flash. Lookup + interpolation beats transcendental libraries on speed. Precision is bounded by table size; choose bins wisely.',
    qs: [
      {
        p: 'LUTs replace expensive math with:',
        c: ['An indexed flash read', 'A malloc', 'A division', 'A longer loop'],
        a: 0,
        e: 'Precomputed answers are fetched, not computed.',
      },
    ],
  },

  // ── Toolchain details
  {
    key: 'pg-tc-01',
    unit: 'The Toolchain',
    title: 'Compiler Optimizations',
    level: 'intermediate',
    body:
      '-O0 debugs cleanly; -O2 is fast; -Os shrinks flash; they trade off debug-ability, speed, and size. Optimized code reorders and inlines — debuggers can lie (variables optimized out). Debug at -O0, ship at -Os/-O2.',
    qs: [
      {
        p: 'Optimized builds make the debugger:',
        c: ['Report variables as optimized-out', 'More accurate', 'Faster always', 'Skip breakpoints ever'],
        a: 0,
        e: 'Registers/reordering hide values.',
      },
    ],
  },
  {
    key: 'pg-tc-02',
    unit: 'The Toolchain',
    title: 'Object Files and Linking',
    level: 'intermediate',
    body:
      'gcc -c makes .o per source; the linker resolves extern references between .o files and libraries (libc). Your %s printf bloats flash if it pulls the full float path — know what your toolchain bundles.',
    qs: [
      {
        p: 'The linker\u2019s job is:',
        c: ['Resolving symbols across object files into one image', 'Compiling C to asm', 'Formatting source', 'Resetting the MCU'],
        a: 0,
        e: 'It stitches objects and checks every reference.',
      },
    ],
  },
  {
    key: 'pg-tc-03',
    unit: 'The Toolchain',
    title: 'The Linker Script',
    level: 'advanced',
    body:
      'The linker script (.ld) maps sections to addresses: FLASH for .text/.rodata, RAM for .data/.bss, and the stack/heap regions. Wrong RAM origin → silent memory chaos. Reading yours explains where everything landed.',
    qs: [
      {
        p: 'The RAM regions in a linker script define:',
        c: ['Where .data/.bss/stack live in RAM', 'Only flash size', 'CPU speed', 'The clock tree'],
        a: 0,
        e: 'It draws the memory map for data and stack.',
      },
    ],
  },
  {
    key: 'pg-tc-04',
    unit: 'The Toolchain',
    title: 'Memory Sizes with nm/size',
    level: 'advanced',
    body:
      'arm-none-eabi-size your.elf reports text/data/bss sizes; nm lists symbols with addresses. These tools tell you where flash and RAM went without guessing — the first step of shrinking a bloated firmware.',
    qs: [
      {
        p: 'The size utility reports:',
        c: ['text, data, and bss usage', 'CPU usage', 'Battery life', 'Source lines'],
        a: 0,
        e: 'Flash (text) and RAM (data+bss) footprints.',
      },
    ],
  },
  {
    key: 'pg-tc-05',
    unit: 'The Toolchain',
    title: 'Make and Build Systems',
    level: 'basic',
    body:
      'Make runs recipes when sources change: file.o depends on file.c and headers. Modern CMake generates from one description that also configures debugging and flashing. Learn one build system and you control the whole toolchain.',
    qs: [
      {
        p: 'Make rebuilds an object only when:',
        c: ['Its source or headers changed', 'Always', 'On battery charge', 'The linker runs'],
        a: 0,
        e: 'Timestamp dependency tracking skips unchanged work.',
      },
    ],
  },
  {
    key: 'pg-tc-06',
    unit: 'The Toolchain',
    title: 'Static Analysis',
    level: 'advanced',
    body:
      'Compilers emit warnings; analyzers (cppcheck, clang-tidy) catch real bugs — use of uninitialized variables, leaks, dead branches. Treat warnings as errors (-Werror) from day one; a clean warning build is a quieter mind.',
    qs: [
      {
        p: 'Static analyzers find bugs:',
        c: ['Without running the program', 'By executing slowly', 'In the hardware only', 'After release only'],
        a: 0,
        e: 'They model code paths statically.',
      },
    ],
  },
  {
    key: 'pg-tc-07',
    unit: 'The Toolchain',
    title: 'GDB and Core Dumps',
    level: 'intermediate',
    body:
      'GDB attaches to running target, reads registers/memory, sets breakpoints, and inspects stacks. A saved core/backtrace from a fault shows the crash call chain. On embedded, that means: print the stacked PC and hardware fault registers.',
    qs: [
      {
        p: 'A backtrace shows:',
        c: ['The call chain leading to the fault', 'Remaining battery', 'The clock frequency', 'A color palette'],
        a: 0,
        e: 'Stack frames reconstruct the call path.',
      },
    ],
  },

  // ── Advanced C
  {
    key: 'pg-ad-01',
    unit: 'Advanced C',
    title: 'Strict Aliasing',
    level: 'advanced',
    body:
      'C assumes pointers of different types do not point to the same memory (strict aliasing). Type-punning via casts breaks it and the optimizer does unpredictable things. Copy through memcpy or use a union instead.',
    qs: [
      {
        p: 'Type-punning float bits to uint32_t is safe via:',
        c: ['memcpy or a union', 'A raw cast in most compilers', 'Division', 'A struct'],
        a: 0,
        e: 'memcpy/union avoid the strict-aliasing trap.',
      },
    ],
  },
  {
    key: 'pg-ad-02',
    unit: 'Advanced C',
    title: 'Endianness and Marshaling',
    level: 'advanced',
    body:
      'Little-endian (x86, ARM) stores low byte first; big-endian stores high byte first. Splitting a uint16_t into bytes differs by endianness, so wire formats mandate a byte order — build frames with explicit shift/byte ops, never by casting.',
    qs: [
      {
        p: 'In little-endian, uint16_t 0x1234 in memory looks like:',
        c: ['0x34 then 0x12', '0x12 then 0x34', '0x34 twice', 'Randomly arranged'],
        a: 0,
        e: 'Least-significant byte at the lowest address.',
      },
    ],
  },
  {
    key: 'pg-ad-03',
    unit: 'Advanced C',
    title: 'Checksums and CRCs',
    level: 'intermediate',
    body:
      'Errors on a serial link are caught by checksums (sums/XOR, weak) or CRCs (polynomial division, strong against burst errors). Compute a CRC over the frame; compare at the receiver. Embedded frames always carry one.',
    qs: [
      {
        p: 'CRC is much better than a plain checksum because:',
        c: ['It catches burst errors more reliably', 'It is faster to sum', 'It uses less flash', 'It ignores bytes'],
        a: 0,
        e: 'Polynomial math detects multiply corrupted bits.',
      },
    ],
  },
  {
    key: 'pg-ad-04',
    unit: 'Advanced C',
    title: 'Bounded Copy Idioms',
    level: 'intermediate',
    body:
      'When copying untrusted input, always bound it: memcpy(dst, src, MIN(len, sizeof(dst))), or use snprintf. Every unbounded copy of external data is a memory-corruption hole. Validate lengths before casting.',
    qs: [
      {
        p: 'Copying untrusted data safely requires:',
        c: ['A size limit checked first', 'A delay', 'volatile', 'A global variable'],
        a: 0,
        e: 'Bound the destination capacity explicitly.',
      },
    ],
  },
  {
    key: 'pg-ad-05',
    unit: 'Advanced C',
    title: 'Integer Promotion Rules',
    level: 'advanced',
    body:
      'Small integer types promote to int in arithmetic: uint8_t a=200, b=55; a+b is computed as int 255, not wrapped at 8 bits. Assigning back may truncate. Beware when mixing signed/unsigned — promote or cast deliberately.',
    qs: [
      {
        p: 'uint8_t 200 + uint8_t 55 evaluates as:',
        c: ['int 255', 'uint8_t 255', 'int 45', 'uint16_t 45'],
        a: 0,
        e: 'Integer promotion makes it an int expression.',
      },
    ],
  },
  {
    key: 'pg-ad-06',
    unit: 'Advanced C',
    title: 'Assertions in Firmware',
    level: 'advanced',
    body:
      '#include <assert.h>; assert(x != NULL) aborts on failure in debug builds. In production, replace asserts with log-and-reset handlers so a bad invariant surfaces in the field instead of silently corrupting.',
    qs: [
      {
        p: 'An assertion failing in a debug build:',
        c: ['Aborts and reports the condition', 'Continues silently', 'Retries forever', 'Clears RAM'],
        a: 0,
        e: 'It halts with the failed expression.',
      },
    ],
  },
// ── Numbers, k/n issues and practice
  {
    key: 'pg-num-01',
    unit: 'Numerical Computing in C',
    title: 'Fixed-Point Arithmetic',
    level: 'intermediate',
    body:
      'MCUs without FPUs do math in fixed point: store 12.34 as 1234000 (scale 1e-4) and shift after multiplies. Add/subtract must share scale; multiply then shift. Fixed point is deterministic, tiny, and surprisingly precise with care.',
    qs: [
      {
        p: 'Fixed-point multiply needs a:',
        c: ['Down-shift after the product', 'Double for the divisor', 'Float cast always', 'Log'],
        a: 0,
        e: 'Scaling compounds in products; undo it.',
      },
    ],
  },
  {
    key: 'pg-num-02',
    unit: 'Numerical Computing in C',
    title: 'Floating-Point Pitfalls',
    level: 'intermediate',
    body:
      'Float has ~7 significant digits and rounding at every operation: `0.1 + 0.2 != 0.3`. Compare with tolerances, never with ==. Summing many small floats drifts — accumulate at higher precision or order the additions.',
    qs: [
      {
        p: 'Comparing two floats for equality is wrong because:',
        c: ['Rounding makes exact equality rare', 'They are too big', 'Of the sign bit', 'They are integers'],
        a: 0,
        e: 'Binary floats cannot represent many decimals exactly.',
      },
    ],
  },
  {
    key: 'pg-num-03',
    unit: 'Numerical Computing in C',
    title: 'Averaging Sensors Without Overflow',
    level: 'intermediate',
    body:
      'Averaging raw ADC values naively overflows a uint16_t sum. Options: accumulate in a wider type, sum then divide, or use a moving average that never stores the total. Box-car filters trade memory for steadiness.',
    qs: [
      {
        p: 'Summing 256 uint16_t samples overflows:',
        c: ['uint16_t', 'uint32_t always', 'Never overflows any type', 'float if used'],
        a: 0,
        e: '256×65535 exceeds 65535 — widen first.',
      },
    ],
  },
  {
    key: 'pg-num-04',
    unit: 'Numerical Computing in C',
    title: 'Lookup Interpolation',
    level: 'advanced',
    body:
      'Pulling a value from a table between entries needs interpolation: linear (x-x0)/(x1-x0) scaling, or splines for smoothness. Table density balances flash cost and precision. Interpolation is an LUT superpower.',
    qs: [
      {
        p: 'Linear interpolation between table points:',
        c: ['Weighted average by x-position', 'Picks the nearest', 'Extrapolates wildly', 'Rounds to bin'],
        a: 0,
        e: 'Blend the bracketing samples.',
      },
    ],
  },
  {
    key: 'pg-num-05',
    unit: 'Numerical Computing in C',
    title: 'Unit Conversions and Scaling',
    level: 'intermediate',
    body:
      'Sensor raw → engineering units is scaling plus offset, done in a fixed scale to avoid float. Keep the conversion integer: value_temp = (raw * 1000) / fullscale. Document the scale factor next to the constant.',
    qs: [
      {
        p: 'Scaling raw to units with integers needs:',
        c: ['A chosen scale factor kept constant everywhere', 'Floats only', 'No math', 'A random offset'],
        a: 0,
        e: 'Beware overflow when you multiply first.',
      },
    ],
  },

  // ── Code quality
  {
    key: 'pg-qa-01',
    unit: 'Code Quality & Teams',
    title: 'Naming Conventions',
    level: 'basic',
    body:
      'Names carry the design: uart_send_bytes vs q. Consistent prefixes signal scope; verbs for functions, nouns for types. Bad names hide intent; good names make code read like prose.',
    qs: [
      {
        p: 'Good names should communicate:',
        c: ['Intent and role of the entity', 'Line numbers', 'Compiler version', 'Button positions'],
        a: 0,
        e: 'Self-documenting code has fewer defects.',
      },
    ],
  },
  {
    key: 'pg-qa-02',
    unit: 'Code Quality & Teams',
    title: 'Error Handling Strategy',
    level: 'intermediate',
    body:
      'Every failure has a job: return a status enum, set a module error register, or halt. Silent failures are the worst — they multiply. Standardize: check the return, log once, recover gracefully.',
    qs: [
      {
        p: 'The worst error handling is:',
        c: ['Ignoring the error silently', 'Logging loudly', 'Retrying twice', 'Blocking forever'],
        a: 0,
        e: 'Silence makes the failure unreachable to debugging.',
      },
    ],
  },
  {
    key: 'pg-qa-03',
    unit: 'Code Quality & Teams',
    title: 'Code Reviews',
    level: 'basic',
    body:
      'A second set of eyes finds logic errors and spec mismatches the writer cannot see. Reviews work best on small diffs with the author\u2019s notes attached. They are a quality gate, not a chore.',
    qs: [
      {
        p: 'Reviews catch:',
        c: ['Bugs and misunderstandings a lone author misses', 'Only typos', 'Hardware faults', 'Nothing'],
        a: 0,
        e: 'Fresh perspective beats self-review.',
      },
    ],
  },
  {
    key: 'pg-qa-04',
    unit: 'Code Quality & Teams',
    title: 'Refactoring Without Fear',
    level: 'intermediate',
    body:
      'Refactor in tiny steps with tests between each: rename, extract, remove duplication — then verify. Big-bang rewrites are where projects die. Refactors are safe when the tests stay green.',
    qs: [
      {
        p: 'Safe refactoring requires:',
        c: ['Small steps with tested checkpoints', 'One giant rewrite', 'No verification', 'New hardware'],
        a: 0,
        e: 'Tiny, verified increments keep risk low.',
      },
    ],
  },
  {
    key: 'pg-qa-05',
    unit: 'Code Quality & Teams',
    title: 'Technical Debt',
    level: 'intermediate',
    body:
      'Quick hacks accrue interest: every shortcut slows the next change. Track debt deliberately (TODO sections, issue lists) instead of pretending it is gone. Repay it near the paths you touch often.',
    qs: [
      {
        p: 'Technical debt costs:',
        c: ['Future changes slowing down', 'More RAM', 'Flash overflow', 'Nothing'],
        a: 0,
        e: 'Unpaid shortcuts compound into rigid code.',
      },
    ],
  },
  {
    key: 'pg-qa-06',
    unit: 'Code Quality & Teams',
    title: 'Documentation that Works',
    level: 'basic',
    body:
      'Docs die when they drift from the code; keep them next to the change: comments on "why", header docs on contracts, and a README with the build. Outdated docs are worse than none — they lie confidently.',
    qs: [
      {
        p: 'Comments should explain mostly:',
        c: ['Why the code is this way', 'Every keyword', 'The compiler flags', 'The PCB layout'],
        a: 0,
        e: 'Intent survives; syntax does not need commentary.',
      },
    ],
  },
  {
    key: 'pg-qa-07',
    unit: 'Code Quality & Teams',
    title: 'Coding Standards',
    level: 'intermediate',
    body:
      'A coding standard (MISRA C for automotive, custom for teams) gives a shared language and catches risky idioms (deep recursion, unchecked malloc, unhandled returns). Enforcement happens in reviews and static checks, not good vibes.',
    qs: [
      {
        p: 'MISRA C mainly targets:',
        c: ['Safety-critical C subset with discipline', 'C++ classes', 'Python linting', 'Hardware layout'],
        a: 0,
        e: 'Restrict risky constructs for certifiable code.',
      },
    ],
  },
  {
    key: 'pg-qa-08',
    unit: 'Code Quality & Teams',
    title: 'Estimation and Planning',
    level: 'basic',
    body:
      'Estimate in effort, not hope: break work down, count unknowns as separate tasks, double the optimistic number. Overruns come from ignored unknowns and integration. The plan is a map, not a promise.',
    qs: [
      {
        p: 'Good estimates:',
        c: ['Account for unknowns separately', 'Always match reality', 'Are exact', 'Ignore integration'],
        a: 0,
        e: 'Uncertainty is a line item, not a surprise.',
      },
    ],
  },
  {
    key: 'pg-qa-09',
    unit: 'Code Quality & Teams',
    title: 'Version Control Discipline',
    level: 'basic',
    body:
      'Commit small, logical changes with messages that say why; branch per feature; tag releases. A recoverable history turns "I broke everything" into "git revert". History is the project\u2019s memory.',
    qs: [
      {
        p: 'Small commits help by:',
        c: ['Isolating changes for review and revert', 'Slowing the build', 'Storing secrets', 'Hiding bugs'],
        a: 0,
        e: 'Surgical history = cheaper debugging.',
      },
    ],
  },
  {
    key: 'pg-qa-10',
    unit: 'Code Quality & Teams',
    title: 'CI for Firmware',
    level: 'advanced',
    body:
      'Continuous integration builds every commit, runs unit tests, lint, and compiles release targets automatically. A red build is the team\u2019s first symptom of a broken change — catch it at commit time, not release time.',
    qs: [
      {
        p: 'CI runs checks:',
        c: ['On every commit automatically', 'Only at release', 'Manually per developer', 'Never'],
        a: 0,
        e: 'Continuous feedback on each change.',
      },
    ],
  },
  {
    key: 'pg-qa-11',
    unit: 'Code Quality & Teams',
    title: 'Hex File Hygiene',
    level: 'intermediate',
    body:
      'Release binaries should be reproducible: identical inputs → identical output, recorded source, version, and checksum. Sign images and document the offset. A reproducible build is the only honest release.',
    qs: [
      {
        p: 'Reproducible builds help because:',
        c: ['Anyone can verify what ran on a device', 'They skip tests', 'They hide secrets', 'They are faster'],
        a: 0,
        e: 'Same source → identical firmware hash.',
      },
    ],
  },
];

let cache: GeneratedGroup | null = null;
export function programming(): GeneratedGroup {
  cache ??= build('programming', MODULES);
  return cache;
}