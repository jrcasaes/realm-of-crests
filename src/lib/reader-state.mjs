export const READER_KEY = 'roc.reader.v1';
export function readSavedReader(storage) {
  let raw;
  try { raw = storage.getItem(READER_KEY); }
  catch { return { value: null, available: false }; }
  try { return { value: JSON.parse(raw || 'null'), available: true }; }
  catch { return { value: null, available: true }; }
}
export function saveReader(storage, state) {
  try { storage.setItem(READER_KEY, JSON.stringify(state)); return true; }
  catch { return false; }
}
const clamp = (n) => Number.isFinite(n) ? Math.max(0, Math.min(1, n)) : 0;
const chapterNumber = (n) => Number.isInteger(n) && n >= 1 && n <= 24;

export function normalizeReaderState(input, book, hash) {
  const compatible = input?.version === 1 && input?.book === book && input?.hash === hash;
  const position = input?.last;
  return {
    version: 1, book, hash,
    theme: input?.theme === 'light' ? 'light' : 'dark',
    size: input?.size === 'large' ? 'large' : 'standard',
    completed: compatible && Array.isArray(input.completed) ? [...new Set(input.completed.filter(chapterNumber))].sort((a, b) => a - b) : [],
    last: compatible && chapterNumber(position?.chapter) ? {
      chapter: position.chapter,
      paragraph: Number.isInteger(position.paragraph) && position.paragraph >= 0 ? position.paragraph : 0,
      fraction: clamp(position.fraction), progress: clamp(position.progress),
    } : null,
  };
}

export function markChapterComplete(state, chapter) {
  return { ...state, completed: chapterNumber(chapter) ? [...new Set([...state.completed, chapter])].sort((a, b) => a - b) : state.completed };
}
