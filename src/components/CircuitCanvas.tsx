import { memo } from 'react';
import type { Component, CircuitModel, Vec } from '../lib/sim/types.js';
import { simulate } from '../lib/sim/engine.js';

const GRID = 40;
const PAD = 40;
export { GRID, PAD };

function px(v: number) {
  return v * GRID + PAD;
}

interface Geo {
  ax: number;
  ay: number;
  bx: number;
  by: number;
  cx: number;
  cy: number;
  len: number;
  ux: number;
  uy: number;
  angle: number;
  lead: number;
}

function geo(c: Component): Geo {
  const ax = px(c.a.x);
  const ay = px(c.a.y);
  const bx = px(c.b.x);
  const by = px(c.b.y);
  const len = Math.hypot(bx - ax, by - ay) || 1;
  return {
    ax,
    ay,
    bx,
    by,
    cx: (ax + bx) / 2,
    cy: (ay + by) / 2,
    len,
    ux: (bx - ax) / len,
    uy: (by - ay) / len,
    angle: (Math.atan2(by - ay, bx - ax) * 180) / Math.PI,
    lead: Math.max(0, len / 2 - 14),
  };
}

function Leads({ g }: { g: Geo }) {
  return (
    <>
      <line
        x1={g.ax}
        y1={g.ay}
        x2={g.cx - g.lead * g.ux}
        y2={g.cy - g.lead * g.uy}
        stroke="#6b7480"
        strokeWidth={2}
        opacity={0.65}
      />
      <line
        x1={g.bx}
        y1={g.by}
        x2={g.cx + g.lead * g.ux}
        y2={g.cy + g.lead * g.uy}
        stroke="#6b7480"
        strokeWidth={2}
        opacity={0.65}
      />
    </>
  );
}

function BatteryBody({ c }: { c: Component }) {
  const g = geo(c);
  return (
    <g transform={`translate(${g.cx},${g.cy}) rotate(${g.angle})`}>
      <Leads g={g} />
      <line x1={-4} y1={-16} x2={-4} y2={16} stroke="#e0e6ed" strokeWidth={4} />
      <line x1={4} y1={-10} x2={4} y2={10} stroke="#e0e6ed" strokeWidth={4} />
      <line x1={-4} y1={-22} x2={-4} y2={-18} stroke="#00ff88" strokeWidth={2} />
      <text x={0} y={28} fontSize={10} textAnchor="middle" fill="#00ff88" fontWeight="700">
        {c.value ?? 9}V
      </text>
    </g>
  );
}

function ResistorBody({ c }: { c: Component }) {
  const g = geo(c);
  const val = c.value ?? 1000;
  return (
    <g transform={`translate(${g.cx},${g.cy}) rotate(${g.angle})`}>
      <Leads g={g} />
      <polyline
        points="-14,0 -12,-8 -6,8 0,-8 6,8 12,-8 14,0"
        fill="none"
        stroke="#e0e6ed"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      <text x={0} y={24} fontSize={10} textAnchor="middle" fill="#e0e6ed">
        {val >= 1000 ? `${(val / 1000).toFixed(2)}kΩ` : `${val}Ω`}
      </text>
    </g>
  );
}

function LedBody({ c, glow }: { c: Component; glow: boolean }) {
  const g = geo(c);
  const color = c.color ?? '#ffdd00';
  return (
    <g transform={`translate(${g.cx},${g.cy}) rotate(${g.angle})`}>
      <Leads g={g} />
      {glow && <circle r={20} fill={color} opacity={0.2} />}
      <polygon
        points="-9,-11 -9,11 11,0"
        fill={glow ? color : 'rgba(0,0,0,0)'}
        stroke={color}
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      <line x1={11} y1={-11} x2={11} y2={11} stroke={color} strokeWidth={2.5} />
      {glow && (
        <g stroke={color} strokeWidth={1.5} strokeLinecap="round">
          <line x1={14} y1={-16} x2={22} y2={-24} />
          <line x1={20} y1={-8} x2={28} y2={-12} />
          <line x1={20} y1={6} x2={28} y2={10} />
        </g>
      )}
    </g>
  );
}

function LampBody({ c, glow }: { c: Component; glow: boolean }) {
  const g = geo(c);
  const color = glow ? '#ffee88' : '#888';
  return (
    <g transform={`translate(${g.cx},${g.cy}) rotate(${g.angle})`}>
      <Leads g={g} />
      {glow && <circle r={24} fill="#ffee88" opacity={0.18} />}
      <circle r={13} fill="none" stroke={color} strokeWidth={2.5} />
      <line x1={-8} y1={-8} x2={8} y2={8} stroke={color} strokeWidth={2} />
      <line x1={8} y1={-8} x2={-8} y2={8} stroke={color} strokeWidth={2} />
    </g>
  );
}

function SwitchBody({ c }: { c: Component }) {
  const g = geo(c);
  const closed = c.closed ?? true;
  return (
    <g transform={`translate(${g.cx},${g.cy}) rotate(${g.angle})`}>
      <Leads g={g} />
      <circle cx={-12} cy={0} r={3.5} fill="#e0e6ed" />
      <circle cx={12} cy={0} r={3.5} fill="#e0e6ed" />
      <line
        x1={-12}
        y1={0}
        x2={closed ? 12 : 6}
        y2={closed ? 0 : -14}
        stroke="#e0e6ed"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <text x={0} y={22} fontSize={10} textAnchor="middle" fill={closed ? '#00ff88' : '#ff4444'}>
        {closed ? 'ON' : 'OFF'}
      </text>
    </g>
  );
}

function Wire({ c, active, onClick }: { c: Component; active: boolean; onClick?: () => void }) {
  const g = geo(c);
  const mx = (g.ax + g.bx) / 2;
  const my = (g.ay + g.by) / 2;

  if (c.broken) {
    return (
      <g onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
        <line x1={g.ax} y1={g.ay} x2={mx - 8} y2={my - 8} stroke="#ff4444" strokeWidth={3} strokeDasharray="5,4" />
        <line x1={mx + 8} y1={my + 8} x2={g.bx} y2={g.by} stroke="#ff4444" strokeWidth={3} strokeDasharray="5,4" />
        <circle cx={mx} cy={my} r={9} fill="none" stroke="#ff4444" strokeWidth={2} />
        <path d={`M ${mx - 4} ${my - 4} L ${mx + 4} ${my + 4} M ${mx + 4} ${my - 4} L ${mx - 4} ${my + 4}`} stroke="#ff4444" strokeWidth={2} />
      </g>
    );
  }

  return (
    <line
      x1={g.ax}
      y1={g.ay}
      x2={g.bx}
      y2={g.by}
      stroke={active ? '#00ff88' : '#6b7480'}
      strokeWidth={3}
      strokeLinecap="round"
      className={active ? 'wire-live' : ''}
    />
  );
}

function Part({
  c,
  glow,
  live,
  onClick,
}: {
  c: Component;
  glow: boolean;
  live: boolean;
  onClick?: (id: string) => void;
}) {
  switch (c.kind) {
    case 'battery':
      return <BatteryBody c={c} />;
    case 'resistor':
      return <ResistorBody c={c} />;
    case 'led':
      return <LedBody c={c} glow={glow} />;
    case 'lamp':
      return <LampBody c={c} glow={glow} />;
    case 'switch':
      return <SwitchBody c={c} />;
    case 'wire':
      return (
        <Wire
          c={c}
          active={live}
          onClick={onClick ? () => onClick(c.id) : undefined}
        />
      );
  }
}

export interface SlotMark {
  id: string;
  pos: Vec;
  required: string;
  filled: boolean;
}

export interface CircuitCanvasProps {
  model: CircuitModel;
  onComponentClick?: (id: string) => void;
  slots?: SlotMark[];
  onSlotClick?: (id: string) => void;
  selectedSlot?: string | null;
}

function slotLabel(required: string): string {
  switch (required) {
    case 'wire':
      return 'wire';
    case 'resistor':
    case 'resistor-high':
      return 'resistor';
    case 'led':
      return 'LED';
    case 'switch':
      return 'switch';
    default:
      return 'place';
  }
}

function CircuitCanvasInner({
  model,
  onComponentClick,
  slots,
  onSlotClick,
  selectedSlot,
}: CircuitCanvasProps) {
  const result = simulate(model);
  const ledLive =
    result !== null &&
    model.components.some(
      (c) =>
        (c.kind === 'led' || c.kind === 'lamp') &&
        (result.componentCurrents.get(c.id) ?? 0) > 1e-6,
    );

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const c of model.components) {
    minX = Math.min(minX, c.a.x, c.b.x);
    minY = Math.min(minY, c.a.y, c.b.y);
    maxX = Math.max(maxX, c.a.x, c.b.x);
    maxY = Math.max(maxY, c.a.y, c.b.y);
  }
  if (!Number.isFinite(minX)) {
    minX = 0;
    minY = 0;
    maxX = 5;
    maxY = 3;
  }

  const pad = 1.4;
  const left = (minX - pad) * GRID + PAD;
  const top = (minY - pad) * GRID + PAD;
  const right = (maxX + pad) * GRID + PAD;
  const bottom = (maxY + pad) * GRID + PAD;
  const vw = right - left;
  const vh = bottom - top;

  return (
    <svg
      viewBox={`${left} ${top} ${vw} ${vh}`}
      className="circuit-svg"
      role="img"
    >
      <defs>
        <filter id="led-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* grid dots */}
      {Array.from(
        { length: Math.ceil(maxX - minX) + 4 },
        (_, i) =>
          i + Math.floor(minX) - 1,
      ).flatMap((gx) =>
        Array.from(
          { length: Math.ceil(maxY - minY) + 4 },
          (_, j) => j + Math.floor(minY) - 1,
        ).map((gy) => (
          <circle
            key={`${gx},${gy}`}
            cx={px(gx)}
            cy={px(gy)}
            r={1.4}
            fill="#1a2534"
          />
        )),
      )}

      {/* wires (under bodies) */}
      {model.components.map((c) =>
        c.kind === 'wire' ? (
          <Part
            key={c.id}
            c={c}
            glow={false}
            live={ledLive}
            onClick={onComponentClick}
          />
        ) : null,
      )}

      {/* component bodies */}
      {model.components.map((c) =>
        c.kind === 'wire' ? null : (
          <Part
            key={c.id}
            c={c}
            glow={ledLive}
            live={ledLive}
            onClick={onComponentClick}
          />
        ),
      )}

      {/* pin dots */}
      {model.components.map((c) => (
        <g key={`${c.id}-pins`}>
          <circle cx={px(c.a.x)} cy={px(c.a.y)} r={4} fill="#00ff88" />
          <circle cx={px(c.b.x)} cy={px(c.b.y)} r={4} fill="#00ff88" />
        </g>
      ))}

      {/* empty build slots */}
      {slots?.map((s) =>
        s.filled ? null : (
          <g
            key={s.id}
            transform={`translate(${px(s.pos.x)},${px(s.pos.y)})`}
            onClick={onSlotClick ? () => onSlotClick(s.id) : undefined}
            style={{ cursor: onSlotClick ? 'pointer' : 'default' }}
          >
            <rect
              x={-17}
              y={-17}
              width={34}
              height={34}
              rx={6}
              fill="none"
              stroke={selectedSlot === s.id ? '#00ff88' : '#3a4a5c'}
              strokeWidth={selectedSlot === s.id ? 3 : 2}
              strokeDasharray="6,4"
            />
            <text
              y={30}
              fontSize={9}
              textAnchor="middle"
              fill={selectedSlot === s.id ? '#00ff88' : '#9aa5b1'}
            >
              {selectedSlot === s.id ? 'place here' : slotLabel(s.required)}
            </text>
          </g>
        ),
      )}
    </svg>
  );
}

const CircuitCanvas = memo(CircuitCanvasInner);
export default CircuitCanvas;