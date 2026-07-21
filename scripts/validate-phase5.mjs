import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');
const readJson = (path) => JSON.parse(read(path));
const realms = readJson('src/data/realms.json');
const modelSource = read('src/lib/journal.js');
const journalSource = read('src/components/EmberlineJournal.astro');
const pageSource = read('src/pages/diario/index.astro');
const hudSource = read('src/components/ExplorationHUD.astro');
const headerSource = read('src/components/Header.astro');
const homeSource = read('src/pages/index.astro');
const layoutSource = read('src/layouts/BaseLayout.astro');
const globalSource = read('src/styles/global.css');
const emberSource = read('src/components/EmberField.astro');

const failures = [];
const pass = (condition, message) => { if (!condition) failures.push(message); };

pass(realms.length === 19 && new Set(realms.map(({ slug }) => slug)).size === 19, 'O Diário deve usar exatamente os dezenove Reinos públicos.');
pass(existsSync(resolve(root, 'src/pages/diario/index.astro')), 'A rota /diario está ausente.');
pass(modelSource.includes("JOURNAL_STORAGE_KEY = 'roc.journal.v1'"), 'A chave versionada do Diário não está declarada.');
pass(modelSource.includes("PREFERENCES_STORAGE_KEY = 'roc.preferences.v1'"), 'A chave versionada de preferências não está declarada.');
pass(JSON.stringify([...modelSource.matchAll(/count:\s*(\d+)/g)].map((match) => Number(match[1]))) === JSON.stringify([1, 5, 10, 19]), 'Os Fragmentos do Limiar devem despertar em 1, 5, 10 e 19.');

const journalContracts = [
  ["const EXPLORATION_KEY = 'roc.exploration.v1'", 'leitura territorial independente'],
  ["const PILGRIMAGE_KEY = 'roc.pilgrimage.v1'", 'continuidade do Ritual'],
  ["const JOURNAL_KEY = 'roc.journal.v1'", 'memória privada das notas'],
  ["const PREFERENCES_KEY = 'roc.preferences.v1'", 'preferências de apresentação'],
  ['maxlength="280"', 'limite editorial das notas'],
  ['readVisited().includes(slug)', 'bloqueio de notas para Reinos não visitados'],
  ['data-journal-fragment', 'Fragmentos do Limiar'],
  ['data-journal-export', 'portabilidade do Diário'],
  ['data-journal-clear-dialog', 'confirmação de exclusão'],
  ['aria-live="polite"', 'retorno acessível'],
  ['localStorage.removeItem(JOURNAL_KEY)', 'exclusão exclusiva do Diário'],
  ['roc:preferences-updated', 'aplicação reativa de preferências'],
];
for (const [token, label] of journalContracts) pass(journalSource.includes(token), `Contrato ausente no Diário: ${label}.`);

pass(
  journalSource.includes('.journal-summary .journal-affinity strong'),
  'O valor da afinidade precisa neutralizar a tipografia numérica dos contadores.',
);

pass(!journalSource.includes('localStorage.removeItem(EXPLORATION_KEY)'), 'Apagar o Diário não pode remover território.');
pass(!journalSource.includes('localStorage.removeItem(PILGRIMAGE_KEY)'), 'Apagar o Diário não pode remover afinidade.');
pass(!journalSource.includes('localStorage.setItem(EXPLORATION_KEY'), 'O Diário não pode conceder descoberta territorial.');
pass(!journalSource.includes('Math.random'), 'A Fase 5 não pode usar recompensa aleatória.');
pass(!journalSource.includes('setInterval'), 'A Fase 5 não pode criar sequência temporal ou urgência artificial.');
pass(!/streak|ranking|leaderboard|moeda|currency/i.test(journalSource), 'A retenção não pode introduzir streak, ranking ou moeda.');
pass(pageSource.includes('<EmberlineJournal'), 'A rota /diario não monta o Diário da Emberline.');
pass(pageSource.includes('não canônica') || journalSource.includes('não canônica'), 'O Diário não explicita a fronteira não canônica das notas.');
pass(headerSource.includes('/diario/'), 'O Diário não está presente na navegação principal.');
pass(homeSource.includes('DIÁRIO DA EMBERLINE'), 'A home não oferece a quinta rota da jornada.');
pass(hudSource.includes("const JOURNAL_KEY = 'roc.journal.v1'"), 'O HUD não reconhece as notas do Diário.');
pass(layoutSource.includes("localStorage.getItem('roc.preferences.v1')"), 'O layout não restaura preferências antes da interface.');
pass(globalSource.includes("data-roc-motion='serene'"), 'O modo Sereno não possui contrato global.');
pass(globalSource.includes("data-roc-reading='expanded'"), 'A leitura Ampliada não possui contrato global.');
pass(emberSource.includes("dataset.rocMotion === 'serene'"), 'O modo Sereno não interrompe o campo de brasas.');

for (const realm of realms) {
  pass(modelSource.includes('realms') && existsSync(resolve(root, 'public/assets/emblems', `emblem_${realm.slug}.webp`)), `Emblema ausente para o Diário: ${realm.realm}.`);
}

if (failures.length) {
  console.error('PHASE_5_JOURNAL_GATE: FAIL');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('PHASE_5_JOURNAL_GATE: PASS');
console.log('19 Reinos · notas privadas · afinidade reutilizada · fragmentos 1/5/10/19 · preferências locais separadas');
