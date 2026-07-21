import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');
const failures = [];
const pass = (condition, message) => { if (!condition) failures.push(message); };

const packageJson = JSON.parse(read('package.json'));
const realms = JSON.parse(read('src/data/realms.json'));
const continuity = read('src/components/ContinuityEcho.astro');
const realmPage = read('src/pages/reinos/[slug].astro');
const galicia = realms.find((realm) => realm.slug === 'galicia');
const arena = galicia?.visualHotspots?.find((hotspot) => hotspot.label === 'Arena de Ferro');

pass(packageJson.version === '1.8.2', 'O micropatch 7.1.2 deve identificar o pacote 1.8.2.');
pass(packageJson.scripts?.['validate:legibility'] === 'node scripts/validate-phase7-1-2.mjs', 'O gate de legibilidade não está declarado.');
pass(continuity.includes('container: continuity / inline-size'), 'O eco contextual não responde à largura do próprio componente.');
pass(continuity.includes('@container continuity (max-width: 900px)'), 'O colapso intermediário do eco contextual está ausente.');
pass(continuity.includes('min-width: 0') && continuity.includes('overflow-wrap: anywhere'), 'As defesas contra overflow do eco contextual estão incompletas.');
pass(realmPage.includes('<dt>Âncora territorial</dt>') && realmPage.includes('<dd>{realm.temple}</dd>'), 'A quarta célula canônica dos fólios territoriais está ausente.');
pass(realms.length === 19 && realms.every((realm) => typeof realm.temple === 'string' && realm.temple.trim()), 'A âncora territorial não está disponível nos 19 Reinos.');
pass(arena?.x === 76 && arena?.y === 59, `A Arena de Ferro permanece fora da posição aprovada: ${arena?.x ?? '?'} / ${arena?.y ?? '?'}.`);

if (failures.length) {
  console.error('PHASE_7_1_2_LEGIBILITY_GATE: FAIL');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('PHASE_7_1_2_LEGIBILITY_GATE: PASS');
console.log('container 900 px · quarta célula 19/19 · Arena de Ferro 76/59 · defesas de overflow');
