import { CommandLink } from '@/components/CommandLink';
import { TerminalPrompt } from '@/components/TerminalPrompt';
import { Window } from '@/components/Window';
import { profile } from '@/content/profile';

export const metadata = {
  title: '404 — not found',
};

export default function NotFound() {
  return (
    <section className="shell py-20 md:py-28">
      <Window title={profile.shell}>
        <TerminalPrompt command="cd ./this-page" />
        <p className="mt-4 text-body">bash: cd: no such file or directory</p>

        <h1 className="mt-10 text-[clamp(2rem,6vw,3.5rem)]">404</h1>
        <p className="mt-4 max-w-md text-body">
          That path does not resolve. Everything worth reading is one directory up.
        </p>

        <div className="mt-10">
          <CommandLink href="/" variant="primary">
            cd ~
          </CommandLink>
        </div>

        <p className="mt-10 text-xs text-faint">exit 1</p>
      </Window>
    </section>
  );
}
