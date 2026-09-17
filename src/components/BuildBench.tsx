import { useEffect, useState } from 'react';
import type { CircuitModel, Component } from '../lib/sim/types.js';
import { checkCircuit } from '../lib/sim/engine.js';
import CircuitCanvas from './CircuitCanvas.js';
import type { BuildStep, BuildSlot } from '../lib/lessons/types.js';

function requiredFits(required: BuildSlot['required'], kind: Component['kind']): boolean {
  switch (required) {
    case 'resistor':
    case 'resistor-high':
      return kind === 'resistor';
    case 'wire':
      return kind === 'wire';
    case 'led':
      return kind === 'led' || kind === 'lamp';
    case 'switch':
      return kind === 'switch';
    default:
      return true;
  }
}

export default function BuildBench({
  step,
  onSolve,
}: {
  step: BuildStep;
  onSolve: (pass: boolean) => void;
}) {
  const [placed, setPlaced] = useState<Record<string, number>>({});
  const [selectedPalette, setSelectedPalette] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<boolean | null>(null);

  const assembled: CircuitModel = {
    components: [
      ...step.base,
      ...step.slots.flatMap((slot) => {
        const ci = placed[slot.id];
        const tpl = ci !== undefined ? step.palette[ci] : undefined;
        if (!tpl) return [];
        const comp: Component = {
          ...tpl.component,
          id: `slot-${slot.id}`,
          a: slot.pos,
          b:
            slot.dir === 'v'
              ? { x: slot.pos.x, y: slot.pos.y + 1 }
              : { x: slot.pos.x + 1, y: slot.pos.y },
        };
        return [comp];
      }),
    ],
  };

  const kindOk = step.slots.every((slot) => {
    const ci = placed[slot.id];
    if (ci === undefined) return false;
    const tpl = step.palette[ci];
    return tpl ? requiredFits(slot.required, tpl.component.kind) : false;
  });

  const evaluate = () => {
    const pass = kindOk && checkCircuit(assembled, step.check);
    setLastResult(pass);
    return pass;
  };

  // Only declare a build "solved" once the placed parts pass both kind and physics.
  useEffect(() => {
    if (lastResult === true) onSolve(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastResult]);

  const handleSlot = (slotId: string) => {
    if (lastResult === true) return;
    if (selectedPalette !== null && placed[slotId] === undefined) {
      const next = { ...placed, [slotId]: selectedPalette };
      setPlaced(next);
      setLastResult(null);
      setSelectedPalette(null);
      setSelectedSlot(null);
      return;
    }
    setSelectedSlot(selectedSlot === slotId ? null : slotId);
  };

  const handlePlacedClick = (id: string) => {
    if (lastResult === true || !id.startsWith('slot-')) return;
    const slotId = id.replace('slot-', '');
    if (placed[slotId] === undefined) return;
    const next = { ...placed };
    delete next[slotId];
    setPlaced(next);
    setLastResult(null);
  };

  const showEmpty = selectedSlot !== null && placed[selectedSlot] === undefined;

  return (
    <div className="build-card">
      <div className="circuit-frame lab-canvas">
        <CircuitCanvas
          model={assembled}
          slots={step.slots.map((slot) => ({
            id: slot.id,
            pos: slot.pos,
            required: slot.required,
            filled: placed[slot.id] !== undefined,
          }))}
          onSlotClick={handleSlot}
          onComponentClick={handlePlacedClick}
          selectedSlot={showEmpty ? selectedSlot : null}
        />
      </div>

      <div className="palette-bar">
        {step.palette.map((p, i) => (
          <button
            key={p.label}
            className={`chip ${selectedPalette === i ? 'active' : ''}`}
            onClick={() => {
              if (lastResult === true) return;
              setSelectedPalette(selectedPalette === i ? null : i);
              setSelectedSlot(null);
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      <p className="build-status">
        {lastResult === true
          ? '✓ Correct build! Current is flowing safely.'
          : lastResult === false
            ? '✗ Not quite — check the parts you placed and try again.'
            : selectedPalette !== null
              ? 'Pick a part, then tap an empty slot to place it.'
              : 'Pick a part from the bench, then tap an empty slot.'}
      </p>

      {lastResult !== true && (
        <button
          className="btn-primary"
          onClick={evaluate}
          disabled={step.slots.some((s) => placed[s.id] === undefined)}
        >
          Test circuit
        </button>
      )}
    </div>
  );
}