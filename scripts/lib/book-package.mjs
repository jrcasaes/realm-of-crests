import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';

export const APPROVED_BOOK_HASH = '8f000222185bec1ad82649e5dbe949593ad854493e584bfedc5b2a2c792ba2d9';
export const hash = (value) => createHash('sha256').update(value).digest('hex');
export function splitChapter(text) {
  const match = /^---\n([\s\S]+?)\n---\n/.exec(text);
  if (!match) throw new Error('Frontmatter inválido.');
  const data = Object.fromEntries(match[1].split('\n').map((line) => {
    const part = /^(book|chapter|roman|title|slug|lang): (.+)$/.exec(line);
    if (!part) throw new Error('Campo editorial inesperado.');
    return [part[1], JSON.parse(part[2])];
  }));
  return { data, body: text.slice(match[0].length).trim() + '\n' };
}

export function loadBook(root, mode = 'off') {
  if (!['off', 'review', 'release'].includes(mode)) throw new Error('ROC_READER_MODE inválido.');
  if (mode === 'off') return null;
  if (mode === 'review' && process.env.GITHUB_ACTIONS === 'true') throw new Error('A prosa de revisão não pode entrar em Actions público.');
  const integrity = JSON.parse(readFileSync(resolve(root, 'scripts/fixtures/book-i-integrity.json'), 'utf8'));
  for (const [path, expected] of Object.entries(integrity.files)) {
    if (hash(readFileSync(resolve(root, path))) !== expected) throw new Error(`Bytes diferentes do ZIP autorizado: ${path}.`);
  }
  const manifest = JSON.parse(readFileSync(resolve(root, 'book.json'), 'utf8'));
  const check = (ok, message) => { if (!ok) throw new Error(message); };
  check(manifest.integrationReady === true && manifest.schemaVersion === 1, 'Pacote não autorizado para integração.');
  check(manifest.book?.sha256 === APPROVED_BOOK_HASH, 'O pacote não corresponde à fonte exclusiva autorizada.');
  check(manifest.book?.id === 'livro-i-a-pedra-que-mente' && manifest.book?.chapterCount === 24 && manifest.chapters?.length === 24, 'Manifesto do Livro I inválido.');
  if (mode === 'release') check(manifest.publicReleaseProofComplete === true, 'PUBLIC_RELEASE_BLOCKED: prova final do pacote ainda pendente.');
  const slugs = new Set(), paths = new Set(), bodies = [];
  for (const [i, chapter] of manifest.chapters.entries()) {
    check(chapter.number === i + 1 && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(chapter.slug), 'Ordem/slug inválido.');
    check(chapter.path === `content/livro-i/${String(i + 1).padStart(2, '0')}-${chapter.slug}.md`, 'Caminho de capítulo inesperado.');
    check(chapter.permalink === `/livro/${i + 1}/${chapter.slug}/`, 'Permalink divergente do manifesto.');
    check(!slugs.has(chapter.slug), 'Slug duplicado.'); slugs.add(chapter.slug); paths.add(chapter.path.split('/').at(-1));
    const bytes = readFileSync(resolve(root, chapter.path));
    const text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    const { data, body } = splitChapter(text);
    check(data.book === 'livro-i' && data.lang === 'pt-BR' && data.chapter === chapter.number && data.roman === chapter.roman && data.title === chapter.title && data.slug === chapter.slug, `Frontmatter divergente: ${chapter.number}.`);
    check(hash(body) === chapter.sha256, `Prosa alterada: capítulo ${chapter.number}.`);
    check(body.trim().split(/\n\s*\n/).length === chapter.paragraphCount, `Parágrafos divergentes: ${chapter.number}.`);
    bodies.push(body);
  }
  check(readdirSync(resolve(root, 'content/livro-i')).every((name) => paths.has(name)), 'Arquivo adicional na coleção editorial.');
  // O hash agregado do pacote concatena os corpos canônicos em ordem.
  check(hash(bodies.join('\n')) === manifest.book.sha256, 'Hash agregado do livro divergente.');
  return manifest;
}
