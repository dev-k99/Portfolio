type StatusBadgeProps = {
  label: string;
  className?: string;
};

/**
 * Deliberately shrinkable: the longest badge, [PUBLISHED · GITHUB MARKETPLACE], is
 * wider than a 320px viewport can hold on one line, so it has to be free to wrap.
 */
export function StatusBadge({ label, className = '' }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.16em] text-muted ${className}`}
    >
      <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-line-lit" />[{label}]
    </span>
  );
}
