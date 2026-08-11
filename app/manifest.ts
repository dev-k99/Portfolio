import type { MetadataRoute } from 'next';
import { profile } from '@/content/profile';
import { BASE_PATH, withBase } from '@/lib/paths';

export const dynamic = 'force-static';

/**
 * Icon paths need withBase(): the manifest is fetched as a plain URL, so Next does
 * not prefix it the way it does next/link and next/image. The previous hand-written
 * site.webmanifest pointed at an absolute /favicon.png, which never resolved under
 * the /Portfolio subpath.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — ${profile.role}`,
    short_name: profile.name.split(' ')[0],
    description: profile.metaDescription,
    start_url: `${BASE_PATH}/`,
    scope: `${BASE_PATH}/`,
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: withBase('/icon.svg'),
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: withBase('/apple-icon.png'),
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
