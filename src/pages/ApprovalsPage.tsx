import { useEffect, useState } from "react";

import { ApprovalDetailPanel } from "@/components/approvals/ApprovalDetailPanel";
import { ApprovalTable } from "@/components/approvals/ApprovalTable";
import { PageHeader } from "@/components/shell/PageHeader";
import { listApprovals } from "@/services/approvalService";
import { useApprovalStore } from "@/store/useApprovalStore";
import type { ApprovalItem } from "@/types";

export function ApprovalsPage() {
  const [approvals, setApprovals] = useState<ApprovalItem[]>([]);
  const selectedApprovalId = useApprovalStore((state) => state.selectedApprovalId);
  const setSelectedApprovalId = useApprovalStore((state) => state.setSelectedApprovalId);

  useEffect(() => {
    listApprovals().then((items) => {
      setApprovals(items);
      setSelectedApprovalId(items[0]?.id ?? null);
    });
  }, [setSelectedApprovalId]);

  const selectedApproval = approvals.find((approval) => approval.id === selectedApprovalId) ?? approvals[0];

  return (
    <div className="space-y-8">
      <PageHeader title="高风险变更审批" description="审批高风险变更，决定是否继续执行。" />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <ApprovalTable approvals={approvals} onSelect={(approval) => setSelectedApprovalId(approval.id)} />
        <ApprovalDetailPanel approval={selectedApproval} />
      </div>
    </div>
  );
}
