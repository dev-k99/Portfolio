'use client';

import { useEffect, useState } from 'react';
import type { Project } from '@/content/projects';

type ProjectIndexProps = {
  projects: Project[];
};

/**
 * Sticky index for the projects section, shown only where there is room for it
 * (xl and up). Purely a shortcut — every project is reachable by scrolling, so
 * hiding it on narrow screens costs nothing.
 */
export function ProjectIndex({ projects }: ProjectIndexProps) {
  const [active, setActive] = useState(projects[0]?.slug ?? '');

  useEffect(() => {
    const nodes = projects
      .map((project) => document.getElementById(`project-${project.slug}`))
      .filter((node): node is HTMLElement => node !== null);

    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // The card closest to the top of the viewport wins, so the highlight does
        // not flicker when two cards are on screen at once.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActive(visible[0].target.id.replace('project-', ''));
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [projects]);

  return (
    <nav className="sticky top-28 hidden self-start xl:block" aria-label="Projects">
      <p className="comment mb-4">{`// index`}</p>
      <ul className="space-y-2.5 border-l border-line">
        {projects.map((project) => {
          const isActive = project.slug === active;
          return (
            <li key={project.slug}>
              <a
                href={`#project-${project.slug}`}
                aria-current={isActive ? 'true' : undefined}
                className={`-ml-px flex items-baseline gap-2 border-l pl-3 text-xs transition-colors ${
                  isActive
                    ? 'border-fg text-fg'
                    : 'border-transparent text-muted hover:border-line-lit hover:text-body'
                }`}
              >
                <span className="text-faint">{project.index}</span>
                <span className="truncate">{project.name}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
