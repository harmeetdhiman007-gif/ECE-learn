// Generates Capacitor + PWA icon/splash PNGs with no dependencies.
// Run: node scripts/gen-assets.mjs
import zlib from 'node:zlib';
import fs from 'node:fs';
import path from 'node:path';

const BG = [10, 14, 20]; // #0a0e14 app background
const BOLT = [0, 255, 136]; // #00ff88 accent

// Bolt polygon in normalized coordinates (y downward).
const BOLT_POLY = [
  [0.4, 0.03],
  [0.68, 0.03],
  [0.55, 0.4],
  [0.42, 0.4],
  [0.62, 0.97],
  [0.24, 0.4],
  [0.37, 0.4],
];

function crc32(buf) {
  let table = crc32.table;
  if (!table) {
    table = crc32.table = new Int32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      table[n] = c;
    }
  }
  let crc = -1;
  for (let i = 0; i < buf.length; i++) crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  return (crc ^ -1) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const body = Buffer.concat([Buffer.from(type, 'latin1'), data]);
  const c = Buffer.alloc(4);
  c.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, c]);
}

function encodePng(width, height, rgba) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (width * 4 + 1)] = 0; // filter: none
    rgba.copy(raw, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
  }
  const idat = zlib.deflateSync(raw, { level: 9 });
  return Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', idat), chunk('IEND', Buffer.alloc(0))]);
}

function pointInPoly(px, py, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    const intersect = yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function inRoundedRect(w, h, x, y, r) {
  const minX = r;
  const maxX = w - r - 1;
  const minY = r;
  const maxY = h - r - 1;
  if (x >= minX && x <= maxX) return true;
  if (y >= minY && y <= maxY) return true;
  const cx = x < minX ? minX : maxX;
  const cy = y < minY ? minY : maxY;
  const dx = x - cx;
  const dy = y - cy;
  return dx * dx + dy * dy <= r * r;
}

function paint(size, { bg = null, bolt = true, rounded = 0, boltScale = 1 }) {
  const rgba = Buffer.alloc(size * size * 4);
  const r = Math.round(size * rounded);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const o = (y * size + x) * 4;
      if (rounded > 0 && !inRoundedRect(size, size, x, y, r)) {
        rgba[o + 3] = 0;
        continue;
      }
      if (bg) {
        rgba[o] = bg[0];
        rgba[o + 1] = bg[1];
        rgba[o + 2] = bg[2];
        rgba[o + 3] = 255;
      }
      if (bolt) {
        const bx = (x + 0.5) / size;
        const by = (y + 0.5) / size;
        const nx = (bx - 0.5) * boltScale + 0.5;
        const ny = (by - 0.5) * boltScale + 0.5;
        if (pointInPoly(nx, ny, BOLT_POLY)) {
          rgba[o] = BOLT[0];
          rgba[o + 1] = BOLT[1];
          rgba[o + 2] = BOLT[2];
          rgba[o + 3] = 255;
        }
      }
    }
  }
  return encodePng(size, size, rgba);
}

const outRoot = path.resolve('resources');
const DENSITIES = [
  ['mdpi', 48, 320],
  ['hdpi', 72, 480],
  ['xhdpi', 96, 640],
  ['xxhdpi', 144, 960],
  ['xxxhdpi', 192, 1280],
];

const targets = [];
function add(rel, png) {
  targets.push([rel, png]);
}

add('icon.png', paint(1024, { bg: BG, bolt: true }));
add('icon-foreground.png', paint(1024, { bolt: true, boltScale: 0.66 }));
add('icon-background.png', paint(1024, { bg: [13, 17, 26] }));
add('splash.png', paint(2732, { bg: BG, bolt: true, boltScale: 0.4 }));

for (const [density, iconSize, splashSize] of DENSITIES) {
  add(`android/icon/${density}/icon.png`, paint(iconSize, { bg: BG, bolt: true, rounded: 0.1 }));
  add(`android/splash/${density}/splash.png`, paint(splashSize, { bg: BG, bolt: true, boltScale: 0.4 }));
}

// PWA icons served from /public.
add('../public/icon-192.png', paint(192, { bg: BG, bolt: true }));
add('../public/icon-512.png', paint(512, { bg: BG, bolt: true }));
add('../public/apple-touch-icon.png', paint(180, { bg: BG, bolt: true, rounded: 0.15 }));

for (const [rel, png] of targets) {
  const file = path.join(outRoot, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, png);
  console.log(`${rel} (${Math.round(png.length / 1024)} KiB)`);
}
console.log('OK');