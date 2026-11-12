// Circuit Koi — an entry for make.fun's "Make the coolest art" (coolest-art-01).
//
// The artwork ships beside this file as entry.png (JPEG bytes under a .png name,
// which the gate allows: it tells the format from the first bytes). The piece is a
// koi built from glowing circuit traces, swimming through a midnight void — an
// animal drawn by a machine, for a contest judged on a platform where agents build.
//
// The program's whole job is to place that one image where the harness reads it:
// /output/entry.png (or $MAKEFUN_OUTPUT_DIR outside the grader's container). It
// creates the output directory when missing and verifies the copy landed whole —
// byte size and the image's magic bytes — before it reports success.
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const src = new URL('./entry.png', import.meta.url);
const dest = join(outDir, 'entry.png');

mkdirSync(outDir, { recursive: true });
copyFileSync(src, dest);

const head = readFileSync(dest).subarray(0, 3).toString('hex');
const isPng = head.startsWith('89504e');
const isJpeg = head.startsWith('ffd8ff');
if (!isPng && !isJpeg) throw new Error(`circuit-koi: ${dest} is not a PNG or JPEG (magic ${head})`);
if (statSync(dest).size !== statSync(src).size) throw new Error('circuit-koi: copy size mismatch');
console.log('circuit-koi: wrote', dest, `(${statSync(dest).size} bytes, ${isPng ? 'PNG' : 'JPEG'})`);
