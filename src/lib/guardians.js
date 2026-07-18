import realms from '../data/realms.json';
import guardianDetails from '../data/guardians.json';

const portraitAssets = {
  Nego: ['WEB_RoC_Nego_Retrato_v2.0.jpg', 1536, 1024],
  Kalen: ['WEB_RoC_Kalen_Retrato_v1.0.jpg', 1536, 1152],
  Vulture: ['WEB_RoC_Vulture_Retrato_v1.0.jpg', 1024, 1536],
  Admiral: ['WEB_RoC_Admiral_Retrato_v1.0.jpg', 1536, 1087],
  Hawks: ['WEB_RoC_Hawks_Retrato_v1.0.jpg', 1536, 1024],
  Tuskar: ['WEB_RoC_Tuskar_Retrato_v1.0.jpg', 1536, 1229],
  Paollo: ['WEB_RoC_Paollo_Retrato_v1.0.jpg', 1536, 1269],
  Villa: ['WEB_RoC_Villa_Retrato_v1.0.jpg', 1536, 865],
  Fox: ['WEB_RoC_Fox_Retrato_v1.0.jpg', 1536, 865],
  Gallus: ['WEB_RoC_Gallus_Retrato_v1.0.jpg', 1536, 864],
  Valen: ['WEB_RoC_Valen_Retrato_v1.0.jpg', 1536, 865],
  Saciros: ['WEB_RoC_Saciros_Retrato_v1.0.jpg', 1536, 1024],
  Bira: ['WEB_RoC_Bira_Retrato_v1.0.jpg', 1536, 900],
  Florius: ['WEB_RoC_Florius_Retrato_v1.0.jpg', 1024, 1536],
  Eldric: ['WEB_RoC_Eldric_Retrato_v1.0.jpg', 1536, 864],
  Tempest: ['WEB_RoC_Tempest_Retrato_v1.0.jpg', 1536, 1024],
  Conda: ['WEB_RoC_Conda_Retrato_v1.0.jpg', 1536, 865],
  Malino: ['WEB_RoC_Malino_Retrato_v1.0.jpg', 1536, 865],
  Solari: ['WEB_RoC_Solari_Retrato_v1.0.jpg', 1536, 1024],
};

const detailsByName = new Map(guardianDetails.map((guardian) => [guardian.name, guardian]));

const normalizeGuardianName = (name) => name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export const guardianRoster = realms.map((realm) => {
  const assetKey = normalizeGuardianName(realm.guardian);
  const detail = detailsByName.get(realm.guardian) ?? detailsByName.get(assetKey) ?? {};
  const [portrait, portraitWidth, portraitHeight] = portraitAssets[assetKey];

  return {
    ...detail,
    slug: detail.slug ?? assetKey.toLowerCase(),
    name: realm.guardian,
    realmSlug: realm.slug,
    realmName: realm.realm,
    realmEcho: realm.territorialEcho,
    fervor: realm.fervor,
    epithet: realm.epithet,
    ecoAncestral: realm.guardianEcho,
    vulgo: realm.guardianVulgo,
    battleEcho: realm.battleEcho,
    portrait,
    portraitWidth,
    portraitHeight,
    portraitLabel: 'DERIVADO WEB · RMV v0.1',
    sections: detail.sections ?? [],
    traits: detail.traits ?? [],
    symbols: detail.symbols ?? [],
    sourceRefs: [...new Set([...(detail.sourceRefs ?? []), 'rmv-v0.1'])],
    canonStatus: realm.canonStatus,
    publicApproved: realm.publicApproved,
    lastCanonReview: realm.lastCanonReview,
    notes: 'Retrato web derivado do master preservado; o derivado não é fonte de cânone.',
  };
});
