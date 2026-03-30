// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = mobileMenuBtn.querySelectorAll('span');
    if (mobileMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Height of fixed navbar
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    } else {
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
    }
    
    // Hide navbar on scroll down, show on scroll up
    if (currentScroll > lastScroll && currentScroll > 500) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections and cards
const elementsToAnimate = document.querySelectorAll('.pcard, .project-featured, .feature-card, .contact-card, .step, .skill-card, .skills-category');
elementsToAnimate.forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
});

// Add staggered animation delay to cards
document.querySelectorAll('.projects-grid-new .pcard').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.features-grid .feature-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.contact-grid .contact-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.skills-grid .skill-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.05}s`;
});

// Parallax effect for decorative elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-decoration');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Loading animation for images
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    // If image is already cached
    if (img.complete) {
        img.style.opacity = '1';
    } else {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
    }
});

// Dynamic year in footer
const yearElement = document.querySelector('.footer p');
if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = yearElement.innerHTML.replace('2026', currentYear);
}

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handlers
const debouncedScrollHandler = debounce(() => {
    // Your scroll handling code here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Preload critical images
const criticalImages = [
    'images/portfolio/Head.jpg',
    'images/portfolio/profilePic.jpeg'
];

criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
});

// Add entrance animations
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Skills Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
  });
});

// Project Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.projects-grid-new .pcard');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        projectCards.forEach(card => {
            const match = filter === 'all' || card.dataset.category === filter;
            card.classList.remove('is-hidden', 'is-visible');
            card.classList.add(match ? 'is-visible' : 'is-hidden');
        });
    });
});

// Console message for developers
console.log('%c👋 Hi there!', 'font-size: 20px; font-weight: bold; color: #0066ff;');
console.log('%cInterested in the code? Check out the repository!', 'font-size: 14px; color: #4a4a4a;');
console.log('%chttps://github.com/dev-k99', 'font-size: 14px; color: #0066ff;');

// ============================================================
// Case Study Modal
// ============================================================
const projectData = {
  scrapflow: {
    title: 'ScrapFlow SA',
    image: './images/portfolio/ScrapFlow.png',
    live: 'https://scrap-flow-xi.vercel.app/',
    github: 'https://github.com/dev-k99/ScrapFlow',
    tags: ['React 18', 'ASP.NET Core 8', 'SignalR', 'PostgreSQL', 'PWA', 'Docker', 'Zapier'],
    sections: [
      { label: 'The Problem', text: 'SA scrap metal yards are legally required to log every transaction for SAPS/ITAC compliance — but most still run on carbon-copy paper tickets. A single lost ticket is an unprovable chain-of-custody gap. Yards with multiple sites had no shared view of stock, meaning vehicles could be double-weighed or materials under-reported without anyone noticing until an audit.' },
      { label: 'What I Built', text: 'A SAPS/ITAC-compliant platform with a 6-step digitised ticket workflow: vehicle arrival → weighbridge integration (Web Serial API) → material grading → tare weight → payment → completion. SignalR broadcasts live inventory changes to all connected operators the moment a ticket closes. A webhook engine with HMAC-SHA256 signed payloads integrates with Zapier and n8n for automated notifications. 5-role RBAC (Owner, Operator, Cashier, Gate, Auditor). Offline-first PWA with IndexedDB for weighbridge environments with patchy connectivity. Validated with xUnit 2.6 + Moq 4.20.' },
      { label: 'The Key Decision', text: 'SignalR over polling. Polling would have introduced a 5–30 second lag in a multi-site inventory view — long enough for an operator at a second yard to start processing material that had already been sold. SignalR WebSocket groups mean every operator sees the same stock number within milliseconds of a ticket completing, making the system genuinely multi-site rather than just multi-user.' },
      { label: 'What It Taught Me', text: 'Hardware integration is where software meets reality. The Web Serial API for weighbridge communication required understanding baud rates, parity bits, and unstable serial reads — nothing in a web tutorial covers that. The xUnit test suite for the webhook engine taught me how to isolate infrastructure boundaries: the HMAC signing logic is tested in isolation from the HTTP layer, so I can assert the signature contract without making real outbound requests.' },
      { label: 'Real-World Impact', text: 'Eliminates the paper bottleneck in a compliance-heavy industry. Each completed ticket is an immutable audit record. The webhook engine means compliance reports can be automatically sent to accountants via Zapier without manual exports. For a yard processing 50+ tickets a day, this removes an entire admin function.' }
    ]
  },

  wardcare: {
    title: 'WardCare+',
    image: './images/portfolio/hospital.png',
    live: 'https://wardcareplus.azurewebsites.net/',
    github: 'https://github.com/dev-k99/HospitalWardManagementSystem',
    tags: ['ASP.NET Core 8', 'MVC', 'Azure', 'GitHub Actions', 'xUnit', 'EF Core'],
    sections: [
      { label: 'The Problem', text: 'Hospital ward management in SA operates under POPIA — every patient record access, update, or deletion is a legal event that must be traceable. The team of 4 needed a system where no developer could accidentally bypass auditing, even under time pressure. The cloud pipeline also needed zero stored credentials: no API keys, no connection strings kept in GitHub Secrets.' },
      { label: 'What I Built', text: 'An Azure-deployed MVC application with 7-role RBAC and policy-based authorization. I solely owned the cloud pipeline: Azure App Service + Azure SQL + GitHub Actions CI/CD using OIDC workload identity federation — GitHub authenticates to Azure via a federated identity token, no secrets stored anywhere. POPIA compliance via EF Core SaveChangesInterceptor: before/after JSON snapshots captured on every INSERT, UPDATE, and DELETE across 25+ entities, with soft-delete on every table. Validated with xUnit 2.6 + Moq 4.20.' },
      { label: 'The Key Decision', text: 'EF Core SaveChangesInterceptor over application-layer logging. If you log at the application layer, any developer who bypasses the service — calling the repository or DbContext directly — silently breaks the audit trail. An interceptor sits at the DbContext level: it cannot be bypassed without removing it from DI registration. That architectural constraint is the POPIA guarantee.' },
      { label: 'What It Taught Me', text: 'Compliance is an architectural decision, not a feature. It needs to be impossible to break, not just easy to follow. OIDC workload identity was unfamiliar territory — the mental model of "GitHub proves it is GitHub by presenting a JWT signed by GitHub\'s OIDC provider" took time to properly internalise. Understanding it properly means I can apply it to any Azure-integrated CI/CD pipeline.' },
      { label: 'Real-World Impact', text: 'Every patient record change has a before/after JSON snapshot in the audit table — a complete forensic trail. Zero credentials are stored in GitHub: if the repository were ever compromised, there are no secrets to rotate. The xUnit test suite validates the interceptor contract, so a refactor that accidentally removed the audit behaviour would surface immediately in CI.' }
    ]
  },

  libraryos: {
    title: 'Eskhawini LibraryOS',
    image: './images/portfolio/LibraryOS.png',
    live: 'https://eskhawini-library-system.vercel.app/',
    github: 'https://github.com/dev-k99/Eskhawini-Library-System',
    tags: ['ASP.NET Core 8', 'React 19', 'SignalR', 'Clean Architecture', 'Azure App Service'],
    sections: [
      { label: 'The Problem', text: 'A community library serving Eskhawini needed to replace manual card-based cataloguing. Patrons and librarians needed real-time book availability — "is this book on the shelf right now?" — without refreshing a page. The auth layer also needed to be production-grade: refresh token rotation, rate limiting, and no silent auth failures under concurrent usage.' },
      { label: 'What I Built', text: 'A Clean Architecture REST API with 35+ endpoints across 7 controllers. JWT access + refresh token rotation with fixed-window rate limiting. SignalR group-based notifications: a background service probes active loans daily and pushes due-date alerts via WebSocket groups. Eliminated N+1 queries with eager-loaded GetAllAsync() + .Include(). PostgreSQL health check probes (/health/ready, /health/live) wired as Azure liveness and readiness probes — the deployment only promotes when the database connection is confirmed healthy.' },
      { label: 'The Key Decision', text: 'Fixing the JWT refresh race condition. When multiple Axios requests fired simultaneously and the access token expired mid-flight, each independently triggered a refresh — each one invalidating the previous token and sending the user into an infinite auth loop. The fix: a subscriber queue. The first request owns the refresh and sets a promise. All subsequent concurrent requests subscribe to that promise. When it resolves, every queued request resumes with the same new token.' },
      { label: 'What It Taught Me', text: 'Race conditions in auth flows are invisible in development (one user, one tab) and catastrophic in production (multiple tabs, slow mobile connections). The subscriber queue pattern is now my default approach for token refresh in any SPA. The N+1 audit also highlighted that ORM lazy loading is a performance trap at scale — every GetAll endpoint needs explicit Include chains.' },
      { label: 'Real-World Impact', text: 'A real community library gains a cataloguing system that previously would have required purchasing commercial software. The health check probes mean a failed database connection is caught before Azure routes traffic to the instance, preventing silent 500 errors. The rate limiter prevents credential-stuffing attacks on the auth endpoints.' }
    ]
  },

  fitness: {
    title: 'Fitness Tracker',
    image: './images/portfolio/Fitness.png',
    live: null,
    github: 'https://github.com/dev-k99/Fitness-Tracker',
    tags: ['C#', 'ASP.NET Core 8', 'React', 'TypeScript', 'Docker', 'Clean Architecture'],
    sections: [
      { label: 'The Problem', text: 'Before building production systems like LibraryOS and ScrapFlow, I needed to prove the Clean Architecture pattern worked for a REST API + SPA combination at a smaller scale — without multi-tenant auth or real-time requirements clouding the architecture decisions.' },
      { label: 'What I Built', text: 'A full-stack fitness logging app: ASP.NET Core 8 REST API following Clean Architecture (Controllers → Services → Repositories), BCrypt password hashing (12 rounds), JWT auth, EF Core Code-First migrations, and Docker + Docker Compose for local development parity. React TypeScript frontend for logging workouts and tracking goals against personal targets.' },
      { label: 'The Key Decision', text: 'Service-Repository separation as a non-negotiable even for a personal project. Keeping business logic in the service layer and data access in the repository layer meant that when I later built LibraryOS with the same pattern, the mental model was already well-formed. The architecture is identical — just scaled up with more controllers, more relationships, and a more complex auth layer.' },
      { label: 'What It Taught Me', text: 'Docker Compose for development parity is worth the setup cost. Running the API and database in containers locally, then deploying the same image to production, eliminates the "works on my machine" class of bugs. EF Core Code-First migrations also taught me that schema evolution is a first-class concern — every migration is a permanent record of how the data model changed.' },
      { label: 'Real-World Impact', text: 'GitHub-only — the live URL became stale after a host migration. But the architectural patterns here (Clean Architecture, BCrypt, JWT, Docker) are the foundation that ScrapFlow and LibraryOS are built on. This is where the pattern was proven before being scaled to production systems with real users.' }
    ]
  },

  doclens: {
    title: 'DocLens',
    image: './images/portfolio/pdf-rag.png',
    live: 'https://dev-k99.github.io/RAG-Assistant/',
    github: 'https://github.com/dev-k99/RAG-Assistant',
    tags: ['Python', 'FastAPI', 'Streamlit', 'ChromaDB', 'BM25', 'RAG', 'Groq', 'RAGAS'],
    sections: [
      { label: 'The Problem', text: 'Most RAG tutorial implementations use cosine similarity on dense embeddings and call it done. In testing on a 20-question evaluation set, this baseline consistently missed relevant passages that used different terminology from the query — keyword-heavy legal text being a prime example. The system needed to answer "did this exact clause appear?" as reliably as "explain this section to me."' },
      { label: 'What I Built', text: 'A hybrid retrieval pipeline: BM25 (keyword matching) + dense vector retrieval using BAAI/bge-large-en-v1.5 (top-5 MTEB benchmark) fused via Reciprocal Rank Fusion. A cross-encoder reranking pass as the final relevance filter before the LLM sees the context. FastAPI REST backend with a hallucination self-check. Evaluated on a 20-question RAGAS test set: Faithfulness +25%, Answer Relevancy +24%, Context Recall +29%, Context Precision +31% over the cosine-similarity baseline.' },
      { label: 'The Key Decision', text: 'BAAI/bge-large-en-v1.5 over OpenAI embeddings. The MTEB leaderboard showed comparable retrieval quality at zero API cost — and once the model is cached locally, retrieval latency is lower than a network round-trip to the Embeddings API. For a document-heavy workload, that cost and latency difference compounds with every query.' },
      { label: 'What It Taught Me', text: 'RAG quality is measurable. RAGAS gave me four concrete metrics with ground-truth question/answer pairs. Without that framework, I would have been subjectively judging whether answers "seemed better" — not a reproducible test. The 20-question evaluation set forced me to write expected answers explicitly, which surfaced several retrieval failures I would not have caught manually.' },
      { label: 'Real-World Impact', text: 'A document-heavy professional (lawyer, accountant, researcher) can upload a PDF and ask precise factual questions with measurably higher accuracy than a standard RAG implementation. The +31% Context Precision improvement means fewer hallucinations caused by irrelevant context — a meaningful reliability difference in any professional context where wrong answers have consequences.' }
    ]
  },

  memos: {
    title: 'MemOS',
    image: './images/portfolio/AIMemo.png',
    live: 'https://memos-v2-1.streamlit.app',
    github: 'https://github.com/dev-k99/MemOS',
    tags: ['Python', 'LangGraph', 'ChromaDB', 'PostgreSQL', 'Groq', 'Streamlit', 'LangSmith'],
    sections: [
      { label: 'The Problem', text: 'Every mainstream AI chat tool forgets everything when you close the tab. For an assistant that knows your ongoing projects, preferences, and past decisions, memory needs to persist across sessions in a structured way — not just shoved into a system prompt until it overflows the context window.' },
      { label: 'What I Built', text: 'An agentic AI assistant with a custom LangGraph StateGraph — not create_react_agent — for direct control over tool binding. Persistent PostgreSQL memory stores facts across sessions. ChromaDB RAG over uploaded documents for document-aware Q&A. Tavily live web search for current information. Full LangSmith observability: every agent step, tool call, and LLM invocation is traced. Deployed on Streamlit Cloud at $0/month.' },
      { label: 'The Key Decision', text: 'bind_tools(parallel_tool_calls=False). When using Groq\'s Llama inference with parallel tool calls enabled, the model intermittently returns a failed_generation error — a known Groq/Llama compatibility issue that surfaces under load. Disabling parallel tool calls eliminates the error entirely. Finding this required reading Groq\'s changelog and LangGraph GitHub issues — the fix is not in any tutorial.' },
      { label: 'What It Taught Me', text: 'Production AI engineering is debugging invisible failures at the intersection of three moving parts: the LLM provider, the orchestration framework, and your own tool logic. LangSmith\'s traces were what made the failed_generation error reproducible — without observability, it looked like random API failures. RAG injected as system message context (not a tool) proved more reliable for document Q&A, because the LLM could not choose to skip it.' },
      { label: 'Real-World Impact', text: 'A truly persistent AI assistant that remembers context across sessions, queries uploaded documents, and searches the web for current information — all at zero infrastructure cost. The LangSmith observability layer means any production issue is diagnosable from the trace, not from user-reported symptoms.' }
    ]
  },

  pulsetrace: {
    title: 'PulseTrace',
    image: './images/portfolio/pulsetrace.png',
    live: 'https://kwanele99-pulsetrace.hf.space',
    github: 'https://github.com/dev-k99/pulsetrace',
    tags: ['Python', 'Streamlit', 'OpenTelemetry', 'Plotly', 'SQLite', 'Docker'],
    sections: [
      { label: 'The Problem', text: 'AI agent monitoring tools (Langfuse, LangSmith paid tier) require API keys, account setup, and often a credit card. SA developers are also building in ZAR — cost tracking in USD is meaningless when your infrastructure budget is in rands. There was no free, self-contained monitoring dashboard that worked out of the box with zero configuration.' },
      { label: 'What I Built', text: 'A free AI agent monitoring dashboard: OpenTelemetry-style waterfall traces showing each agent step, real-time latency/cost/pass-rate metrics, an agent health grid, and structured CSV/JSON log export. ZAR-denominated cost tracking. SQLite database that auto-seeds with demo data on first load. Zero API keys required. Containerised with Docker and deployed on HuggingFace Spaces free tier.' },
      { label: 'The Key Decision', text: 'SQLite with auto-seeding over a persistent external database. HuggingFace Spaces has ephemeral storage — the filesystem resets on every restart. Rather than requiring users to connect an external DB, the app seeds a fresh SQLite database with realistic demo data on each cold start. Immediately useful without any setup, at the cost of not persisting user data across restarts — an acceptable trade-off for an evaluation tool.' },
      { label: 'What It Taught Me', text: 'Constraints breed design clarity. The ephemeral storage constraint forced a deliberate decision about the data model upfront. OpenTelemetry\'s span/trace model — parent spans with child spans representing individual tool calls — is an elegant way to represent agent execution trees, and understanding it properly means I can instrument any Python agent with standard OTel libraries.' },
      { label: 'Real-World Impact', text: 'The first free, ZAR-denominated AI agent monitoring tool available to SA developers. No account, no API key, no credit card. Fork the repo or use the live HuggingFace Space and you have agent observability in minutes. The waterfall trace view makes it immediately obvious which tool call in an agent pipeline is the latency bottleneck.' }
    ]
  },

  raptorreview: {
    title: 'RaptorReview AI',
    image: './images/portfolio/raptorai.png',
    live: 'https://github.com/marketplace/actions/raptorreview-ai',
    github: 'https://github.com/dev-k99/raptorreview-ai',
    tags: ['Python', 'GitHub Actions', 'Groq', 'LLM', 'tiktoken'],
    sections: [
      { label: 'The Problem', text: 'PR reviews under deadline pressure get skimmed. Security issues, N+1 queries, and hardcoded secrets slip through not because developers are careless but because reading a 400-line diff for subtle issues is cognitively exhausting. Existing AI review tools require a paid API key, a hosted service, or both — too much friction for individual developers or small teams.' },
      { label: 'What I Built', text: 'A GitHub Action that automatically reviews every pull request using Groq\'s LLM inference — posting line-specific security, performance, and readability comments directly in the PR diff interface. Built with Python and tiktoken for context window management. The action reads the PR diff via the GitHub API, segments it into reviewable hunks, and posts inline comments on specific changed lines. No hosted infrastructure. No paid API key. Installable by any GitHub repository in one step via the Marketplace listing.' },
      { label: 'The Key Decision', text: 'Review only the changed lines (diff hunks), not the full file context. This keeps the token count per PR proportional to the change size, not the file size — a 10-line fix in a 2,000-line file sends 10 lines to the LLM, not 2,000. tiktoken enforces the context window limit before the API call, so the action never fails due to an oversized prompt. This was the core engineering constraint that made the tool usable on real codebases.' },
      { label: 'What It Taught Me', text: 'Building for the GitHub Actions runtime is different from building a web app. Your code runs in a fresh container on every PR — you control nothing about the execution environment. The action.yml interface (inputs, environment variables, entrypoint) is the entire API contract between the user and the tool. Getting the Marketplace listing right required understanding GitHub\'s verification process and the action metadata spec in detail.' },
      { label: 'Real-World Impact', text: 'Published on GitHub Marketplace — installable by any developer or team in a single workflow YAML addition. An automated security and code quality pass on every PR, at zero cost. The tool catches what tired human reviewers miss: hardcoded credentials, SQL injection patterns, missing null checks, and performance anti-patterns in the changed lines.' }
    ]
  },

  phakathwayo: {
    title: 'Phakathwayo JMS',
    image: './images/portfolio/phakathwayo-jms.png',
    live: 'https://phakathwayo-jms.netlify.app/',
    github: 'https://github.com/dev-k99/Phakathwayo-Website-Design',
    tags: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Netlify'],
    sections: [
      { label: 'The Problem', text: 'Phakathwayo JMS is a real Richards Bay construction company with 17 verified 5-star Google Reviews — a strong local reputation with no web presence to match it. New clients finding them through word-of-mouth had no way to verify the business, see past work, or make contact outside of a phone call. The client\'s primary communication channel is WhatsApp, not email.' },
      { label: 'What I Built', text: 'A responsive, SEO-optimised React/TypeScript/Tailwind site deployed to Netlify. WhatsApp Business integration with pre-populated message templates matched to the client\'s actual communication workflow — clicking "Get a Quote" opens WhatsApp with a pre-written message including the service type, so the client immediately has context. Services, project gallery, and contact sections all optimised for mobile-first browsing.' },
      { label: 'The Key Decision', text: 'WhatsApp with pre-populated templates over a standard contact form. The client checks WhatsApp constantly and checks email rarely. A contact form would have created a two-step process for the client: check email, find the lead, reply. WhatsApp puts the lead directly in their primary inbox with enough context to respond immediately. Understanding the client\'s actual workflow mattered more than following standard web patterns.' },
      { label: 'What It Taught Me', text: 'Freelance client work requires listening before building. The original brief was "a website with a contact form." After one conversation about how the business actually operates, the contact form was replaced with WhatsApp deep links. The SEO requirements also came from the client\'s goal (be findable when someone searches "construction company Richards Bay") — not from a technical specification.' },
      { label: 'Real-World Impact', text: 'A real business with 17 verified 5-star reviews now has a professional web presence that matches their reputation. The WhatsApp integration means every incoming web lead is a direct conversation — no lead gets lost in an email inbox. Deployed to Netlify with automatic deployments from the main branch.' }
    ]
  },

  stories: {
    title: 'Stories Feature Clone',
    image: './images/portfolio/stories.png',
    live: 'https://instagram-story-feature-ochre.vercel.app/',
    github: 'https://github.com/dev-k99/Instagram-Story-feature',
    tags: ['React', 'JavaScript', 'LocalStorage', 'FileReader API'],
    sections: [
      { label: 'The Problem', text: 'Instagram Stories have a specific behaviour that is harder than it looks: images upload to the browser, persist across page refreshes, and expire exactly 24 hours after upload — with no backend. Understanding which browser storage API to use and how to implement time-based expiry reliably was the learning goal.' },
      { label: 'What I Built', text: 'An Instagram Stories clone demonstrating the full browser storage cycle: FileReader API converts uploaded images to Base64, localStorage stores both the image data and the upload timestamp, a cleanup function on load removes any entries older than 24 hours. Pixel-faithful UI matching the Instagram Stories interface — ring animation, progress bar timer, and swipe navigation as independent React components.' },
      { label: 'The Key Decision', text: 'localStorage over IndexedDB. For images under approximately 1MB, Base64-encoded localStorage is simpler to implement and synchronous to read — no async storage API needed. The trade-off: localStorage has a 5–10MB browser limit and blocks the main thread on large reads. This constraint is exactly what motivated the switch to IndexedDB for ScrapFlow\'s offline-first PWA, where the stored data (weighbridge ticket queues) needed to be larger, structured, and queryable.' },
      { label: 'What It Taught Me', text: 'Browser storage is a spectrum of trade-offs: localStorage is fast and simple for small key-value data; IndexedDB is a proper async database for large, structured offline data. Building this project forced an explicit decision about which tool was right, and documenting why the boundary sits where it does. That reasoning carried directly into ScrapFlow\'s architecture.' },
      { label: 'Real-World Impact', text: 'The storage pattern decision made here — localStorage\'s limitations being the reason ScrapFlow uses IndexedDB — is an example of how smaller projects inform larger architectural choices. The UI fidelity exercise also sharpened React component composition skills that carried forward into every subsequent frontend project.' }
    ]
  },

  supportos: {
    title: 'SupportOS',
    image: './images/portfolio/supportOS.png',
    live: 'https://supportos-api-bhb2cffee4cmg8f8.westeurope-01.azurewebsites.net/swagger/index.html',
    github: 'https://github.com/dev-k99/SupportOS',
    tags: ['ASP.NET Core 8', 'MediatR', 'CQRS', 'EF Core 8', 'Azure', 'xUnit', 'FluentValidation'],
    sections: [
      { label: 'The Problem', text: 'Clean Architecture gets a REST API to production — but controller → service → repository wiring creates two problems at scale: there is no single place to enforce cross-cutting concerns (logging, idempotency, performance monitoring) without touching every handler individually, and validation that throws exceptions makes every controller responsible for its own error formatting. MediatR and CQRS address both directly. I wanted a project where the pipeline was the architecture — not an afterthought added to a CRUD app.' },
      { label: 'What I Built', text: 'An internal IT support ticket API with a 4-behavior MediatR pipeline: IdempotencyBehavior (IMemoryCache, X-Idempotency-Key, short-circuits on cache hit) → LoggingBehavior (request/response timing) → ValidationBehavior (FluentValidation returning field-keyed Result<T> failures, not exceptions) → PerformanceBehavior (warns when any handler exceeds 500ms). Result<T> pattern across all 8 commands and 4 queries — no try/catch in any endpoint. SLA tracking domain service with per-priority deadlines (Critical 2h / High 8h / Medium 24h / Low 48h). CanTransitionTo() state machine on the Ticket entity enforcing valid status transitions. EF Core SaveChangesInterceptor capturing before/after JSON audit snapshots on every write. Per-IP rate limiting. JWT 3-role auth. xUnit 2.6 + Moq 4.20 test suite covering handlers, behaviors, and SLA logic. Deployed to Azure App Service (F1) + Azure SQL Database via GitHub Actions OIDC — zero stored credentials.' },
      { label: 'The Key Decision', text: 'MediatR pipeline behaviors as the single, ordered enforcement point for every cross-cutting concern. Instead of duplicating validation in every controller, adding logging to every service, or writing idempotency checks on each endpoint — the pipeline applies them once, in sequence, before any handler runs. The idempotency behavior is the clearest example: on a cache hit it returns the stored result immediately and the handler never executes. No handler needs to know idempotency exists. This is the architecture that makes enterprise .NET codebases maintainable at 50 engineers — not just functional for one.' },
      { label: 'What It Taught Me', text: 'The Result<T> pattern changes how you think about errors at an architectural level. Once every operation returns Success or Failure instead of throwing, exception handling disappears from controllers entirely — a single ResultExtensions.ToHttpResult() maps every possible outcome to the correct HTTP status code in one place. ValidationBehavior returning a Dictionary<string, string[]> of field-keyed errors also showed me why RFC 7807 ValidationProblemDetails exists: frontend libraries like React Hook Form expect that exact shape, so getting it right in the API eliminates a whole category of client-side error parsing code.' },
      { label: 'Real-World Impact', text: 'Every IT support team tracks three numbers: SLA breach rate, first response time, and average resolution time. The /metrics/dashboard endpoint surfaces all three — plus ticket counts by status, priority, and category, and a per-agent resolved vs assigned comparison for workload fairness. The audit interceptor means every status change, assignment, and comment is an immutable record — a compliance requirement in any environment where accountability matters. Live on Azure with Swagger UI at the public URL.' }
    ]
  },

  kova: {
    title: 'Kova',
    image: './images/portfolio/Kova.png',
    live: 'https://kova-alpha-puce.vercel.app/',
    github: 'https://github.com/dev-k99/Kova',
    tags: ['React 18', 'TypeScript', 'Zustand', 'TanStack Query v5', 'Paystack', 'Vite'],
    sections: [
      { label: 'The Problem', text: 'Most e-commerce tutorial projects stop at a product list and a fake cart. A production storefront needs a real payment provider, cross-session cart persistence, shareable filtered product pages, an admin management layer, and accessibility that works for all users — including those on screen readers or keyboard-only navigation.' },
      { label: 'What I Built', text: 'A production e-commerce storefront with Paystack ZAR checkout, cart, wishlist, Quick View, promo codes, and an admin dashboard. Zustand with persist middleware for cross-session cart and wishlist state. TanStack Query v5 shared cache eliminates duplicate product fetches. Skeleton loading states. URL-synced filters for shareable product pages. Accessibility-first: skip-to-main link, ARIA labels, full keyboard navigation, aria-live toast notifications.' },
      { label: 'The Key Decision', text: 'Zustand over Redux Toolkit. Redux requires boilerplate (reducers, actions, selectors) proportionate to a large enterprise app — not a 50-product storefront. Zustand\'s API is a single store hook with built-in persist middleware: the entire cart and wishlist state is 40 lines. TanStack Query v5 handles server state (product fetches, inventory checks) separately from UI state (cart, filters) — the correct architectural boundary for a React app with API calls.' },
      { label: 'What It Taught Me', text: 'URL-synced filters were more work than expected and more valuable than expected. URL params as the source of truth for filter state means a filtered product page is bookmarkable and shareable — a basic e-commerce requirement that is easy to skip. Implementing aria-live toast notifications properly (role="status", aria-atomic="true") taught me that accessibility is a series of specific, testable decisions, not a general principle.' },
      { label: 'Real-World Impact', text: 'A complete SA e-commerce stack — Paystack ZAR checkout handles the SA market payment preference (card + EFT), which Stripe does not cover locally. The admin dashboard means a non-technical store owner can manage products without touching code. The accessibility implementation means the store is usable by screen reader users — something that matters for any public-facing SA service.' }
    ]
  }
};

function openModal(key) {
  const data = projectData[key];
  if (!data) return;

  const overlay = document.getElementById('pmodalOverlay');
  const heroImg = document.getElementById('pmodalHeroImg');
  const title = document.getElementById('pmodalTitle');
  const tags = document.getElementById('pmodalTags');
  const linksDiv = document.getElementById('pmodalLinks');
  const sectionsDiv = document.getElementById('pmodalSections');

  heroImg.src = data.image;
  heroImg.alt = data.title;
  title.textContent = data.title;
  tags.innerHTML = data.tags.map(t => `<span class="tag">${t}</span>`).join('');

  const liveLink = data.live
    ? `<a href="${data.live}" class="btn-primary pmodal__link-btn" target="_blank" rel="noopener noreferrer">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        Live App
       </a>`
    : '';
  const githubLink = `<a href="${data.github}" class="btn-outline pmodal__link-btn" target="_blank" rel="noopener noreferrer">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
    GitHub
   </a>`;
  linksDiv.innerHTML = liveLink + githubLink;

  sectionsDiv.innerHTML = data.sections.map(s => `
    <div class="pmodal__section">
      <div class="pmodal__section-label">${s.label}</div>
      <p class="pmodal__section-text">${s.text}</p>
    </div>
  `).join('');

  overlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('pmodalOverlay').classList.remove('is-open');
  document.body.style.overflow = '';
}

// Open modal on case study button clicks
document.addEventListener('click', function(e) {
  const btn = e.target.closest('button[data-project]');
  if (btn) openModal(btn.dataset.project);
});

// Close on X button
document.getElementById('pmodalClose').addEventListener('click', closeModal);

// Close on backdrop click
document.getElementById('pmodalOverlay').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// Close on Escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});