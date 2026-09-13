import { readFileSync, readdirSync, statSync } from 'node:fs';
import assert from 'node:assert/strict';
import { join } from 'node:path';
const walk = dir => readdirSync(dir).flatMap(name => {
  const file = join(dir, name);
  return statSync(file).isDirectory() ? walk(file) : [file];
});
for (const dir of ['public', 'dist']) {
  assert.equal(walk(dir).filter(p => /\.(mp4|webm)$/i.test(p)).length, 0, `${dir}: mídia ativada antes da etapa 2`);
}
for (const [route, count] of [['guardioes/nego', 1], ['reinos/victoria', 2], ['guardioes/kalen', 0], ['reinos/bahea', 0]]) {
  const html = readFileSync(`dist/${route}/index.html`, 'utf8');
  assert.equal((html.match(/<living-scene\b/g) || []).length, count, route);
  assert(!/<video\b|\.(?:mp4|webm)\b|Reproduzir cena/.test(html), `${route}: reprodução deve permanecer desativada`);
}
console.log('VIDEO_STAGE_1: PASS — somente imagens, sem vídeos nem controles ativos');
