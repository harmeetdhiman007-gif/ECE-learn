import { useState } from 'react';

function fmt(v: number, digits = 2): string {
  if (!Number.isFinite(v)) return '—';
  if (Math.abs(v) >= 1000) return v.toPrecision(4).replace(/\.?0+$/, '');
  if (Math.abs(v) >= 1) return v.toFixed(digits);
  return v.toFixed(3);
}

export default function PowerCalculator() {
  const [voltage, setVoltage] = useState('9');
  const [mode, setMode] = useState<'i' | 'r'>('i');
  const [currentMa, setCurrentMa] = useState('20');
  const [resistance, setResistance] = useState('330');

  const [r1, setR1] = useState('220');
  const [r2, setR2] = useState('330');

  const V = parseFloat(voltage);
  const R = parseFloat(resistance);
  const I =
    mode === 'i'
      ? parseFloat(currentMa) / 1000
      : Number.isFinite(V) && Number.isFinite(R) && R > 0
        ? V / R
        : NaN;
  const P = Number.isFinite(V) && Number.isFinite(I) ? V * I : NaN;
  const Ima = Number.isFinite(I) ? I * 1000 : NaN;

  const Ra = parseFloat(r1);
  const Rb = parseFloat(r2);
  const series = Number.isFinite(Ra) && Number.isFinite(Rb) ? Ra + Rb : NaN;
  const parallel =
    Number.isFinite(Ra) && Number.isFinite(Rb) && Ra + Rb > 0
      ? (Ra * Rb) / (Ra + Rb)
      : NaN;

  return (
    <div className="calc-panel">
      <h3 className="calc-title">🔌 Power calculator</h3>
      <p className="calc-sub">P = V × I = V² / R. Play with values.</p>

      <div className="calc-grid">
        <label className="calc-field">
          <span>Voltage (V)</span>
          <input
            type="number"
            inputMode="decimal"
            value={voltage}
            onChange={(e) => setVoltage(e.target.value)}
          />
        </label>

        <label className="calc-field">
          <span>Given</span>
          <select value={mode} onChange={(e) => setMode(e.target.value as 'i' | 'r')}>
            <option value="i">Current (mA)</option>
            <option value="r">Resistance (Ω)</option>
          </select>
        </label>

        {mode === 'i' ? (
          <label className="calc-field">
            <span>Current (mA)</span>
            <input
              type="number"
              inputMode="decimal"
              value={currentMa}
              onChange={(e) => setCurrentMa(e.target.value)}
            />
          </label>
        ) : (
          <label className="calc-field">
            <span>Resistance (Ω)</span>
            <input
              type="number"
              inputMode="decimal"
              value={resistance}
              onChange={(e) => setResistance(e.target.value)}
            />
          </label>
        )}
      </div>

      <div className="calc-readout">
        <span className="calc-readout-item">
          Current: <strong>{fmt(Ima)} mA</strong>
        </span>
        <span className="calc-readout-item">
          Power: <strong>{fmt(P)} W</strong>
        </span>
        <span className="calc-readout-item">
          Energy (1 h): <strong>{fmt(P * 3600)} J</strong>
        </span>
      </div>

      <div className="calc-divider">Resistor combos</div>
      <div className="calc-grid">
        <label className="calc-field">
          <span>R₁ (Ω)</span>
          <input
            type="number"
            inputMode="decimal"
            value={r1}
            onChange={(e) => setR1(e.target.value)}
          />
        </label>
        <label className="calc-field">
          <span>R₂ (Ω)</span>
          <input
            type="number"
            inputMode="decimal"
            value={r2}
            onChange={(e) => setR2(e.target.value)}
          />
        </label>
      </div>
      <div className="calc-readout">
        <span className="calc-readout-item">
          Series: <strong>{fmt(series)} Ω</strong>
        </span>
        <span className="calc-readout-item">
          Parallel: <strong>{fmt(parallel)} Ω</strong>
        </span>
      </div>
    </div>
  );
}