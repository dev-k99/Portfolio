import { CommandLink } from '@/components/CommandLink';
import { CommentLabel } from '@/components/CommentLabel';
import { StatusBadge } from '@/components/StatusBadge';
import { TechTag } from '@/components/TechTag';
import type { Project } from '@/content/projects';

type ProjectCardProps = {
  project: Project;
};

const facets = [
  { label: 'PROBLEM', key: 'problem' },
  { label: 'SOLUTION', key: 'solution' },
  { label: 'OUTCOME', key: 'outcome' },
] as const;

/**
 * Grid card. Single column internally — it sits two-up on desktop, so the old
 * side-by-side split would have made the measure far too narrow to read.
 * `flex-col` plus `mt-auto` keeps every footer in a row aligned.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      id={`project-${project.slug}`}
      className="flex h-full scroll-mt-28 flex-col rounded-xl border border-line bg-surface transition-colors hover:border-line-lit"
    >
      <header className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-line px-5 py-3">
        <p className="prompt">cat ./projects/{project.slug}.md</p>
        <StatusBadge label={project.status} />
      </header>

      <div className="flex flex-1 flex-col px-5 py-7">
        <p className="text-xs text-faint">{project.index} /</p>
        <h3 className="mt-2.5 text-2xl">{project.name}</h3>
        <p className="mt-2.5 text-fg">{project.tagline}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <li key={item}>
              <TechTag>{item}</TechTag>
            </li>
          ))}
        </ul>

        <dl className="mt-7 space-y-4">
          {facets.map((facet) => (
            <div key={facet.key}>
              <CommentLabel as="dt">{facet.label}</CommentLabel>
              <dd className="mt-1.5 text-sm leading-relaxed text-body">{project[facet.key]}</dd>
            </div>
          ))}
        </dl>
      </div>

      <footer className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line px-5 py-4">
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
