import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');
const readJson = (path) => JSON.parse(read(path));

const realms = readJson('src/data/realms.json');
const layoutSource = read('src/layouts/BaseLayout.astro');
const hudSource = read('src/components/ExplorationHUD.astro');
const homeSource = read('src/pages/index.astro');
const atlasSource = read('src/components/ImmersiveRealmMap.astro');

const failures = [];
const pass = (condition, message) => {
  if (!condition) failures.push(message);
};

pass(realms.length === 19, `O registro exige 19 Reinos; encontrados ${realms.length}.`);
pass(new Set(realms.map(({ slug }) => slug)).size === 19, 'O roster possui slug territorial duplicado.');
pass(layoutSource.includes('<ExplorationHUD />'), 'O HUD de exploração não está montado no layout global.');
pass(hudSource.includes("const STORAGE_KEY = 'roc.exploration.v1'"), 'A chave versionada de progresso local não está declarada.');
pass(hudSource.includes('localStorage.setItem'), 'O registro não persiste a jornada no navegador.');
pass(hudSource.includes('Nenhuma conta, envio ou rastreamento'), 'O HUD não explicita a privacidade do registro local.');
pass(hudSource.includes('transition:persist="exploration-hud"'), 'O HUD não persiste durante as transições internas.');
pass(hudSource.includes('aria-pressed="false"'), 'A ambiência deve nascer explicitamente desligada.');
pass(hudSource.includes("audioToggle.addEventListener('click'"), 'A ambiência não está vinculada a consentimento por clique.');
pass(!hudSource.includes('<audio autoplay'), 'Áudio automático não é permitido.');
pass(atlasSource.includes("new CustomEvent('roc:realm-visited'"), 'O Atlas não emite descobertas para o registro global.');
pass(atlasSource.includes('recordVisit = false'), 'Hover ou foco pode estar registrando descoberta indevida.');

const requiredHomeContracts = [
  ['data-home-journey', 'portal cinematográfico'],
  ['data-exploration-continue', 'continuação de jornada'],
  ['data-exploration-count', 'progresso local'],
  ['data-origin-sequence', 'scrollytelling de origem'],
  ['data-origin-chapter="0"', 'capítulo Crest'],
  ['data-origin-chapter="1"', 'capítulo Guardião'],
  ['data-origin-chapter="2"', 'capítulo Ruína'],
  ['prefers-reduced-motion', 'alternativa de movimento reduzido'],
];

for (const [token, label] of requiredHomeContracts) {
  pass(homeSource.includes(token), `Contrato ausente na home: ${label}.`);
}

if (failures.length) {
  console.error('PHASE_2_JOURNEY_GATE: FAIL');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('PHASE_2_JOURNEY_GATE: PASS');
console.log('portal · rotas · scrollytelling 3/3 · registro local 0/19 · HUD global · áudio opt-in');
