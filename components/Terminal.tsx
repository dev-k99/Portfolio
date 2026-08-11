'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  completionsFor,
  runCommand,
  type Line,
  type TerminalProject,
} from '@/lib/commands';

type Entry = {
  id: number;
  command: string;
  lines: Line[];
};

const HINTS = ['help', 'ls', 'cat lexasa', 'contact'];

function OutputLine({ line }: { line: Line }) {
  if (line.kind === 'link') {
    const className = 'text-fg underline decoration-line-lit underline-offset-4 hover:decoration-fg';
    return line.external ? (
      <a href={line.href} target="_blank" rel="noopener noreferrer" className={className}>
        {line.text}
      </a>
    ) : (
      <Link href={line.href} className={className}>
        {line.text}
      </Link>
    );
  }

  if (!line.text) return <span>&nbsp;</span>;

  return (
    <span className={line.tone === 'dim' ? 'text-muted' : line.tone === 'bright' ? 'text-fg' : ''}>
      {line.text}
    </span>
  );
}

/**
 * The hero prompt, live. Rendered only after mount, so a visitor without
 * JavaScript keeps the static hero and its buttons and never sees a dead input.
 * Navigation never depends on it — it is strictly additive.
 */
export function Terminal({ projects }: { projects: TerminalProject[] }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(0);

  useEffect(() => setMounted(true), []);

  // "/" focuses the prompt from anywhere, the way a search field would.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement;
      if (event.key === '/' && !typing) {
        event.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const submit = useCallback(
    (raw: string) => {
      const command = raw.trim();
      const result = runCommand(command, projects);

      setHistory((previous) => (command ? [...previous, command] : previous));
      setHistoryIndex(null);
      setValue('');

      if (result.clear) {
        setEntries([]);
      } else {
        nextId.current += 1;
        setEntries((previous) => [
          ...previous,
          { id: nextId.current, command, lines: result.lines },
        ]);
      }

      if (result.openExternal) window.open(result.openExternal, '_blank', 'noopener,noreferrer');
      if (result.navigate) router.push(result.navigate);
    },
    [router, projects],
  );

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submit(value);
      return;
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      const parts = value.split(/\s+/);
      const fragment = parts[parts.length - 1] ?? '';
      if (!fragment) return;
      const match = completionsFor(projects).find((candidate) =>
        candidate.startsWith(fragment.toLowerCase()),
      );
      if (match) {
        parts[parts.length - 1] = match;
        setValue(parts.join(' '));
      }
      return;
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      if (history.length === 0) return;
      event.preventDefault();
      const step = event.key === 'ArrowUp' ? -1 : 1;
      const current = historyIndex ?? history.length;
      const next = Math.min(history.length, Math.max(0, current + step));
      setHistoryIndex(next);
      setValue(next === history.length ? '' : history[next]);
    }
  };

  if (!mounted) return null;

  return (
    <div className="mt-10 border-t border-line pt-6">
      <div aria-live="polite" className="space-y-6">
        {entries.map((entry) => (
          <div key={entry.id}>
            <p className="prompt">{entry.command}</p>
            {entry.lines.length > 0 && (
              <div className="mt-2 flex flex-col items-start gap-0.5 text-sm">
                {entry.lines.map((line, index) => (
                  <OutputLine key={index} line={line} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Clicking the whole row focuses the input, as a real terminal would. */}
      <div
        className={`flex items-center gap-2 ${entries.length ? 'mt-6' : ''}`}
        onClick={() => inputRef.current?.focus()}
      >
        <label htmlFor="terminal-input" className="sr-only">
          Type a command. Try help.
        </label>
        <span aria-hidden className="text-sm text-fg">
          $
        </span>
        <input
          id="terminal-input"
          ref={inputRef}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="go"
          placeholder="type a command…"
          className="w-full min-w-0 bg-transparent text-sm text-fg caret-white outline-none placeholder:text-faint"
        />
      </div>

      {entries.length === 0 && (
        <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-faint">
          <span>this prompt works. try</span>
          {HINTS.map((hint) => (
            <button
              key={hint}
              type="button"
              onClick={() => submit(hint)}
              className="rounded border border-line px-1.5 py-0.5 text-muted transition-colors hover:border-line-lit hover:text-fg"
            >
              {hint}
            </button>
          ))}
          <span className="hidden sm:inline">or press / from anywhere</span>
        </p>
      )}
    </div>
  );
}
