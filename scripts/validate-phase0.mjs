import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const readJson = (path) => JSON.parse(readFileSync(resolve(root, path), 'utf8'));
const realms = readJson('src/data/realms.json');
const sources = readJson('src/data/sources.json');
const rootSources = readJson('sources.json');

const failures = [];
const pass = (condition, message) => {
  if (!condition) failures.push(message);
};

pass(realms.length === 19, `Esperados 19 Reinos; encontrados ${realms.length}.`);
pass(new Set(realms.map((realm) => realm.slug)).size === 19, 'Os slugs dos Reinos não são únicos.');
pass(new Set(realms.map((realm) => realm.guardian)).size === 19, 'Os Guardiões vinculados aos Reinos não são únicos.');
pass(realms.every((realm) => realm.panoramaAsset), 'Há Reino sem panorama público registrado.');
pass(realms.every((realm) => realm.visualHotspots?.length === 3), 'Cada Reino deve preservar três hotspots visuais nesta fase.');
pass(sources.authority.registry.version_at_sync === '1.2.12', 'O ponteiro público do registry não está em v1.2.12.');
pass(sources.authority.loreMaster.version_at_sync === '3.0.6', 'O ponteiro público do Lore Master não está em v3.0.6.');
pass(sources.authority.guardiansDossier.version_at_sync === '2.6', 'O ponteiro público do Dossiê não está em v2.6.');
pass(sources.authority.cartography?.version_at_sync === '1.1', 'O ponteiro cartográfico não está no master v1.1.');
pass(sources.authority.cartography?.geographyChanged === false, 'A errata cartográfica não pode declarar mudança geográfica.');
pass(JSON.stringify(rootSources) === JSON.stringify(sources), 'Os ponteiros sources.json da raiz e de src/data divergiram.');

const serializedRealms = JSON.stringify(realms);
for (const value of sources.contentCompliance.cc28c.prohibitedActiveLayerValues) {
  pass(!serializedRealms.includes(value), `Camada vedada pela CC-28C encontrada: ${value}`);
}

const legacyDominant = realms
  .filter((realm) => /Fervor de Legado \(dominante\)/i.test(realm.fervor))
  .map((realm) => realm.guardian);
const legacySecondary = realms
  .filter((realm) => /Fervor de Legado \(secundário\)/i.test(realm.fervor))
  .map((realm) => realm.guardian)
  .sort();

pass(JSON.stringify(legacyDominant) === JSON.stringify(['Nego']), `Legado dominante divergente: ${legacyDominant.join(', ') || 'nenhum'}.`);
pass(JSON.stringify(legacySecondary) === JSON.stringify(['Admiral', 'Eldric']), `Legado secundário divergente: ${legacySecondary.join(', ') || 'nenhum'}.`);

const vectorRoot = resolve(root, 'public/assets/fervor/vector');
const expectedVectorCounts = {
  masters: 8,
  'mono-light': 8,
  'mono-dark': 8,
  pdf: 8,
};

for (const [directory, expected] of Object.entries(expectedVectorCounts)) {
  const path = resolve(vectorRoot, directory);
  const count = existsSync(path) ? readdirSync(path).filter((file) => !file.startsWith('.')).length : 0;
  pass(count === expected, `${directory}: esperados ${expected} ativos vetoriais; encontrados ${count}.`);
}

if (failures.length) {
  console.error('PHASE_0_GATE: FAIL');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('PHASE_0_GATE: PASS');
console.log('19 Reinos · 19 Guardiões · 57 hotspots · CC-28C limpa · CC-31 íntegra · vetores 8/8 por família técnica');
