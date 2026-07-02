import { DataTable } from "@/components/ui/DataTable";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { ApprovalItem } from "@/types";

interface ApprovalTableProps {
  approvals: ApprovalItem[];
  onSelect: (approval: ApprovalItem) => void;
}

export function ApprovalTable({ approvals, onSelect }: ApprovalTableProps) {
  return (
    <DataTable
      rowKey={(approval) => approval.id}
      rows={approvals}
      onRowClick={onSelect}
      columns={[
        {
          key: "title",
          title: "变更单",
          render: (approval) => (
            <div>
              <p className="font-semibold text-ink">{approval.title}</p>
              <p className="mt-1 text-xs text-ink-muted">{approval.id}</p>
            </div>
          ),
        },
        { key: "requester", title: "发起人", render: (approval) => approval.requester },
        { key: "domain", title: "业务域", render: (approval) => approval.domain },
        { key: "risk", title: "风险", render: (approval) => <RiskBadge level={approval.riskLevel} /> },
        { key: "status", title: "状态", render: (approval) => <StatusBadge status={approval.status} /> },
        { key: "createdAt", title: "发起时间", render: (approval) => approval.createdAt },
      ]}
    />
  );
}
