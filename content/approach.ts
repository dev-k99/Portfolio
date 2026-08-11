export type Principle = {
  n: string;
  title: string;
  body: string;
};

export const approachIntro =
  'Not a methodology. Four real things I have learned from shipping systems that have to stay up, stay compliant, and stay maintainable.';

export const principles: Principle[] = [
  {
    n: '01',
    title: 'Compliance first, not last',
    body: 'On WardCare+, POPIA was not a checkbox — it was an EF Core SaveChangesInterceptor capturing before/after JSON snapshots on every INSERT, UPDATE and DELETE across 25+ entities, with soft-delete on every table. Designed into the architecture from day one, not bolted on.',
  },
  {
    n: '02',
    title: 'Real-time where it earns its keep',
    body: 'SignalR on ScrapFlow means every connected yard operator sees live stock changes the moment a ticket completes — no polling, no manual refresh. On LibraryOS, a background service probes active loans daily and pushes due-date alerts via WebSocket groups. I reach for real-time when the latency actually matters.',
  },
  {
    n: '03',
    title: 'Debug root causes, not symptoms',
    body: 'LibraryOS had a JWT refresh race condition: parallel Axios requests were each triggering a refresh, invalidating each other’s tokens. I fixed it with a subscriber queue — the first request owns the refresh, all others queue and resolve against the same result. Retrying the symptom would have masked it indefinitely.',
  },
  {
    n: '04',
    title: 'Zero stored credentials in CI/CD',
    body: 'WardCare+ and SupportOS both authenticate to Azure through OIDC workload identity federation — no secrets stored in GitHub, no rotation risk. Every release is a single push to main. This is the kind of decision that looks like extra work upfront and saves the team from a credentials breach later.',
  },
];
