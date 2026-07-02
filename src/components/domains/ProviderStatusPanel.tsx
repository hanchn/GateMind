import { SectionCard } from "@/components/ui/SectionCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { DomainSummary } from "@/types";

interface ProviderStatusPanelProps {
  domains: DomainSummary[];
}

export function ProviderStatusPanel({ domains }: ProviderStatusPanelProps) {
  return (
    <SectionCard title="Provider 连接状态" eyebrow="Provider Pulse">
      <div className="space-y-4">
        {domains.map((domain) => (
          <div key={domain.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div>
              <p className="font-semibold text-ink">{domain.name}</p>
              <p className="mt-1 text-sm text-ink-muted">{domain.providerStatus}</p>
            </div>
            <StatusBadge status={domain.health} />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
