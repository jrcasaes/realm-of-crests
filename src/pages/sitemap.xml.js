import realms from '../data/realms.json';
import { guardianRoster } from '../lib/guardians.js';

export const prerender = true;

const staticRoutes = [
  '/',
  '/atlas/',
  '/diario/',
  '/ritual/',
  '/reinos/',
  '/guardioes/',
  '/sistemas/',
  '/sistemas/fervor/',
  '/sistemas/gravity/',
  '/sistemas/ascensao/',
];

const escapeXml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

export function GET() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const routes = [
    ...staticRoutes,
    ...realms.map(({ slug }) => `/reinos/${slug}/`),
    ...guardianRoster.map(({ slug }) => `/guardioes/${slug}/`),
  ];
  const urls = routes.map((route) => {
    const location = `https://jrcasaes.github.io${base}${route}`;
    return `  <url><loc>${escapeXml(location)}</loc></url>`;
  }).join('\n');

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
