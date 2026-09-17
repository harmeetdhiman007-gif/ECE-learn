import type { QuestionGen } from './gen.js';
import { fmt, mc, pick } from './gen.js';

type Variant = { p: string; a: string; w: string[]; e: string };

function cv(variants: Variant[]): QuestionGen {
  return {
    subject: 'PCB Design',
    make: ({ rng }) => {
      const v = pick(rng, variants);
      return {
        prompt: v.p,
        ...mc(rng, v.a, v.w),
        aiExplanation: v.e,
      };
    },
  };
}

const GENS: QuestionGen[] = [
  {
    subject: 'PCB Design',
    make: ({ rng }) => {
      const L = pick(rng, [5, 10, 20, 50]);
      const w = pick(rng, [0.5, 1, 2, 3]);
      const t = pick(rng, [17.5, 35, 70, 105]);
      const A = (w * 1e-3) * (t * 1e-6);
      const R = (1.68e-8 * L * 0.01) / A;
      const useM = R < 1;
      const fmtR = (r: number) => `${(useM ? r * 1000 : r).toFixed(useM ? 1 : 2)} ${useM ? 'mΩ' : 'Ω'}`;
      return {
        prompt: `A copper trace is ${L} cm long, ${w} mm wide, ${t} µm thick (ρ = 1.68 × 10⁻⁸ Ω·m). Its resistance is:`,
        ...mc(rng, fmtR(R), [fmtR(R * 2), fmtR(R / 2), `${fmt(R * 10, 2)} Ω (uniform cross-section)`]),
        aiExplanation: `R = ρL/A = (1.68×10⁻⁸ × ${L * 0.01} m) / (${w} mm × ${t} µm) ≈ ${fmtR(R)}. Thicker or wider copper lowers resistance.`,
      };
    },
  },
  {
    subject: 'PCB Design',
    make: ({ rng }) => {
      const oz = pick(rng, [0.5, 1, 2]);
      const tMil = [0.688, 1.378, 2.756][oz === 0.5 ? 0 : oz === 1 ? 1 : 2];
      const w = pick(rng, [5, 10, 20, 40]);
      const dt = pick(rng, [5, 10, 20]);
      const A = w * tMil;
      const ie = 0.048 * dt ** 0.44 * A ** 0.725;
      const ii = 0.024 * dt ** 0.44 * A ** 0.725;
      return {
        prompt: `IPC-2221: an external ${w} mil trace on ${oz} oz copper (${tMil.toFixed(3)} mil) at ΔT = ${dt} °C. Its ampacity in amperes is:`,
        ...mc(rng, fmt(ie, 2), [fmt(ie * 2, 2), `internal = ${fmt(ii, 2)}`, fmt(ie / 2, 2)]),
        aiExplanation: `External IPC-2221 ampacity: 0.048·ΔT^0.44·A^0.725 = 0.048·${dt}^0.44·${fmt(A, 2)}^0.725 ≈ ${fmt(ie, 2)} A. Internal layers halve the coefficient to 0.024.`,
      };
    },
  },
  {
    subject: 'PCB Design',
    make: ({ rng }) => {
      const d = pick(rng, [0.3, 0.4, 0.5, 0.6]);
      const r = pick(rng, [0.15, 0.2, 0.25]);
      const pad = d + 2 * r;
      return {
        prompt: `A plated hole of ${d} mm drilled to a ${r} mm annular ring requires a pad diameter of:`,
        ...mc(rng, `${fmt(pad, 2)} mm`, [`${fmt(d + r, 2)} mm`, `${fmt(d + 3 * r, 2)} mm`, `${fmt(2 * r, 2)} mm`]),
        aiExplanation: `Pad ≥ drill + 2× ring = ${d} + 2(${r}) = ${fmt(pad, 2)} mm, so the ring survives drill wander.`,
      };
    },
  },
  {
    subject: 'PCB Design',
    make: ({ rng }) => {
      const T = pick(rng, [1.2, 1.6, 2.4]);
      const d = pick(rng, [0.2, 0.3, 0.4]);
      const ar = T / d;
      return {
        prompt: `A ${T} mm board is drilled with ${d} mm vias. The board aspect ratio is:`,
        ...mc(rng, `${fmt(ar, 1)}:1`, [`${fmt(T / (2 * d), 1)}:1`, `${fmt((2 * T) / d, 1)}:1`, `${fmt(T * d, 1)}:1`]),
        aiExplanation: `Aspect ratio = thickness / drill = ${T}/${d} = ${fmt(ar, 1)}:1. Ratios over ~10:1 stress plating reliability.`,
      };
    },
  },
  {
    subject: 'PCB Design',
    make: ({ rng }) => {
      const oz = pick(rng, [0.5, 1, 2, 3]);
      const um = oz * 35;
      return {
        prompt: `${oz} oz base copper is nominally how thick?`,
        ...mc(rng, `${fmt(um, 0)} µm`, [`${fmt(um / 2, 1)} µm`, `${fmt(um * 2, 0)} µm`, `${fmt(um * 5, 0)} µm`]),
        aiExplanation: `1 oz/ft² copper ≈ 34.8 µm ≈ 1.378 mil; ${oz} oz is ≈ ${fmt(um, 0)} µm. Heavier copper carries more current.`,
      };
    },
  },
  cv([
    { p: 'A via that connects only an outer layer to one or more inner layers is called:', a: 'A blind via', w: ['A buried via', 'A through via', 'A tented via'], e: 'Blind vias join an outer layer to inner layers; buried vias never touch an outer layer; through vias pierce the whole board.' },
    { p: 'A via joining layer 1 to layer 3 — but not the far side — is:', a: 'A blind via', w: ['A buried via', 'A through via', 'A tented via'], e: 'Blind vias stop at an inner layer; buried vias skip the outer layers entirely; through vias exit both sides.' },
    { p: 'Which via type ends on an inner layer rather than going through the whole board?', a: 'A blind via', w: ['A through via', 'A buried via', 'A micro-via stack'], e: 'Blind vias go from one outer layer to an inner layer; buried vias never reach the surface.' },
    { p: 'A connection that starts on the top layer and stops at an inner plane is named:', a: 'A blind via', w: ['A through via', 'A buried via', 'A slot hole'], e: 'Starts outer, ends inner = blind; starts and ends inner = buried; outer to outer through everything = through.' },
  ]),
  cv([
    { p: 'The primary job of solder mask is to:', a: 'Prevent solder bridges and protect the copper', w: ['Carry silkscreen text', 'Increase trace current', 'Form the reference designators'], e: 'Solder mask exposes only pads so solder cannot bridge leads, and it shields copper from oxidation (text is silkscreen).' },
    { p: 'What does solder mask mainly do?', a: 'Prevent solder bridges and protect the copper', w: ['Carry silkscreen text', 'Increase trace current', 'Form the reference designators'], e: 'Solder mask exposes only pads so solder cannot bridge leads, and it shields copper from oxidation (text is silkscreen).' },
    { p: 'Why is solder mask applied over the copper?', a: 'To prevent solder bridges and protect the copper', w: ['To carry silkscreen text', 'To raise trace current', 'To form reference designators'], e: 'Solder mask exposes only pads so solder cannot bridge leads, and it shields copper from oxidation (text is silkscreen).' },
    { p: 'The solder-mask layer exists mainly to:', a: 'Prevent solder bridges and protect copper traces', w: ['Print reference designators', 'Add trace width', 'Define hole sizes'], e: 'Solder mask exposes only pads so solder cannot bridge leads, and it shields copper from oxidation (text is silkscreen).' },
  ]),
  cv([
    { p: 'Which copper feature best lowers ground impedance and supplies a stable return path?', a: 'A solid ground plane', w: ['A thin ground trace only', 'The silkscreen layer', 'A solder bridge'], e: 'A contiguous ground plane gives low impedance, shielding and a stable return path — thin traces add inductance.' },
    { p: 'Low ground impedance and a clean return-current path come from:', a: 'A solid ground plane', w: ['A thin ground trace only', 'The silkscreen layer', 'A solder bridge'], e: 'A contiguous ground plane gives low impedance, shielding and a stable return path — thin traces add inductance.' },
    { p: 'For a stable, low-impedance reference, designers use a:', a: 'Ground plane', w: ['Long via chains', 'Solder mask only', 'Serpentine traces'], e: 'A plane provides low impedance and return path; vias and serpentines add inductance.' },
    { p: 'A solid sheet of copper on a dedicated layer used as a reference is:', a: 'A ground plane', w: ['A silkscreen', 'A stencil', 'A fiducial field'], e: 'A ground plane is a contiguous copper sheet that carries return current and acts as a reference.' },
  ]),
  cv([
    { p: 'A thermal-relief pad on a plane-connected pad is used to:', a: 'Slow heat flow so soldering is easier', w: ['Speed up the drill spindle', 'Act as a fiducial', 'Reduce trace width'], e: 'Spoked pads reduce thermal coupling to the plane so the pad heats and wets with solder quickly.' },
    { p: 'Why use a spoked (thermal relief) pad on a ground plane?', a: 'So the pad heats fast enough to solder', w: ['So the drill runs faster', 'To mark orientation', 'To shrink the pad'], e: 'Spoked pads reduce thermal coupling to the plane so the pad heats and wets with solder quickly.' },
    { p: 'The spokes on a plane-connected pad exist to:', a: 'Lower the heat sink effect of the plane', w: ['Carry high current', 'Add capacitance', 'Align the part'], e: 'Spokes limit how fast the plane drains heat, letting a soldered joint reach reflow temperature.' },
    { p: 'A pad tied to a copper pour with four thin spokes is a:', a: 'Thermal relief pad', w: ['Solder bridge pad', 'Fiducial pad', 'Test pad'], e: 'Thermal-relief pads use spokes to limit thermal coupling so soldering remains reliable.' },
  ]),
  cv([
    { p: 'Decoupling capacitors should be mounted:', a: 'As close to the IC power pins as possible', w: ['Anywhere on the board', 'On the far edge', 'Under the heat sink only'], e: 'Close placement minimizes loop inductance so the cap supplies switching-current transients to the pins.' },
    { p: 'Where do you place the bypass caps for an IC?', a: 'Right next to its power pins', w: ['At the power connector only', 'On the far side of the board', 'Nowhere — they are optional'], e: 'Close placement minimizes loop inductance so the cap supplies switching-current transients to the pins.' },
    { p: 'For power integrity, place the decoupling cap:', a: 'As close to the IC VCC/GND pins as possible', w: ['In the corner of the board', 'Near the silkscreen', 'After the crystal only'], e: 'Close placement minimizes loop inductance so the cap supplies switching-current transients to the pins.' },
    { p: 'The best location for a 100 nF bypass capacitor is:', a: 'Adjacent to the IC power pin it serves', w: ['At the board edge', 'Under the inductor', 'Left out entirely'], e: 'Close placement minimizes loop inductance so the cap supplies switching-current transients to the pins.' },
  ]),
  cv([
    { p: 'The silkscreen layer is used for:', a: 'Reference designators, logos and text', w: ['Copper routing paths', 'Solder paste deposits', 'Drill holes'], e: 'Silkscreen (white epoxy ink) carries reference designators and notes; it must not print over pads.' },
    { p: 'What is printed by silkscreen?', a: 'Part reference designators and labels', w: ['The copper tracks', 'The solder volume', 'The hole list'], e: 'Silkscreen (white epoxy ink) carries reference designators and notes; it must not print over pads.' },
    { p: 'Reference designators and part outlines appear on the:', a: 'Silkscreen layer', w: ['Solder mask layer', 'Copper layer', 'Stencil layer'], e: 'Silkscreen (white epoxy ink) carries reference designators and notes; it must not print over pads.' },
    { p: 'The white text layer on a PCB is the:', a: 'Silkscreen', w: ['Solder mask', 'Copper top', 'Cavity layer'], e: 'Silkscreen (white epoxy ink) carries reference designators and notes; it must not print over pads.' },
  ]),
  cv([
    { p: 'Wave soldering is best suited for parts that are:', a: 'Through-hole (THT)', w: ['Ball-grid array only', 'Fine-pitch QFN only', 'Air-core inductors only'], e: 'Wave soldering runs the board over a molten solder wave, ideal for THT leads; SMT parts are mostly reflowed.' },
    { p: 'Which part style is most naturally wave soldered?', a: 'Through-hole leads', w: ['BGA balls', 'QFN pads', 'Edge fingers'], e: 'Wave soldering runs the board over a molten solder wave, ideal for THT leads; SMT parts are mostly reflowed.' },
    { p: 'A molten wave on the underside of the board is used for:', a: 'Soldering through-hole leads', w: ['Reflowing BGA arrays', 'Curing the silkscreen', 'Etching copper'], e: 'Wave soldering runs the board over a molten solder wave, ideal for THT leads; SMT parts are mostly reflowed.' },
    { p: 'Mixed assemblies often solder THT parts with:', a: 'A wave solder bath', w: ['A hot-air knife', 'UV light', 'The reflow profile'], e: 'Wave soldering runs the board over a molten solder wave, ideal for THT leads; SMT parts are mostly reflowed.' },
  ]),
  cv([
    { p: 'HASL is a finish that mainly provides:', a: 'A solderable wetting surface on pads', w: ['Electrical isolation between tracks', 'Board rigidity', 'Moisture sealing'], e: 'HASL blankets pads with solder alloy, keeping them clean and wettable for assembly.' },
    { p: 'The HASL surface finish is chosen for its:', a: 'Good solderability of the pads', w: ['High dielectric strength', 'Flexibility', 'UV covering'], e: 'HASL blankets pads with solder alloy, keeping them clean and wettable for assembly.' },
    { p: 'What does a HASL coating do for the pads?', a: 'Leaves a clean, solderable surface', w: ['Insulates them', 'Removes copper', 'Rigidizes the board'], e: 'HASL blankets pads with solder alloy, keeping them clean and wettable for assembly.' },
    { p: 'A solder-dipped finish that keeps pads wettable is:', a: 'HASL', w: ['Silkscreen', 'Copper pour', 'Fiducial'], e: 'HASL blankets pads with solder alloy, keeping them clean and wettable for assembly.' },
  ]),
  cv([
    { p: 'In SMT, the stencil is used to:', a: 'Deposit solder paste in exact pad locations', w: ['Etch the copper traces', 'Print the silkscreen', 'Test the finished board'], e: 'A laser-cut stencil meters paste onto pads; aperture and thickness set the paste (and joint) volume.' },
    { p: 'A stencil\'s apertures define where the:', a: 'Solder paste lands on the pads', w: ['Copper gets etched', 'Silkscreen prints', 'Drill holes open'], e: 'A laser-cut stencil meters paste onto pads; aperture and thickness set the paste (and joint) volume.' },
    { p: 'Solder paste is applied through a:', a: 'Metal stencil', w: ['Silkscreen squeegee', 'Copper mask', 'Solder wave'], e: 'A laser-cut stencil meters paste onto pads; aperture and thickness set the paste (and joint) volume.' },
    { p: 'The foil that meters solder paste onto pads during printing is the:', a: 'Stencil', w: ['Reflow conveyor', 'Pick-and-place head', 'AOI camera'], e: 'A laser-cut stencil meters paste onto pads; aperture and thickness set the paste (and joint) volume.' },
  ]),
  cv([
    { p: 'Solder paste with flux serves the dual role of:', a: 'Cleaning oxides and forming the joint', w: ['Insulating the pads', 'Silkscreen adhesion', 'De-ionizing water'], e: 'Flux removes oxides so solder wets clean copper; the metal content becomes the joint during reflow.' },
    { p: 'The flux inside solder paste mainly does what?', a: 'Cleans oxides so solder can wet', w: ['Sticks the part forever', 'Carries current', 'Reflows the mask'], e: 'Flux removes oxides so solder wets clean copper; the metal content becomes the joint during reflow.' },
    { p: 'Why is flux used during soldering?', a: 'To remove oxides and promote wetting', w: ['To cool the joint', 'To increase resistivity', 'To harden the board'], e: 'Flux removes oxides so solder wets clean copper; the metal content becomes the joint during reflow.' },
    { p: 'Which two jobs does flux perform in a solder joint?', a: 'Cleaning the surface and assisting wetting', w: ['Insulating and shielding', 'Cooling and curing', 'Double it and shield it'], e: 'Flux removes oxides so solder wets clean copper; the metal content becomes the joint during reflow.' },
  ]),
  cv([
    { p: 'Fiducial marks on a panel are used for:', a: 'Optical alignment of machines before assembly', w: ['Testing short circuits', 'Routing the board outline', 'Cooling the board'], e: 'Fiducials let placement and stencil printers correlate machine coordinates to board features.' },
    { p: 'Global fiducials give machines:', a: 'Reference points for optical registration', w: ['Extra ground vias', 'Solder landmarks', 'Drill targets'], e: 'Fiducials let placement and stencil printers correlate machine coordinates to board features.' },
    { p: 'For optical registration before assembly, place:', a: 'Fiducial marks', w: ['Solder bridges', 'Silkscreen dots', 'Test points'], e: 'Fiducials let placement and stencil printers correlate machine coordinates to board features.' },
    { p: 'The alignment dots used by pick-and-place are called:', a: 'Fiducials', w: ['Mouse bites', 'Keep-outs', 'Stitching vias'], e: 'Fiducials let placement and stencil printers correlate machine coordinates to board features.' },
  ]),
  cv([
    { p: 'A controlled-impedance trace is achieved primarily by:', a: 'Fixed width and stackup spacing to a reference plane', w: ['Adding silkscreen text', 'Thicker solder mask', 'Longer vias'], e: 'Impedance is set by trace width, dielectric thickness and the reference plane — a carefully controlled stackup.' },
    { p: 'Impedance of a microstrip depends on:', a: 'Width, dielectric thickness and plane below', w: ['Silkscreen ink color', 'Board outline', 'Solder mask brand'], e: 'Impedance is set by trace width, dielectric thickness and the reference plane — a carefully controlled stackup.' },
    { p: 'For a 50 Ω trace, the designer controls the:', a: 'Width and the spacing to the plane', w: ['The number of layers in the CAD grid', 'The drill file', 'The fiducial shape'], e: 'Impedance is set by trace width, dielectric thickness and the reference plane — a carefully controlled stackup.' },
    { p: 'Deterministic trace impedance needs:', a: 'Careful stackup control', w: ['Random routing', 'More silkscreen', 'Longer vias'], e: 'Impedance is set by trace width, dielectric thickness and the reference plane — a carefully controlled stackup.' },
  ]),
  cv([
    { p: 'During a DRC, the designer most cares about:', a: 'Copper clearance and trace-width rules', w: ['Mouse-bite text', 'Board color', 'Log file wording'], e: 'DRC verifies spacing, width, annular ring and SMD rules so the board is manufacturable, not just routed.' },
    { p: 'A design rule check verifies:', a: 'Spacing and width rules against the ruleset', w: ['Panel color', 'Gerber file names', 'Drill count'], e: 'DRC verifies spacing, width, annular ring and SMD rules so the board is manufacturable, not just routed.' },
    { p: 'DRC mainly catches:', a: 'Clearance and manufacturability violations', w: ['Board dimensions', 'Component values', 'Pin labels'], e: 'DRC verifies spacing, width, annular ring and SMD rules so the board is manufacturable, not just routed.' },
    { p: 'Before sending files to the fab, the designer runs a:', a: 'Design rule check (DRC)', w: ['DRC is a drill step', 'Netlist delete', 'Solder flow test'], e: 'DRC verifies spacing, width, annular ring and SMD rules so the board is manufacturable, not just routed.' },
  ]),
  cv([
    { p: 'Copper corners on traces should be:', a: '45° or rounded', w: ['Sharp 90° everywhere', 'Arbitrary angles', 'Curved arcs only when short'], e: '90° corners can trap etchant and create impedance discontinuities or radiation; 45° or rounded corners are standard.' },
    { p: 'Why avoid sharp 90° trace corners?', a: 'They can trap etchant and radiate noise', w: ['They waste board area', 'They ignore the drill', 'They darken silkscreen'], e: '90° corners can trap etchant and create impedance discontinuities or radiation; 45° or rounded corners are standard.' },
    { p: 'The standard way to turn a route is:', a: 'With a 45° miter or rounded corner', w: ['Any sharp corner', 'Only serpentines', 'With solder mask'], e: '90° corners can trap etchant and create impedance discontinuities or radiation; 45° or rounded corners are standard.' },
    { p: 'Right-angle trace corners are avoided because they:', a: 'Increase etch and signal problems', w: ['Shorten the board', 'Remove solder mask', 'Add test points'], e: '90° corners can trap etchant and create impedance discontinuities or radiation; 45° or rounded corners are standard.' },
  ]),
  cv([
    { p: 'ENIG (electroless nickel immersion gold) is chosen for:', a: 'A flat, oxidation-free, solderable finish', w: ['Lowering board cost', 'Higher trace resistance', 'Better silkscreen contrast'], e: 'ENIG gives a flat, gold-covered surface for fine-pitch and wire bonding, at higher cost than HASL or OSP.' },
    { p: 'The ENIG finish provides:', a: 'A flat gold surface for fine-pitch parts', w: ['Cheap bare copper', 'Flexible substrate', 'Thicker traces'], e: 'ENIG gives a flat, gold-covered surface for fine-pitch and wire bonding, at higher cost than HASL or OSP.' },
    { p: 'For fine-pitch and wire bonding, use a finish such as:', a: 'ENIG (immersion gold on nickel)', w: ['Bare board', 'Silkscreen topcoat', 'Solder mask only'], e: 'ENIG gives a flat, gold-covered surface for fine-pitch and wire bonding, at higher cost than HASL or OSP.' },
    { p: 'Why would a designer pick ENIG over HASL?', a: 'For flat pads and oxide-free wire bonding', w: ['To save money', 'To speed the drill', 'To darken the board'], e: 'ENIG gives a flat, gold-covered surface for fine-pitch and wire bonding, at higher cost than HASL or OSP.' },
  ]),
  cv([
    { p: 'OSP on copper pads mainly:', a: 'Protects bare copper until assembly', w: ['Acts as the solder itself', 'Makes the board flexible', 'Replaces the substrate'], e: 'OSP (organic solderability preservative) is a thin anti-oxidation coating on copper that must be soldered within its shelf life.' },
    { p: 'What does an OSP coating do?', a: 'Preserves bare copper until soldering', w: ['Adds solder volume', 'Flexes the board', 'Etches the copper'], e: 'OSP (organic solderability preservative) is a thin anti-oxidation coating on copper that must be soldered within its shelf life.' },
    { p: 'The organic solderability preservative:', a: 'Stops copper oxidation before assembly', w: ['Is a permanent mask', 'Is a rigid core', 'Replaces the panel'], e: 'OSP (organic solderability preservative) is a thin anti-oxidation coating on copper that must be soldered within its shelf life.' },
    { p: 'OSP is applied in order to:', a: 'Keep bare copper clean until reflow', w: ['Solder for you', 'Brown the silkscreen', 'Cool the heat sink'], e: 'OSP (organic solderability preservative) is a thin anti-oxidation coating on copper that must be soldered within its shelf life.' },
  ]),
  cv([
    { p: 'Panelizing many small boards helps because it:', a: 'Lets machines process them as one assembly', w: ['Needs no fiducials', 'Reduces copper weight', 'Removes the need for DRC'], e: 'Panels move through stencil, placement, and reflow together, then depanelize along V-scores or tabs.' },
    { p: 'A fabrication panel of arrays allows:', a: 'One pass through assembly for many boards', w: ['Zero fiducials', 'Thinner copper', 'No DRC'], e: 'Panels move through stencil, placement, and reflow together, then depanelize along V-scores or tabs.' },
    { p: 'Why do fabs panel the boards before SMT?', a: 'To handle many boards as a single unit', w: ['To remove the stencil', 'To raise copper weight', 'To skip testing'], e: 'Panels move through stencil, placement, and reflow together, then depanelize along V-scores or tabs.' },
    { p: 'The benefit of running boards as one panel is:', a: 'Faster, shared machine handling', w: ['Smaller pads', 'Slow reflow', 'More drill bits'], e: 'Panels move through stencil, placement, and reflow together, then depanelize along V-scores or tabs.' },
  ]),
  cv([
    { p: 'A differential pair (e.g. USB) should be routed so that:', a: 'Both lines run close and matched in length', w: ['One line is ground', 'It crosses a slot on purpose', 'Both lines are bent 90°'], e: 'Matched, tightly-coupled lines keep fields canceling and skew low — slots and long stubs degrade the pair.' },
    { p: 'For a clean high-speed differential pair:', a: 'Length-match both lines and keep them coupled', w: ['Run them far apart', 'Ground one line', 'Cross a split plane'], e: 'Matched, tightly-coupled lines keep fields canceling and skew low — slots and long stubs degrade the pair.' },
    { p: 'Length matching on a differential pair means:', a: 'Both traces have nearly equal electrical length', w: ['One trace is twice as long', 'The traces cross', 'One line is unterminated'], e: 'Matched, tightly-coupled lines keep fields canceling and skew low — slots and long stubs degrade the pair.' },
    { p: 'The two lines of a differential pair must:', a: 'Stay tightly coupled and length-matched', w: ['Cross under a crystal', 'Split the ground', 'End at the silkscreen'], e: 'Matched, tightly-coupled lines keep fields canceling and skew low — slots and long stubs degrade the pair.' },
  ]),
  cv([
    { p: 'A TVS diode on a connector mainly:', a: 'Clamps ESD and overvoltage transients', w: ['Filters RF leakage', 'Terminates the transmission line', 'Powers the IC'], e: 'TVS devices conduct above a clamp voltage, shunting harmful transients away from the load.' },
    { p: 'For ESD and surge protection at a connector, place a:', a: 'TVS diode', w: ['Solder bridge', 'Silkscreen bar', 'Shunt inductor'], e: 'TVS devices conduct above a clamp voltage, shunting harmful transients away from the load.' },
    { p: 'A TVS clamps:', a: 'Overvoltages to a safe level', w: ['The clock frequency', 'Trace width', 'The ground pour'], e: 'TVS devices conduct above a clamp voltage, shunting harmful transients away from the load.' },
    { p: 'The part that shunts overvoltage transients away from a circuit is a:', a: 'TVS diode', w: ['Fiducial', 'Stencil', 'V-score'], e: 'TVS devices conduct above a clamp voltage, shunting harmful transients away from the load.' },
  ]),
  cv([
    { p: 'To reduce radiated emissions, an enclosure or board shield:', a: 'Contains and grounds the fields', w: ['Adds signal delay', 'Increases trace length', 'Replaces the ground plane'], e: 'Shielding plus stitching vias confine electromagnetic fields; apertures and missing stitching leak emissions.' },
    { p: 'EMI shielding works by:', a: 'Containing fields and grounding them', w: ['Slowing the clock', 'Lengthening traces', 'Removing planes'], e: 'Shielding plus stitching vias confine electromagnetic fields; apertures and missing stitching leak emissions.' },
    { p: 'Stitching vias around a shield boundary:', a: 'Tie the shield to ground at close intervals', w: ['Open solder mask', 'Add drill clutter only', 'Raise impedance'], e: 'Shielding plus stitching vias confine electromagnetic fields; apertures and missing stitching leak emissions.' },
    { p: 'To stop radiated noise, the best practice is:', a: 'Shielding with grounded boundaries', w: ['Longer flying leads', 'Open apertures', 'No ground plane'], e: 'Shielding plus stitching vias confine electromagnetic fields; apertures and missing stitching leak emissions.' },
  ]),
  cv([
    { p: 'A bright, shiny solder joint usually indicates:', a: 'Good wetting and a proper fillet', w: ['A cold joint', 'Too much flux residue', 'Insufficient preheat'], e: 'Shiny, concave fillets show the solder wetted the pad and lead; dull or grainy joints signal cold solder.' },
    { p: 'In inspection, shiny solder means:', a: 'The joint wet well and is solid', w: ['The joint is cold', 'Flux is burnt', 'Preheat missed'], e: 'Shiny, concave fillets show the solder wetted the pad and lead; dull or grainy joints signal cold solder.' },
    { p: 'A dull, grainy solder fillet typically means:', a: 'A cold or contaminated joint', w: ['Perfect wetting', 'Extra flux', 'Too much heat'], e: 'Shiny, concave fillets show the solder wetted the pad and lead; dull or grainy joints signal cold solder.' },
    { p: 'A good-looking solder fillet is:', a: 'Shiny, concave and continuous', w: ['Dull and grainy', 'Balled up', 'Missing the pad'], e: 'Shiny, concave fillets show the solder wetted the pad and lead; dull or grainy joints signal cold solder.' },
  ]),
  cv([
    { p: 'ICT / test points on a board allow:', a: 'Probing and verifying the assembled circuit', w: ['Routing high speed', 'Grounding the silkscreen', 'Cooling the V-score'], e: 'Test points give bed-of-nails fixtures contact for continuity and in-circuit measurements during test.' },
    { p: 'Bed-of-nails testing uses:', a: 'Test points on the board', w: ['Solder bridges', 'The silkscreen', 'The stencil'], e: 'Test points give bed-of-nails fixtures contact for continuity and in-circuit measurements during test.' },
    { p: 'Small pads reserved for probes are called:', a: 'Test points', w: ['Fiducials', 'Thermal reliefs', 'Keep-outs'], e: 'Test points give bed-of-nails fixtures contact for continuity and in-circuit measurements during test.' },
    { p: 'For in-circuit test access, the board has:', a: 'Dedicated probing pads', w: ['Extra silkscreen only', 'Fiducial only', 'No copper'], e: 'Test points give bed-of-nails fixtures contact for continuity and in-circuit measurements during test.' },
  ]),
  cv([
    { p: 'An FR-4 substrate is chosen mainly for:', a: 'Cost, stiffness and flame retardance', w: ['Zero dielectric loss', 'Total flexibility', '300 W/mK thermal conductivity'], e: 'FR-4 is the standard glass-epoxy laminate — rigid, cheap and flame-retardant with adequate electricals.' },
    { p: 'Why is FR-4 the default laminate?', a: 'It is cheap, rigid and fire-resistant', w: ['It is perfectly lossless', 'It flexes forever', 'It conducts heat like metal'], e: 'FR-4 is the standard glass-epoxy laminate — rigid, cheap and flame-retardant with adequate electricals.' },
    { p: 'The standard glass-epoxy board material is:', a: 'FR-4', w: ['Silkscreen', 'Solder mask', 'Polyimide only'], e: 'FR-4 is the standard glass-epoxy laminate — rigid, cheap and flame-retardant with adequate electricals.' },
    { p: 'Most rigid PCB substrates use:', a: 'FR-4 glass-epoxy', w: ['Paper only', 'Copper foil only', 'Air core'], e: 'FR-4 is the standard glass-epoxy laminate — rigid, cheap and flame-retardant with adequate electricals.' },
  ]),
  cv([
    { p: 'A flex PCB is used instead of rigid when:', a: 'The circuit must fold or flex repeatedly', w: ['Line-voltage isolation is needed', 'The board is very thick', 'No copper is needed'], e: 'Polyimide flex circuits tolerate repeated bending and save space where rigid boards would crack.' },
    { p: 'Polyimide flex substrates are chosen for:', a: 'Repeated bending and tight spaces', w: ['Ultra-thick boards', 'High line voltage', 'Zero copper'], e: 'Polyimide flex circuits tolerate repeated bending and save space where rigid boards would crack.' },
    { p: 'When the circuit must fold repeatedly, use:', a: 'A flexible PCB', w: ['A rigid FR-4 board', 'A solder bridge', 'An open frame'], e: 'Polyimide flex circuits tolerate repeated bending and save space where rigid boards would crack.' },
    { p: 'A bendable, one-piece board is usually made on:', a: 'Polyimide (flex) material', w: ['Silkscreen ink', 'FR-4 only', 'Aluminum only'], e: 'Polyimide flex circuits tolerate repeated bending and save space where rigid boards would crack.' },
  ]),
  cv([
    { p: 'Stackup design places signal layers adjacent to:', a: 'A solid reference plane', w: ['The silkscreen', 'Another signal layer only', 'The board edge'], e: 'Signal layers pair with a plane for return current and impedance; adjacent signal layers risk crosstalk.' },
    { p: 'For impedance control, signal traces need a:', a: 'Solid reference plane under them', w: ['Silkscreen layer', 'Second signal layer above', 'Solder mask cap'], e: 'Signal layers pair with a plane for return current and impedance; adjacent signal layers risk crosstalk.' },
    { p: 'A key stackup rule is placing a plane next to:', a: 'Every signal layer that needs control', w: ['The silkscreen', 'The board edge', 'The drill file'], e: 'Signal layers pair with a plane for return current and impedance; adjacent signal layers risk crosstalk.' },
    { p: 'Routing signals without a plane under them gives:', a: 'Poor return current and crosstalk risk', w: ['Perfect shielding', 'Better impedance', 'Fewer vias'], e: 'Signal layers pair with a plane for return current and impedance; adjacent signal layers risk crosstalk.' },
  ]),
  cv([
    { p: 'The manufacturer needs a drill file (Excellon) to:', a: 'Position and size every hole', w: ['Draw the silkscreen', 'Set solder paste volume', 'Define the copper pour'], e: 'An Excellon drill file lists hole locations and tool sizes so the CNC drill matches the fab\'s settings.' },
    { p: 'Excellon drill data specify:', a: 'Hole positions and diameters', w: ['Silkscreen text', 'Paste thickness', 'Pour shape'], e: 'An Excellon drill file lists hole locations and tool sizes so the CNC drill matches the fab\'s settings.' },
    { p: 'Hole positions and tool sizes are sent to the fab in the:', a: 'Drill file', w: ['Stencil file', 'Silkscreen file', 'Solder mask file'], e: 'An Excellon drill file lists hole locations and tool sizes so the CNC drill matches the fab\'s settings.' },
    { p: 'The CNC drill obeys coordinates from the:', a: 'Excellon drill file', w: ['Silkscreen bitmap', 'Stencil outline', 'Pick list'], e: 'An Excellon drill file lists hole locations and tool sizes so the CNC drill matches the fab\'s settings.' },
  ]),
  cv([
    { p: 'Copper pour is mainly used for:', a: 'Low-impedance supply/ground areas', w: ['Holding component leads', 'Printing part values', 'Replacing drill files'], e: 'Pours create low-impedance planes with heat spreading; proper thermal reliefs and clearances matter.' },
    { p: 'A copper pour gives:', a: 'Low-impedance plane areas and heat spreading', w: ['Better silkscreen', 'Smaller holes', 'Faster etching'], e: 'Pours create low-impedance planes with heat spreading; proper thermal reliefs and clearances matter.' },
    { p: 'Solid and hatched pours provide:', a: 'Supply/ground fills with low impedance', w: ['Part labels', 'Drill guides', 'Stencil apertures'], e: 'Pours create low-impedance planes with heat spreading; proper thermal reliefs and clearances matter.' },
    { p: 'Plane areas on a layer are often implemented as:', a: 'Copper pours', w: ['Silkscreen boxes', 'Stencil windows', 'Solder dots'], e: 'Pours create low-impedance planes with heat spreading; proper thermal reliefs and clearances matter.' },
  ]),
  cv([
    { p: 'Edge clearance / keep-out rules exist to:', a: 'Keep copper and parts away from the routed edge', w: ['Increase trace width', 'Add more vias', 'Slow the clock'], e: 'Board-edge tolerances and routing kerf mean copper and parts need a keep-out zone.' },
    { p: 'A keep-out zone near the edge:', a: 'Protects copper and parts from routing damage', w: ['Widens the traces', 'Adds vias', 'Slows the design'], e: 'Board-edge tolerances and routing kerf mean copper and parts need a keep-out zone.' },
    { p: 'Router kerf and tolerances require:', a: 'A clearance zone from the board outline', w: ['Thicker copper', 'More layers', 'Faster clock'], e: 'Board-edge tolerances and routing kerf mean copper and parts need a keep-out zone.' },
    { p: 'Components placed too close to the board edge risk:', a: 'Being cut by routing or V-scoring', w: ['Running faster', 'Better grounding', 'Larger pads'], e: 'Board-edge tolerances and routing kerf mean copper and parts need a keep-out zone.' },
  ]),
  cv([
    { p: 'Glue dots are applied to SMT parts before wave soldering because:', a: 'The wave would otherwise wash them off', w: ['The part is too hot', 'It cuts drill cost', 'It labels the board'], e: 'On mixed boards, solder-side SMT parts are glued so the wave cannot dislodge them before joints form.' },
    { p: 'Why glue SMT parts on the solder side?', a: 'So the wave does not dislodge them', w: ['To cool them', 'To save drill time', 'To add silkscreen'], e: 'On mixed boards, solder-side SMT parts are glued so the wave cannot dislodge them before joints form.' },
    { p: 'Adhesive under solder-side SMT parts:', a: 'Holds them during the wave', w: ['Adds inductance', 'Removes paste', 'Verifies joints'], e: 'On mixed boards, solder-side SMT parts are glued so the wave cannot dislodge them before joints form.' },
    { p: 'Before the wave, bottom-side SMT parts need:', a: 'Adhesive to keep them in place', w: ['Extra silkscreen', 'Longer leads', 'No pads'], e: 'On mixed boards, solder-side SMT parts are glued so the wave cannot dislodge them before joints form.' },
  ]),
  cv([
    { p: 'Before wave soldering a through-hole part, its lead is usually:', a: 'Clinched or trimmed so it stays put', w: ['Left floating above the pad', 'Glued with epoxy only', 'Removed from the hole'], e: 'Leads are clinched or trimmed to hold the part while the solder fillet forms on the solder side.' },
    { p: 'THT leads are handled so that:', a: 'They keep the part seated through the wave', w: ['They float free', 'They get removed', 'They darken'], e: 'Leads are clinched or trimmed to hold the part while the solder fillet forms on the solder side.' },
    { p: 'To keep a THT part seated during the wave:', a: 'Clinching the lead is the standard technique', w: ['Leaving it loose', 'Soldering first', 'Glue on top only'], e: 'Leads are clinched or trimmed to hold the part while the solder fillet forms on the solder side.' },
    { p: 'A good practice for through-hole leads is:', a: 'Trim and clinch before soldering', w: ['Cut all leads to the same length as the case', 'Leave them long and unsoldered', 'Fold them away from the pad'], e: 'Leads are clinched or trimmed to hold the part while the solder fillet forms on the solder side.' },
  ]),
  cv([
    { p: 'A resistor marked brown-black-red-gold has a tolerance of:', a: '±5%', w: ['±10%', '±1%', '±20%'], e: 'The last band sets tolerance: gold = ±5%, silver = ±10%, brown = ±1% (older code, no band: ±20%).' },
    { p: 'A resistor marked red-red-brown-gold is a 220 Ω part with tolerance:', a: '±5%', w: ['±10%', '±1%', '±20%'], e: 'The last band sets tolerance: gold = ±5%, silver = ±10%, brown = ±1% (older code, no band: ±20%).' },
    { p: 'With gold as the fourth resistor band, the tolerance is:', a: '±5%', w: ['±10%', '±1%', '±20%'], e: 'The last band sets tolerance: gold = ±5%, silver = ±10%, brown = ±1% (older code, no band: ±20%).' },
    { p: 'A gold tolerance band on a resistor means:', a: '±5%', w: ['±10%', '±1%', '±20%'], e: 'The last band sets tolerance: gold = ±5%, silver = ±10%, brown = ±1% (older code, no band: ±20%).' },
  ]),
];

export const PCB_GENS = GENS;