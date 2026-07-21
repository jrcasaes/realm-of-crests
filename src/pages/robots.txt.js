export const prerender = true;

export function GET() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const robots = import.meta.env.PUBLIC_ROBOTS || 'index, follow, max-image-preview:large';
  const isPreview = robots.toLowerCase().includes('noindex');
  const policy = isPreview ? 'Disallow: /' : 'Allow: /';
  const sitemap = `https://jrcasaes.github.io${base}/sitemap.xml`;

  return new Response(`User-agent: *\n${policy}\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
