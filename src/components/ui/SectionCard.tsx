import type { PropsWithChildren, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionCardProps extends PropsWithChildren {
  title?: string;
  eyebrow?: string;
  action?: ReactNode;
  className?: string;
}

export function SectionCard({ title, eyebrow, action, className, children }: SectionCardProps) {
  return (
    <section
      className={cn(
        "rounded-3xl border border-white/10 bg-panel/80 p-6 shadow-panel backdrop-blur-xl",
        className,
      )}
    >
      {(title || eyebrow || action) && (
        <header className="mb-5 flex items-start justify-between gap-4">
          <div>
            {eyebrow && <p className="text-xs uppercase tracking-[0.32em] text-ink-muted">{eyebrow}</p>}
            {title && <h2 className="mt-2 font-display text-2xl text-ink">{title}</h2>}
          </div>
          {action}
        </header>
      )}
      {children}
    </section>
  );
}
