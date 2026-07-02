import { Button } from "antd";

import { RiskBadge } from "@/components/ui/RiskBadge";
import { SectionCard } from "@/components/ui/SectionCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { ApprovalItem } from "@/types";

interface ApprovalDetailPanelProps {
  approval?: ApprovalItem;
}

export function ApprovalDetailPanel({ approval }: ApprovalDetailPanelProps) {
  if (!approval) {
    return (
      <SectionCard title="审批详情" eyebrow="Approval Detail">
        <p className="text-sm leading-7 text-ink-muted">选择一条变更单后，这里会展示影响范围、回滚方案与审批建议。</p>
      </SectionCard>
    );
  }

  return (
    <SectionCard title={approval.title} eyebrow="Approval Detail">
      <div className="space-y-5 text-sm leading-7 text-ink-muted">
        <div className="flex flex-wrap items-center gap-3">
          <RiskBadge level={approval.riskLevel} />
          <StatusBadge status={approval.status} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.24em]">发起人</p>
            <p className="mt-2 text-ink">{approval.requester}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em]">业务域</p>
            <p className="mt-2 text-ink">{approval.domain}</p>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.24em]">影响范围</p>
          <p className="mt-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-ink">{approval.impactScope}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.24em]">回滚方案</p>
          <p className="mt-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-ink">{approval.rollbackPlan}</p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <Button>审批通过</Button>
          <Button>驳回变更</Button>
        </div>
      </div>
    </SectionCard>
  );
}
