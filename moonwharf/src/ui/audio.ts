// Tiny WebAudio synth for UI/gameplay feedback. The AudioContext is created on the first user gesture
// (iOS requires it) and every sound respects the mute toggle.
let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let muted = false;
let lastGather = 0;
let lastSale = 0;

export function isMuted(): boolean { return muted; }
export function setMuted(m: boolean): void {
  muted = m;
  if (master) master.gain.value = m ? 0 : 0.5;
}

export function unlockAudio(): void {
  if (ctx) { if (ctx.state === 'suspended') ctx.resume().catch(() => {}); return; }
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = muted ? 0 : 0.5;
    master.connect(ctx.destination);
    // A silent blip fully unlocks iOS output.
    const b = ctx.createBuffer(1, 1, 22050), src = ctx.createBufferSource();
    src.buffer = b; src.connect(master); src.start(0);
  } catch { ctx = null; }
}

function tone(freq: number, start: number, dur: number, type: OscillatorType, vol: number, slideTo?: number): void {
  if (!ctx || !master || muted) return;
  const t0 = ctx.currentTime + start;
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t0);
  if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(vol, t0 + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g); g.connect(master);
  o.start(t0); o.stop(t0 + dur + 0.02);
}

function noise(start: number, dur: number, vol: number, hp: number): void {
  if (!ctx || !master || muted) return;
  const t0 = ctx.currentTime + start;
  const len = Math.max(1, Math.floor(ctx.sampleRate * dur));
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
  const src = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
  src.buffer = buf; f.type = 'highpass'; f.frequency.value = hp; g.gain.value = vol;
  src.connect(f); f.connect(g); g.connect(master);
  src.start(t0);
}

export const sfx = {
  sale(): void {
    const now = performance.now(); if (now - lastSale < 70) return; lastSale = now;
    tone(1318.5, 0, 0.18, 'triangle', 0.22); tone(1975.5, 0.06, 0.28, 'sine', 0.16);
  },
  gather(): void {
    const now = performance.now(); if (now - lastGather < 60) return; lastGather = now;
    noise(0, 0.05, 0.35, 2500); tone(420, 0, 0.07, 'square', 0.05, 260);
  },
  pour(step: number): void {
    const f = 440 * Math.pow(2, Math.min(step, 36) / 24);
    tone(f, 0, 0.07, 'triangle', 0.12);
  },
  build(): void {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, i * 0.07, 0.9, 'triangle', 0.14));
  },
  tech(): void { tone(784, 0, 0.15, 'sine', 0.18); tone(1175, 0.1, 0.35, 'sine', 0.16); },
  tap(): void { tone(660, 0, 0.04, 'sine', 0.06); },
  coinsBig(): void { [988, 1319, 1568, 1976].forEach((f, i) => tone(f, i * 0.06, 0.25, 'triangle', 0.14)); },
};
