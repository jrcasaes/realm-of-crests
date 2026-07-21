import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { chooseGuardianRoutes, normalizeGuardianJourney, recordGuardianVisit } from '../src/lib/continuity.js';
import { parseFervorField } from '../src/lib/fervor.js';

const root = resolve(import.meta.dirname, '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');
const realms = JSON.parse(read('src/data/realms.json'));
const continuitySource = read('src/components/ContinuityEcho.astro');
const packageJson = JSON.parse(read('package.json'));
const failures = [];
const pass = (condition, message) => { if (!condition) failures.push(message); };
const slug = (name) => name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, '-');
const entries = realms.slice().sort((a, b) => a.order - b.order).map((realm) => {
  const relations = parseFervorField(realm.fervor);
  return {
    slug: realm.slug,
    order: realm.order,
    realm: realm.realm,
    guardian: realm.guardian,
    guardianSlug: slug(realm.guardian),
    dominant: relations.find((entry) => entry.role === 'dominante') || relations[0],
    secondary: relations.find((entry) => entry.role === 'secundário') || relations[1],
  };
});
const known = entries.map((entry) => entry.guardianSlug);
const affinities = [...new Set(entries.flatMap((entry) => [entry.dominant.id, entry.secondary.id]))];

pass(packageJson.version === '1.8.3', 'O gate 7.1.1 deve permanecer íntegro no pacote 1.8.3.');
pass(packageJson.scripts?.['validate:vestiges'] === 'node scripts/validate-phase7-1-1.mjs', 'O gate do micropatch não está declarado.');
pass(entries.length === 19 && new Set(known).size === 19, 'A matriz de teste deve conter 19 Guardiões únicos.');
pass(continuitySource.includes("GUARDIAN_JOURNEY_KEY") && continuitySource.includes("root.dataset.mode === 'guardian'"), 'A visita direta ao dossiê não registra memória própria.');
pass(continuitySource.includes('continuar a travessia') && continuitySource.includes('seguir uma ressonância'), 'As duas funções de navegação não estão separadas na interface.');
pass(continuitySource.includes('outra ressonância · travessia completa'), 'O estado pós-cobertura 19/19 não está rotulado.');

for (const start of entries) {
  for (const primary of affinities) {
    for (const secondary of affinities) {
      let state = normalizeGuardianJourney(null, known);
      let current = start;
      const traversal = [];

      for (let step = 0; step < entries.length; step += 1) {
        state = recordGuardianVisit(state, current.guardianSlug, known);
        traversal.push(current.guardianSlug);
        const routes = chooseGuardianRoutes(entries, state, { currentGuardianSlug: current.guardianSlug, primary, secondary });
        const unseen = entries.filter((entry) => !state.seen.includes(entry.guardianSlug));

        pass(routes.continuation?.guardianSlug !== current.guardianSlug, `${current.guardian}: recomendou a si mesmo.`);
        if (unseen.length) {
          pass(!state.seen.includes(routes.continuation?.guardianSlug), `${current.guardian}: repetiu Guardião antes da cobertura 19/19.`);
          if (routes.resonance) {
            pass(!state.seen.includes(routes.resonance.guardianSlug), `${current.guardian}: ressonância repetida antes de 19/19.`);
            pass(routes.resonance.guardianSlug !== routes.continuation?.guardianSlug, `${current.guardian}: as duas rotas apontam para o mesmo Guardião.`);
          }
          current = routes.continuation;
        }
      }

      pass(new Set(traversal).size === 19, `${start.guardian}: a travessia não cobriu os 19 Guardiões sem repetição.`);
      pass(state.seen.length === 19, `${start.guardian}: a memória não registrou cobertura 19/19.`);

      const completed = chooseGuardianRoutes(entries, state, { currentGuardianSlug: current.guardianSlug, primary, secondary });
      pass(completed.coverageComplete, `${start.guardian}: não reconheceu a travessia completa.`);
      pass(!state.recent.includes(completed.continuation?.guardianSlug), `${start.guardian}: retornou a um dos três vestígios recentes.`);
      pass(completed.resonance?.guardianSlug !== completed.continuation?.guardianSlug, `${start.guardian}: duplicou as rotas após 19/19.`);
    }
  }
}

for (const first of entries) {
  let state = recordGuardianVisit(null, first.guardianSlug, known);
  const second = chooseGuardianRoutes(entries, state, { currentGuardianSlug: first.guardianSlug }).continuation;
  state = recordGuardianVisit(state, second.guardianSlug, known);
  const third = chooseGuardianRoutes(entries, state, { currentGuardianSlug: second.guardianSlug }).continuation;
  pass(third?.guardianSlug !== first.guardianSlug, `${first.guardian} ↔ ${second.guardian}: ciclo de dois nós detectado.`);
}

if (failures.length) {
  console.error('PHASE_7_1_1_VESTIGE_DIVERSITY_GATE: FAIL');
  failures.slice(0, 80).forEach((failure) => console.error(`- ${failure}`));
  if (failures.length > 80) console.error(`- ... e mais ${failures.length - 80} falhas.`);
  process.exit(1);
}

console.log('PHASE_7_1_1_VESTIGE_DIVERSITY_GATE: PASS');
console.log('19 inícios × 64 afinidades · cobertura sem repetição · sem autoindicação · sem ciclos A ↔ B · pós-cobertura protegido');
