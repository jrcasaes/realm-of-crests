import { loadBook } from '../../scripts/lib/book-package.mjs';

export const readerMode = process.env.ROC_READER_MODE || 'off';
// O build/prerender roda na raiz do projeto; import.meta.url muda ao gerar bundles.
export const bookManifest = loadBook(process.cwd(), readerMode);
export const readerEnabled = Boolean(bookManifest);
export const bookChapters = bookManifest?.chapters ?? [];
