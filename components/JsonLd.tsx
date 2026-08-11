type JsonLdProps = {
  data: unknown;
};

/**
 * Structured data. The `<` escape matters: JSON.stringify happily emits a literal
 * `</script>` if any string ever contains one, which would close the tag early and
 * turn author-controlled copy into an injection point.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
