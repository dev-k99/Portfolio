'use client';

import { useEffect, useRef, useState } from 'react';

type TerminalPromptProps = {
  command: string;
  className?: string;
};

/**
 * The `$ command` eyebrow that introduces every section — typed out the first time
 * it scrolls into view, so the page reads as one continuous session rather than a
 * set of headings that happen to look like a shell.
 *
 * The full string is always in the DOM for assistive tech and for search engines;
 * only the visible span animates, and only when motion is welcome.
 */
export function TerminalPrompt({ command, className = '' }: TerminalPromptProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [typed, setTyped] = useState(command);
  const [done, setDone] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    setTyped('');
    setDone(false);

    let interval: number | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        let i = 0;
        interval = window.setInterval(() => {
          i += 1;
          setTyped(command.slice(0, i));
          if (i >= command.length) {
            window.clearInterval(interval);
            setDone(true);
          }
        }, 28);
      },
      { threshold: 0.6 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (interval) window.clearInterval(interval);
    };
  }, [command]);

  return (
    <p ref={ref} className={`prompt ${className}`}>
      <span aria-hidden>{typed}</span>
      {!done && <span aria-hidden className="caret" />}
      <span className="sr-only">{command}</span>
    </p>
  );
}
