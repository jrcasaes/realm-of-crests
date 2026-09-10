// Extrato público mínimo conferido no Dossiê dos 19 v4.1 (30/08/2026).
// Fixture de regressão independente dos dados de produção; sem biografias ou spoilers.
const EXPECTED = [
  [
    "Malino",
    "Continuum Consagrado",
    "Fé",
    "Unidade"
  ],
  [
    "Nego",
    "Linha de Brasas Soberana",
    "Legado",
    "Raiva"
  ],
  [
    "Kalen",
    "Retribuição Fraturada",
    "Vingança",
    "Luto"
  ],
  [
    "Vulture",
    "Convicção Imperial",
    "Fé",
    "Orgulho"
  ],
  [
    "Admiral",
    "Memória de Conquista",
    "Vingança",
    "Legado"
  ],
  [
    "Bira",
    "Ascensão Solitária",
    "Esperança",
    "Luto"
  ],
  [
    "Florius",
    "Continuum Real",
    "Orgulho",
    "Legado"
  ],
  [
    "Fox",
    "Reivindicação Estelar",
    "Esperança",
    "Vingança"
  ],
  [
    "Gallus",
    "Instinto de Domínio",
    "Raiva",
    "Orgulho"
  ],
  [
    "Hawks",
    "Juramento Coletivo",
    "Fé",
    "Unidade"
  ],
  [
    "Tuskar",
    "Domínio Dinástico",
    "Orgulho",
    "Legado"
  ],
  [
    "Paollo",
    "Continuum Consagrado",
    "Legado",
    "Fé"
  ],
  [
    "Villa",
    "Continuum Oceânico",
    "Esperança",
    "Legado"
  ],
  [
    "Solari",
    "Memória da Raiz",
    "Legado",
    "Esperança"
  ],
  [
    "Eldric",
    "Memória da Raiz",
    "Legado",
    "Luto"
  ],
  [
    "Tempest",
    "Ruptura de Velocidade",
    "Raiva",
    "Esperança"
  ],
  [
    "Condá",
    "Raiz do Sobrevivente",
    "Luto",
    "Esperança"
  ],
  [
    "Valen",
    "Domínio pela Honra",
    "Orgulho",
    "Vingança"
  ],
  [
    "Saciros",
    "Chama Ascendente",
    "Esperança",
    "Raiva"
  ]
];
const UNIVERSAL = ['faith', 'grief', 'hope', 'legacy', 'pride', 'rage', 'unity', 'vengeance'];
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export function foundationFailures({ realms, sources, fervors }) {
  const failures = [];
  const check = (condition, message) => { if (!condition) failures.push(message); };
  check(realms.length === EXPECTED.length, 'A matriz atual deve conter exatamente 19 registros.');
  for (const [name, essence, dominant, secondary] of EXPECTED) {
    const realm = realms.find((entry) => entry.guardian === name);
    check(realm?.essence === essence, `Essência divergente do Dossiê v4.1: ${name}.`);
    check(realm?.fervor === `Fervor de ${dominant} (dominante) / Fervor de ${secondary} (secundário)`, `Par de Fervores divergente do Dossiê v4.1: ${name}.`);
    check(same(realm?.sourceRefs, ['guardians-dossier-v4.1']), `Fonte ativa incorreta: ${name}.`);
    check(same(realm?.canonReviewScope, ['essence', 'fervor']), `A revisão de ${name} deve permanecer restrita a Essência e Fervores.`);
    check(realm?.lastCanonReview === '2026-09-10' && realm?.previousCanonReview === '2026-07-18', `Rastreabilidade de revisão incorreta: ${name}.`);
  }
  check(same(fervors.map(({ id }) => id).sort(), UNIVERSAL), 'Preservar os oito tipos universais, sem adicionar ou excluir famílias.');
  for (const id of ['pride', 'unity']) check(fervors.find((f) => f.id === id)?.classification === 'Fervor autônomo · afinidade com Fé', `Autonomia de ${id} divergente da Lore v4.0, leis 3.11/3.12.`);
  const cohort = sources.contentCompliance.guardianFervors?.currentCohort;
  for (const [role, index] of [['dominant', 2], ['secondary', 3]]) {
    const names = EXPECTED.filter((row) => row[index] === 'Legado').map(([name]) => name).sort();
    check(same([...(cohort?.[role] ?? [])].sort(), names), `Lista pública de Legado (${role}) divergente da matriz v4.1.`);
  }
  check(sources.siteCreatesCanon === false, 'O site não pode criar cânone.');
  check(sources.lastSync === '2026-09-10' && sources.syncScope?.fullSiteReview === false, 'Sincronização mínima não pode declarar revisão integral.');
  check(sources.historicalReferences?.loreMaster?.status === 'HISTORICAL_NOT_ACTIVE', 'Fonte histórica não pode recuperar autoridade ativa.');
  check(Array.isArray(sources.pendingReview) && sources.pendingReview.length === 3, 'As três pendências de escopo devem permanecer explícitas.');
  return failures;
}
