import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');
const failures = [];
const pass = (condition, message) => { if (!condition) failures.push(message); };

const packageJson = JSON.parse(read('package.json'));
const home = read('src/pages/index.astro');
const atlas = read('src/pages/atlas.astro');
const realm = read('src/pages/reinos/[slug].astro');
const guardian = read('src/pages/guardioes/[slug].astro');
const panorama = read('src/components/RealmPanorama.astro');
const realmExplorer = read('src/components/RealmAtlasExplorer.astro');
const firstCrossing = read('src/components/FirstCrossing.astro');
const continuity = read('src/components/ContinuityEcho.astro');
const hud = read('src/components/ExplorationHUD.astro');
const journal = read('src/components/EmberlineJournal.astro');
const lens = read('src/components/SystemLens.astro');
const gravity = read('src/pages/sistemas/gravity.astro');
const ascension = read('src/pages/sistemas/ascensao.astro');
const release = read('scripts/validate-phase6.mjs');

pass(packageJson.version === '1.8.1', 'A Fase 7 com o micropatch 7.1.1 deve identificar o pacote 1.8.1.');
pass(packageJson.scripts?.['validate:continuity'] === 'node scripts/validate-phase7.mjs', 'O gate da Fase 7 não está declarado.');
pass(home.includes('<FirstCrossing base={base} />') && firstCrossing.includes('roc.first-passage.v1'), 'A Primeira Travessia opcional está incompleta.');
pass(hud.includes('data-first-passage-link') && hud.includes('I · Encontrar um Reino') && hud.includes('IV · Guardar a memória'), 'O HUD não conduz as quatro passagens.');
pass(atlas.includes('<ContinuityEcho mode="atlas" />'), 'O Atlas não expõe a bússola contextual.');
pass(realm.includes('mode="realm"') && guardian.includes('mode="guardian"'), 'Reino e Guardião não compartilham o eco contextual.');
pass(continuity.includes('continuar a travessia · próximo vestígio') && continuity.includes('fragmento que reaparece'), 'A recomendação explicada ou o reaparecimento de fragmentos está ausente.');
pass(continuity.includes('recommended.dominant.id === primary') && continuity.includes('recommended.secondary.id === primary'), 'A recomendação não considera Fervores dominante e secundário.');
pass(continuity.includes('roc.guardians.v1') || continuity.includes('GUARDIAN_JOURNEY_KEY'), 'A memória própria dos Guardiões não está conectada.');
pass(panorama.includes('/assets/atlas/realms/960/') && panorama.includes('/assets/atlas/realms/1536/') && !panorama.includes('/assets/realms/${realm.panoramaAsset}'), 'Os fólios territoriais ainda podem servir PNGs mestres.');
pass(realmExplorer.includes('/assets/atlas/realms/960/') && realmExplorer.includes('/assets/atlas/realms/1536/') && !realmExplorer.includes('/assets/realms/${data.panorama}'), 'O arquivo dos Reinos ainda pode servir PNGs mestres.');
pass(journal.includes('aria-busy="true"') && journal.includes("root.dataset.ready = 'true'"), 'O Diário não bloqueia o lampejo do estado zero.');
pass(gravity.includes('<SystemLens kind="gravity" />') && ascension.includes('<SystemLens kind="ascension" />'), 'As demonstrações leves de Gravity e Ascensão estão ausentes.');
pass(lens.includes('não é escala de poder') && lens.includes('não cria estado canônico'), 'As demonstrações não declaram seus limites canônicos.');
pass(release.includes('transparentAtlasEmblems.length === 19') && release.includes("includes('emblem_botafia.webp')"), 'O gate ainda não reconhece Botáfia e o lote 19/19.');
pass(existsSync(resolve(root, 'roc-site-source-manifest.v1.2.15.json')), 'O manifesto operacional da Fase 7 está ausente.');

if (failures.length) {
  console.error('PHASE_7_CONTINUITY_GATE: FAIL');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('PHASE_7_CONTINUITY_GATE: PASS');
console.log('saneamento 19/19 · Primeira Travessia · ecos explicados · fragmentos vivos · demonstrações sistêmicas');
