import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
const base = (process.env.ASTRO_BASE || '/realm-of-crests').replace(/\/$/, '');
const walk = dir => readdirSync(dir).flatMap(name => {
  const file = join(dir, name);
  return statSync(file).isDirectory() ? walk(file) : [file];
});
const scenes = [
  { asset: 'nego-presenca', route: 'guardioes/nego', bytes: 1510080, sha256: '05362eab60fd89679180ec9f818189cc25a005175d83a09b8086e167540f5474' },
  { asset: 'victoria-encostas', route: 'reinos/victoria', bytes: 1045800, sha256: 'bb00f6a9ee97f8e9bcadd0b6054657d5390768f33030005d088e1e6d08c9beb4' },
];
for (const dir of ['public', 'dist']) {
  assert.deepEqual(walk(dir).filter(p => /\.(mp4|webm)$/i.test(p)).sort(), scenes.map(s => `${dir}/assets/videos/${s.asset}.mp4`).sort());
  for (const scene of scenes) {
    const data = readFileSync(`${dir}/assets/videos/${scene.asset}.mp4`);
    assert.equal(data.length, scene.bytes);
    assert.equal(createHash('sha256').update(data).digest('hex'), scene.sha256);
  }
}
for (const file of walk('dist').filter(p => p.endsWith('.html'))) {
  const html = readFileSync(file, 'utf8');
  const videos = html.match(/<video\b[^>]*>/g) || [];
  const scene = scenes.find(s => file === `dist/${s.route}/index.html`);
  assert.equal(videos.length, scene ? 1 : 0, file);
  if (scene) {
    const video = videos[0];
    assert(video.includes(`data-src="${base}/assets/videos/${scene.asset}.mp4"`));
    assert(/preload="none"/.test(video) && /\bcontrols\b/.test(video) && /\bplaysinline\b/.test(video));
    assert(!/\bautoplay\b/.test(video));
    const poster = /poster="([^"]+)"/.exec(video)[1];
    assert(poster.startsWith(`${base}/`) && existsSync(`dist/${poster.slice(base.length + 1)}`));
  }
  assert(!/victoria-flamula\.mp4/.test(html), file);
}
for (const [route, count] of [['guardioes/nego', 1], ['reinos/victoria', 2]]) {
  const html = readFileSync(`dist/${route}/index.html`, 'utf8');
  assert.equal((html.match(/<living-scene\b/g) || []).length, count);
}
console.log('VIDEO_STAGE_3: PASS — Nego e encostas ativados, flâmula estática, integridade e rotas verificadas');
