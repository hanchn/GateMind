import { cn } from "@/lib/utils";
import type { RiskLevel } from "@/types";

const riskMap: Record<RiskLevel, { label: string; className: string }> = {
  0: { label: "Level 0", className: "border-cyan-400/30 bg-cyan-500/10 text-cyan-200" },
  1: { label: "Level 1", className: "border-sky-400/30 bg-sky-500/10 text-sky-200" },
  2: { label: "Level 2", className: "border-amber-400/30 bg-amber-500/10 text-amber-200" },
  3: { label: "Level 3", className: "border-orange-400/30 bg-orange-500/10 text-orange-200" },
  4: { label: "Level 4", className: "border-rose-400/30 bg-rose-500/10 text-rose-200" },
};

interface RiskBadgeProps {
  level: RiskLevel;
}

export function RiskBadge({ level }: RiskBadgeProps) {
  const risk = riskMap[level];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.18em]",
        risk.className,
      )}
    >
      {risk.label}
    </span>
  );
}
