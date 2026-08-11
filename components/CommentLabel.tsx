import type { ElementType } from 'react';

type CommentLabelProps = {
  children: string;
  /** Semantics vary by context: a dt in a definition list, an h2 above a section. */
  as?: ElementType;
  className?: string;
};

/**
 * The `// LABEL` marker used above blocks of prose. The slashes are built into the
 * string rather than written as JSX text, which keeps them out of the children
 * position where they read as a stray JS comment.
 */
export function CommentLabel({ children, as: Tag = 'p', className = '' }: CommentLabelProps) {
  return <Tag className={`comment ${className}`}>{`// ${children}`}</Tag>;
}
