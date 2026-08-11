export const profile = {
  name: 'Kwanele Ntshangase',
  role: 'AI Engineer & .NET Fullstack Developer',
  shell: 'kwanele@dev:~',
  handle: '~/kwanele',

  intro:
    'Two things, and they keep meeting. Software engineering in C# and .NET: APIs, auth, real-time, and the pipelines that deploy them. AI engineering in Python: RAG, retrieval, and LLM tooling that has to show where its answer came from.',

  contactHeading: "Let's build something.",
  contactBody:
    'Open to AI engineering and fullstack .NET opportunities, collaborations, and genuinely interesting problems. Fastest response over GitHub, LinkedIn or X.',

  metaDescription:
    'Kwanele Ntshangase — AI Engineer and .NET Fullstack Developer. RAG and LLM tooling in Python, production APIs in C# and .NET, and a code-review tool published on the GitHub Marketplace. Seven shipped systems with a case study for each.',
} as const;

export const links = {
  github: 'https://github.com/dev-k99',
  linkedin: 'https://www.linkedin.com/in/kwanele-ntshangase-abab7037b/',
  email: 'kwanelerh069@gmail.com',
  whatsapp: 'https://wa.me/27789325315',
  x: 'https://x.com/dev__k99',
} as const;

/**
 * Primary calls to action in the contact block, in render order — these are the
 * three channels named in contactBody as the fastest way to reach him.
 */
export const contactActions = [
  { label: 'git remote add github', href: links.github, primary: true },
  { label: 'connect --linkedin', href: links.linkedin, primary: false },
  { label: 'follow --x @dev__k99', href: links.x, primary: false },
] as const;

/** Secondary channels, rendered as a muted inline row beneath the buttons. */
export const contactChannels = [
  { label: 'mail --to kwanele', href: `mailto:${links.email}` },
  { label: 'wa --chat', href: links.whatsapp },
] as const;
