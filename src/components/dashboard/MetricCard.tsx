import type { DashboardMetric } from "@/types";

import { cn } from "@/lib/utils";

const toneMap = {
  cyan: "from-cyan-400/20 via-cyan-400/5 to-transparent text-cyan-200",
  orange: "from-orange-400/20 via-orange-400/5 to-transparent text-orange-200",
  red: "from-rose-400/20 via-rose-400/5 to-transparent text-rose-200",
  violet: "from-violet-400/20 via-violet-400/5 to-transparent text-violet-200",
};

interface MetricCardProps {
  metric: DashboardMetric;
}

export function MetricCard({ metric }: MetricCardProps) {
  return (
    <article
      className={cn(
        "rounded-3xl border border-white/10 bg-gradient-to-br p-5 shadow-panel",
        toneMap[metric.tone],
      )}
    >
      <p className="text-xs uppercase tracking-[0.26em] text-ink-muted">{metric.label}</p>
      <div className="mt-5 flex items-end justify-between gap-4">
        <span className="font-display text-4xl text-ink">{metric.value}</span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-ink-muted">
          {metric.delta}
        </span>
      </div>
    </article>
  );
}
