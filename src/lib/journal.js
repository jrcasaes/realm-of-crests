import realms from '../data/realms.json';

export const JOURNAL_STORAGE_KEY = 'roc.journal.v1';
export const PREFERENCES_STORAGE_KEY = 'roc.preferences.v1';

export const journalRealms = realms
  .slice()
  .sort((a, b) => a.order - b.order)
  .map((realm) => ({
    order: realm.order,
    slug: realm.slug,
    realm: realm.realm,
    trueName: realm.trueName,
    guardian: realm.guardian,
    essence: realm.essence,
    emblem: `emblem_${realm.slug}.webp`,
  }));

export const emberlineFragments = [
  {
    count: 1,
    title: 'A LEI DO PRIMEIRO SELO',
    source: 'fundamento público · Crest',
    copy: 'Um Crest não é ornamento nem troféu. Ele condensa identidade, soberania e memória territorial.',
  },
  {
    count: 5,
    title: 'A VONTADE QUE RESPONDE',
    source: 'fundamento público · Kingdom Will',
    copy: 'Um Guardião não governa o povo de fora: sua presença emerge da vontade coletiva que sustenta o Reino.',
  },
  {
    count: 10,
    title: 'O PESO DA SOBERANIA',
    source: 'fundamento público · Sovereign Gravity',
    copy: 'Cada ciclo preservado torna a soberania mais densa. Ascender também significa carregar o risco do próprio colapso.',
  },
  {
    count: 19,
    title: 'TESTEMUNHO DA FRONTEIRA',
    source: 'fundamento público · Ruína',
    copy: 'Na Fronteira da Ruína, realidade e memória enfraquecem. Registrar os Dezenove é testemunhar, não dominar.',
  },
];
