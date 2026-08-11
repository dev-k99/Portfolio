import { certifications, degree } from '@/content/education';
import { experience } from '@/content/experience';
import { links, profile } from '@/content/profile';
import type { Project } from '@/content/projects';
import { skills } from '@/content/skills';

/**
 * The subset of a project the shell needs. Deliberately narrow: the full Project
 * carries every case study, and importing that here would ship ~20 kB of prose to
 * the client just so `cat` can print two lines. The server passes this down instead.
 */
export type TerminalProject = Pick<
  Project,
  'slug' | 'index' | 'name' | 'tagline' | 'outcome' | 'live' | 'liveLabel' | 'github'
>;

export function toTerminalProject(project: Project): TerminalProject {
  const { slug, index, name, tagline, outcome, live, liveLabel, github } = project;
  return { slug, index, name, tagline, outcome, live, liveLabel, github };
}

/**
 * A rendered output line. `dim` is metadata, `bright` is a heading or a value
 * worth reading, `link` becomes an anchor.
 */
export type Line =
  | { kind: 'text'; text: string; tone?: 'dim' | 'bright' }
  | { kind: 'link'; text: string; href: string; external?: boolean };

export type CommandResult = {
  lines: Line[];
  /** Client-side route to push after printing. */
  navigate?: string;
  /** External URL to open in a new tab after printing. */
  openExternal?: string;
  clear?: boolean;
};

const text = (t: string, tone?: 'dim' | 'bright'): Line => ({ kind: 'text', text: t, tone });
const blank = (): Line => text('');

const COMMANDS: Record<string, string> = {
  help: 'list every command',
  ls: 'list the projects',
  cat: 'summarise a project — cat lexasa',
  open: 'go to a case study — open supportos',
  demo: 'open a live deployment — demo doclens',
  skills: 'list the stack',
  experience: 'current role',
  education: 'qualification and certifications',
  contact: 'every way to reach me',
  clear: 'clear the screen',
};

/** Everything Tab-completion should know about. */
export function completionsFor(projects: TerminalProject[]): string[] {
  return [...Object.keys(COMMANDS), ...projects.map((p) => p.slug)];
}

function describe(
  slug: string,
  verb: string,
  projects: TerminalProject[],
): CommandResult {
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      lines: [
        text(`${verb}: ${slug || '(nothing)'}: no such project`),
        text("run 'ls' to see the seven", 'dim'),
      ],
    };
  }

  return {
    lines: [
      text(project.name, 'bright'),
      text(project.tagline),
      blank(),
      text('// OUTCOME', 'dim'),
      text(project.outcome),
      blank(),
      { kind: 'link', text: 'read the case study →', href: `/projects/${project.slug}` },
      ...(project.live
        ? [
            {
              kind: 'link' as const,
              text: `${project.liveLabel} →`,
              href: project.live,
              external: true,
            },
          ]
        : []),
    ],
  };
}

export function runCommand(input: string, projects: TerminalProject[]): CommandResult {
  const trimmed = input.trim();
  if (!trimmed) return { lines: [] };

  const [name, ...args] = trimmed.split(/\s+/);
  const command = name.toLowerCase();
  const arg = (args[0] ?? '').toLowerCase();

  switch (command) {
    case 'help':
      return {
        lines: [
          text('available commands', 'dim'),
          ...Object.entries(COMMANDS).map(([key, description]) =>
            text(`  ${key.padEnd(12)} ${description}`),
          ),
          blank(),
          text('tab completes · ↑ ↓ walks history', 'dim'),
        ],
      };

    case 'ls':
      return {
        lines: projects.map((project) =>
          text(`${project.index}  ${project.slug.padEnd(16)} ${project.name}`),
        ),
      };

    case 'cat':
      return describe(arg, 'cat', projects);

    case 'open': {
      const project = projects.find((p) => p.slug === arg);
      if (!project) return describe(arg, 'open', projects);
      return {
        lines: [text(`opening ${project.name}…`, 'dim')],
        navigate: `/projects/${project.slug}`,
      };
    }

    case 'demo': {
      const project = projects.find((p) => p.slug === arg);
      if (!project) return describe(arg, 'demo', projects);
      if (!project.live) {
        return {
          lines: [
            text(`${project.name} has no running deployment right now.`),
            { kind: 'link', text: 'source on GitHub →', href: project.github, external: true },
          ],
        };
      }
      return {
        lines: [text(`opening ${project.live}`, 'dim')],
        openExternal: project.live,
      };
    }

    case 'skills':
      return { lines: [text(skills.join('  ·  '))] };

    case 'experience': {
      const role = experience[0];
      return {
        lines: [
          text(`${role.role} @ ${role.company}`, 'bright'),
          text(`${role.period}  ·  ${role.status.toLowerCase()}`, 'dim'),
          blank(),
          text(role.summary),
        ],
      };
    }

    case 'education':
      return {
        lines: [
          text(degree.title, 'bright'),
          text(`${degree.issuer}  ·  ${degree.date}`, 'dim'),
          blank(),
          text(
            `${certifications.length} certifications and awards listed further down the page`,
            'dim',
          ),
        ],
      };

    case 'contact':
      return {
        lines: [
          text(profile.contactBody),
          blank(),
          { kind: 'link', text: 'github.com/dev-k99', href: links.github, external: true },
          { kind: 'link', text: 'linkedin', href: links.linkedin, external: true },
          { kind: 'link', text: 'x.com/dev__k99', href: links.x, external: true },
          { kind: 'link', text: links.email, href: `mailto:${links.email}`, external: true },
        ],
      };

    case 'whoami':
      return { lines: [text(profile.name, 'bright'), text(profile.role, 'dim')] };

    case 'clear':
      return { lines: [], clear: true };

    // Small rewards for the people who try them.
    case 'sudo':
      return { lines: [text(`${profile.name.split(' ')[0]} is not in the sudoers file.`)] };
    case 'rm':
      return { lines: [text('not on my portfolio you don’t.')] };
    case 'exit':
      return { lines: [text('there is no exit. scroll instead.', 'dim')] };

    default:
      return {
        lines: [
          text(`command not found: ${command}`),
          text("type 'help' to see what is available", 'dim'),
        ],
      };
  }
}
