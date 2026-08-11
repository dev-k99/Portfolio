import { CommandLink } from '@/components/CommandLink';
import { CommentLabel } from '@/components/CommentLabel';
import { FeaturedProject } from '@/components/FeaturedProject';
import { JsonLd } from '@/components/JsonLd';
import { ProjectCard } from '@/components/ProjectCard';
import { ProjectIndex } from '@/components/ProjectIndex';
import { Reveal } from '@/components/Reveal';
import { StatusBadge } from '@/components/StatusBadge';
import { TechTag } from '@/components/TechTag';
import { Terminal } from '@/components/Terminal';
import { TerminalPrompt } from '@/components/TerminalPrompt';
import { TypedCommand } from '@/components/TypedCommand';
import { Window } from '@/components/Window';
import { approachIntro, principles } from '@/content/approach';
import { certifications, degree } from '@/content/education';
import { experience } from '@/content/experience';
import { contactActions, contactChannels, profile } from '@/content/profile';
import { projects } from '@/content/projects';
import { skills } from '@/content/skills';
import { toTerminalProject } from '@/lib/commands';
import { profilePageSchema } from '@/lib/schema';

const [featured, ...rest] = projects;

export default function HomePage() {
  return (
    <>
      <JsonLd data={profilePageSchema} />

      {/* ---------------------------------------------------------------- Hero */}
      <section className="shell pb-16 pt-10 md:pb-24 md:pt-16">
        <Window title={profile.shell}>
          <TypedCommand command="whoami --verbose" />

          <p className="comment mt-8"># USER</p>
          <h1 className="mt-3 text-[clamp(2.25rem,7vw,4.5rem)] tracking-[-0.03em]">
            {profile.name}
          </h1>
          <p className="mt-4 text-lg text-fg sm:text-xl">{profile.role}</p>
          <p className="mt-6 max-w-2xl text-body">{profile.intro}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            <CommandLink href="/#projects" variant="primary">
              ./view-projects
            </CommandLink>
            <CommandLink href="/#contact" variant="outline">
              ./contact --now
            </CommandLink>
          </div>

          {/* Only the fields the shell prints — keeps the case studies server-side. */}
          <Terminal projects={projects.map(toTerminalProject)} />
        </Window>
      </section>

      {/* -------------------------------------------------------------- Skills */}
      <section className="shell section" aria-labelledby="skills-heading">
        <Reveal>
          <TerminalPrompt command="which --all skills" />
          <h2 id="skills-heading" className="sr-only">
            Skills
          </h2>
          <ul className="mt-6 flex flex-wrap gap-x-7 gap-y-3 text-sm">
            {skills.map((skill) => (
              <li key={skill} className="text-fg">
                <span aria-hidden className="mr-2 text-faint">
                  &gt;
                </span>
                {skill}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <div className="shell">
        <div className="rule" />
      </div>

      {/* ---------------------------------------------------------- Experience */}
      <section id="experience" className="shell section" aria-labelledby="experience-heading">
        <Reveal>
          <TerminalPrompt command="history --work" />
          <h2 id="experience-heading" className="mt-3 text-[clamp(2rem,5vw,3rem)]">
            Experience
          </h2>
        </Reveal>

        <div className="mt-10 space-y-6">
          {experience.map((role, index) => (
            <Reveal key={role.company} delay={index * 60}>
              <article className="rounded-xl border border-line bg-surface">
                <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3 sm:px-7">
                  <p className="prompt">{role.command}</p>
                  <StatusBadge label={role.status} />
                </header>

                <div className="px-5 py-8 sm:px-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="text-xl sm:text-2xl">
                      {role.role} <span className="text-muted">@</span> {role.company}
                    </h3>
                    <p className="text-sm text-muted">{role.period}</p>
                  </div>
                  <CommentLabel className="mt-2">{role.kind}</CommentLabel>

                  <p className="mt-6 max-w-3xl text-body">{role.summary}</p>

                  <ul className="mt-6 space-y-4">
                    {role.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-body">
                        <span aria-hidden className="mt-px shrink-0 text-faint">
                          &gt;
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-8 flex flex-wrap gap-2">
                    {role.tech.map((item) => (
                      <li key={item}>
                        <TechTag>{item}</TechTag>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="shell">
        <div className="rule" />
      </div>

      {/* ------------------------------------------------------------ Projects
          Wider than the rest of the page on purpose: the change of measure is what
          breaks the one-card-after-another rhythm the other sections settle into. */}
      <section
        id="projects"
        className="section mx-auto w-full max-w-[1280px] px-5 md:px-8"
        aria-labelledby="projects-heading"
      >
        <Reveal>
          <TerminalPrompt command="ls ./featured-projects" />
          <h2 id="projects-heading" className="mt-3 text-[clamp(2rem,5vw,3rem)]">
            Featured Projects
          </h2>
          <p className="mt-4 max-w-2xl text-body">
            Seven shipped systems. Each links to its source, a write-up of the decisions
            behind it, and a running deployment where one is still up.
          </p>
        </Reveal>

        <div className="mt-10 gap-12 xl:grid xl:grid-cols-[150px_1fr]">
          <ProjectIndex projects={projects} />

          <div className="min-w-0 space-y-6">
            <Reveal>
              <FeaturedProject project={featured} />
            </Reveal>

            <div className="grid gap-6 lg:grid-cols-2">
              {rest.map((project, index) => (
                <Reveal key={project.slug} delay={index * 50} className="h-full">
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="shell">
        <div className="rule" />
      </div>

      {/* ---------------------------------------------------------- Principles */}
      <section className="shell section" aria-labelledby="principles-heading">
        <Reveal>
          <TerminalPrompt command="cat ./principles.md" />
          <h2 id="principles-heading" className="mt-3 text-[clamp(2rem,5vw,3rem)]">
            How I actually work
          </h2>
          <p className="mt-4 max-w-2xl text-body">{approachIntro}</p>
        </Reveal>

        <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
          {principles.map((principle, index) => (
            <Reveal key={principle.n} delay={index * 60} className="bg-surface">
              <div className="h-full px-5 py-7 sm:px-7">
                <p className="text-xs text-faint">{principle.n}</p>
                <h3 className="mt-3 text-lg">{principle.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-body">{principle.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="shell">
        <div className="rule" />
      </div>

      {/* ----------------------------------------------------------- Education */}
      <section className="shell section" aria-labelledby="education-heading">
        <Reveal>
          <TerminalPrompt command="ls -la ./credentials" />
          <h2 id="education-heading" className="mt-3 text-[clamp(2rem,5vw,3rem)]">
            Education
          </h2>
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-10 rounded-xl border border-line bg-surface px-5 py-7 sm:px-7">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="text-lg">{degree.title}</h3>
              <p className="text-sm text-muted">{degree.date}</p>
            </div>
            <CommentLabel className="mt-2">{degree.issuer}</CommentLabel>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <details className="disclosure mt-10">
            <summary className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-y border-line py-3.5 transition-colors hover:border-line-lit">
              <CommentLabel as="span">certifications &amp; awards</CommentLabel>
              <span className="text-xs text-muted">
                <span className="disclosure-closed">
                  show {certifications.length} &nbsp;&darr;
                </span>
                <span className="disclosure-open">hide &nbsp;&uarr;</span>
              </span>
            </summary>

            <ul className="divide-y divide-line border-b border-line">
              {certifications.map((cert) => (
                <li
                  key={`${cert.title}-${cert.date}`}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3.5"
                >
                  <span className="text-sm text-fg">
                    <span aria-hidden className="mr-3 text-faint">
                      &gt;
                    </span>
                    {cert.title}
                  </span>
                  <span className="text-xs text-muted">
                    {cert.issuer} · {cert.date}
                  </span>
                </li>
              ))}
            </ul>
          </details>
        </Reveal>
      </section>

      {/* ------------------------------------------------------------- Contact */}
      <section id="contact" className="shell section" aria-labelledby="contact-heading">
        <Reveal>
          <div className="rounded-xl border border-line bg-surface px-5 py-12 sm:px-10 sm:py-16">
            <TerminalPrompt command="ping kwanele --channel=any" />
            <h2 id="contact-heading" className="mt-5 text-[clamp(2rem,5vw,3rem)]">
              {profile.contactHeading}
            </h2>
            <p className="mt-5 max-w-xl text-body">{profile.contactBody}</p>

            <div className="mt-9 flex flex-wrap gap-3">
              {contactActions.map((action) => (
                <CommandLink
                  key={action.href}
                  href={action.href}
                  external
                  variant={action.primary ? 'primary' : 'outline'}
                >
                  {action.label}
                </CommandLink>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
              {contactChannels.map((channel) => (
                <CommandLink key={channel.href} href={channel.href} external>
                  {channel.label}
                </CommandLink>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
