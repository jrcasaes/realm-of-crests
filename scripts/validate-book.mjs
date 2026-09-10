import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import { loadBook } from './lib/book-package.mjs';
const root = resolve(import.meta.dirname, '..');
const mode = process.env.ROC_READER_MODE || 'off';
try {
  const tracked = execFileSync('git', ['ls-files', '--', 'book.json', 'content/livro-i', '_editorial', '*.zip'], { cwd: root, encoding: 'utf8' }).trim();
  if (tracked) throw new Error('Prosa/pacote editorial não pode integrar este PR público enquanto a prova estiver pendente.');
  const book = loadBook(root, mode);
  console.log(book ? 'BOOK_SOURCE_GATE: PASS · 24 hashes · UTF-8 · frontmatter · ordem · permalinks · hash agregado' : 'BOOK_SOURCE_GATE: CODE_ONLY · leitor desativado; nenhuma prosa publicada');
} catch (error) { console.error(`BOOK_SOURCE_GATE: FAIL · ${error.message}`); process.exit(1); }
