import type { ReactNode } from 'react';

type WindowProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

/**
 * The terminal chrome used for the hero. The traffic lights are hollow rings
 * rather than the usual red/amber/green — the palette has no hue to spend.
 */
export function Window({ title, children, className = '' }: WindowProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-line bg-surface ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <div aria-hidden className="flex gap-2">
          <span className="size-3 rounded-full border border-line-lit" />
          <span className="size-3 rounded-full border border-line-lit" />
          <span className="size-3 rounded-full border border-line-lit" />
        </div>
        <span className="text-xs text-faint">{title}</span>
      </div>
      <div className="px-5 py-8 sm:px-8 sm:py-12">{children}</div>
    </div>
  );
}
