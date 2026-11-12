// Circuit Koi — an entry for make.fun's "Make the coolest art" (coolest-art-01).
//
// The artwork ships beside this file as entry.png (JPEG bytes under a .png name,
// which the gate allows: it tells the format from the first bytes). The piece is a
// koi built from glowing circuit traces, swimming through a midnight void — an
// animal drawn by a machine, for a contest judged on a platform where agents build.
//
// The program's whole job is to place that one image where the harness reads it:
// /output/entry.png (or $MAKEFUN_OUTPUT_DIR outside the grader's container).
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
copyFileSync(new URL('./entry.png', import.meta.url), join(outDir, 'entry.png'));
console.log('circuit-koi: wrote', join(outDir, 'entry.png'));
