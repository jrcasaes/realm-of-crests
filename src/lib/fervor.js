// Fervor reativo — mapa canônico: tipo dominante → assinatura visual.
// Fonte das cores: legenda visual dos sete tipos (Lore Master v3.0.2, Livro II).
// O tipo dominante é extraído do campo `fervor` do realms.json ("Fervor de X (dominante) / ...").

const FERVOR_SIGNATURES = {
  legado:    { key: 'legado',    color: '#b98e3f', soft: 'rgba(185, 142, 63, 0.20)' },
  raiva:     { key: 'raiva',     color: '#c14b2e', soft: 'rgba(193, 75, 46, 0.20)' },
  luto:      { key: 'luto',      color: '#7d8ea0', soft: 'rgba(125, 142, 160, 0.18)' },
  vinganca:  { key: 'vinganca',  color: '#8e2323', soft: 'rgba(142, 35, 35, 0.24)' },
  orgulho:   { key: 'orgulho',   color: '#d9b45e', soft: 'rgba(217, 180, 94, 0.20)' },
  unidade:   { key: 'unidade',   color: '#9aa27a', soft: 'rgba(154, 162, 122, 0.20)' },
  fe:        { key: 'fe',        color: '#d9c27a', soft: 'rgba(217, 194, 122, 0.20)' },
  esperanca: { key: 'esperanca', color: '#e8b45a', soft: 'rgba(232, 180, 90, 0.20)' },
};

const NORMALIZE = {
  'legado': 'legado',
  'raiva': 'raiva',
  'luto': 'luto',
  'vingança': 'vinganca',
  'orgulho': 'orgulho',
  'unidade': 'unidade',
  'fé': 'fe',
  'esperança': 'esperanca',
};

/** Extrai a assinatura do Fervor dominante a partir do campo `fervor` do reino. */
export function fervorSignature(fervorField) {
  const m = /Fervor de ([\wÀ-ú]+)\s*\(dominante\)/i.exec(fervorField || '');
  const key = m ? NORMALIZE[m[1].toLowerCase()] : null;
  return FERVOR_SIGNATURES[key] || FERVOR_SIGNATURES.legado;
}
