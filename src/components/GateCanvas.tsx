import { useState } from 'react';
import { GATE_LABELS, gateOutput, type GateDef } from '../lib/digital.js';

export default function GateCanvas({
  gate,
  onRun,
}: {
  gate: GateDef;
  onRun?: (output: boolean) => void;
}) {
  const [a, setA] = useState(gate.in1 === true);
  const [b, setB] = useState(gate.in2 === true);
  const [lastOutput, setLastOutput] = useState<boolean | null>(null);

  const aForced = gate.in1 !== null;
  const bForced = gate.in2 !== null;
  const effA = aForced ? gate.in1 === true : a;
  const effB = bForced ? gate.in2 === true : b;

  const run = () => {
    const out = gateOutput(gate.kind, effA, effB);
    setLastOutput(out);
    if (onRun) onRun(out);
  };

  const inputStyles = (on: boolean) =>
    on
      ? { background: '#ffb454', borderColor: '#ffb454' }
      : { background: '#1c2333', borderColor: '#3a4560' };

  return (
    <div className="gate-canvas">
      <div className="gate-inputs">
        <div
          className={`gate-input ${aForced ? 'locked' : 'toggle'}`}
          style={inputStyles(effA)}
          onClick={() => {
            if (!aForced) setA((v) => !v);
          }}
        >
          <span className="gate-input-label">A</span>
          <span className="gate-input-value">{effA ? '1' : '0'}</span>
        </div>
        {gate.kind !== 'not' && (
          <div
            className={`gate-input ${bForced ? 'locked' : 'toggle'}`}
            style={inputStyles(effB)}
            onClick={() => {
              if (!bForced) setB((v) => !v);
            }}
          >
            <span className="gate-input-label">B</span>
            <span className="gate-input-value">{effB ? '1' : '0'}</span>
          </div>
        )}
      </div>

      <svg className="gate-svg" width="190" height="120" viewBox="0 0 190 120">
        <path
          d={gate.kind === 'not' ? 'M20 40 H105 V25 L165 60 L105 95 V80 H20 Z' : 'M20 35 H105 V20 L175 60 L105 100 V85 H20 Z'}
          fill="#232b3f"
          stroke="#4a5678"
          strokeWidth="2"
        />
        {gate.kind === 'not' && (
          <circle cx="168" cy="60" r="7" fill="none" stroke="#4a5678" strokeWidth="2" />
        )}
        {gate.kind !== 'not' && (
          <>
            <line x1="38" y1="35" x2="20" y2="20" stroke="#3a4560" strokeWidth="3" />
            <line x1="38" y1="35" x2="20" y2="20" stroke="#ffb454" strokeWidth="3" opacity={effA ? 1 : 0.15} />
          </>
        )}
        <line x1="38" y1="85" x2="20" y2="100" stroke="#3a4560" strokeWidth="3" />
        <line x1="38" y1="85" x2="20" y2="100" stroke="#ffb454" strokeWidth="3" opacity={effB ? 1 : 0.15} />
        {gate.kind === 'not' && (
          <line x1="38" y1="60" x2="20" y2="60" stroke="#ffb454" strokeWidth="3" opacity={effA ? 1 : 0.15} />
        )}

        <text x="93" y="66" textAnchor="middle" fill="#c9d4f0" fontSize="22" fontWeight="700">
          {GATE_LABELS[gate.kind]}
        </text>

        <line x1={gate.kind === 'not' ? 175 : 182} y1="60" x2="190" y2="60" stroke="#4a5678" strokeWidth="3" />
        <line x1={gate.kind === 'not' ? 175 : 182} y1="60" x2="190" y2="60" stroke="#ff4040" strokeWidth="3" opacity={lastOutput === true ? 1 : 0} />
      </svg>

      <div className={`gate-led ${lastOutput === true ? 'on' : ''}`}>
        <span className="gate-led-dot" />
        LED: {lastOutput === null ? '—' : lastOutput ? 'ON' : 'OFF'}
      </div>

      <button className="btn-primary" onClick={run}>Run circuit</button>
    </div>
  );
}