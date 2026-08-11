import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import { links, profile } from '@/content/profile';
import { SITE_ORIGIN, SITE_URL, withBase } from '@/lib/paths';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const title = `${profile.name} — ${profile.role}`;

const ogImage = {
  url: withBase('/opengraph-image.png'),
  width: 1200,
  height: 630,
  alt: title,
};

export const metadata: Metadata = {
  // Origin only — Next prepends basePath itself, so the full site URL here would
  // produce /Portfolio/Portfolio/... in og:image.
  metadataBase: new URL(SITE_ORIGIN),
  alternates: { canonical: `${SITE_URL}/` },
  icons: {
    icon: [{ url: withBase('/icon.svg'), type: 'image/svg+xml' }],
    apple: [{ url: withBase('/apple-icon.png'), sizes: '180x180', type: 'image/png' }],
  },
  title: {
    default: title,
    template: `%s — ${profile.name}`,
  },
  description: profile.metaDescription,
  authors: [{ name: profile.name, url: links.github }],
  creator: profile.name,
  keywords: [
    'Kwanele Ntshangase',
    'AI Engineer',
    '.NET Developer',
    'ASP.NET Core',
    'RAG',
    'LangGraph',
    'Azure',
    'South Africa',
  ],
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: profile.name,
    title,
    description: profile.metaDescription,
    locale: 'en_ZA',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: profile.metaDescription,
    creator: '@dev__k99',
    images: [ogImage],
  },
  robots: { index: true, follow: true },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  url: SITE_URL,
  jobTitle: profile.role,
  description: profile.metaDescription,
  email: `mailto:${links.email}`,
  // City dropped along with the footer line; country stays because it is the one
  // location signal worth keeping for search.
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'ZA',
  },
  sameAs: [links.github, links.linkedin, links.x],
  knowsAbout: [
    'ASP.NET Core',
    'C#',
    'Retrieval-Augmented Generation',
    'LangGraph',
    'Azure',
    'Clean Architecture',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${inter.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
        >
          Skip to content
        </a>

        <Nav />
        <main id="main">{children}</main>
        <Footer />

        <script
          type="application/ld+json"
          // Static, author-controlled schema object — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
