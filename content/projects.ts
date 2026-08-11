export type CaseStudySection = {
  label: string;
  text: string;
};

export type Project = {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  status: string;
  /** Live-link wording changes per project: a Marketplace listing is not a running app. */
  liveLabel: string;
  live: string | null;
  github: string;
  /** Path under public/, or null where no screenshot exists yet. */
  image: string | null;
  /** Extra screenshots shown only on the case-study page. */
  gallery?: { src: string; caption: string }[];
  /** Short tech row on the card. */
  tech: string[];
  /** Full stack, shown on the case-study page. */
  stack: string[];
  problem: string;
  solution: string;
  outcome: string;
  caseStudy: CaseStudySection[];
};

export const projects: Project[] = [
  {
    slug: 'lexasa',
    index: '01',
    name: 'LexaSA',
    tagline: 'South African regulatory intelligence that cites the actual Act.',
    status: 'LIVE · VERCEL',
    liveLabel: 'open --live',
    live: 'https://lexa-sa.vercel.app',
    github: 'https://github.com/dev-k99/LexaSA',
    image: '/projects/lexasa.webp',
    gallery: [
      {
        src: '/projects/lexasa-ask.webp',
        caption: 'A grounded answer with every citation resolved to an Act, a section and a page.',
      },
      {
        src: '/projects/lexasa-assess.webp',
        caption: 'Risk assessment grading each topic independently against the evidence it retrieved.',
      },
    ],
    tech: ['FastAPI', 'LangGraph', 'React 19', 'pgvector', 'Supabase', 'Azure'],
    stack: [
      'Python',
      'FastAPI',
      'LangGraph',
      'React 19',
      'TypeScript',
      'Vite',
      'Supabase',
      'PostgreSQL/pgvector',
      'Groq',
      'GitHub Actions',
      'Vercel',
      'Azure App Service',
    ],
    problem:
      'Ask a model about POPIA, the BCEA or the Companies Act and it answers confidently without showing its working. In a regulatory context a plausible wrong answer is worse than no answer — and legislation that was current last year may not be current now.',
    solution:
      'Hybrid retrieval — vector similarity plus keyword search, combined by reciprocal rank fusion — feeding a LangGraph agent that searches iteratively before answering. Every claim traces back to a specific chunk of a specific document version, with citations carrying the Act, the section, and the snapshot date.',
    outcome:
      'A system honest about its own limits: it separates "current in this corpus" from "current in law", refuses to fabricate a citation, and returns insufficient_evidence as a real outcome instead of guessing. 432 backend tests, all offline by default.',
    caseStudy: [
      {
        label: 'The Problem',
        text: 'Most RAG demos stop at "it retrieves something and an LLM summarises it." That is fine for a product FAQ and unacceptable for legislation. A South African employer asking whether a policy complies with the BCEA needs to see the section it came from, and needs to know whether the version they are reading has since been amended. The harder question this project was built to answer is not "can a model retrieve law" but "what does it take to make that trustworthy?"',
      },
      {
        label: 'What I Built',
        text: 'A regulatory question-answering platform over POPIA, the BCEA, the LRA, the EEA and the Companies Act. Hybrid retrieval fuses dense vector search over pgvector with keyword search using reciprocal rank fusion, and the result feeds a LangGraph agent that can search iteratively rather than answering from a single pass. The corpus tracks superseded legislation alongside current versions and flags staleness explicitly. Compliance risk assessment runs two ways: a deterministic rule-based checklist with no LLM in the path, and free-text submission where an LLM extracts discrete topics, retrieves evidence for each, and grades them independently so one badly-evidenced topic cannot drag down a well-evidenced one. Supabase Auth gates exactly one endpoint — the admin audit log — because that is the only place with a genuine confidentiality requirement.',
      },
      {
        label: 'The Key Decision',
        text: 'Making insufficient_evidence a first-class outcome rather than a failure mode. The easy path is to always return something: if retrieval comes up thin, let the model fill the gap from its parametric memory and nobody notices until the answer is wrong in a way that matters. Treating "I could not find grounding for this" as a distinct, reportable result means the system can be honest at exactly the moment it would be most tempting not to be. The same instinct drove version-aware citations — a citation that does not track staleness is a citation that quietly lies as the law moves underneath it.',
      },
      {
        label: 'What It Taught Me',
        text: 'That the interesting engineering in RAG is almost entirely outside the retrieval call. Seventeen architecture documents came out of this project, one per milestone, each recording the alternatives considered and why they were rejected — why hybrid retrieval over pure vector search, why authentication is scoped to one endpoint instead of gating the whole app, why the CORS regex has to pin an account scope and not just a project name. Writing the decision down at the time it is made is what makes it reviewable later. It also taught me the value of an evaluation framework over a test suite: retrieval recall, MRR and hit@k measured against a hand-authored golden dataset run as a zero-cost regression gate in CI, with the LLM-as-judge tier gated behind a flag so it can never burn quota by accident.',
      },
      {
        label: 'Real-World Impact',
        text: 'A small South African business can ask a compliance question in plain language and get an answer pinned to a named section of a named Act, with an explicit signal when the corpus cannot support a confident answer. The deployment is deliberately split across two clouds — frontend on Vercel, backend on Azure App Service — because that is the topology where the genuinely hard problems live: CORS across providers, monorepo-aware CI, and credential-free deploys via OIDC federated credentials rather than a stored publish profile. Free tier throughout, with the costs of that constraint documented rather than hidden.',
      },
    ],
  },

  {
    slug: 'raptorreview-ai',
    index: '02',
    name: 'RaptorReview AI',
    tagline: 'AI code review, straight from the GitHub Marketplace.',
    status: 'PUBLISHED · GITHUB MARKETPLACE',
    liveLabel: 'view --marketplace',
    live: 'https://github.com/marketplace/actions/raptorreview-ai',
    github: 'https://github.com/dev-k99/raptorreview-ai',
    image: '/projects/raptorreview-ai.webp',
    tech: ['Python', 'GitHub Actions', 'Groq', 'LLM', 'tiktoken'],
    stack: ['Python', 'GitHub Actions', 'GitHub API', 'Groq', 'tiktoken', 'YAML'],
    problem:
      'PR reviews under deadline pressure get skimmed. Security issues, N+1 queries and hardcoded secrets slip through because reading a 400-line diff for subtle problems is exhausting — and every existing AI review tool wants a paid API key, a hosted service, or both.',
    solution:
      'A GitHub Action that reviews every pull request with an LLM and posts line-specific security, performance and readability comments directly into the PR diff. No hosted infrastructure, no paid API key, installable by any repository in one step.',
    outcome:
      'Published on the GitHub Marketplace and installable with a single addition to a workflow file — an automated security and quality pass on every PR, at zero cost to the team running it.',
    caseStudy: [
      {
        label: 'The Problem',
        text: 'PR reviews under deadline pressure get skimmed. Security issues, N+1 queries, and hardcoded secrets slip through not because developers are careless but because reading a 400-line diff for subtle issues is cognitively exhausting. Existing AI review tools require a paid API key, a hosted service, or both — too much friction for individual developers or small teams.',
      },
      {
        label: 'What I Built',
        text: "A GitHub Action that automatically reviews every pull request using Groq's LLM inference — posting line-specific security, performance, and readability comments directly in the PR diff interface. Built with Python and tiktoken for context window management. The action reads the PR diff via the GitHub API, segments it into reviewable hunks, and posts inline comments on specific changed lines. No hosted infrastructure. No paid API key. Installable by any GitHub repository in one step via the Marketplace listing.",
      },
      {
        label: 'The Key Decision',
        text: 'Review only the changed lines (diff hunks), not the full file context. This keeps the token count per PR proportional to the change size, not the file size — a 10-line fix in a 2,000-line file sends 10 lines to the LLM, not 2,000. tiktoken enforces the context window limit before the API call, so the action never fails due to an oversized prompt. This was the core engineering constraint that made the tool usable on real codebases.',
      },
      {
        label: 'What It Taught Me',
        text: 'Building for the GitHub Actions runtime is different from building a web app. Your code runs in a fresh container on every PR — you control nothing about the execution environment. The action.yml interface (inputs, environment variables, entrypoint) is the entire API contract between the user and the tool. Getting the Marketplace listing right required understanding GitHub’s verification process and the action metadata spec in detail.',
      },
      {
        label: 'Real-World Impact',
        text: 'Published on GitHub Marketplace — installable by any developer or team in a single workflow YAML addition. An automated security and code quality pass on every PR, at zero cost. The tool catches what tired human reviewers miss: hardcoded credentials, SQL injection patterns, missing null checks, and performance anti-patterns in the changed lines.',
      },
    ],
  },

  {
    slug: 'scrapflow-sa',
    index: '03',
    name: 'ScrapFlow SA',
    tagline: 'A SAPS/ITAC-compliant scrap yard platform, digitised end to end.',
    status: 'PRODUCTION',
    liveLabel: 'open --live',
    live: 'https://scrap-flow-xi.vercel.app/',
    github: 'https://github.com/dev-k99/ScrapFlow',
    image: '/projects/scrapflow-sa.webp',
    tech: ['React 18', 'ASP.NET Core 8', 'SignalR', 'PostgreSQL', 'PWA', 'Docker'],
    stack: [
      'React 18',
      'ASP.NET Core 8',
      'SignalR',
      'PostgreSQL',
      'PWA / IndexedDB',
      'Web Serial API',
      'Docker',
      'Zapier',
      'xUnit',
      'Vercel',
      'Render',
    ],
    problem:
      'South African scrap yards must log every transaction for SAPS/ITAC compliance, yet most still run on carbon-copy paper tickets. One lost ticket is an unprovable chain-of-custody gap, and multi-site operators had no shared view of stock.',
    solution:
      'A six-step digitised ticket workflow — arrival, weighing, grading, tare, payment, completion — with SignalR broadcasting live inventory to every connected yard, 5-role RBAC, weighbridge integration over the Web Serial API, and an HMAC-SHA256 signed webhook engine feeding Zapier and n8n.',
    outcome:
      'Every completed ticket becomes an immutable audit record, and compliance reports reach the accountant automatically. For a yard processing 50+ tickets a day, that removes an entire admin function.',
    caseStudy: [
      {
        label: 'The Problem',
        text: 'SA scrap metal yards are legally required to log every transaction for SAPS/ITAC compliance — but most still run on carbon-copy paper tickets. A single lost ticket is an unprovable chain-of-custody gap. Yards with multiple sites had no shared view of stock, meaning vehicles could be double-weighed or materials under-reported without anyone noticing until an audit.',
      },
      {
        label: 'What I Built',
        text: 'A SAPS/ITAC-compliant platform with a 6-step digitised ticket workflow: vehicle arrival → weighbridge integration (Web Serial API) → material grading → tare weight → payment → completion. SignalR broadcasts live inventory changes to all connected operators the moment a ticket closes. A webhook engine with HMAC-SHA256 signed payloads integrates with Zapier and n8n for automated notifications. 5-role RBAC (Owner, Operator, Cashier, Gate, Auditor). Offline-first PWA with IndexedDB for weighbridge environments with patchy connectivity. Validated with xUnit 2.6 + Moq 4.20.',
      },
      {
        label: 'The Key Decision',
        text: 'SignalR over polling. Polling would have introduced a 5–30 second lag in a multi-site inventory view — long enough for an operator at a second yard to start processing material that had already been sold. SignalR WebSocket groups mean every operator sees the same stock number within milliseconds of a ticket completing, making the system genuinely multi-site rather than just multi-user.',
      },
      {
        label: 'What It Taught Me',
        text: 'Hardware integration is where software meets reality. The Web Serial API for weighbridge communication required understanding baud rates, parity bits, and unstable serial reads — nothing in a web tutorial covers that. The xUnit test suite for the webhook engine taught me how to isolate infrastructure boundaries: the HMAC signing logic is tested in isolation from the HTTP layer, so I can assert the signature contract without making real outbound requests.',
      },
      {
        label: 'Real-World Impact',
        text: 'Eliminates the paper bottleneck in a compliance-heavy industry. Each completed ticket is an immutable audit record. The webhook engine means compliance reports can be automatically sent to accountants via Zapier without manual exports. For a yard processing 50+ tickets a day, this removes an entire admin function.',
      },
    ],
  },

  {
    slug: 'supportos',
    index: '04',
    name: 'SupportOS',
    tagline: 'A CQRS-driven support platform built on .NET.',
    status: 'SOURCE AVAILABLE',
    liveLabel: 'open --swagger',
    // The Azure F1 instance no longer resolves (NXDOMAIN). Restore this URL once the
    // App Service is redeployed — the card renders the live button conditionally.
    live: null,
    github: 'https://github.com/dev-k99/SupportOS',
    image: '/projects/supportos.webp',
    tech: ['ASP.NET Core 8', 'MediatR', 'CQRS', 'EF Core 8', 'Azure', 'xUnit'],
    stack: [
      'ASP.NET Core 8',
      'MediatR 12',
      'CQRS',
      'EF Core 8',
      'FluentValidation',
      'Azure App Service',
      'Azure SQL',
      'xUnit',
      'Moq',
      'GitHub Actions (OIDC)',
    ],
    problem:
      'Controller → service → repository wiring leaves nowhere to enforce cross-cutting concerns without touching every handler, and validation that throws exceptions makes every controller responsible for formatting its own errors.',
    solution:
      'A four-stage MediatR pipeline — idempotency, logging, validation, performance — applied once, in order, before any handler runs. Result<T> across all twelve commands and queries so no endpoint contains a try/catch, plus an SLA engine, a ticket state machine, and an EF Core audit interceptor.',
    outcome:
      'Deployed to Azure App Service through GitHub Actions with OIDC and zero stored credentials. Every status change, assignment and comment is an immutable record, and SLA breach rate, first response time and resolution time are exposed on one endpoint.',
    caseStudy: [
      {
        label: 'The Problem',
        text: 'Clean Architecture gets a REST API to production — but controller → service → repository wiring creates two problems at scale: there is no single place to enforce cross-cutting concerns (logging, idempotency, performance monitoring) without touching every handler individually, and validation that throws exceptions makes every controller responsible for its own error formatting. MediatR and CQRS address both directly. I wanted a project where the pipeline was the architecture — not an afterthought added to a CRUD app.',
      },
      {
        label: 'What I Built',
        text: 'An internal IT support ticket API with a 4-behavior MediatR pipeline: IdempotencyBehavior (IMemoryCache, X-Idempotency-Key, short-circuits on cache hit) → LoggingBehavior (request/response timing) → ValidationBehavior (FluentValidation returning field-keyed Result<T> failures, not exceptions) → PerformanceBehavior (warns when any handler exceeds 500ms). Result<T> pattern across all 8 commands and 4 queries — no try/catch in any endpoint. SLA tracking domain service with per-priority deadlines (Critical 2h / High 8h / Medium 24h / Low 48h). CanTransitionTo() state machine on the Ticket entity enforcing valid status transitions. EF Core SaveChangesInterceptor capturing before/after JSON audit snapshots on every write. Per-IP rate limiting. JWT 3-role auth. xUnit 2.6 + Moq 4.20 test suite covering handlers, behaviors, and SLA logic. Deployed to Azure App Service (F1) + Azure SQL Database via GitHub Actions OIDC — zero stored credentials.',
      },
      {
        label: 'The Key Decision',
        text: 'MediatR pipeline behaviors as the single, ordered enforcement point for every cross-cutting concern. Instead of duplicating validation in every controller, adding logging to every service, or writing idempotency checks on each endpoint — the pipeline applies them once, in sequence, before any handler runs. The idempotency behavior is the clearest example: on a cache hit it returns the stored result immediately and the handler never executes. No handler needs to know idempotency exists. This is the architecture that makes enterprise .NET codebases maintainable at 50 engineers — not just functional for one.',
      },
      {
        label: 'What It Taught Me',
        text: 'The Result<T> pattern changes how you think about errors at an architectural level. Once every operation returns Success or Failure instead of throwing, exception handling disappears from controllers entirely — a single ResultExtensions.ToHttpResult() maps every possible outcome to the correct HTTP status code in one place. ValidationBehavior returning a Dictionary<string, string[]> of field-keyed errors also showed me why RFC 7807 ValidationProblemDetails exists: frontend libraries like React Hook Form expect that exact shape, so getting it right in the API eliminates a whole category of client-side error parsing code.',
      },
      {
        label: 'Real-World Impact',
        text: 'Every IT support team tracks three numbers: SLA breach rate, first response time, and average resolution time. The /metrics/dashboard endpoint surfaces all three — plus ticket counts by status, priority, and category, and a per-agent resolved vs assigned comparison for workload fairness. The audit interceptor means every status change, assignment, and comment is an immutable record — a compliance requirement in any environment where accountability matters.',
      },
    ],
  },

  {
    slug: 'wardcare-plus',
    index: '05',
    name: 'WardCare+',
    tagline: 'POPIA-audited hospital ward management, deployed on Azure.',
    status: 'SOURCE AVAILABLE',
    liveLabel: 'open --live',
    // Azure App Service instance no longer resolves (NXDOMAIN). Restore on redeploy.
    live: null,
    github: 'https://github.com/dev-k99/HospitalWardManagementSystem',
    image: '/projects/wardcare-plus.webp',
    tech: ['ASP.NET Core 8', 'MVC', 'Azure', 'EF Core', 'GitHub Actions'],
    stack: [
      'ASP.NET Core 8',
      'MVC',
      'EF Core',
      'Azure App Service',
      'Azure SQL',
      'GitHub Actions (OIDC)',
      'xUnit',
      'Moq',
      'Agile/Scrum',
    ],
    problem:
      'Under POPIA, every patient record access, update or deletion is a legal event that must be traceable. A team of four needed a system where no developer could bypass auditing under time pressure — and a cloud pipeline holding no stored credentials at all.',
    solution:
      'An EF Core SaveChangesInterceptor capturing before/after JSON snapshots on every write across 25+ entities, with soft-delete on every table and 7-role policy-based authorization. The Azure pipeline authenticates via OIDC workload identity federation.',
    outcome:
      'A complete forensic trail on every patient record change, and no secrets in GitHub to rotate if the repository were ever compromised. The test suite fails in CI if a refactor removes the audit behaviour.',
    caseStudy: [
      {
        label: 'The Problem',
        text: 'Hospital ward management in SA operates under POPIA — every patient record access, update, or deletion is a legal event that must be traceable. The team of 4 needed a system where no developer could accidentally bypass auditing, even under time pressure. The cloud pipeline also needed zero stored credentials: no API keys, no connection strings kept in GitHub Secrets.',
      },
      {
        label: 'What I Built',
        text: 'An Azure-deployed MVC application with 7-role RBAC and policy-based authorization. I solely owned the cloud pipeline: Azure App Service + Azure SQL + GitHub Actions CI/CD using OIDC workload identity federation — GitHub authenticates to Azure via a federated identity token, no secrets stored anywhere. POPIA compliance via EF Core SaveChangesInterceptor: before/after JSON snapshots captured on every INSERT, UPDATE, and DELETE across 25+ entities, with soft-delete on every table. Validated with xUnit 2.6 + Moq 4.20.',
      },
      {
        label: 'The Key Decision',
        text: 'EF Core SaveChangesInterceptor over application-layer logging. If you log at the application layer, any developer who bypasses the service — calling the repository or DbContext directly — silently breaks the audit trail. An interceptor sits at the DbContext level: it cannot be bypassed without removing it from DI registration. That architectural constraint is the POPIA guarantee.',
      },
      {
        label: 'What It Taught Me',
        text: 'Compliance is an architectural decision, not a feature. It needs to be impossible to break, not just easy to follow. OIDC workload identity was unfamiliar territory — the mental model of "GitHub proves it is GitHub by presenting a JWT signed by GitHub’s OIDC provider" took time to properly internalise. Understanding it properly means I can apply it to any Azure-integrated CI/CD pipeline.',
      },
      {
        label: 'Real-World Impact',
        text: 'Every patient record change has a before/after JSON snapshot in the audit table — a complete forensic trail. Zero credentials are stored in GitHub: if the repository were ever compromised, there are no secrets to rotate. The xUnit test suite validates the interceptor contract, so a refactor that accidentally removed the audit behaviour would surface immediately in CI.',
      },
    ],
  },

  {
    slug: 'libraryos',
    index: '06',
    name: 'LibraryOS',
    tagline: 'Clean Architecture and live availability for a community library.',
    status: 'PRODUCTION · AZURE',
    liveLabel: 'open --live',
    live: 'https://eskhawini-library-system.vercel.app/',
    github: 'https://github.com/dev-k99/Eskhawini-Library-System',
    image: '/projects/libraryos.webp',
    tech: ['ASP.NET Core 8', 'React 19', 'SignalR', 'Clean Architecture', 'Azure'],
    stack: [
      'ASP.NET Core 8',
      'React 19',
      'SignalR',
      'Clean Architecture',
      'PostgreSQL',
      'JWT refresh rotation',
      'Azure App Service',
      'Vercel',
    ],
    problem:
      'A community library replacing manual card cataloguing needed patrons and librarians to see real-time availability without refreshing, and an auth layer that would not fail silently under concurrent use.',
    solution:
      '35+ endpoints across 7 controllers in Clean Architecture, with JWT access and refresh rotation, fixed-window rate limiting, and SignalR group notifications driven by a background service that probes active loans daily.',
    outcome:
      'A JWT refresh race condition fixed with a subscriber queue, N+1 queries eliminated with eager loading, and PostgreSQL health probes wired as Azure liveness and readiness checks so traffic never reaches an instance with a dead database.',
    caseStudy: [
      {
        label: 'The Problem',
        text: 'A community library needed to replace manual card-based cataloguing. Patrons and librarians needed real-time book availability — "is this book on the shelf right now?" — without refreshing a page. The auth layer also needed to be production-grade: refresh token rotation, rate limiting, and no silent auth failures under concurrent usage.',
      },
      {
        label: 'What I Built',
        text: 'A Clean Architecture REST API with 35+ endpoints across 7 controllers. JWT access + refresh token rotation with fixed-window rate limiting. SignalR group-based notifications: a background service probes active loans daily and pushes due-date alerts via WebSocket groups. Eliminated N+1 queries with eager-loaded GetAllAsync() + .Include(). PostgreSQL health check probes (/health/ready, /health/live) wired as Azure liveness and readiness probes — the deployment only promotes when the database connection is confirmed healthy.',
      },
      {
        label: 'The Key Decision',
        text: 'Fixing the JWT refresh race condition. When multiple Axios requests fired simultaneously and the access token expired mid-flight, each independently triggered a refresh — each one invalidating the previous token and sending the user into an infinite auth loop. The fix: a subscriber queue. The first request owns the refresh and sets a promise. All subsequent concurrent requests subscribe to that promise. When it resolves, every queued request resumes with the same new token.',
      },
      {
        label: 'What It Taught Me',
        text: 'Race conditions in auth flows are invisible in development (one user, one tab) and catastrophic in production (multiple tabs, slow mobile connections). The subscriber queue pattern is now my default approach for token refresh in any SPA. The N+1 audit also highlighted that ORM lazy loading is a performance trap at scale — every GetAll endpoint needs explicit Include chains.',
      },
      {
        label: 'Real-World Impact',
        text: 'A real community library gains a cataloguing system that previously would have required purchasing commercial software. The health check probes mean a failed database connection is caught before Azure routes traffic to the instance, preventing silent 500 errors. The rate limiter prevents credential-stuffing attacks on the auth endpoints.',
      },
    ],
  },

  {
    slug: 'doclens',
    index: '07',
    name: 'DocLens',
    tagline: 'RAG document intelligence that actually cites its sources.',
    status: 'LIVE',
    liveLabel: 'open --live',
    live: 'https://dev-k99.github.io/RAG-Assistant/',
    github: 'https://github.com/dev-k99/RAG-Assistant',
    image: '/projects/doclens.webp',
    tech: ['Python', 'FastAPI', 'ChromaDB', 'BM25', 'RAG', 'RAGAS'],
    stack: [
      'Python',
      'FastAPI',
      'Streamlit',
      'ChromaDB',
      'BM25',
      'BAAI/bge-large-en-v1.5',
      'Reciprocal Rank Fusion',
      'Cross-encoder reranking',
      'Groq',
      'RAGAS',
    ],
    problem:
      'Cosine similarity on dense embeddings is where most RAG tutorials stop, and it consistently misses passages that use different terminology from the query — exactly the failure mode that matters in keyword-heavy legal and technical text.',
    solution:
      'Hybrid retrieval combining BM25 keyword matching with dense vectors from BAAI/bge-large-en-v1.5, fused by reciprocal rank fusion, then filtered by a cross-encoder reranking pass before the LLM sees any context.',
    outcome:
      'Measured against a 20-question RAGAS evaluation set: Faithfulness +25%, Answer Relevancy +24%, Context Recall +29%, Context Precision +31% over the cosine-similarity baseline.',
    caseStudy: [
      {
        label: 'The Problem',
        text: 'Most RAG tutorial implementations use cosine similarity on dense embeddings and call it done. In testing on a 20-question evaluation set, this baseline consistently missed relevant passages that used different terminology from the query — keyword-heavy legal text being a prime example. The system needed to answer "did this exact clause appear?" as reliably as "explain this section to me."',
      },
      {
        label: 'What I Built',
        text: 'A hybrid retrieval pipeline: BM25 (keyword matching) + dense vector retrieval using BAAI/bge-large-en-v1.5 (top-5 MTEB benchmark) fused via Reciprocal Rank Fusion. A cross-encoder reranking pass as the final relevance filter before the LLM sees the context. FastAPI REST backend with a hallucination self-check. Evaluated on a 20-question RAGAS test set: Faithfulness +25%, Answer Relevancy +24%, Context Recall +29%, Context Precision +31% over the cosine-similarity baseline.',
      },
      {
        label: 'The Key Decision',
        text: 'BAAI/bge-large-en-v1.5 over OpenAI embeddings. The MTEB leaderboard showed comparable retrieval quality at zero API cost — and once the model is cached locally, retrieval latency is lower than a network round-trip to the Embeddings API. For a document-heavy workload, that cost and latency difference compounds with every query.',
      },
      {
        label: 'What It Taught Me',
        text: 'RAG quality is measurable. RAGAS gave me four concrete metrics with ground-truth question/answer pairs. Without that framework, I would have been subjectively judging whether answers "seemed better" — not a reproducible test. The 20-question evaluation set forced me to write expected answers explicitly, which surfaced several retrieval failures I would not have caught manually.',
      },
      {
        label: 'Real-World Impact',
        text: 'A document-heavy professional (lawyer, accountant, researcher) can upload a PDF and ask precise factual questions with measurably higher accuracy than a standard RAG implementation. The +31% Context Precision improvement means fewer hallucinations caused by irrelevant context — a meaningful reliability difference in any professional context where wrong answers have consequences.',
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
