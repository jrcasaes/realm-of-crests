import { normalizeReaderState, markChapterComplete, readSavedReader, saveReader } from '../lib/reader-state.mjs';

const root = document.querySelector<HTMLElement>('[data-reader]');
if (root) {
  const chapter = Number(root.dataset.chapter);
  let storage: Storage | undefined;
  try { storage = window.localStorage; } catch { /* Storage bloqueado. */ }
  const saved = readSavedReader(storage);
  let raw = saved.value, storageAvailable = saved.available;
  let state = normalizeReaderState(raw, root.dataset.book, root.dataset.bookHash);
  const initialPosition = state.last;
  let restoring = false, frame = 0;
  const notice = document.querySelector<HTMLElement>('[data-storage-notice]');
  function persist() {
    if (!saveReader(storage, state)) { storageAvailable = false; if (notice) notice.hidden = false; }
  }
  const paragraphNodes = [...document.querySelectorAll<HTMLElement>('[data-prose] > p')];
  paragraphNodes.forEach((p, i) => { p.id = `paragrafo-${i + 1}`; });
  function capture() {
    if (!chapter || restoring || !paragraphNodes.length) return;
    const line = window.scrollY + 32;
    let index = 0;
    for (let i = 0; i < paragraphNodes.length; i++) {
      if (paragraphNodes[i].getBoundingClientRect().top + window.scrollY <= line) index = i;
      else break;
    }
    const p = paragraphNodes[index], top = p.getBoundingClientRect().top + window.scrollY;
    const progress = Math.max(0, Math.min(1, (window.scrollY + window.innerHeight - paragraphNodes[0].offsetTop) / Math.max(1, paragraphNodes.at(-1)!.offsetTop + paragraphNodes.at(-1)!.offsetHeight - paragraphNodes[0].offsetTop)));
    state.last = { chapter, paragraph: index, fraction: Math.max(0, Math.min(1, (line - top) / Math.max(1, p.offsetHeight))), progress };
    const label = document.querySelector<HTMLElement>('[data-reading-progress]');
    if (label) { label.hidden = false; label.textContent = `Capítulo ${chapter} de 24 · ${Math.round(progress * 100)}%`; }
    persist();
  }
  function applyPreferences() {
    document.documentElement.dataset.readerTheme = state.theme;
    document.documentElement.dataset.readerSize = state.size;
    document.querySelectorAll<HTMLElement>('[data-theme]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.theme === state.theme)));
    document.querySelectorAll<HTMLElement>('[data-size]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.size === state.size)));
  }
  function restore(position: { paragraph: number; fraction: number }) {
    const paragraph = paragraphNodes[Math.min(position.paragraph, paragraphNodes.length - 1)];
    if (!paragraph) return;
    window.scrollTo({ top: Math.max(0, paragraph.getBoundingClientRect().top + window.scrollY + paragraph.offsetHeight * position.fraction - 32), behavior: 'instant' });
  }
  applyPreferences();
  document.querySelector<HTMLElement>('[data-reader-controls]')?.removeAttribute('hidden');
  document.querySelectorAll<HTMLButtonElement>('[data-theme]').forEach((button) => button.addEventListener('click', () => { state.theme = button.dataset.theme; applyPreferences(); persist(); }));
  document.querySelectorAll<HTMLButtonElement>('[data-size]').forEach((button) => button.addEventListener('click', () => {
    capture(); const position = state.last;
    state.size = button.dataset.size; applyPreferences(); persist();
    if (chapter && position) restore(position);
  }));
  document.querySelectorAll<HTMLDetailsElement>('details').forEach((details) => details.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') { details.open = false; details.querySelector('summary')?.focus(); }
  }));
  function showCompletions() {
    document.querySelectorAll<HTMLElement>('[data-completed]').forEach((el) => { el.hidden = !state.completed.includes(Number(el.dataset.completed)); });
    const button = document.querySelector<HTMLButtonElement>('[data-complete]');
    if (button) { button.hidden = false; button.textContent = state.completed.includes(chapter) ? 'Capítulo concluído' : 'Marcar capítulo como concluído'; button.setAttribute('aria-pressed', String(state.completed.includes(chapter))); }
  }
  function complete() { state = markChapterComplete(state, chapter); capture(); persist(); showCompletions(); }
  showCompletions();
  document.querySelector('[data-complete]')?.addEventListener('click', complete);
  document.querySelector('[data-next]')?.addEventListener('click', complete);
  if (!storageAvailable && notice) notice.hidden = false;
  if (!chapter) {
    if (initialPosition) {
      const destination = document.querySelector<HTMLAnchorElement>(`[data-chapter-link="${initialPosition.chapter}"]`);
      const link = document.querySelector<HTMLAnchorElement>('[data-resume]');
      if (destination && link) { link.href = `${destination.href}?retomar=1`; link.hidden = false; link.textContent = `Continuar leitura · capítulo ${initialPosition.chapter}`; }
    }
    const progress = document.querySelector<HTMLElement>('[data-book-progress]');
    if (progress && state.completed.length) { progress.textContent = `${state.completed.length} de 24 capítulos concluídos`; progress.hidden = false; }
  } else {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    const resume = new URLSearchParams(location.search).has('retomar') || navigation?.type === 'reload';
    if (initialPosition?.chapter === chapter && resume && !location.hash) {
      restoring = true;
      history.scrollRestoration = 'manual';
      const userInterrupt = () => { restoring = false; };
      window.addEventListener('wheel', userInterrupt, { once: true, passive: true });
      window.addEventListener('touchstart', userInterrupt, { once: true, passive: true });
      window.addEventListener('keydown', userInterrupt, { once: true });
      const ready = document.readyState === 'complete' ? Promise.resolve() : new Promise((done) => window.addEventListener('load', done, { once: true }));
      ready.then(() => document.fonts.ready).then(() => requestAnimationFrame(() => {
        if (restoring) restore(initialPosition);
        restoring = false; capture();
      }));
    } else capture();
    window.addEventListener('scroll', () => {
      if (frame || restoring) return;
      frame = window.setTimeout(() => { frame = 0; capture(); }, 400);
    }, { passive: true });
    window.addEventListener('pagehide', capture);
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') capture(); });
  }
}
