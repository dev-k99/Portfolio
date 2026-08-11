'use client';

import { useEffect, useState } from 'react';

type TypedCommandProps = {
  command: string;
};

/**
 * Types the hero command once on mount. Anyone who prefers reduced motion, or
 * who has JS disabled, sees the finished line — the full text is always in the
 * DOM for assistive tech via the visually-hidden copy.
 */
export function TypedCommand({ command }: TypedCommandProps) {
  const [typed, setTyped] = useState(command);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setTyped('');
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(command.slice(0, i));
      if (i >= command.length) window.clearInterval(id);
    }, 45);

    return () => window.clearInterval(id);
  }, [command]);

  return (
    <p className="prompt">
      <span aria-hidden>{typed}</span>
      <span aria-hidden className="caret" />
      <span className="sr-only">{command}</span>
    </p>
  );
}
