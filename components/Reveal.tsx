'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  /** Stagger in ms, applied as a transition-delay. */
  delay?: number;
  className?: string;
};

/**
 * Fades and lifts content into view once.
 *
 * Progressive by construction: the server renders no data-visible attribute at all,
 * and CSS treats "no attribute" as fully visible. Only after mount does this set
 * false (off screen) or true (on screen), so a hydration failure, a JS error, or a
 * client with scripting off leaves every section readable rather than blank.
 *
 * Anything already on screen at mount is revealed synchronously from its rect
 * instead of waiting for the observer's first async callback — that avoids a
 * one-frame flash on above-the-fold content.
 */
export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (node.getBoundingClientRect().top < window.innerHeight * 0.92) {
      setVisible(true);
      return;
    }

    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }

    setVisible(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      data-visible={visible === null ? undefined : visible}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
