# Portfolio — Kwanele Ntshangase

A monochrome, terminal-styled portfolio and digital CV. Next.js 15 App Router, exported as
a fully static site and served from GitHub Pages at
**https://dev-k99.github.io/Portfolio/**.

The hero is not a picture of a terminal — it is one. Type `help` and it answers.

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · static export (`output: 'export'`) ·
JetBrains Mono + Inter via `next/font` · deployed by GitHub Actions.

No runtime, no database, no API routes. Everything is rendered at build time into `out/`.

## Running locally

```bash
npm install
npm run dev     # http://localhost:3000/Portfolio
```

Note the `/Portfolio` path: `basePath` is set because the site is served from a repository
subpath rather than a domain root. It applies in development too.

| Script | Does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Static export into `out/` |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run images` | Regenerate `public/apple-icon.png` and `public/opengraph-image.png` |

## Editing the content

All copy lives in typed modules under [`content/`](content/) — no text is hardcoded in
components, so the homepage and the case-study pages can never drift apart.

| File | Holds |
|---|---|
| `content/profile.ts` | Name, role, hero intro, contact copy, every contact link |
| `content/projects.ts` | All seven projects: card copy, links, screenshots, full case studies |
| `content/experience.ts` | Current role, bullets, tech tags |
| `content/education.ts` | Diploma and the certification list |
| `content/approach.ts` | The four "how I actually work" principles |
| `content/skills.ts` | The skills strip |

Adding a project means adding one entry to `content/projects.ts`. Its card, its
`/projects/<slug>/` page, its sitemap entry and its terminal `cat`/`open`/`demo` commands
all follow automatically. The first entry in the array is rendered as the featured project.

A project with `live: null` renders without a live-demo button rather than shipping a dead
link — that is how SupportOS and WardCare+ are currently handled, since their Azure free-tier
instances no longer resolve.

## The terminal

`components/Terminal.tsx` with the command logic in [`lib/commands.ts`](lib/commands.ts).

```
help        list every command       skills       list the stack
ls          list the projects        experience   current role
cat <slug>  summarise a project      education    qualifications
open <slug> go to a case study       contact      every way to reach me
demo <slug> open a live deployment   clear        clear the screen
```

Tab completes, `↑`/`↓` walk history, and `/` focuses the prompt from anywhere on the page.

Two deliberate constraints. It renders only after mount, so a visitor without JavaScript
keeps the static hero and never meets a dead input — and navigation never depends on it.
And `runCommand` takes a narrow projection of each project rather than importing
`content/projects.ts` directly, which keeps ~20 kB of case-study prose out of the client
bundle.

## Deployment

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):
typecheck → build → upload `out/` → deploy to Pages. Authentication uses OIDC, so there are
no stored deployment secrets.

> **One-time setup:** repo Settings → Pages → Source must be set to **GitHub Actions**.
> Until it is, the workflow runs green but Pages keeps serving whatever the old branch
> source pointed at.

### The basePath trap

`next/link` and `next/image` apply `basePath` automatically. **Raw `public/` URLs do not** —
and neither does `next/image` when `images.unoptimized` is set, which is required for a
static export. Every such URL goes through `withBase()` in [`lib/paths.ts`](lib/paths.ts).

Getting this wrong fails only in production, never locally. Before deploying, check that
nothing is rooted at `/` without the prefix:

```bash
npm run build
grep -rhoE '(src|href)="/[^"]*"' out/*.html out/projects/*/index.html | grep -v '"/Portfolio'
# any output here is a URL that will 404 on Pages
```

`public/.nojekyll` is required too, or Pages strips the `_next/` directory.

## Accessibility and motion

Content is never hidden behind JavaScript: scroll reveals render visible by default and are
only hidden once the client has confirmed an element is off screen, so a hydration failure
leaves the page readable. Everything animated — reveals, the typing prompts, the cursor —
stops under `prefers-reduced-motion: reduce`. Colour is monochrome by design; hierarchy
comes from weight, size and spacing, and body text meets WCAG AA against the background.

## Licence

Personal portfolio. Not licensed for reuse. JetBrains Mono in `assets/fonts/` is licensed
under the SIL Open Font License 1.1.
