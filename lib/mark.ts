/**
 * The "K" mark: a monospace-proportioned K followed by a solid block caret, so the
 * icon reads as a terminal cursor that has just typed the initial. Drawn as pure
 * geometry rather than a text glyph — no font has to load for it to render, which
 * matters for a favicon and for Satori-rendered social images alike.
 */
type MarkOptions = {
  background?: string;
  foreground?: string;
  /** Corner radius on the backing square; 0 with a transparent background. */
  radius?: number;
};

export function markSvg({
  background = '#000000',
  foreground = '#ffffff',
  radius = 22,
}: MarkOptions = {}): string {
  const backdrop =
    background === 'transparent'
      ? ''
      : `<rect width="100" height="100" rx="${radius}" fill="${background}"/>`;

  return [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">',
    backdrop,
    `<g stroke="${foreground}" stroke-width="9" stroke-linecap="square" fill="none">`,
    '<path d="M24 26V74"/>',
    '<path d="M28 50L56 24"/>',
    '<path d="M28 50L56 76"/>',
    '</g>',
    // Baseline-aligned block, not a full-height bar: a full-height bar reads as a
    // second letter ("KI") rather than as a cursor.
    `<rect x="66" y="52" width="14" height="22" fill="${foreground}"/>`,
    '</svg>',
  ].join('');
}

export function markDataUri(options: MarkOptions = {}): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(markSvg(options))}`;
}
