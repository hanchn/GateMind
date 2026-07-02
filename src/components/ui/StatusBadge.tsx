import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
}

const statusToneMap: Record<string, string> = {
  active: "border-emerald-400/30 bg-emerald-500/10 text-emerald-200",
  draft: "border-amber-400/30 bg-amber-500/10 text-amber-200",
  disabled: "border-white/15 bg-white/5 text-ink-muted",
  pending: "border-orange-400/30 bg-orange-500/10 text-orange-200",
  approved: "border-cyan-400/30 bg-cyan-500/10 text-cyan-200",
  rejected: "border-rose-400/30 bg-rose-500/10 text-rose-200",
  executed: "border-violet-400/30 bg-violet-500/10 text-violet-200",
  healthy: "border-emerald-400/30 bg-emerald-500/10 text-emerald-200",
  warning: "border-amber-400/30 bg-amber-500/10 text-amber-200",
  degraded: "border-rose-400/30 bg-rose-500/10 text-rose-200",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium capitalize tracking-[0.14em]",
        statusToneMap[status] ?? "border-white/10 bg-white/5 text-ink-muted",
      )}
    >
      {status}
    </span>
  );
}
