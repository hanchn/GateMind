import { RiskBadge } from "@/components/ui/RiskBadge";
import { SectionCard } from "@/components/ui/SectionCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { ApprovalItem } from "@/types";

interface PendingApprovalListProps {
  items: ApprovalItem[];
}

export function PendingApprovalList({ items }: PendingApprovalListProps) {
  return (
    <SectionCard title="待处理审批" eyebrow="Approval Queue">
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:bg-white/[0.05]"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm text-ink-muted">{item.id}</p>
                <h3 className="mt-1 text-base font-semibold text-ink">{item.title}</h3>
              </div>
              <StatusBadge status={item.status} />
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <RiskBadge level={item.riskLevel} />
              <span className="text-sm text-ink-muted">{item.domain}</span>
              <span className="text-sm text-ink-muted">发起人：{item.requester}</span>
              <span className="text-sm text-ink-muted">{item.createdAt}</span>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
