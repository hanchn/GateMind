interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="mb-8">
      <p className="text-xs uppercase tracking-[0.32em] text-cyan-200/70">{eyebrow}</p>
      <h1 className="mt-3 font-display text-4xl text-ink">{title}</h1>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-ink-muted">{description}</p>
    </header>
  );
}
