import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');
const readJson = (path) => JSON.parse(read(path));
const realms = readJson('src/data/realms.json');
const publicDetails = readJson('src/data/guardians.json');
const archiveSource = read('src/components/GuardianArchive.astro');
const gallerySource = read('src/pages/guardioes/index.astro');
const dossierSource = read('src/pages/guardioes/[slug].astro');
const guardianLibSource = read('src/lib/guardians.js');

const failures = [];
const pass = (condition, message) => { if (!condition) failures.push(message); };

const guardianNames = realms.map(({ guardian }) => guardian);
const realmSlugs = realms.map(({ slug }) => slug);
const portraits = readdirSync(resolve(root, 'public/assets/guardians')).filter((name) => /^WEB_RoC_.+_Retrato_v.+\.(jpg|webp)$/i.test(name));
const dominantFervors = new Set(realms.map(({ fervor }) => /Fervor de ([\wÀ-ú]+)\s*\(dominante\)/i.exec(fervor)?.[1]).filter(Boolean));
const gravityStates = new Set(realms.map(({ gravity }) => /^(Constructive|Catalytic|Corrosive)/i.exec(gravity)?.[1]?.toLowerCase()).filter(Boolean));

pass(realms.length === 19, `Esperados 19 Guardiões territoriais; encontrados ${realms.length}.`);
pass(new Set(guardianNames).size === 19, 'Há nome de Guardião duplicado no roster territorial.');
pass(new Set(realmSlugs).size === 19, 'Há vínculo territorial duplicado entre Guardiões.');
pass(portraits.length === 19, `Esperados 19 retratos web derivados; encontrados ${portraits.length}.`);
pass(dominantFervors.size === 8, `Esperadas 8 famílias dominantes de Fervor; encontradas ${dominantFervors.size}.`);
pass(JSON.stringify([...gravityStates].sort()) === JSON.stringify(['catalytic', 'constructive']), 'Os estados públicos atuais de Gravity devem ser Constructive e Catalytic.');
pass(publicDetails.length === 2, 'A camada narrativa detalhada pública deve permanecer restrita aos dois dossiês atualmente aprovados.');

for (const realm of realms) {
  const assetKey = realm.guardian.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  pass(guardianLibSource.includes(`${assetKey}: [`), `Retrato não mapeado em guardians.js: ${realm.guardian}.`);
  pass(existsSync(resolve(root, 'public/assets/emblems', `emblem_${realm.slug}.webp`)), `Brasão ausente para o vínculo de ${realm.guardian}.`);
}

const archiveContracts = [
  ['data-guardian-search', 'busca textual'],
  ['data-fervor-filter', 'filtro por Fervor'],
  ['data-gravity-filter', 'filtro por Gravity'],
  ['data-guardian-select', 'foco de presença'],
  ['data-compare-toggle', 'seleção comparativa'],
  ['data-comparison-table', 'tabela de confronto'],
  ["localStorage.getItem('roc.exploration.v1')", 'memória territorial'],
  ['compared.slice(-1)', 'limite de duas presenças'],
  ['aria-live="polite"', 'retorno acessível dos filtros'],
  ['prefers-reduced-motion', 'alternativa de movimento reduzido'],
];
for (const [token, label] of archiveContracts) pass(archiveSource.includes(token), `Contrato ausente no Arquivo Vivo: ${label}.`);

pass(gallerySource.includes('<GuardianArchive'), 'A galeria não está usando o Arquivo Vivo da Fase 3.');
pass(gallerySource.includes('A SOBERANIA'), 'O prólogo cinematográfico dos Guardiões está ausente.');
pass(dossierSource.includes('data-living-dossier'), 'Os dossiês individuais não usam a experiência narrativa da Fase 3.');
pass(dossierSource.includes("g.sections.length ? g.sections"), 'O fallback editorial não preserva a assimetria entre dossiês detalhados e relacionais.');
pass(dossierSource.includes('O arquivo não projeta além'), 'A fronteira editorial do cânone não está explícita nos dossiês relacionais.');
pass(dossierSource.includes('data-dossier-reveal'), 'Os dossiês não possuem revelação progressiva.');
pass(dossierSource.includes('prefers-reduced-motion'), 'Os dossiês não respeitam movimento reduzido.');

if (failures.length) {
  console.error('PHASE_3_GUARDIANS_GATE: FAIL');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('PHASE_3_GUARDIANS_GATE: PASS');
console.log('19 Guardiões · 19 retratos · 8 Fervores · 2 Gravity · busca · filtros · comparação 2/2 · dossiês progressivos');
