interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="mb-8">
      <h1 className="font-display text-4xl text-ink">{title}</h1>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-ink-muted">{description}</p>
    </header>
  );
}
