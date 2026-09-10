// Versões públicas centralizadas; atualizar o ponteiro não revalida conteúdo.
// Sincronizações materiais também exigem dados, escopo e contratos coerentes.
import sources from '../data/sources.json';

const a = sources.authority;
export const LORE_MASTER = a.loreMaster.version_at_sync;
export const DOSSIER = a.guardiansDossier.version_at_sync;
export const SYNC_DATE = sources.lastSync;
export const canonLabel = `referência lore v${LORE_MASTER} · revisão parcial`;
export const loreMasterLabel = `lore master v${LORE_MASTER}`;
export const dossierLabel = `dossiê dos guardiões v${DOSSIER}`;
export const footerStamp = `LORE v${LORE_MASTER} · SINCRONIZAÇÃO PARCIAL`;
export const historicalLoreLabel = `base histórica: lore v${sources.historicalReferences.loreMaster.version_at_sync} · revisão pendente`;
export const legacyCohort = sources.contentCompliance.guardianFervors.currentCohort;
