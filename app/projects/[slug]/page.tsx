import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CommandLink } from '@/components/CommandLink';
import { CommentLabel } from '@/components/CommentLabel';
import { StatusBadge } from '@/components/StatusBadge';
import { TechTag } from '@/components/TechTag';
import { TerminalPrompt } from '@/components/TerminalPrompt';
import { getProject, projects } from '@/content/projects';
import { withBase } from '@/lib/paths';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  return {
    title: project.name,
    description: project.tagline,
    openGraph: {
      title: `${project.name} — ${project.tagline}`,
      description: project.problem,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const position = projects.findIndex((item) => item.slug === project.slug);
  const previous = projects[position - 1];
  const next = projects[position + 1];

  return (
    <article className="shell py-12 md:py-16">
      <CommandLink href="/#projects">cd ../featured-projects</CommandLink>

      <header className="mt-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <TerminalPrompt command={`cat ./projects/${project.slug}.md`} />
          <StatusBadge label={project.status} />
        </div>

        <p className="mt-8 text-xs text-faint">{project.index} /</p>
        <h1 className="mt-3 text-[clamp(2.25rem,6vw,3.75rem)]">{project.name}</h1>
        <p className="mt-4 max-w-2xl text-lg text-fg">{project.tagline}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.live && (
            <CommandLink href={project.live} external variant="primary">
              {project.liveLabel}
            </CommandLink>
          )}
          <CommandLink href={project.github} external variant="outline">
            git clone
          </CommandLink>
        </div>
      </header>

      {project.image && (
        <div className="mt-12 overflow-hidden rounded-xl border border-line bg-surface">
          <Image
            // basePath is not applied automatically for unoptimized images.
            src={withBase(project.image)}
            alt={`${project.name} interface`}
            width={1600}
            height={900}
            className="h-auto w-full"
            priority
          />
        </div>
      )}

      {project.gallery && project.gallery.length > 0 && (
        <section className="mt-6 grid gap-6 md:grid-cols-2" aria-label="Screenshots">
          {project.gallery.map((shot) => (
            <figure key={shot.src}>
              <div className="overflow-hidden rounded-xl border border-line bg-surface">
                <Image
                  src={withBase(shot.src)}
                  alt={shot.caption}
                  width={1350}
                  height={640}
                  className="h-auto w-full"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
              <figcaption className="mt-3 text-xs leading-relaxed text-muted">
                {shot.caption}
              </figcaption>
            </figure>
          ))}
        </section>
      )}

      <section className="mt-12" aria-label="Stack">
        <CommentLabel>stack</CommentLabel>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <li key={item}>
              <TechTag>{item}</TechTag>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-12 rule" />

      <div className="mt-12 space-y-12">
        {project.caseStudy.map((section) => (
          <section key={section.label}>
            <CommentLabel as="h2">{section.label.toUpperCase()}</CommentLabel>
            <p className="mt-4 max-w-3xl font-sans text-[1.0625rem] leading-[1.75] text-body">
              {section.text}
            </p>
          </section>
        ))}
      </div>

      <nav
        className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8"
        aria-label="Other projects"
      >
        {previous ? (
          <CommandLink href={`/projects/${previous.slug}`}>&larr; {previous.name}</CommandLink>
        ) : (
          <span />
        )}
        {next ? (
          <CommandLink href={`/projects/${next.slug}`}>{next.name} &rarr;</CommandLink>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
