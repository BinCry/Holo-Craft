
import { cp, mkdir, rm } from 'node:fs/promises';

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });

for (const file of ['index.html', 'styles.css', 'src', 'models']) {
  await cp(file, `dist/${file}`, { recursive: true });
}

const vendor = 'dist/node_modules/@mediapipe/tasks-vision';
const source = 'node_modules/@mediapipe/tasks-vision';

await mkdir(vendor, { recursive: true });
await cp(`${source}/vision_bundle.mjs`, `${vendor}/vision_bundle.mjs`);
await cp(`${source}/wasm`, `${vendor}/wasm`, { recursive: true });
