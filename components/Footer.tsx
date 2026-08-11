import { profile } from '@/content/profile';

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-wrap items-center justify-between gap-3 py-8 text-xs">
        <p className="prompt">
          echo &quot;© {new Date().getFullYear()} {profile.name}&quot;
        </p>
        <p className="text-faint">exit 0</p>
      </div>
    </footer>
  );
}
