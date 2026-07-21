export const GUARDIAN_JOURNEY_KEY = 'roc.guardians.v1';
export const GUARDIAN_JOURNEY_VERSION = 1;

const unique = (values) => [...new Set(values)];

export function normalizeGuardianJourney(value, knownSlugs = []) {
  const known = new Set(knownSlugs);
  const allowed = (slug) => typeof slug === 'string' && (!known.size || known.has(slug));
  const source = value && typeof value === 'object' ? value : {};
  const seen = unique(Array.isArray(source.seen) ? source.seen.filter(allowed) : []);
  const recent = unique(Array.isArray(source.recent) ? source.recent.filter(allowed) : []).slice(-3);

  return { version: GUARDIAN_JOURNEY_VERSION, seen, recent };
}

export function recordGuardianVisit(value, guardianSlug, knownSlugs = []) {
  const state = normalizeGuardianJourney(value, knownSlugs);
  if (!guardianSlug || (knownSlugs.length && !knownSlugs.includes(guardianSlug))) return state;

  return {
    version: GUARDIAN_JOURNEY_VERSION,
    seen: state.seen.includes(guardianSlug) ? state.seen : [...state.seen, guardianSlug],
    recent: [...state.recent.filter((slug) => slug !== guardianSlug), guardianSlug].slice(-3),
  };
}

export function affinityScore(entry, primary = '', secondary = '') {
  return (
    (entry.dominant?.id === primary ? 8 : 0) +
    (entry.secondary?.id === primary ? 5 : 0) +
    (entry.dominant?.id === secondary ? 3 : 0) +
    (entry.secondary?.id === secondary ? 2 : 0)
  );
}

const distanceFrom = (entry, current, total) => {
  if (!current) return entry.order;
  const distance = (entry.order - current.order + total) % total;
  return distance || total;
};

const rank = (candidates, current, primary, secondary, total) => candidates.slice().sort((a, b) => (
  affinityScore(b, primary, secondary) - affinityScore(a, primary, secondary) ||
  distanceFrom(a, current, total) - distanceFrom(b, current, total) ||
  a.order - b.order
));

export function chooseGuardianRoutes(entries, value, options = {}) {
  const knownSlugs = entries.map((entry) => entry.guardianSlug);
  const state = normalizeGuardianJourney(value, knownSlugs);
  const current = entries.find((entry) => entry.guardianSlug === options.currentGuardianSlug) || null;
  const excluded = new Set([current?.guardianSlug, ...state.recent].filter(Boolean));
  const unseen = entries.filter((entry) => !state.seen.includes(entry.guardianSlug) && entry.guardianSlug !== current?.guardianSlug);
  const coverageComplete = unseen.length === 0 && state.seen.length >= entries.length;
  const freshUnseen = unseen.filter((entry) => !excluded.has(entry.guardianSlug));
  const continuationPool = coverageComplete
    ? entries.filter((entry) => !excluded.has(entry.guardianSlug))
    : (freshUnseen.length ? freshUnseen : unseen);
  const continuation = rank(
    continuationPool.length ? continuationPool : entries.filter((entry) => entry.guardianSlug !== current?.guardianSlug),
    current,
    options.primary,
    options.secondary,
    entries.length,
  )[0] || null;

  const resonancePrimary = options.primary || current?.dominant?.id || '';
  const resonanceSecondary = options.secondary || current?.secondary?.id || '';
  const resonanceBase = coverageComplete
    ? entries.filter((entry) => !excluded.has(entry.guardianSlug))
    : freshUnseen;
  const resonance = rank(
    resonanceBase.filter((entry) => entry.guardianSlug !== continuation?.guardianSlug),
    current,
    resonancePrimary,
    resonanceSecondary,
    entries.length,
  )[0] || null;

  return { continuation, resonance, coverageComplete, state };
}
