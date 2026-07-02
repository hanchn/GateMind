import { RiskBadge } from "@/components/ui/RiskBadge";
import { SectionCard } from "@/components/ui/SectionCard";
import type { RiskDistributionItem } from "@/types";

interface RiskDistributionPanelProps {
  items: RiskDistributionItem[];
}

export function RiskDistributionPanel({ items }: RiskDistributionPanelProps) {
  const maxCount = Math.max(...items.map((item) => item.count));

  return (
    <SectionCard title="风险分布" eyebrow="Risk Matrix">
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.level} className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <RiskBadge level={item.level} />
                <span className="text-sm text-ink-muted">{item.label}</span>
              </div>
              <span className="text-sm text-ink">{item.count.toLocaleString()}</span>
            </div>
            <div className="h-2 rounded-full bg-white/5">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-cyan-300 via-orange-300 to-rose-300"
                style={{ width: `${(item.count / maxCount) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
