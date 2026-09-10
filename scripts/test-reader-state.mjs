import { test } from 'node:test';
import assert from 'node:assert/strict';
import { READER_KEY, normalizeReaderState, markChapterComplete, readSavedReader, saveReader } from '../src/lib/reader-state.mjs';
import { loadBook, splitChapter } from './lib/book-package.mjs';

test('estado vazio, corrompido e preferências válidas', () => {
  for (const value of [null, 4, [], { version: 9 }, { last: { chapter: 88 } }]) {
    const state = normalizeReaderState(value, 'book', 'hash');
    assert.equal(state.last, null); assert.deepEqual(state.completed, []);
  }
});
test('restaura apenas posições do livro e versão corretos, sem aceitar caminho arbitrário', () => {
  const input = { version: 1, book: 'book', hash: 'hash', theme: 'light', completed: [1, 1, 24, -1, 25], last: { chapter: 3, paragraph: 20, fraction: 9, progress: -.5, href: 'https://invalid.example/' } };
  const state = normalizeReaderState(input, 'book', 'hash');
  assert.deepEqual(state.completed, [1, 24]);
  assert.deepEqual(state.last, { chapter: 3, paragraph: 20, fraction: 1, progress: 0 });
  assert.equal(normalizeReaderState(input, 'book', 'new-hash').last, null);
  assert.equal(normalizeReaderState(input, 'other-book', 'hash').last, null);
  assert.equal(normalizeReaderState(input, 'book', 'new-hash').theme, 'light');
});
test('conclusão não duplica nem cria capítulo inexistente', () => {
  let state = normalizeReaderState(null, 'book', 'hash');
  for (const n of [2, 1, 2, 24, 0, 25]) state = markChapterComplete(state, n);
  assert.deepEqual(state.completed, [1, 2, 24]);
});
test('corpo e travessão preservados; campos editoriais extras rejeitados', () => {
  const source = '---\nbook: "livro-i"\nchapter: 1\nroman: "I"\ntitle: "Teste"\nslug: "teste"\nlang: "pt-BR"\n---\n\n— A pedra.\n';
  assert.equal(splitChapter(source).body, '— A pedra.\n');
  assert.throws(() => splitChapter(source.replace('lang:', 'APROVADO:')));
});
test('modo desconhecido falha; publicação não é ativada implicitamente', () => {
  assert.equal(loadBook('/path-not-read', 'off'), null);
  assert.throws(() => loadBook('/path-not-read', 'on'), /inválido/);
});

test('storage bloqueado ou JSON inválido não interrompe o leitor', () => {
  const blocked = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('quota'); } };
  assert.deepEqual(readSavedReader(blocked), { value: null, available: false });
  assert.equal(saveReader(blocked, {}), false);
  assert.equal(readSavedReader(undefined).available, false);
  assert.deepEqual(readSavedReader({ getItem: () => '{invalid' }), { value: null, available: true });
});
test('gravação, recarga e tema preservam posição e não escrevem nas chaves do portal', () => {
  const data = new Map([['roc.exploration.v1', 'preservado']]);
  const storage = { getItem: (key) => data.get(key), setItem: (key, value) => data.set(key, value) };
  assert.equal(readSavedReader(storage).value, null);
  const state = normalizeReaderState({ version: 1, book: 'book', hash: 'hash', theme: 'light', size: 'large', last: { chapter: 8, paragraph: 94, fraction: .4, progress: .5 }, completed: [1, 2] }, 'book', 'hash');
  assert.equal(saveReader(storage, state), true);
  assert.deepEqual(normalizeReaderState(readSavedReader(storage).value, 'book', 'hash'), state);
  assert.deepEqual([...data.keys()].sort(), ['roc.exploration.v1', READER_KEY].sort());
  assert.equal(data.get('roc.exploration.v1'), 'preservado');
});
