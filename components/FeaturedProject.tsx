import Image from 'next/image';
import { CommandLink } from '@/components/CommandLink';
import { CommentLabel } from '@/components/CommentLabel';
import { StatusBadge } from '@/components/StatusBadge';
import { TechTag } from '@/components/TechTag';
import type { Project } from '@/content/projects';
import { withBase } from '@/lib/paths';

type FeaturedProjectProps = {
  project: Project;
};

const facets = [
  { label: 'PROBLEM', key: 'problem' },
  { label: 'SOLUTION', key: 'solution' },
  { label: 'OUTCOME', key: 'outcome' },
] as const;

/**
 * The lead project, given the scale the rest of the grid does not get. The size
 * difference is the hierarchy — there is no colour available to signal it.
 */
export function FeaturedProject({ project }: FeaturedProjectProps) {
  return (
    <article
      id={`project-${project.slug}`}
      className="scroll-mt-28 overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-line-lit"
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3 sm:px-7">
        <p className="prompt">cat ./projects/{project.slug}.md</p>
        <StatusBadge label={project.status} />
      </header>

      {project.image && (
        <div className="border-b border-line">
          <Image
            // next/image does not apply basePath under `output: export` with
            // unoptimized images — without this the src 404s in production.
            src={withBase(project.image)}
            alt={`${project.name} interface`}
            width={1350}
            height={640}
            className="h-auto w-full"
            sizes="(min-width: 1280px) 1100px, 100vw"
            priority
          />
        </div>
      )}

      {/* Identity spans the full width and the three facets sit in columns beneath
          it. A two-column split leaves the identity side mostly empty at this
          scale, and it would only repeat the grid cards' own layout. */}
      <div className="px-5 py-8 sm:px-7">
        <p className="text-xs text-faint">{project.index} /</p>
        <h3 className="mt-3 text-3xl sm:text-4xl">{project.name}</h3>
        <p className="mt-4 max-w-2xl text-lg text-fg">{project.tagline}</p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <li key={item}>
              <TechTag>{item}</TechTag>
            </li>
          ))}
        </ul>

        <dl className="mt-9 grid gap-8 border-t border-line pt-8 md:grid-cols-3">
          {facets.map((facet) => (
            <div key={facet.key}>
              <CommentLabel as="dt">{facet.label}</CommentLabel>
              <dd className="mt-2 text-sm leading-relaxed text-body">{project[facet.key]}</dd>
            </div>
          ))}
        </dl>
      </div>

      <footer className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line px-5 py-4 sm:px-7">
        {project.live && (
          <CommandLink href={project.live} external>
            {project.liveLabel}
          </CommandLink>
        )}
        <CommandLink href={project.github} external>
          git clone
        </CommandLink>
        <CommandLink href={`/projects/${project.slug}`}>read --case-study</CommandLink>
      </footer>
    </article>
  );
}
