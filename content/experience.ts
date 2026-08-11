export type Experience = {
  command: string;
  status: string;
  role: string;
  company: string;
  kind: string;
  period: string;
  summary: string;
  bullets: string[];
  tech: string[];
};

export const experience: Experience[] = [
  {
    command: 'ps aux | grep nhusta',
    status: 'VOLUNTEER · ACTIVE',
    role: 'AI Engineer',
    company: 'Nhusta EduTech',
    kind: 'gamified mathematics learning, grades 1–12',
    period: 'Jun 2026 — present',
    summary:
      'Contributing to an early-stage South African EdTech building a gamified Mathematics learning ecosystem for Grades 1–12, reporting directly to the CTO.',
    bullets: [
      'Benchmarked MzansiLM, a 125M-parameter South African language foundation model, across zero-shot and few-shot generation in English, isiZulu, isiXhosa and Sesotho, then wrapped it in an internal-only FastAPI explanation service with a strict caller-supplied correct-answer boundary — correctness is never inferred by the model. The written assessment drove the go/no-go decision for the Nono AI tutor, and a 20-prompt × 3-language content-safety evaluation became the Sprint 5 model-swap recommendation.',
      'Built a production-grade C# PDF text-extraction prototype on iText7 with latency, CPU and RAM profiling plus scanned-PDF detection, designed behind an IDocumentExtractor interface for clean lift-and-shift into the team’s Clean Architecture solution.',
      'Shipped a full-stack Admin User Management UI in Next.js 14 — App Router, TypeScript, Tailwind, shadcn/ui — with URL-persisted filter, pagination and sort state, dark mode, own-row self-protection, and Playwright smoke tests, delivered through GitHub PRs and handoff docs written for reviewers and non-engineering stakeholders alike.',
    ],
    tech: [
      'Python',
      'C#',
      'TypeScript',
      'FastAPI',
      'Next.js 14',
      'React',
      'Tailwind',
      'shadcn/ui',
      'LangGraph',
      'Hugging Face Transformers',
      'iText7',
      'Playwright',
      'Git',
    ],
  },
];
