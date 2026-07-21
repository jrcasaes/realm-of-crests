import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, extname, join, relative, resolve, sep } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const basePath = (process.env.ASTRO_BASE || '/realm-of-crests').replace(/\/$/, '');
const previewBuild = (process.env.PUBLIC_ROBOTS || '').toLowerCase().includes('noindex');
const failures = [];
const pass = (condition, message) => { if (!condition) failures.push(message); };
const files = [];

function walk(directory) {
  for (const name of readdirSync(directory)) {
    const path = join(directory, name);
    const stats = statSync(path);
    if (stats.isDirectory()) walk(path);
    else files.push(path);
  }
}

pass(existsSync(dist), 'O diretório dist não existe. Execute o build antes da auditoria.');
if (!existsSync(dist)) {
  console.error('PHASE_6_ARTIFACT_AUDIT: FAIL');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
walk(dist);

const htmlFiles = files.filter((file) => extname(file) === '.html');
const canonicalUrls = new Set();
const routeFor = (file) => relative(dist, file).split(sep).join('/');
const attr = (html, name) => new RegExp(`<meta[^>]+(?:name|property)=["']${name}["'][^>]+content=["']([^"']+)["']`, 'i').exec(html)?.[1];

function targetFile(urlValue, sourceFile) {
  if (/^(?:https?:|mailto:|tel:|data:|blob:|javascript:)/i.test(urlValue)) return null;
  const baseUrl = `https://jrcasaes.github.io${basePath}/${dirname(routeFor(sourceFile)).replaceAll('\\', '/')}/`;
  const parsed = new URL(urlValue, baseUrl);
  if (parsed.origin !== 'https://jrcasaes.github.io') return null;
  let pathname = decodeURIComponent(parsed.pathname);
  if (!pathname.startsWith(basePath)) return false;
  pathname = pathname.slice(basePath.length).replace(/^\//, '');
  if (!pathname || pathname.endsWith('/')) return resolve(dist, pathname, 'index.html');
  return resolve(dist, pathname);
}

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const route = routeFor(file);
  const canonical = /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i.exec(html)?.[1];
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  pass(/<html[^>]+lang=["']pt-BR["']/i.test(html), `${route}: idioma ausente.`);
  pass(/<title>[^<]{8,}<\/title>/i.test(html), `${route}: título ausente ou curto.`);
  pass(Boolean(attr(html, 'description')), `${route}: descrição ausente.`);
  pass(Boolean(attr(html, 'robots')), `${route}: política robots ausente.`);
  pass(Boolean(attr(html, 'og:title')) && Boolean(attr(html, 'og:description')), `${route}: Open Graph incompleto.`);
  pass(Boolean(attr(html, 'og:image')) && Boolean(attr(html, 'og:image:alt')), `${route}: imagem social incompleta.`);
  pass(attr(html, 'twitter:card') === 'summary_large_image', `${route}: Twitter card inválido.`);
  pass(Boolean(canonical), `${route}: canonical ausente.`);
  pass(/<script[^>]+type=["']application\/ld\+json["'][^>]*>\s*\{/i.test(html), `${route}: JSON-LD ausente.`);
  pass(/<a[^>]+class=["'][^"']*skip-link[^"']*["'][^>]+href=["']#conteudo-principal["']/i.test(html), `${route}: skip link ausente.`);
  pass(/<main[^>]+id=["']conteudo-principal["'][^>]+tabindex=["']-1["']/i.test(html), `${route}: destino de foco ausente.`);
  pass(h1Count === 1, `${route}: esperado exatamente um h1; encontrado ${h1Count}.`);
  pass(Buffer.byteLength(html) < 260_000, `${route}: HTML excede 260 KB.`);
  if (canonical) {
    pass(!canonicalUrls.has(canonical), `${route}: canonical duplicado ${canonical}.`);
    canonicalUrls.add(canonical);
  }

  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const image = match[0];
    pass(/\balt=["'][^"']*["']/i.test(image), `${route}: imagem sem alt.`);
    pass(/\bwidth=["'][^"']+["']/i.test(image) && /\bheight=["'][^"']+["']/i.test(image), `${route}: imagem sem dimensões explícitas.`);
  }

  const links = [...html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/gi)].map((match) => match[1]);
  const sources = [...html.matchAll(/<(?:img|script)\b[^>]*\bsrc=["']([^"']+)["']/gi)].map((match) => match[1]);
  for (const value of [...links, ...sources]) {
    const target = targetFile(value, file);
    if (target === null) continue;
    pass(target !== false && existsSync(target), `${route}: destino interno ausente ${value}.`);
  }
}

const sitemapPath = resolve(dist, 'sitemap.xml');
const robotsPath = resolve(dist, 'robots.txt');
pass(htmlFiles.length === 48, `Esperadas 48 páginas HTML; encontradas ${htmlFiles.length}.`);
pass(existsSync(sitemapPath), 'sitemap.xml ausente.');
pass(existsSync(robotsPath), 'robots.txt ausente.');
if (existsSync(sitemapPath)) {
  const sitemap = readFileSync(sitemapPath, 'utf8');
  pass((sitemap.match(/<url>/g) || []).length === 48, 'Sitemap deve conter 48 URLs.');
}
if (existsSync(robotsPath)) {
  const robots = readFileSync(robotsPath, 'utf8');
  pass(robots.includes(previewBuild ? 'Disallow: /' : 'Allow: /'), previewBuild ? 'Build de prévia deve bloquear indexação.' : 'Build de produção deve permitir indexação.');
  pass(robots.includes(`${basePath}/sitemap.xml`), 'robots.txt não aponta para o sitemap canônico.');
}

const cssBytes = files.filter((file) => extname(file) === '.css').reduce((sum, file) => sum + statSync(file).size, 0);
const jsBytes = files.filter((file) => extname(file) === '.js' && file.includes(`${sep}_astro${sep}`)).reduce((sum, file) => sum + statSync(file).size, 0);
pass(cssBytes < 300_000, `CSS excede o orçamento de 300 KB (${cssBytes} bytes).`);
pass(jsBytes < 450_000, `JavaScript excede o orçamento de 450 KB (${jsBytes} bytes).`);

if (failures.length) {
  console.error('PHASE_6_ARTIFACT_AUDIT: FAIL');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('PHASE_6_ARTIFACT_AUDIT: PASS');
console.log(`${htmlFiles.length} páginas · ${canonicalUrls.size} canonicals únicos · links e assets internos íntegros · CSS ${cssBytes} B · JS ${jsBytes} B`);
