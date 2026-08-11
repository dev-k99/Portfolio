import { fileURLToPath } from 'node:url';
import type { NextConfig } from 'next';

/**
 * GitHub Pages serves this repo from https://dev-k99.github.io/Portfolio/, so every
 * asset and route is namespaced under /Portfolio. `basePath` handles next/link and
 * next/image automatically; raw public/ URLs must go through withBase() in lib/paths.ts.
 */
const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/Portfolio',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  // A stray lockfile in the user's home directory makes Next guess the wrong
  // workspace root; pin it to this project.
  outputFileTracingRoot: fileURLToPath(new URL('.', import.meta.url)),
};

export default nextConfig;
