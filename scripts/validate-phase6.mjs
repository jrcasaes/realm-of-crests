import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');
const json = (path) => JSON.parse(read(path));
const failures = [];
const pass = (condition, message) => { if (!condition) failures.push(message); };

const layout = read('src/layouts/BaseLayout.astro');
const globalCss = read('src/styles/global.css');
const embers = read('src/components/EmberField.astro');
const atlas = read('src/components/ImmersiveRealmMap.astro');
const realmExplorer = read('src/components/RealmAtlasExplorer.astro');
const explorationHud = read('src/components/ExplorationHUD.astro');
const robots = read('src/pages/robots.txt.js');
const sitemap = read('src/pages/sitemap.xml.js');
const manifest = json('public/site.webmanifest');
const pkg = json('package.json');
const realms = json('src/data/realms.json');
const guardianRoster = read('src/lib/guardians.js');

pass(pkg.version === '1.7.0', 'A versão do release candidate deve ser 1.7.0.');
pass(pkg.engines?.node === '>=22.12.0' && pkg.devDependencies?.astro === '^7.1.1', 'O release candidate deve usar Astro 7.1.1 como ferramenta de build em Node 22.');
pass(!pkg.dependencies || Object.keys(pkg.dependencies).length === 0, 'O site estático não deve declarar dependências de runtime.');
pass(pkg.scripts['audit:dist'] === 'node scripts/audit-dist.mjs', 'A auditoria pós-build não está declarada.');
pass(pkg.scripts.check.endsWith('npm run audit:dist'), 'O gate principal deve terminar com a auditoria do artefato.');
pass(read('scripts/audit-dist.mjs').includes('process.env.ASTRO_BASE') && read('scripts/audit-dist.mjs').includes('previewBuild'), 'A auditoria não distingue produção e prévia.');
pass(existsSync(resolve(root, '.github/workflows/preview-phase6.yml')), 'O workflow isolado da Fase 6 está ausente.');
pass(!existsSync(resolve(root, 'public/robots.txt')), 'O robots estático não pode sobrepor a política por ambiente.');

const metadataContracts = [
  ['property="og:title"', 'Open Graph title'],
  ['property="og:image"', 'Open Graph image'],
  ['name="twitter:card"', 'Twitter card'],
  ['type="application/ld+json"', 'JSON-LD'],
  ['rel="manifest"', 'manifesto do site'],
  ['name="referrer"', 'política de referência'],
  ['tabindex="-1"', 'destino programático do skip link'],
];
for (const [token, label] of metadataContracts) pass(layout.includes(token), `Contrato de release ausente: ${label}.`);

pass(robots.includes("includes('noindex')"), 'robots.txt não distingue prévia de produção.');
pass(robots.includes('Disallow: /') && robots.includes('Allow: /'), 'robots.txt não declara as duas políticas.');
pass(sitemap.includes("'/atlas/'") && sitemap.includes("'/diario/'") && sitemap.includes("'/ritual/'"), 'Sitemap não inclui as rotas imersivas.');
pass(realms.length === 19 && guardianRoster.includes('export const guardianRoster = realms.map'), 'Sitemap requer 19 Reinos e o roster derivado dos 19 Guardiões.');
pass(manifest.name === 'Realm of Crests' && manifest.lang === 'pt-BR', 'Manifesto público inválido.');

const accessibilityContracts = [
  ["--parchment-faint: #8e806a", 'contraste mínimo do texto discreto'],
  ['prefers-contrast: more', 'preferência de contraste'],
  ['forced-colors: active', 'modo de cores forçadas'],
  ['pointer: coarse', 'alvos de toque'],
  ['textarea:focus-visible', 'foco de campos'],
  ['@media print', 'leitura impressa'],
];
for (const [token, label] of accessibilityContracts) pass(globalCss.includes(token), `Contrato de acessibilidade ausente: ${label}.`);

const performanceContracts = [
  [embers, 'connection?.saveData', 'economia de dados do campo de brasas'],
  [embers, "document.addEventListener('visibilitychange'", 'pausa em aba oculta'],
  [embers, 'cancelAnimationFrame', 'cancelamento do loop visual'],
  [atlas, 'connection?.saveData', 'economia de dados do Atlas'],
  [atlas, 'window.setTimeout(() => selectRealm', 'intenção de hover do Atlas'],
  [atlas, "incoming.decoding = 'async'", 'decodificação assíncrona do Atlas'],
  [realmExplorer, "incoming.decoding = 'async'", 'decodificação assíncrona dos panoramas'],
];
for (const [source, token, label] of performanceContracts) pass(source.includes(token), `Contrato de desempenho ausente: ${label}.`);
pass(!realmExplorer.includes('preload(1)'), 'O atlas soberano não deve pré-carregar panoramas pesados sem intenção.');
pass(explorationHud.includes('lastPath: currentLastPath'), 'A continuidade territorial deve migrar caminhos persistidos para a base da versão atual.');

const scanRoots = ['src', 'scripts', 'docs', '.github'];
const textExtensions = /\.(?:astro|css|js|mjs|json|md|ya?ml)$/i;
const files = [];
function walk(directory) {
  for (const name of readdirSync(resolve(root, directory))) {
    const relative = join(directory, name);
    const stats = statSync(resolve(root, relative));
    if (stats.isDirectory()) walk(relative);
    else if (textExtensions.test(name)) files.push(relative);
  }
}
scanRoots.forEach((directory) => walk(directory));
const privateIdPattern = /(?:drive\.google\.com|docs\.google\.com)\/(?:file\/d|document\/d|spreadsheets\/d)\/[A-Za-z0-9_-]{16,}/i;
for (const file of files) pass(!privateIdPattern.test(read(file)), `Identificador privado detectado em ${file}.`);

if (failures.length) {
  console.error('PHASE_6_RELEASE_GATE: FAIL');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('PHASE_6_RELEASE_GATE: PASS');
console.log('metadados sociais · sitemap/robots por ambiente · acessibilidade adaptativa · economia de dados · auditoria de artefato');
