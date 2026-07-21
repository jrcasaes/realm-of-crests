// Fonte única das versões canônicas exibidas no site.
// Os valores vêm de src/data/sources.json — o ponteiro de governança.
// Para atualizar o site após uma nova versão do cânone, edite APENAS o sources.json.
// Nunca escreva um número de versão direto num template.
import sources from '../data/sources.json';

const a = sources.authority;

export const LORE_MASTER = a.loreMaster.version_at_sync;        // ex.: "3.0.6"
export const DOSSIER = a.guardiansDossier.version_at_sync;      // ex.: "2.6"

// Rótulos prontos, em minúsculas (registro editorial das rubricas)
export const canonLabel = `canon v${LORE_MASTER}`;              // "canon v3.0.6"
export const loreMasterLabel = `lore master canon v${LORE_MASTER}`;
export const dossierLabel = `dossiê dos guardiões v${DOSSIER}`;

// Rótulo do rodapé, em caixa alta
export const footerStamp = `LORE MASTER · CANON v${LORE_MASTER}`;
