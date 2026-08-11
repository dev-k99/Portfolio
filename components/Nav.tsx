'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { profile } from '@/content/profile';

const sections = [
  { id: 'experience', label: 'experience' },
  { id: 'projects', label: 'projects' },
  { id: 'contact', label: 'contact' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur transition-colors ${
        scrolled ? 'border-b border-line bg-bg/80' : 'border-b border-transparent bg-transparent'
      }`}
    >
      {/* Wraps rather than overflows: logo plus three links exceed 320px viewports. */}
      <nav
        className="shell flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-4"
        aria-label="Primary"
      >
        <Link href="/" className="text-sm font-bold text-fg transition-opacity hover:opacity-70">
          {profile.handle}
        </Link>

        <ul className="flex items-center gap-4 text-sm sm:gap-7">
          {sections.map((section) => (
            <li key={section.id}>
              <Link
                href={`/#${section.id}`}
                className="text-muted transition-colors hover:text-fg"
              >
                {section.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
