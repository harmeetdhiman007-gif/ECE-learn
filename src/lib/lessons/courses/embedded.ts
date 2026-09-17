import type { GeneratedGroup, ModuleSpec } from './presets.js';
import { build } from './presets.js';

const MODULES: ModuleSpec[] = [
  // ── MCU Basics
  {
    key: 'em-mcu-01',
    unit: 'MCU Fundamentals',
    title: 'Microcontroller vs Microprocessor',
    level: 'basic',
    body:
      'A microcontroller (MCU) integrates CPU, memory, and peripherals on one chip for control tasks — small, cheap, low power. A microprocessor (MPU) is just the CPU, needing external RAM/ROM; it runs full operating systems with far more throughput.',
    qs: [
      {
        p: 'A microcontroller typically includes on one chip:',
        c: ['CPU, RAM, flash, and peripherals', 'Only the CPU core', 'Only RAM', 'A GPU'],
        a: 0,
        e: 'Everything needed to boot and control lives on-die.',
      },
      {
        p: 'An MPU like a desktop CPU normally needs:',
        c: ['External RAM and storage', 'No power supply', 'Built-in peripherals', 'Nothing else'],
        a: 0,
        e: 'The processor core lives alone; memory is external.',
      },
    ],
  },
  {
    key: 'em-mcu-02',
    unit: 'MCU Fundamentals',
    title: 'ARM Cortex-M Overview',
    level: 'basic',
    body:
      'The Cortex-M family dominates embedded: M0+ (tiny/low power), M3/M4 (performance plus optional FPU and DSP), M7 (high-end). Register file, exception model, and Thumb-2 instructions are uniform, so code ports easily between vendors.',
    qs: [
      {
        p: 'Which Cortex-M is the smallest, lowest power?',
        c: ['M0+', 'M7', 'M4', 'A78'],
        a: 0,
        e: 'M0+ is the entry, minimal-feature core.',
      },
      {
        p: 'Cortex-M cores are examples of:',
        c: ['RISC processors', 'CISC processors', 'VLIW arrays', 'Analog computers'],
        a: 0,
        e: 'ARM is a leading RISC instruction-set architecture.',
      },
    ],
  },
  {
    key: 'em-mcu-03',
    unit: 'MCU Fundamentals',
    title: 'Program Memory and Data Memory',
    level: 'basic',
    body:
      'Code lives in flash (non-volatile, read-only at run time), data lives in SRAM (volatile, fast). Variables, stack, and heap all occupy SRAM; constants often live in flash. Small MCUs measure both: "64 KB flash, 16 KB RAM".',
    qs: [
      {
        p: 'Your compiled program is stored in:',
        c: ['Flash memory', 'SRAM', 'Registers', 'Only the cache'],
        a: 0,
        e: 'Flash holds code and survives power loss.',
      },
    ],
  },
  {
    key: 'em-mcu-04',
    unit: 'MCU Fundamentals',
    title: 'The Boot Process',
    level: 'intermediate',
    body:
      'On reset the core reads the initial stack pointer and the reset vector from the top of flash, then jumps to the startup code, which copies .data into RAM, zeroes .bss, and calls main(). Understanding the linker script explains "mysterious" memory maps.',
    qs: [
      {
        p: 'The reset vector points to:',
        c: ['The start of the firmware code', 'The end of RAM', 'A spare pin', 'The UART buffer'],
        a: 0,
        e: 'Vector table entry 0 is the code the CPU runs first.',
      },
    ],
  },
  {
    key: 'em-mcu-05',
    unit: 'MCU Fundamentals',
    title: 'Clock Sources: HSI, HSE, PLL',
    level: 'intermediate',
    body:
      'MCUs boot from an internal RC oscillator (HSI) and can switch to an external crystal (HSE) or a PLL for higher, accurate clocks. The clock tree then divides into bus, peripheral, and timer clocks. Wrong clock config = silent timing bugs.',
    qs: [
      {
        p: 'A PLL is used to:',
        c: ['Multiply a low-frequency reference up to a high clock', 'Store program data', 'Drive LEDs', 'Reset the CPU'],
        a: 0,
        e: 'Phase-locked loop multiplies the reference frequency.',
      },
    ],
  },
  {
    key: 'em-mcu-06',
    unit: 'MCU Fundamentals',
    title: 'Memory-Mapped I/O',
    level: 'basic',
    body:
      'Peripherals appear as plain memory addresses: writing 0x10 to the GPIO data register toggles pins. Each peripheral register has a base address plus offsets. Embedded C sets bits at these addresses — no magic, just memory.',
    qs: [
      {
        p: 'Controlling a hardware peripheral is done by:',
        c: ['Writing to memory-mapped registers', 'Sending smoke signals', 'Opening a database', 'Rebooting the chip'],
        a: 0,
        e: 'Peripheral registers sit in the CPU memory map.',
      },
    ],
  },

  // ── GPIO
  {
    key: 'em-io-01',
    unit: 'GPIO & Interfacing',
    title: 'GPIO Modes',
    level: 'basic',
    body:
      'GPIO pins can be inputs, outputs, or alternate-function (routed to UART/SPI/timer). Outputs are push-pull (strong high and low) or open-drain (only pulls low; external pull-up needed for high). Inputs have optional pull-up/pull-down resistors.',
    qs: [
      {
        p: 'Open-drain output can:',
        c: ['Only pull the line low', 'Only pull high', 'Both strongly', 'Drive short circuits'],
        a: 0,
        e: 'It sinks current and releases; a pull-up supplies high.',
      },
    ],
  },
  {
    key: 'em-io-02',
    unit: 'GPIO & Interfacing',
    title: 'Reading Buttons: Debouncing',
    level: 'basic',
    body:
      'Mechanical buttons bounce: contacts make and break for milliseconds, so one press reads as many edges. Debounce by sampling for a stable period (typically 10–50 ms) in software, or use an RC filter. No debounce = a random number of presses.',
    qs: [
      {
        p: 'The classic debounce interval is about:',
        c: ['10–50 ms', '1 ns', '1 s', 'One instruction'],
        a: 0,
        e: 'Mechanical bounce settles within tens of milliseconds.',
      },
    ],
  },
  {
    key: 'em-io-03',
    unit: 'GPIO & Interfacing',
    title: 'LED Drivers and Current Limits',
    level: 'basic',
    body:
      'MCU pins sink/source a rated current (often 8–20 mA). An LED wants ~20 mA at ~2 V forward drop, so a series resistor sets the current: R = (Vcc − Vf)/I. Exceed the pin limit and the port burns.',
    qs: [
      {
        p: 'For Vcc = 5 V, Vf = 2 V, driving 10 mA, R is:',
        c: ['300 ohms', '30 ohms', '700 ohms', '3 kohm'],
        a: 0,
        e: '(5 − 2)/0.01 = 300 ohms.',
      },
    ],
  },
  {
    key: 'em-io-04',
    unit: 'GPIO & Interfacing',
    title: '7-Segment Display Hookup',
    level: 'basic',
    body:
      'One 7-segment digit is eight LEDs in a package, driven as common-anode or common-cathode. Driving several digits at once uses multiplexing: light each digit for a few ms in rotation, fast enough that the eye persists.',
    qs: [
      {
        p: 'Multiplexed displays work because of:',
        c: ['Persistence of vision', 'LCD crystals', 'Power saving', 'Analog averaging circuits'],
        a: 0,
        e: 'Rapid per-digit cycling looks like a persistent image.',
      },
    ],
  },
  {
    key: 'em-io-05',
    unit: 'GPIO & Interfacing',
    title: 'Opto-isolators and Relays',
    level: 'intermediate',
    body:
      'To switch mains or noisy inductive loads, isolate the MCU: an opto-coupler transfers a signal with light, a relay switches with a coil. Always add a flyback diode across an inductive coil or the back-EMF spike kills the driver.',
    qs: [
      {
        p: 'The diode across a relay coil is called:',
        c: ['Flyback/freewheeling diode', 'Schottky clamp', 'Zener snubber', 'Reservoir diode'],
        a: 0,
        e: 'It safely absorbs the coil-induced voltage spike.',
      },
    ],
  },
  {
    key: 'em-io-06',
    unit: 'GPIO & Interfacing',
    title: 'Button Matrix Scanning',
    level: 'intermediate',
    body:
      'An R x C keyboard matrix needs only R+C pins. Drive each row low in turn and read each column: a pressed key at (row, col) pulls that column. Faster scanning = HIGHER pin count. Add diodes when chords are pressed.',
    qs: [
      {
        p: 'A 4x4 keypad needs only:',
        c: ['8 pins', '16 pins', '4 pins', '2 pins'],
        a: 0,
        e: '4 rows + 4 columns = 8 pins for 16 keys.',
      },
    ],
  },

  // ── Timers & PWM
  {
    key: 'em-tim-01',
    unit: 'Timers, PWM & Interrupts',
    title: 'Timers and Prescalers',
    level: 'basic',
    body:
      'A hardware timer counts clock ticks. A prescaler divides the input clock so a 16-bit counter (max 65535) can time long intervals. Timer period = (Prescaler+1) × (ARR+1) / clock frequency.',
    qs: [
      {
        p: 'A 16-bit timer counts up to:',
        c: ['65535', '255', '9999', '1000000'],
        a: 0,
        e: '2^16 − 1 = 65535.',
      },
    ],
  },
  {
    key: 'em-tim-02',
    unit: 'Timers, PWM & Interrupts',
    title: 'PWM: Pulse Width Modulation',
    level: 'basic',
    body:
      'PWM rapidly switches an output between high and low; the duty cycle (on-time percent) sets the average level. An RC filter turns PWM into an analog DC level, and motors/LEDs respond to duty directly.',
    qs: [
      {
        p: 'A 25% duty cycle PWM produces an average voltage of:',
        c: ['25% of the high level', 'Always 2.5 V', 'Zero', 'The peak voltage'],
        a: 0,
        e: 'Average = duty × amplitude (after filtering).',
      },
    ],
  },
  {
    key: 'em-tim-03',
    unit: 'Timers, PWM & Interrupts',
    title: 'Measuring with Input Capture',
    level: 'intermediate',
    body:
      'Input capture latches the timer count when an edge arrives on a pin — a timestamp. The difference between successive captures is the pulse width or period. Measure frequency without burning CPU cycles.',
    qs: [
      {
        p: 'Pulse width is the timer difference between:',
        c: ['Rising and falling edges', 'Two writes to RAM', 'Two resets', 'Two clock cycles'],
        a: 0,
        e: 'Capture timestamps at each edge; subtract.',
      },
    ],
  },
  {
    key: 'em-tim-04',
    unit: 'Timers, PWM & Interrupts',
    title: 'Interrupt Basics',
    level: 'basic',
    body:
      'An interrupt is hardware telling the CPU "stop, handle me now". The processor saves context, jumps to the ISR (interrupt service routine), and returns. NVIC on Cortex-M prioritizes many interrupt sources.',
    qs: [
      {
        p: 'An ISR should be:',
        c: ['Short and fast', 'As long as possible', 'A blocking loop', 'A printf debug wall'],
        a: 0,
        e: 'Long ISRs delay everything else — keep them brief.',
      },
    ],
  },
  {
    key: 'em-tim-05',
    unit: 'Timers, PWM & Interrupts',
    title: 'Interrupt Latency and Priority',
    level: 'advanced',
    body:
      'Latency is the cycles between an interrupt firing and its ISR running (Cortex-M ~12-15 cycles). Preemption lets a higher-priority ISR interrupt a lower one. Setting wrong priorities delays safety-critical code.',
    qs: [
      {
        p: 'Cortex-M interrupt latency is roughly:',
        c: ['12–15 cycles', '1000 cycles', 'One cycle exactly', 'A second'],
        a: 0,
        e: 'Entries push context fast — around a dozen cycles.',
      },
    ],
  },
  {
    key: 'em-tim-06',
    unit: 'Timers, PWM & Interrupts',
    title: 'Software Timers',
    level: 'intermediate',
    body:
      'Instead of blocking delays, schedule tasks with software timers: count a hardware ticker and fire callbacks when deadlines arrive. This keeps the loop responsive and is the seed of a real-time scheduler.',
    qs: [
      {
        p: 'Software timers are best implemented from:',
        c: ['A free-running hardware tick', 'Random delays', 'Large for-loops', 'The display refresh'],
        a: 0,
        e: 'Count ticks; act on expiry — non-blocking.',
      },
    ],
  },

  // ── Analog
  {
    key: 'em-adc-01',
    unit: 'ADC, DAC & Sensors',
    title: 'ADC Fundamentals',
    level: 'basic',
    body:
      'An ADC converts an analog voltage to a binary value. A 12-bit ADC with a 3.3 V reference maps each LSB to 3.3/4096 ≈ 806 µV. Resolution in volts = Vref/2^n.',
    qs: [
      {
        p: 'A 12-bit ADC on 3.3 V reference gives an LSB of:',
        c: ['About 0.8 mV', '3.3 mV', '1 mV always', '1 V'],
        a: 0,
        e: '3.3 / 4096 = 0.000806 V.',
      },
    ],
  },
  {
    key: 'em-adc-02',
    unit: 'ADC, DAC & Sensors',
    title: 'Voltage Dividers for Sensing',
    level: 'basic',
    body:
      'To read a sensor whose resistance changes, put it in a voltage divider: Vout = R2/(R1+R2) × Vin. An LDR or thermistor in the divider gives a voltage proportional to light or temperature.',
    qs: [
      {
        p: 'A divider with equal resistors reads:',
        c: ['Half the supply voltage', 'The full supply', 'Zero', 'Double the supply'],
        a: 0,
        e: 'Each resistor takes half the voltage.',
      },
    ],
  },
  {
    key: 'em-adc-03',
    unit: 'ADC, DAC & Sensors',
    title: 'Digital vs Analog Ground',
    level: 'advanced',
    body:
      'Switching digital currents in the ground return cause noise spikes that corrupt high-resolution ADC readings. Split or star grounds keep analog references clean; a single connection between analog/digital grounds prevents loops.',
    qs: [
      {
        p: 'Separating analog and digital grounds mostly prevents:',
        c: ['Digital noise corrupting ADC readings', 'Short circuits', 'Overheating', 'Water damage'],
        a: 0,
        e: 'Isolate return currents to protect sensitive analog paths.',
      },
    ],
  },
  {
    key: 'em-adc-04',
    unit: 'ADC, DAC & Sensors',
    title: 'Temperature Sensors',
    level: 'intermediate',
    body:
      'Common sensors: NTC thermistors (resistance vs temperature), platinum RTDs (linear, precise), thermocouples (wide range, cold-junction compensation), and digital ICs (I2C, ready readings). Each has a fitting application and error model.',
    qs: [
      {
        p: 'A thermocouple measures temperature by:',
        c: ['A voltage from two different metals', 'Changing resistance', 'Changing capacitance', 'Light emission'],
        a: 0,
        e: 'Seebeck voltage across a dissimilar-metal junction.',
      },
    ],
  },

  // ── Serial Bus
  {
    key: 'em-uart-01',
    unit: 'Serial Communication',
    title: 'UART: The Classic Serial Link',
    level: 'basic',
    body:
      'UART sends one byte as a start bit, 8 data bits, optional parity, and a stop bit at a negotiated baud rate. Connecting two UARTs is a cross (TX↔RX). No clock line — both sides must agree on the baud rate.',
    qs: [
      {
        p: 'UART synchronizes using:',
        c: ['A start bit and agreed baud rate', 'A shared clock wire', 'PLL chips', 'A handshake line'],
        a: 0,
        e: 'Asynchronous: start/stop framing plus baud agreement.',
      },
    ],
  },
  {
    key: 'em-uart-02',
    unit: 'Serial Communication',
    title: 'SPI: Fast Parallel Shifting',
    level: 'basic',
    body:
      'SPI uses four lines — clock (SCLK), master-out-slave-in (MOSI), master-in-slave-out (MISO), and chip select (CS) per slave. It is fast and full-duplex; slaves need a separate CS wire each.',
    qs: [
      {
        p: 'SPI requires how many lines total for one master and one slave?',
        c: ['4', '2', '6', '1'],
        a: 0,
        e: 'SCLK, MOSI, MISO, CS.',
      },
    ],
  },
  {
    key: 'em-uart-03',
    unit: 'Serial Communication',
    title: 'I2C: Two-Wire ACK Bus',
    level: 'intermediate',
    body:
      'I2C runs on SDA and SCL with open-drain pull-ups. Each device has a 7- or 10-bit address; masters clock the bus and slaves acknowledge each byte. Slower than SPI, but only two wires for many devices.',
    qs: [
      {
        p: 'I2C with pull-ups is:',
        c: ['Open-drain, so anyone can drive low', 'Push-pull output', 'Differential', 'Always powered'],
        a: 0,
        e: 'Devices only pull low; resistors restore high.',
      },
    ],
  },
  {
    key: 'em-uart-04',
    unit: 'Serial Communication',
    title: 'CAN Bus',
    level: 'advanced',
    body:
      'CAN is a differential two-wire bus for noisy automotive/industrial networks. Messages have IDs and arbitration; the lowest ID wins contention. Error frames and CRC make it extremely robust at up to 1 Mbps and beyond.',
    qs: [
      {
        p: 'CAN arbitration is won by:',
        c: ['The lowest message ID', 'The first sender', 'The loudest signal', 'The master node'],
        a: 0,
        e: 'Dominant bits (0) win; lower IDs dominate.',
      },
    ],
  },
  {
    key: 'em-uart-05',
    unit: 'Serial Communication',
    title: 'USB Basics',
    level: 'advanced',
    body:
      'USB is a host-arbitrated protocol: the host sends tokens and IN/OUT transfers top endpoints, devices answer with data/handshakes. CDC makes a virtual serial port; HID covers keyboards/mice. Polling frames run every 125 µs–1 ms.',
    qs: [
      {
        p: 'USB communication is controlled by:',
        c: ['The host', 'Any device', 'The bus speed', 'Shared memory'],
        a: 0,
        e: 'Host schedules all transfers with tokens.',
      },
    ],
  },
  {
    key: 'em-uart-06',
    unit: 'Serial Communication',
    title: 'Wireless: 2.4 GHz Radios',
    level: 'intermediate',
    body:
      'The 2.4 GHz ISM band hosts BLE, WiFi, and Zigbee, all built on the same PHY. They spread spectrum, hop channels, and use CSMA to share the air. Range/throughput trade-offs and co-existence matter in dense deployments.',
    qs: [
      {
        p: '2.4 GHz links share the band using:',
        c: ['Spread-spectrum and channel sharing', 'Room-sized collisions only', 'Hardwired trunks', 'Magnetically coupled coils'],
        a: 0,
        e: 'Spreading, hopping, and CSMA access rules keep them coexisting.',
      },
    ],
  },

  // ── RTOS
  {
    key: 'em-rtos-01',
    unit: 'RTOS & Concurrency',
    title: 'Why an RTOS?',
    level: 'intermediate',
    body:
      'A bare-metal super-loop runs tasks sequentially; a hard real-time deadline may be missed when another task runs long. An RTOS schedules tasks by priority so the most time-critical work can preempt.',
    qs: [
      {
        p: 'RTOS is chosen mainly when:',
        c: ['Hard real-time deadlines must be met', 'Code size must be zero', 'No timers exist', 'The CPU is idle'],
        a: 0,
        e: 'Deterministic scheduling meets deadlines.',
      },
    ],
  },
  {
    key: 'em-rtos-02',
    unit: 'RTOS & Concurrency',
    title: 'Tasks and Scheduling',
    level: 'advanced',
    body:
      'Each RTOS task has a stack and a priority. The scheduler runs the highest-priority ready task; that may preempt running tasks instantly (preemptive priority scheduling). Sleep and semaphore waits give low-priority work a chance.',
    qs: [
      {
        p: 'Preemptive scheduling means:',
        c: ['A high-priority task can interrupt a lower one at once', 'Tasks run in order', 'Tasks never starve', 'No priorities exist'],
        a: 0,
        e: 'Kernel switches on higher-priority readiness.',
      },
    ],
  },
  {
    key: 'em-rtos-03',
    unit: 'RTOS & Concurrency',
    title: 'Semaphores and Mutexes',
    level: 'advanced',
    body:
      'Semaphores count available resources (counting) or just signal events (binary). A mutex additionally allows the owner to take it — avoiding priority inversion via priority inheritance. Shared data still needs mutual exclusion.',
    qs: [
      {
        p: 'A mutex differs from a binary semaphore by:',
        c: ['Ownership and priority inheritance', 'Being slower', 'Having more pins', 'Using DMA'],
        a: 0,
        e: 'Mutex is owned; semaphore is signaled.',
      },
    ],
  },
  {
    key: 'em-rtos-04',
    unit: 'RTOS & Concurrency',
    title: 'Priority Inversion',
    level: 'advanced',
    body:
      'If a low-priority task holds a lock a high-priority task needs, the medium tasks run first and the high suffers. Priority inheritance temporarily boosts the lock owner so the high-priority task proceeds.',
    qs: [
      {
        p: 'The textbook fix for priority inversion is:',
        c: ['Priority inheritance', 'Faster clock', 'Bigger stack', 'More tasks'],
        a: 0,
        e: 'The lock holder inherits the waiting task\u2019s priority.',
      },
    ],
  },
  {
    key: 'em-rtos-05',
    unit: 'RTOS & Concurrency',
    title: 'Inter-Task Messages',
    level: 'intermediate',
    body:
      'Tasks communicate via queues and mailboxes: the ISR or producer writes, the consumer blocks on read. Queues decouple timing between producer and consumer and pass data safely between interrupt and task context.',
    qs: [
      {
        p: 'A message queue decouples a producer and consumer by:',
        c: ['Buffering items in between', 'Blocking both forever', 'Removing interrupts', 'Doubling clocks'],
        a: 0,
        e: 'The queue smooths timing and hand-off.',
      },
    ],
  },
  {
    key: 'em-rtos-06',
    unit: 'RTOS & Concurrency',
    title: 'Watchdogs',
    level: 'intermediate',
    body:
      'A hardware watchdog interrupts or resets the MCU unless firmware "kicks" it periodically. A hung task stops kicking, so the system recovers. Watchdogs are the cheapest protection against flying control systems.',
    qs: [
      {
        p: 'Watchdogs protect against:',
        c: ['Firmware lockups and runaway code', 'Battery drain alone', 'Compiler bugs', 'Wrong polarities'],
        a: 0,
        e: 'Not-kicked → reset. A software safety net.',
      },
    ],
  },

  // ── Memory & DMA
  {
    key: 'em-dma-01',
    unit: 'Memory & DMA',
    title: 'Static vs Dynamic Allocation',
    level: 'intermediate',
    body:
      'Static allocation happens at compile time; dynamic allocation (malloc) uses the heap at run time. Heap fragmentation and non-deterministic timing are dangerous in real-time code — many embedded projects ban it and size everything statically.',
    qs: [
      {
        p: 'The heap is used by:',
        c: ['Dynamic allocation at run time', 'Compile-time constants', 'Stack frames always', 'Flash code'],
        a: 0,
        e: 'malloc/free carve blocks from the heap.',
      },
    ],
  },
  {
    key: 'em-dma-02',
    unit: 'Memory & DMA',
    title: 'The Stack and Recursion',
    level: 'intermediate',
    body:
      'The stack holds return addresses, locals, and saved registers; it grows downward in most Cortex-M parts. Deep recursion or large locals overflow into the heap/static area — a classic firmware crash with no obvious cause.',
    qs: [
      {
        p: 'Stack overflow typically corrupts:',
        c: ['Adjacent memory regions', 'Only registers', 'The clock tree', 'Nothing'],
        a: 0,
        e: 'The stack grows into neighbors when exceeded.',
      },
    ],
  },
  {
    key: 'em-dma-03',
    unit: 'Memory & DMA',
    title: 'What DMA Does',
    level: 'advanced',
    body:
      'DMA (direct memory access) moves data between memory and peripherals without the CPU. The CPU programs the DMA controller, then does other work while bytes stream. CPU-free UART/ADC/SPI transfers are a huge throughput win.',
    qs: [
      {
        p: 'DMA transfers data:',
        c: ['Without CPU involvement after setup', 'Through the ALU only', 'In a single instruction', 'Using interrupts always'],
        a: 0,
        e: 'A dedicated controller does the moving.',
      },
    ],
  },
  {
    key: 'em-dma-04',
    unit: 'Memory & DMA',
    title: 'Memory-Mapped Registers: volatile',
    level: 'intermediate',
    body:
      'Peripheral registers must be declared volatile: the compiler would otherwise cache reads/writes in registers and reorder them, breaking hardware interaction. Embedded C\u2019s biggest correctness rule is volatile for MMIO.',
    qs: [
      {
        p: 'volatile tells the compiler:',
        c: ['Never cache or reorder this access', 'Remove the variable', 'Make it static', 'Inline the code'],
        a: 0,
        e: 'Each read/write must go to memory, every time.',
      },
    ],
  },

  // ── Power
  {
    key: 'em-pow-01',
    unit: 'Power & Low-Power Modes',
    title: 'Sleep, Stop, Standby',
    level: 'intermediate',
    body:
      'Low-power modes trade wake latency for current: Sleep (core off, peripherals on), Stop (all clocks off, SRAM kept), Standby/Shutdown (minimal, wake = reset). Battery life depends on matching mode to duty cycle.',
    qs: [
      {
        p: 'The deepest low-power mode with the slowest wake is:',
        c: ['Standby/Shutdown', 'Sleep', 'Run', 'Halt of a single core'],
        a: 0,
        e: 'Standby sacrifices state and speed for minimum current.',
      },
    ],
  },
  {
    key: 'em-pow-02',
    unit: 'Power & Low-Power Modes',
    title: 'Energy Per Transaction',
    level: 'advanced',
    body:
      'Battery life = energy budget. For a burst workload, power down between bursts: average current = duty × active + (1−duty) × sleep. Radio transmissions dominate; wake only to send, then deep-sleep.',
    qs: [
      {
        p: 'Long battery life favors:',
        c: ['Short active bursts and deep sleep', 'Constant polling', 'Full clock speed always', 'WiFi always on'],
        a: 0,
        e: 'Minimize active energy; sleep hard between actions.',
      },
    ],
  },
  {
    key: 'em-pow-03',
    unit: 'Power & Low-Power Modes',
    title: 'Brownout Reset',
    level: 'intermediate',
    body:
      'If the supply dips below the brown-out threshold, the chip resets rather than running on undefined logic levels. Don\u2019t disable it without a rock-solid supply — brownout is a crash-in-waiting.',
    qs: [
      {
        p: 'Brownout detection prevents:',
        c: ['Running instructions at an undefined voltage', 'Fast operation', 'Heat', 'Watchdog kicks'],
        a: 0,
        e: 'It resets the system at an unreliable voltage.',
      },
    ],
  },

  // ── Firmware & Tools
  {
    key: 'em-fw-01',
    unit: 'Firmware & Debugging',
    title: 'The Compiler Toolchain',
    level: 'basic',
    body:
      'Firmware flows: compiler (C→asm/object), assembler, linker (objects + libraries → ELF, assigning addresses), then objcopy strips it to a flash hex/bin. The ELF also carries debug symbols for gdb. Knowing the pipeline fixes "mystery" issues.',
    qs: [
      {
        p: 'The linker produces:',
        c: ['The final ELF with addresses resolved', 'Object code only', 'Source files', 'Binary masks'],
        a: 0,
        e: 'It merges objects and sections into one image.',
      },
    ],
  },
  {
    key: 'em-fw-02',
    unit: 'Firmware & Debugging',
    title: 'Live Debug with SWD/JTAG',
    level: 'basic',
    body:
      'JTAG/SWD connects a debugger to the chip for breakpoints, watch, single-step, and register/memory reads while running. No print statements needed — hardware debugging is the reliable path.',
    qs: [
      {
        p: 'A debugger can:',
        c: ['Pause code at a breakpoint and inspect memory', 'Rewrite the datasheet', 'Increase clock speed', 'Repair burned pins'],
        a: 0,
        e: 'Break/watchpoint debugging is the core feature.',
      },
    ],
  },
  {
    key: 'em-fw-03',
    unit: 'Firmware & Debugging',
    title: 'printf Debugging Done Right',
    level: 'basic',
    body:
      'Semicolon-debugging works in a crunch: add prints, rebuild, flash, read UART. The pain is timing dependence — prints slow the code. Use it to narrow bugs, then replace with breakpoints/hardware state inspection.',
    qs: [
      {
        p: 'A danger of printf debugging is:',
        c: ['It changes timing of the code', 'It uses no flash', 'It works offline', 'It catches all bugs'],
        a: 0,
        e: 'Serial output slows the execution path.',
      },
    ],
  },
  {
    key: 'em-fw-04',
    unit: 'Firmware & Debugging',
    title: 'Faults: HardFault on Cortex-M',
    level: 'intermediate',
    body:
      'A Cortex-M fault (SVC, MemManage, Bus, Usage) traps into a HardFault handler. Reading the stacked registers — reset PC/LR — reveals the exact instruction that crashed. That stack dump is the real error message.',
    qs: [
      {
        p: 'To find the crashing instruction, inspect:',
        c: ['The stacked PC in the fault handler', 'The LED pattern only', 'The power LED', 'The oscillator'],
        a: 0,
        e: 'The saved PC points at the faulting opcode.',
      },
    ],
  },
  {
    key: 'em-fw-05',
    unit: 'Firmware & Debugging',
    title: 'Bootloader Basics',
    level: 'advanced',
    body:
      'A bootloader lives at the start of flash, checks for a new firmware image (via UART or USB), writes it to the app region, then jumps to the app vector table. OTA updates are bootloaders plus a reliable transport.',
    qs: [
      {
        p: 'The app vector table and main code are reached via:',
        c: ['A jump from the bootloader', 'Power cycling only', 'The watchdog', 'An external programmer always'],
        a: 0,
        e: 'Bootloader validates and jumps to the app.',
      },
    ],
  },
  {
    key: 'em-fw-06',
    unit: 'Firmware & Debugging',
    title: 'Firmware Testing: Unit & Harness',
    level: 'advanced',
    body:
      'Logic that does not touch bare metal can be unit-tested on a PC: compile the module with mocks for HAL calls. Host-based tests run fast and catch logic errors long before hardware is ready — shift-left testing.',
    qs: [
      {
        p: 'Host-based unit tests use:',
        c: ['Mocks of the hardware layer', 'Real oscilloscopes', 'Only external boards', 'Assembly only'],
        a: 0,
        e: 'Fake HAL functions let logic run on a PC.',
      },
    ],
  },
  {
    key: 'em-fw-07',
    unit: 'Firmware & Debugging',
    title: 'Versioning and Releases',
    level: 'intermediate',
    body:
      'Tag firmware releases, record the git hash into the build (a build-info string), and log it at boot. Field debugging of an un-versioned "black box" wastes days; a build string makes a failing unit speak.',
    qs: [
      {
        p: 'Embedding a build hash at compile time helps by:',
        c: ['Identifying the exact firmware version in the field', 'Making code faster', 'Reducing flash', 'Hiding bugs'],
        a: 0,
        e: 'Every unit tells you what it is running.',
      },
    ],
  },
// ── Networking and security
  {
    key: 'em-net-01',
    unit: 'Embedded Networking & Security',
    title: 'Ethernet in MCUs',
    level: 'advanced',
    body:
      'Ethernet depends on a MAC (data link) and PHY (electrical). MCUs integrate the MAC and talk to an external PHY over RMII/MII. Frames carry CRC; collisions and backoff live in the MAC. Throughput = link rate minus headers and retries.',
    qs: [
      {
        p: 'The PHY handles:',
        c: ['The electrical/signal side of Ethernet', 'Only the LEDs', 'IP addresses', 'The TCP stack'],
        a: 0,
        e: 'PHY = physical layer; MAC = link layer.',
      },
    ],
  },
  {
    key: 'em-net-02',
    unit: 'Embedded Networking & Security',
    title: 'TCP/IP vs Lightweight IP',
    level: 'advanced',
    body:
      'Full TCP/IP stacks are too heavy for small MCUs; lwIP is a lean TCP/IP implementation with APIs for sockets or raw. Choose protocols by job: CoAP/MQTT for lightweight IoT messaging, raw sockets for custom frames.',
    qs: [
      {
        p: 'lwIP is used on MCUs because it:',
        c: ['Implements TCP/IP in a small footprint', 'Draws more power', 'Needs a GPU', 'Is a database'],
        a: 0,
        e: 'Tiny resource budget while speaking IP.',
      },
    ],
  },
  {
    key: 'em-net-03',
    unit: 'Embedded Networking & Security',
    title: 'MQTT: Topic Messaging',
    level: 'intermediate',
    body:
      'MQTT is a publish-subscribe broker protocol over TCP: devices publish to topics and subscribe to others. QoS levels trade reliability for overhead. Topic trees keep hundreds of devices decoupled — the IoT default.',
    qs: [
      {
        p: 'MQTT communication flows through:',
        c: ['A central broker', 'Peer-to-peer links only', 'Directly satellite', 'Shared files'],
        a: 0,
        e: 'Broker mediates publish/subscribe.',
      },
    ],
  },
  {
    key: 'em-net-04',
    unit: 'Embedded Networking & Security',
    title: 'Firmware Security Basics',
    level: 'advanced',
    body:
      'Securing embedded: authenticate updates (signed images), protect keys (use the secure element), encrypt data at rest and in transit, and reduce attack surface (disable unused peripherals). Cheap security beats crypto hype.',
    qs: [
      {
        p: 'Secure firmware updates rely on:',
        c: ['Signed images verified by the bootloader', 'Password-less boots', 'Public Wi-Fi', 'Trial and error'],
        a: 0,
        e: 'Digital signatures prove authenticity.',
      },
    ],
  },
  {
    key: 'em-net-05',
    unit: 'Embedded Networking & Security',
    title: 'Secure Boot Chain',
    level: 'advanced',
    body:
      'Secure boot: the ROM verifies the first-stage bootloader signature, which verifies the app, each in chain. Any compromise at an earlier step is caught. Coupled with rollback protection, it stops downgrade attacks.',
    qs: [
      {
        p: 'Secure boot verifies:',
        c: ['Each stage\u2019s signature before running it', 'Only the user password', 'The PCB serial', 'Nothing'],
        a: 0,
        e: 'Trust anchors from immutable ROM up.',
      },
    ],
  },
  {
    key: 'em-net-06',
    unit: 'Embedded Networking & Security',
    title: 'Side-Channel Basics',
    level: 'advanced',
    body:
      'Side channels leak secrets through timing, power, or EM while the chip computes. Constant-time code and masking fight timing variations; power analysis needs countermeasures. The cryptography may be perfect and still lose.',
    qs: [
      {
        p: 'A side-channel uses:',
        c: ['Physical emissions/timing instead of math', 'Brute force passwords', 'SQL injection', 'Weak passwords'],
        a: 0,
        e: 'Observables like power reveal the key.',
      },
    ],
  },
  {
    key: 'em-net-07',
    unit: 'Embedded Networking & Security',
    title: 'Zigbee/Thread Mesh',
    level: 'intermediate',
    body:
      'Zigbee and Thread are low-power mesh networks: nodes relay each other\u2019s packets so coverage extends beyond radio range. A coordinator/leader anchors the network; devices join, form routes, and sleep to save power.',
    qs: [
      {
        p: 'Mesh networking improves range by:',
        c: ['Nodes relaying for each other', 'Stronger radios only', 'Bigger antennas', 'More voltage'],
        a: 0,
        e: 'Multi-hop forwarding extends the footprint.',
      },
    ],
  },
  {
    key: 'em-net-08',
    unit: 'Embedded Networking & Security',
    title: 'GPS + Cellular Modules',
    level: 'intermediate',
    body:
      'Cellular (NB-IoT/LTE-M) and GPS modules speak AT commands over UART. Manage the module state machine (registration, PDP context, attach) and power. Watchdog everything: a hung modem keeps a device silent forever.',
    qs: [
      {
        p: 'Cellular modules are typically controlled via:',
        c: ['AT commands over UART', 'SPI registers only', 'Analog voltage', 'I2C sound'],
        a: 0,
        e: 'The classic Hayes AT command interface.',
      },
    ],
  },
  {
    key: 'em-net-09',
    unit: 'Embedded Networking & Security',
    title: 'Time Sync (NTP/RTCC)',
    level: 'intermediate',
    body:
      'Devices keep time with a real-time clock and sync to NTP or cellular time when online. Drift between syncs accumulates: a good low-power RTC drifts seconds per month. Logged timestamps need both — RTC plus a time source.',
    qs: [
      {
        p: 'NTP is used to:',
        c: ['Synchronize clocks over the network', 'Compress data', 'Add battery', 'Route packets'],
        a: 0,
        e: 'Network time protocol corrects local drift.',
      },
    ],
  },
  {
    key: 'em-net-10',
    unit: 'Embedded Networking & Security',
    title: 'Telemetry Formatting',
    level: 'intermediate',
    body:
      'Telemetry design: pack readings into compact binary or JSON, frame with length + type + CRC, timestamp, then batch to the cloud. Payload size and battery life live or die here. Include firmware version in every report.',
    qs: [
      {
        p: 'Battery-lean telemetry should:',
        c: ['Send compact batched frames', 'Stream raw floats non-stop', 'Print debug spam', 'Email live'],
        a: 0,
        e: 'Smaller transfers = longer battery.',
      },
    ],
  },
];

let cache: GeneratedGroup | null = null;
export function embedded(): GeneratedGroup {
  cache ??= build('embedded', MODULES);
  return cache;
}