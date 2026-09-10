import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { splitChapter } from './book-package.mjs';

const decode = (value) => value.replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (_, key) => {
  if (key.startsWith('#x')) return String.fromCodePoint(parseInt(key.slice(2), 16));
  if (key.startsWith('#')) return String.fromCodePoint(Number(key.slice(1)));
  return { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" }[key];
});
export function auditBookArtifact(root, book, base) {
  const failures = [];
  let paragraphs = 0;
  for (const [index, chapter] of book.chapters.entries()) {
    const html = readFileSync(resolve(root, `dist${chapter.permalink}index.html`), 'utf8');
    const prose = /<article[^>]*data-prose[^>]*>([\s\S]*?)<\/article>/.exec(html)?.[1] ?? '';
    const rendered = [...prose.matchAll(/<p>([\s\S]*?)<\/p>|<hr\s*\/?>/g)].map((match) => match[1] === undefined ? '***' : decode(match[1]));
    const { body } = splitChapter(readFileSync(resolve(root, chapter.path), 'utf8'));
    const original = body.trim().split(/\n\s*\n/);
    if (JSON.stringify(original) !== JSON.stringify(rendered)) failures.push(`Prosa renderizada divergente do ZIP: capítulo ${chapter.number}.`);
    paragraphs += rendered.filter((text) => text !== '***').length;
    const heading = decode(/<h1[^>]*>([\s\S]*?)<\/h1>/.exec(html)?.[1] ?? '');
    if (heading !== `${chapter.roman} — ${chapter.title}`) failures.push(`Cabeçalho público inválido: ${chapter.number}.`);
    const links = [...html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)].map((match) => decode(match[1]));
    const required = [`${base}/livro/`, ...[book.chapters[index - 1], book.chapters[index + 1]].filter(Boolean).map((c) => `${base}${c.permalink}`)];
    if (!required.every((href) => links.includes(href))) failures.push(`Navegação incompleta: ${chapter.number}.`);
    if (/<canvas\b|<audio\b|exploration-hud|astro-view-transitions-enabled/i.test(html)) failures.push(`Camada global ativa no leitor: ${chapter.number}.`);
    if (!html.includes('data-reader-controls hidden') || !html.includes('data-complete hidden')) failures.push(`Controles sem fallback sem JS: ${chapter.number}.`);
    // Conteúdo essencial deve existir no HTML, e não em bundle de capítulos.
    if (!prose || /<script\b/i.test(prose)) failures.push(`Corpo depende de script: ${chapter.number}.`);
  }
  return { failures, paragraphs };
}
