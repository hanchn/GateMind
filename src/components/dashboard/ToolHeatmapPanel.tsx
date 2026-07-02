import { SectionCard } from "@/components/ui/SectionCard";
import type { HotTool } from "@/types";

interface ToolHeatmapPanelProps {
  items: HotTool[];
}

export function ToolHeatmapPanel({ items }: ToolHeatmapPanelProps) {
  return (
    <SectionCard title="活跃工具热区" eyebrow="Tool Pulse">
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            style={{ backgroundImage: `linear-gradient(135deg, rgba(34,211,238,${0.15 - index * 0.02}), transparent)` }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-ink-muted">{item.domain}</p>
            <h3 className="mt-2 font-display text-xl text-ink">{item.name}</h3>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-ink-muted">调用量 {item.usageCount}</span>
              <span className="text-sm text-cyan-200">{item.successRate}</span>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
