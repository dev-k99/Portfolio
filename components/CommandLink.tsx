import Link from 'next/link';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'outline' | 'ghost';

type CommandLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** External links get the new-tab + rel treatment and skip next/link. */
  external?: boolean;
  className?: string;
};

const styles: Record<Variant, string> = {
  primary:
    'bg-fg text-bg border border-fg hover:bg-transparent hover:text-fg px-4 py-2.5 rounded-md',
  outline:
    'border border-line-lit text-fg hover:border-fg px-4 py-2.5 rounded-md',
  // Card-footer actions are primary CTAs, so they sit at body contrast rather than
  // the muted grey used for metadata.
  ghost: 'text-body hover:text-fg border-b border-transparent hover:border-line-lit',
};

export function CommandLink({
  href,
  children,
  variant = 'ghost',
  external = false,
  className = '',
}: CommandLinkProps) {
  const classes = `inline-flex items-center gap-2 text-sm transition-colors ${styles[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
