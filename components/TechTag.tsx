type TechTagProps = {
  children: string;
};

export function TechTag({ children }: TechTagProps) {
  return (
    <span className="rounded border border-line bg-raised px-2 py-1 text-xs text-body">
      {children}
    </span>
  );
}
