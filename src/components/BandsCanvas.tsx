import { useState } from 'react';
import { BAND_COLORS, decodeBands, formatOhms } from '../lib/sim/bands.js';

const CYCLE = [
  ...BAND_COLORS.map((b) => ({ name: b.name, hex: b.hex })),
  { name: 'gold', hex: '#d8a928' },
  { name: 'silver', hex: '#b8bdc4' },
];

const BAND_COUNT = 4;
const DIRECTION_BAND = '#b8bdc4';

interface Props {
  value: number;
  onSolve: (correct: boolean) => void;
}

export default function BandsCanvas({ value, onSolve }: Props) {
  const [bands, setBands] = useState<number[]>(Array(BAND_COUNT).fill(0));
  const [checked, setChecked] = useState(false);

  const cycle = (i: number) =>
    setBands((prev) => prev.map((c, j) => (j === i ? (c + 1) % CYCLE.length : c)));

  const decoded = decodeBands(bands.map((i) => CYCLE[i].name));
  const correct = decoded === value;

  const check = () => {
    setChecked(true);
    onSolve(correct);
  };

  const reset = () => {
    setChecked(false);
    setBands(Array(BAND_COUNT).fill(0));
  };

  return (
    <div className="bands-card">
      <div className="bands-resistor">
        <svg viewBox="0 0 320 108" width="100%" height="108">
          <rect x={30} y={28} width={160} height={44} rx={8} fill="#3a8fd4" />
          <rect
            x={30} y={28} width={160} height={44} rx={8}
            fill="none" stroke="#cde3f5" strokeOpacity={0.25}
          />
          <rect x={168} y={24} width={10} height={52} fill={DIRECTION_BAND} />
          <line x1={30} y1={50} x2={6} y2={50} stroke="#6b7480" strokeWidth={3} />
          <line x1={190} y1={50} x2={214} y2={50} stroke="#6b7480" strokeWidth={3} />
          <circle cx={6} cy={50} r={4} fill="#dddddd" />
          <circle cx={214} cy={50} r={4} fill="#dddddd" />

          {bands.map((ci, i) => (
            <g key={i} onClick={() => !checked && cycle(i)} style={{ cursor: checked ? 'default' : 'pointer' }}>
              <rect
                x={52 + i * 20}
                y={24}
                width={12}
                height={52}
                rx={2}
                fill={CYCLE[ci].hex}
              />
              <text x={58 + i * 20} y={92} fontSize={8.5} textAnchor="middle" fill="#9aa5b1">
                tap
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="bands-readout">
        <span className="readout-label">Decoded value</span>
        <span className={`readout-value ${checked ? (correct ? 'ok' : 'bad') : ''}`}>
          {checked ? (correct ? formatOhms(value) : decodeResult()) : '???'}
        </span>
        <span className="readout-target">Target: {formatOhms(value)}</span>
      </div>

      {!checked && (
        <button className="btn-primary" onClick={check} disabled={decoded === null}>
          Check bands
        </button>
      )}

      {checked && !correct && (
        <button className="btn-primary" onClick={reset}>
          Try again
        </button>
      )}

      {correct && <p className="step-success">Bands decoded! You got it.</p>}
    </div>
  );

  function decodeResult(): string {
    return decoded === null ? 'invalid bands' : formatOhms(decoded);
  }
}