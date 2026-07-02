import { SectionCard } from "@/components/ui/SectionCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { DomainSummary } from "@/types";

interface DomainCardGridProps {
  domains: DomainSummary[];
}

export function DomainCardGrid({ domains }: DomainCardGridProps) {
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      {domains.map((domain) => (
        <SectionCard key={domain.id} title={domain.name} eyebrow="Domain Health">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-ink-muted">负责人：{domain.owner}</p>
              <StatusBadge status={domain.health} />
            </div>
            <p className="text-sm leading-7 text-ink-muted">{domain.description}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-ink-muted">工具数量</p>
                <p className="mt-3 font-display text-3xl text-ink">{domain.toolCount}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-ink-muted">Provider 状态</p>
                <p className="mt-3 text-sm leading-6 text-ink">{domain.providerStatus}</p>
              </div>
            </div>
          </div>
        </SectionCard>
      ))}
    </div>
  );
}
