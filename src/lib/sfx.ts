/**
 * Tiny sound + haptic feedback using the Web Audio API and the Vibration API.
 * No assets, no dependencies — just oscillator blips.
 */

type FxKind = 'correct' | 'wrong' | 'win' | 'tap';

let ctx: AudioContext | null = null;

function ac(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    if (!ctx) {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctor) return null;
      ctx = new Ctor();
    }
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function tone(
  freq: number,
  start: number,
  dur: number,
  type: OscillatorType = 'sine',
  gain = 0.07,
) {
  const c = ac();
  if (!c) return;
  try {
    const t0 = c.currentTime + start;
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain, t0 + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g);
    g.connect(c.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.03);
  } catch {
    // audio unavailable — ignore
  }
}

export function playFx(kind: FxKind) {
  try {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      if (kind === 'correct') navigator.vibrate(15);
      else if (kind === 'wrong') navigator.vibrate([40, 30, 60]);
      else if (kind === 'win') navigator.vibrate([30, 40, 30, 40, 80]);
    }
  } catch {
    // vibration unavailable — ignore
  }

  switch (kind) {
    case 'correct':
      tone(660, 0, 0.12);
      tone(880, 0.09, 0.16);
      break;
    case 'wrong':
      tone(220, 0, 0.2, 'square', 0.05);
      break;
    case 'win':
      tone(523, 0, 0.11);
      tone(659, 0.11, 0.11);
      tone(784, 0.22, 0.22);
      break;
    case 'tap':
      tone(440, 0, 0.05, 'sine', 0.03);
      break;
  }
}