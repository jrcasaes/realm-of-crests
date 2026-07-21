import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');
const readJson = (path) => JSON.parse(read(path));
const realms = readJson('src/data/realms.json');
const hotspots = readJson('src/data/atlas-hotspots.json');
const explorerSource = read('src/components/ImmersiveRealmMap.astro');
const atlasPageSource = read('src/pages/atlas.astro');

const failures = [];
const pass = (condition, message) => {
  if (!condition) failures.push(message);
};

const realmSlugs = realms.map((realm) => realm.slug).sort();
const hotspotSlugs = hotspots.map((hotspot) => hotspot.realmSlug).sort();
const mapNumbers = hotspots.map((hotspot) => hotspot.mapNumber).sort((a, b) => a - b);

pass(hotspots.length === 19, `Esperados 19 selos territoriais; encontrados ${hotspots.length}.`);
pass(new Set(hotspotSlugs).size === 19, 'Há Reino duplicado no Atlas interativo.');
pass(JSON.stringify(hotspotSlugs) === JSON.stringify(realmSlugs), 'O Atlas e o roster de Reinos não representam o mesmo conjunto territorial.');
pass(JSON.stringify(mapNumbers) === JSON.stringify(Array.from({ length: 19 }, (_, index) => index + 1)), 'A numeração territorial deve formar a sequência 01–19.');
pass(hotspots.every(({ x, y }) => x >= 0 && x <= 100 && y >= 0 && y <= 100), 'Há selo territorial fora dos limites percentuais do mapa.');

for (const realm of realms) {
  pass(
    existsSync(resolve(root, 'public/assets/realms', realm.panoramaAsset)),
    `Panorama ausente para ${realm.realm}: ${realm.panoramaAsset}`,
  );
  pass(
    existsSync(resolve(root, 'public/assets/emblems', `emblem_${realm.slug}.webp`)),
    `Emblema web ausente para ${realm.realm}.`,
  );
}

const requiredExperienceContracts = [
  ['data-immersive-atlas', 'raiz do explorador'],
  ['aria-live="polite"', 'região viva de status'],
  ['aria-pressed', 'estado dos selos'],
  ['role="listbox"', 'índice territorial acessível'],
  ['prefers-reduced-motion', 'alternativa de movimento reduzido'],
  ['ResizeObserver', 'recomposição responsiva do mapa'],
  ['event.ctrlKey', 'zoom de roda não intrusivo'],
];

for (const [token, label] of requiredExperienceContracts) {
  pass(explorerSource.includes(token), `Contrato ausente no explorador: ${label}.`);
}

pass(atlasPageSource.includes('<ImmersiveRealmMap'), 'A página do Atlas não está usando o explorador da Fase 1.');
pass(atlasPageSource.includes('data-lore-reveal'), 'A sequência de lore não possui revelação progressiva.');
pass(
  /\.atlas-dossier-visual\s*\{[^}]*width:\s*100%;[^}]*height:\s*auto;/.test(explorerSource),
  'O panorama do dossiê deve abandonar a altura herdada abaixo de 700 px.',
);

if (failures.length) {
  console.error('PHASE_1_EXPERIENCE_GATE: FAIL');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('PHASE_1_EXPERIENCE_GATE: PASS');
console.log('19 selos · 19 Reinos · assets 19/19 · teclado · toque · movimento reduzido · zoom não intrusivo');
