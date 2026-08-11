/**
 * Renders the apple-touch icon and the Open Graph card into public/.
 *
 * These are generated here rather than through Next's app/apple-icon.tsx and
 * app/opengraph-image.tsx conventions on purpose: under `output: export` those
 * conventions emit extensionless files (out/apple-icon, out/opengraph-image), and
 * GitHub Pages serves anything without a known extension as application/octet-stream
 * — which every social-card scraper rejects. Writing real .png files into public/
 * sidesteps the whole problem.
 *
 * Run with `npm run images` after changing the mark, the name, or the role.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const { ImageResponse } = require('next/og');
const { createElement: h } = require('react');

// Kept in sync with content/profile.ts by hand — this script runs rarely.
const NAME = 'Kwanele Ntshangase';
const ROLE = 'AI Engineer & .NET Fullstack Developer';
const SHELL = 'kwanele@dev:~';
const URL_LABEL = 'dev-k99.github.io/Portfolio';

const FG = '#ffffff';
const BODY = '#a1a1aa';
const MUTED = '#71717a';
const FAINT = '#52525b';
const LINE = '#1c1c1f';
const LINE_LIT = '#2e2e33';
const SURFACE = '#08080a';
const BG = '#000000';

const markSvg = (foreground = FG) =>
  [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">',
    `<g stroke="${foreground}" stroke-width="9" stroke-linecap="square" fill="none">`,
    '<path d="M24 26V74"/><path d="M28 50L56 24"/><path d="M28 50L56 76"/>',
    '</g>',
    `<rect x="66" y="52" width="14" height="22" fill="${foreground}"/>`,
    '</svg>',
  ].join('');

const markUri = `data:image/svg+xml;utf8,${encodeURIComponent(markSvg())}`;

const row = (style, children) => h('div', { style: { display: 'flex', ...style } }, children);

async function write(name, element, size, fonts) {
  const response = new ImageResponse(element, { ...size, fonts });
  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(join(root, 'public', name), buffer);
  console.log(`public/${name}  ${(buffer.length / 1024).toFixed(1)} KB`);
}

const mono = await readFile(join(root, 'assets/fonts/JetBrainsMono-Bold.ttf'));
const fonts = [{ name: 'JetBrains Mono', data: mono, weight: 700, style: 'normal' }];

// ---------------------------------------------------------------- apple icon
await write(
  'apple-icon.png',
  row(
    { width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', background: BG },
    h('img', { src: markUri, width: 126, height: 126 }),
  ),
  { width: 180, height: 180 },
  fonts,
);

// ------------------------------------------------------------------ og card
await write(
  'opengraph-image.png',
  row(
    { width: '100%', height: '100%', padding: 56, background: BG, fontFamily: 'JetBrains Mono' },
    row(
      {
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        border: `1px solid ${LINE}`,
        borderRadius: 20,
        background: SURFACE,
      },
      [
        // title bar
        row(
          {
            key: 'bar',
            alignItems: 'center',
            gap: 14,
            padding: '20px 28px',
            borderBottom: `1px solid ${LINE}`,
          },
          [
            row(
              { key: 'dots', gap: 10 },
              [0, 1, 2].map((i) =>
                h('div', {
                  key: i,
                  style: { width: 14, height: 14, borderRadius: 999, border: `1px solid ${LINE_LIT}` },
                }),
              ),
            ),
            row({ key: 'shell', color: FAINT, fontSize: 20 }, SHELL),
          ],
        ),

        // body
        row({ key: 'body', flexDirection: 'column', flex: 1, padding: '44px 56px' }, [
          row({ key: 'cmd', color: MUTED, fontSize: 24 }, [
            h('span', { key: 'sigil', style: { color: FG } }, '$ '),
            'whoami --verbose',
          ]),
          row({ key: 'name', color: FG, fontSize: 84, marginTop: 34 }, NAME),
          row({ key: 'role', color: BODY, fontSize: 32, marginTop: 18 }, ROLE),
          row(
            {
              key: 'foot',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 'auto',
            },
            [
              row({ key: 'url', color: FAINT, fontSize: 22 }, URL_LABEL),
              h('img', { key: 'mark', src: markUri, width: 56, height: 56 }),
            ],
          ),
        ]),
      ],
    ),
  ),
  { width: 1200, height: 630 },
  fonts,
);
