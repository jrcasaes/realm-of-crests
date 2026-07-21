import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');
const failures = [];
const pass = (condition, message) => { if (!condition) failures.push(message); };

const packageJson = JSON.parse(read('package.json'));
const dossier = read('src/pages/guardioes/[slug].astro');
const portraitRule = dossier.match(/\.dossier-portrait \{([^}]*)\}/)?.[1] ?? '';
const backgroundRule = dossier.match(/\.dossier-hero-image \{([^}]*)\}/)?.[1] ?? '';
const washRule = dossier.match(/\.dossier-hero-wash \{([^}]*)\}/)?.[1] ?? '';

pass(packageJson.version === '1.8.3', 'O micropatch 7.1.3 deve identificar o pacote 1.8.3.');
pass(packageJson.scripts?.['validate:portrait-clarity'] === 'node scripts/validate-phase7-1-3.mjs', 'O gate de nitidez dos retratos não está declarado.');
pass(portraitRule.includes('filter: none'), 'O retrato principal do dossiê deve permanecer sem filtro.');
pass(!/brightness|saturate|blur/.test(portraitRule.replace('filter: none', '')), 'O retrato principal ainda contém tratamento que reduz nitidez ou presença.');
pass(backgroundRule.includes('blur(26px)'), 'O desfoque atmosférico deve permanecer restrito à cópia de fundo.');
pass(washRule.includes('transparent 66%'), 'O véu horizontal deve liberar rosto e corpo do Guardião no desktop.');
pass(washRule.includes('transparent 68%'), 'A transição vertical deve ficar restrita à base do herói.');
pass(dossier.includes('.dossier-portrait { width: 100%; opacity: .8; }'), 'A presença do retrato no layout compacto não foi preservada.');

if (failures.length) {
  console.error('PHASE_7_1_3_PORTRAIT_CLARITY_GATE: FAIL');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('PHASE_7_1_3_PORTRAIT_CLARITY_GATE: PASS');
console.log('retrato principal sem filtro · desfoque apenas no fundo · véu restrito ao texto e à base');
