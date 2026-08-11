/**
 * GitHub Pages serves the site from /Portfolio. next/link and next/image apply that
 * prefix themselves; anything pointing straight at public/ does not, so every raw
 * asset URL has to be routed through here or it 404s in production only.
 */
export const BASE_PATH = '/Portfolio';

/**
 * Origin only. This is what `metadataBase` must be set to: Next resolves relative
 * metadata URLs against metadataBase *and* prepends basePath, so giving it the full
 * site URL produces /Portfolio/Portfolio/... in og:image.
 */
export const SITE_ORIGIN = 'https://dev-k99.github.io';

/** Full public URL, for sitemap, robots, JSON-LD and canonical links. */
export const SITE_URL = `${SITE_ORIGIN}${BASE_PATH}`;

export function withBase(path: string): string {
  return `${BASE_PATH}${path.startsWith('/') ? path : `/${path}`}`;
}
