export type Credential = {
  title: string;
  issuer: string;
  date: string;
};

export const degree: Credential = {
  title: 'Diploma in Information Technology (Software Development)',
  issuer: 'Nelson Mandela University',
  date: '2025',
};

export const certifications: Credential[] = [
  { title: 'AI Fluency: Framework & Foundations', issuer: 'Anthropic', date: 'Mar 2026' },
  { title: 'Claude 101', issuer: 'Anthropic', date: 'Mar 2026' },
  { title: 'Zapier 101', issuer: 'Udemy', date: 'Feb 2026' },
  { title: 'Data Analyst Bootcamp: Python, Excel, Power BI & SQL', issuer: 'Udemy', date: 'Oct 2025' },
  { title: 'Angular 20 & ASP.NET Core Web API', issuer: 'Udemy', date: 'Oct 2025' },
  { title: 'Python Data Science: Data Prep & EDA', issuer: 'Udemy', date: 'Sep 2025' },
  { title: 'C# Programming Award', issuer: 'Nelson Mandela University', date: 'Apr 2024' },
  { title: 'Student Merit Award', issuer: 'Nelson Mandela University', date: '2024 & 2025' },
  { title: 'Introduction to Cybersecurity', issuer: 'Cisco Networking Academy', date: 'Oct 2023' },
];
