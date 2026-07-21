import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');
const readJson = (path) => JSON.parse(read(path));
const realms = readJson('src/data/realms.json');
const fervors = readJson('src/data/fervors.json');
const modelSource = read('src/lib/pilgrimage.js');
const ritualSource = read('src/components/CrestRitual.astro');
const pageSource = read('src/pages/ritual/index.astro');
const hudSource = read('src/components/ExplorationHUD.astro');
const headerSource = read('src/components/Header.astro');
const homeSource = read('src/pages/index.astro');

const failures = [];
const pass = (condition, message) => { if (!condition) failures.push(message); };
const fervorIds = new Set(fervors.map(({ id }) => id));
const scorePairs = [...modelSource.matchAll(/scores:\s*\['([^']+)',\s*'([^']+)'\]/g)].flatMap((match) => [match[1], match[2]]);
const questionCount = (modelSource.match(/eyebrow:/g) || []).length;
const optionCount = (modelSource.match(/scores:\s*\[/g) || []).length;

pass(fervors.length === 8 && fervorIds.size === 8, 'O ritual deve operar sobre exatamente oito Fervores públicos.');
pass(questionCount === 6, `Esperadas 6 escolhas narrativas; encontradas ${questionCount}.`);
pass(optionCount === 24, `Esperadas 24 opções distribuídas em seis escolhas; encontradas ${optionCount}.`);
pass(scorePairs.every((id) => fervorIds.has(id)), 'Uma opção do ritual aponta para Fervor inexistente.');
pass(new Set(scorePairs).size === 8, 'As opções não cobrem as oito famílias de Fervor.');
pass(realms.length === 19, 'O inventário deve preservar os dezenove Reinos.');
pass(modelSource.includes("PILGRIMAGE_STORAGE_KEY = 'roc.pilgrimage.v1'"), 'A chave versionada da afinidade não está declarada.');
pass(JSON.stringify([...modelSource.matchAll(/count:\s*(\d+)/g)].map((match) => Number(match[1]))) === JSON.stringify([1, 5, 10, 19]), 'Os marcos territoriais devem permanecer em 1, 5, 10 e 19.');

for (const realm of realms) {
  pass(existsSync(resolve(root, 'public/assets/emblems', `emblem_${realm.slug}.webp`)), `Sigilo ausente no inventário: ${realm.realm}.`);
  const relations = [...realm.fervor.matchAll(/Fervor de ([\wÀ-ú]+)\s*\((dominante|secundário)\)/gi)];
  pass(relations.length === 2, `Relação de Fervor incompleta para a rota de ${realm.realm}.`);
}

const ritualContracts = [
  ["const PILGRIMAGE_KEY = 'roc.pilgrimage.v1'", 'memória de afinidade independente'],
  ["const EXPLORATION_KEY = 'roc.exploration.v1'", 'leitura da memória territorial'],
  ['data-ritual-question', 'escolhas progressivas'],
  ['data-journey-crest-svg', 'Crest de Jornada exportável'],
  ['não canônica', 'fronteira editorial do resultado'],
  ['recommendedRealms', 'rotas territoriais sugeridas'],
  ['.slice(0, 3)', 'limite de três rotas'],
  ['data-inventory-realm', 'inventário de sigilos'],
  ['data-clear-dialog', 'confirmação de exclusão territorial'],
  ['aria-live="polite"', 'retorno acessível'],
  ['prefers-reduced-motion', 'alternativa de movimento reduzido'],
];
for (const [token, label] of ritualContracts) pass(ritualSource.includes(token), `Contrato ausente no Ritual: ${label}.`);

pass(!ritualSource.includes('localStorage.setItem(EXPLORATION_KEY'), 'O ritual não pode conceder descoberta territorial.');
pass(!ritualSource.includes('Math.random'), 'O resultado deve ser determinístico, sem sorteio oculto.');
pass(!ritualSource.includes('setInterval'), 'O ritual não pode impor cronômetro.');
pass(pageSource.includes('<CrestRitual'), 'A rota /ritual não monta o componente principal.');
pass(pageSource.includes('instrumento de orientação · não canônico') || ritualSource.includes('instrumento de orientação · não canônico'), 'A experiência não explicita sua natureza editorial.');
pass(headerSource.includes('/ritual/'), 'O Ritual não está presente na navegação principal.');
pass(homeSource.includes('RITUAL DO CREST'), 'A home não oferece a quarta rota da jornada.');
pass(hudSource.includes("const PILGRIMAGE_KEY = 'roc.pilgrimage.v1'"), 'O HUD não reconhece o Crest de Jornada.');
pass(hudSource.includes('roc:exploration-reset'), 'O HUD não responde ao controle de exclusão territorial.');

if (failures.length) {
  console.error('PHASE_4_PILGRIMAGE_GATE: FAIL');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('PHASE_4_PILGRIMAGE_GATE: PASS');
console.log('6 escolhas · 8 Fervores · Crest não canônico · 19 sigilos · marcos 1/5/10/19 · dados locais separados');
