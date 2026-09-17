import type { QuestionGen } from './gen.js';
import { int, mc, pick } from './gen.js';

function shuffle<T>(rng: () => number, arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function k(subject: string, stems: string[], a: string, w: string[], e: string): QuestionGen {
  return {
    subject,
    make: ({ rng }) => ({
      prompt: pick(rng, stems),
      ...mc(rng, a, w),
      aiExplanation: e,
    }),
  };
}

const GENS: QuestionGen[] = [
  {
    subject: 'Algorithms',
    make: ({ rng }) => {
      const sets = [
        [
          { t: 'n!', r: 6 },
          { t: '2ⁿ', r: 4 },
          { t: 'n³', r: 3 },
          { t: 'n log n', r: 2 },
        ],
        [
          { t: '2ⁿ', r: 4 },
          { t: 'n²', r: 3 },
          { t: 'n log n', r: 2 },
          { t: '√n', r: 1 },
        ],
      ];
      const s = pick(rng, sets);
      const slow = rng() < 0.5;
      const want = slow ? Math.min(...s.map((x) => x.r)) : Math.max(...s.map((x) => x.r));
      const idx = s.findIndex((x) => x.r === want);
      return {
        prompt: `Which of these grows ${slow ? 'slowest' : 'fastest'} as n → ∞?`,
        ...mc(rng, s[idx].t, s.filter((_, i) => i !== idx).map((x) => x.t)),
        aiExplanation: `Growth rates: ${s.map((x) => x.t).join(' < ')} under the ${slow ? 'slowest' : 'fastest'} order — exponential/factorial dominate polynomials and log factors.`,
      };
    },
  },
  {
    subject: 'Algorithms',
    make: ({ rng }) => {
      const n = pick(rng, [1024, 65536, 2 ** 20, 2 ** 24]);
      const lg = Math.round(Math.log2(n));
      return {
        prompt: `Binary search on a sorted array of ${n.toLocaleString('en-US')} elements needs at most how many comparisons?`,
        ...mc(rng, String(lg), [String(n), String(n / 2), String(lg - 1)]),
        aiExplanation: `Each comparison halves the range, so the worst case is ⌈log₂ n⌉ = log₂(${n.toLocaleString('en-US')}) = ${lg}.`,
      };
    },
  },
  {
    subject: 'Algorithms',
    make: ({ rng }) => {
      const n = pick(rng, [10, 25, 50, 100]);
      const c = (n * (n - 1)) / 2;
      return {
        prompt: `Selection sort performs how many comparisons on an array of ${n} elements?`,
        ...mc(rng, String(c), [String(n * n), String(n), String(Math.round(n * Math.log2(n)))]),
        aiExplanation: `Selection sort always scans the remaining suffix: comparisons = n(n−1)/2 = ${n}×${n - 1}/2 = ${c}, independent of input order.`,
      };
    },
  },
  {
    subject: 'Data Structures',
    make: ({ rng }) => {
      const xs = shuffle(rng, [1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 4);
      return {
        prompt: `We push ${xs[0]}, ${xs[1]}, ${xs[2]} and ${xs[3]} onto a stack, then pop once. What is on top?`,
        ...mc(rng, String(xs[2]), [String(xs[3]), String(xs[1]), String(xs[0])]),
        aiExplanation: `Stacks are LIFO: after pushing ${xs[0]}…${xs[3]}, the top is ${xs[3]}; one pop removes it, leaving ${xs[2]} on top.`,
      };
    },
  },
  {
    subject: 'Data Structures',
    make: ({ rng }) => {
      const xs = shuffle(rng, [1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 3);
      return {
        prompt: `We enqueue ${xs[0]}, ${xs[1]}, ${xs[2]} into a queue, then dequeue once. Which value is served?`,
        ...mc(rng, String(xs[0]), [String(xs[1]), String(xs[2]), String(xs[0] + xs[1])]),
        aiExplanation: `Queues are FIFO: ${xs[0]} entered first, so it is served first. The others wait in order.`,
      };
    },
  },
  {
    subject: 'Data Structures',
    make: ({ rng }) => {
      const n = pick(rng, [7, 15, 31, 63]);
      const h = Math.round(Math.log2(n + 1));
      return {
        prompt: `A complete binary tree with ${n} nodes has what height (number of levels)?`,
        ...mc(rng, String(h), [String(h + 1), String(h - 1), String(n / 2)]),
        aiExplanation: `A complete tree with 2^h − 1 nodes has h levels: log₂(${n} + 1) = ${h}.`,
      };
    },
  },
  {
    subject: 'Data Structures',
    make: ({ rng }) => {
      const keys = shuffle(rng, [1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, int(rng, 4, 5));
      const order = [...keys].sort((a, b) => a - b);
      const rev = [...order].reverse();
      const rot = [order[order.length - 1], ...order.slice(0, -1)];
      const swp = [order[1], order[0], ...order.slice(2)];
      const fmt = (a: number[]) => `[${a.join(', ')}]`;
      return {
        prompt: `Insert ${keys.join(', ')} into an empty BST in that order. Its inorder traversal is:`,
        ...mc(rng, fmt(order), [fmt(rev), fmt(rot), fmt(swp)]),
        aiExplanation: `BST properties make inorder visit keys in ascending order: ${fmt(order)} regardless of insertion sequence.`,
      };
    },
  },
  {
    subject: 'Databases',
    make: ({ rng }) => {
      const a = pick(rng, [10, 20, 50, 100]);
      const b = pick(rng, [5, 10, 25, 50]);
      return {
        prompt: `The Cartesian product of relations with ${a} and ${b} tuples yields how many rows?`,
        ...mc(rng, String(a * b), [String(a + b), String(b), String(a)]),
        aiExplanation: `A × B produces |R|·|S| = ${a} × ${b} = ${a * b} tuples — every row of one paired with every row of the other.`,
      };
    },
  },
  {
    subject: 'Databases',
    make: ({ rng }) => {
      const b = pick(rng, [50, 100, 200]);
      const a = pick(rng, [25, 40, 50]);
      const alpha = a / b;
      return {
        prompt: `A hash table with ${b} buckets holds ${a} items. Its load factor α is:`,
        ...mc(rng, `${alpha < 1 ? alpha : alpha.toFixed(1)}`, [`${fmt2(alpha * 2)}`, `${fmt2(alpha / 2)}`, `${fmt2(alpha + 0.1)}`]),
        aiExplanation: `α = items/buckets = ${a}/${b} = ${alpha < 1 ? alpha : alpha.toFixed(1)}. α > 1 means more items than buckets (chaining expected).`,
      };
    },
  },
  {
    subject: 'Operating Systems',
    make: ({ rng }) => {
      const a = pick(rng, [16, 24, 32, 40]);
      return {
        prompt: `A process uses a ${a}-bit virtual address space with 4 KB pages. How many pages exist?`,
        ...mc(rng, `2^${a - 12}`, [`2^${a}`, '2^12', `${a - 12}`]),
        aiExplanation: `Pages = virtual space / page size = 2^${a} / 2^12 = 2^${a - 12}. VAS doubles with every address bit.`,
      };
    },
  },
  {
    subject: 'Computer Networks',
    make: ({ rng }) => {
      const n = pick(rng, [24, 26, 28, 30]);
      const hosts = 2 ** (32 - n) - 2;
      return {
        prompt: `An IPv4 subnet using a /${n} prefix supports how many usable host addresses?`,
        ...mc(rng, String(hosts), [String(2 ** (32 - n)), String(hosts + 1), String(2 ** (32 - n) + 2)]),
        aiExplanation: `Host bits = 32 − ${n} = ${32 - n}, giving 2^${32 - n} = ${2 ** (32 - n)} addresses; network + broadcast leave ${hosts} usable.`,
      };
    },
  },
  {
    subject: 'Theory of Computation',
    make: ({ rng }) => {
      const s = pick(rng, ['ab', 'ba', 'aa', 'abb', 'aab', 'bb']);
      return {
        prompt: `A DFA that accepts exactly the strings of a's and b's ending in "${s}" needs at least how many states?`,
        ...mc(rng, String(s.length + 1), [String(s.length), String(s.length + 2), `2^${s.length}`]),
        aiExplanation: `Each state remembers the longest suffix of "${s}" still a prefix of the target: the empty string, the prefixes, then "${s}" = ${s.length + 1} states.`,
      };
    },
  },
  {
    subject: 'Discrete Math',
    make: ({ rng }) => {
      const cs: Array<[number, number]> = [
        [5, 3],
        [6, 2],
        [6, 3],
        [10, 3],
        [8, 3],
        [8, 4],
        [7, 2],
        [9, 2],
      ];
      const [n, k] = pick(rng, cs);
      const c = Math.round(factorial(n) / (factorial(k) * factorial(n - k)));
      return {
        prompt: `How many ways are there to choose ${k} items from ${n} distinct items?`,
        ...mc(rng, String(c), [String(n * k), String(n + k), String(n ** k)]),
        aiExplanation: `C(n,k) = n!/(k!·(n−k)!) = ${n}!/(${k}!·${n - k}!) = ${c}.`,
      };
    },
  },
  {
    subject: 'Discrete Math',
    make: ({ rng }) => {
      const n = pick(rng, [6, 7, 8, 9, 10]);
      const prev: Record<number, number> = { 6: 5, 7: 8, 8: 13, 9: 21, 10: 34 };
      const next: Record<number, number> = { 6: 13, 7: 21, 8: 34, 9: 55, 10: 89 };
      const val: Record<number, number> = { 6: 8, 7: 13, 8: 21, 9: 34, 10: 55 };
      return {
        prompt: `F(0) = 0, F(1) = 1. What is F(${n}) under the Fibonacci recurrence?`,
        ...mc(rng, String(val[n]), [String(prev[n]), String(next[n]), String(n * n)]),
        aiExplanation: `F(${n}) = F(${n - 1}) + F(${n - 2}) = ${prev[n]} + ${val[n] - prev[n]} = ${val[n]}.`,
      };
    },
  },
  {
    subject: 'Computer Organization',
    make: ({ rng }) => {
      const cs: Array<[number, number, number]> = [
        [64, 32, 4],
        [32, 16, 2],
        [64, 16, 4],
        [128, 64, 4],
        [32, 32, 4],
        [128, 32, 4],
        [64, 32, 2],
        [32, 32, 2],
      ];
      const [kb, blk, ways] = pick(rng, cs);
      const sets = (kb * 1024) / (blk * ways);
      return {
        prompt: `A ${kb} KB cache uses ${blk}-byte blocks and is ${ways}-way set associative. Number of sets:`,
        ...mc(rng, String(sets), [String((kb * 1024) / blk), String(blk), String((kb * 1024) / ways)]),
        aiExplanation: `Sets = capacity / (block × associativity) = ${kb * 1024} / (${blk} × ${ways}) = ${sets}.`,
      };
    },
  },
  k('Theory of Computation', [
    'A grammar with productions A → aA | ε belongs to which class?',
    'Which language class contains the grammar S → aS | ε?',
    'A right-linear grammar S → aS | ε generates what type of language?',
    'The grammar S → aT, T → ε is classified as:',
    'Which grammar type does A → aA | ε (A → ε) belong to?',
  ], 'Type-3 (regular)', ['Type-2 (context-free) only', 'Type-1 (context-sensitive)', 'Type-0 (unrestricted)'],
    'Productions of the form A → aB or A → ε are right-linear, i.e. a regular (Type-3) grammar, though every CFG is technically Type-2 too.'),
  k('Theory of Computation', [
    'The halting problem — deciding if an arbitrary program halts — is:',
    'Is the halting problem decidable by any algorithm for all programs?',
    'Turing\'s halting problem is an example of a problem that is:',
    'For every (program, input) pair, deciding termination is:',
    'The question of whether an arbitrary TM halts on a given input is:',
  ], 'Undecidable', ['Decidable in polynomial time', 'NP-complete', 'Always decidable by simulation'],
    'The halting problem is undecidable — no single algorithm decides it for all programs, which is not the same as NP-complete.'),
  k('Compilers', [
    'A function whose recursive call is its last operation can be converted into:',
    'Tail-recursive code is a candidate for:',
    'When the recursive call is the final statement, the compiler may turn it into:',
    'Which construct best matches a tail-recursive function?',
    'A tail call in a recursive function directly enables:',
  ], 'A simple loop (tail-call optimization)', ['A deeper recursion', 'An inlined macro', 'A binary search'],
    'When no work follows the recursive call, the compiler reuses the frame: tail recursion becomes iteration.'),
  k('Algorithms', [
    'BFS reaches graph nodes level-by-level because it uses:',
    'Which structure guarantees BFS visits nodes by hop distance?',
    'BFS order (shortest hops first) relies on:',
    'The algorithm that discovers nodes in order of hop distance uses a:',
    'To find shortest paths in an unweighted graph, BFS uses:',
  ], 'A FIFO queue', ['A LIFO stack', 'A max-heap', 'A union-find structure'],
    'BFS uses a queue to visit nodes level by level; DFS uses a stack (explicit or via recursion).'),
  k('Databases', [
    'A primary key column must satisfy which property?',
    'Which constraint describes a primary key?',
    'In a relational table, the primary key is:',
    'The primary key of a relation must be:',
    'Which of these is true of a primary key?',
  ], 'Unique and NOT NULL', ['Unique but nullable', 'Only unique', 'Sparse and null'],
    'Primary keys are unique identifiers and cannot be NULL; mere unique constraints may allow NULLs.'),
  k('Operating Systems', [
    'Which non-preemptive scheduler minimizes average waiting time?',
    'For minimizing average waiting time, the best non-preemptive policy is:',
    'On typical workloads, which scheduling policy minimizes mean wait?',
    'To cut average waiting time, the scheduler should:',
    'The optimal non-preemptive policy for average waiting time is:',
  ], 'SJF (Shortest Job First)', ['FCFS', 'Round Robin', 'Static priority preemptive'],
    'SJF provably minimizes average waiting time for non-preemptive scheduling when job lengths are known.'),
  k('Operating Systems', [
    'Which is NOT one of the four necessary conditions for deadlock?',
    'The textbook deadlock conditions include all EXCEPT:',
    'Which does not belong among the four Coffman conditions?',
    'Deadlock requires mutual exclusion, hold-and-wait, no preemption and:',
    'Which item is not a necessary condition for deadlock to occur?',
  ], 'Starvation', ['Mutual exclusion', 'Hold and wait', 'Circular wait'],
    'The four conditions are mutual exclusion, hold-and-wait, no preemption, and circular wait. Starvation is a liveness issue, not a deadlock condition.'),
  k('Computer Networks', [
    'The TCP open handshake goes:',
    'Which sequence establishes a TCP connection?',
    'The TCP three-way handshake order is:',
    'Before data transfer, TCP peers exchange:',
    'The correct TCP connection setup is:',
  ], 'SYN → SYN-ACK → ACK', ['SYN → ACK → SYN-ACK', 'ACK → SYN → ACK', 'FIN → ACK → FIN-ACK'],
    'TCP opens with the three-way handshake: SYN, SYN-ACK, ACK. FIN pairs close the connection.'),
  k('Computer Networks', [
    'A secure web page is served over HTTP carried inside:',
    'HTTPS encrypts its HTTP messages at which layer?',
    'Transport for a TLS-secured HTTP request is typically:',
    'A TLS record on the wire usually rides over:',
    'TLS-secured web traffic travels over:',
  ], 'TLS over TCP', ['A plain UDP datagram', 'A raw ICMP packet', 'An SMTP envelope'],
    'HTTPS = HTTP over TLS over TCP; UDP is used by DNS, DHCP and media, not secure web pages.'),
  k('Algorithms', [
    'Dijkstra\'s shortest-path algorithm requires edge weights that are:',
    'Which restriction must hold for Dijkstra?',
    'Dijkstra may return wrong answers when a graph has:',
    'For Dijkstra to be correct, all edge weights must be:',
    'The greedy step in Dijkstra only works with:',
  ], 'Non-negative edge weights', ['An acyclic graph', 'An undirected graph only', 'Negative edge weights'],
    'Dijkstra greedily finalizes nodes, so negative edges break it; Bellman–Ford handles negative weights without negative cycles.'),
  k('Computer Organization', [
    'Compulsory, capacity and conflict are the three kinds of:',
    'The 3C model classifies which cache events?',
    'Cache misses split into:',
    'Which trio names the classic cache miss types?',
    'Cold, capacity and conflict describe:',
  ], 'Cache misses', ['TLB hits', 'Pipeline stages', 'Branches'],
    'The 3C model: compulsory (first touch), capacity (working set too big), and conflict (same set contested).'),
  k('Computer Organization', [
    'A mispredicted branch mid-pipeline causes a:',
    'Flushing the pipeline after a taken branch is handling a:',
    'Branch decisions that change the fetch stream create:',
    'A branch penalty stems from a:',
    'Changing the instruction stream at a branch is a:',
  ], 'Control hazard', ['Data hazard', 'Structural hazard', 'Cache coherence miss'],
    'Predicting the wrong branch address = control (branch) hazard; data hazards are register dependencies.'),
  k('Algorithms', [
    'An already-sorted array makes which sort O(n) with no swaps?',
    'Which sort needs O(n) comparisons on already-sorted input?',
    'When the input is nearly sorted, the cheapest simple sort is:',
    'Which comparison sort shines on sorted data?',
    'Zero swaps plus O(n) comparisons on sorted data describes:',
  ], 'Insertion sort', ['Selection sort', 'Merge sort', 'Heap sort'],
    'Insertion sort walks the array once comparing each item to its predecessor — O(n) on sorted input.'),
];

function fmt2(x: number): string {
  return (Math.round(x * 100) / 100).toString();
}

function factorial(x: number): number {
  let r = 1;
  for (let i = 2; i <= x; i++) r *= i;
  return r;
}

export const CSE_GENS = GENS;