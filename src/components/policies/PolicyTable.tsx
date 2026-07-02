import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { PolicySummary } from "@/types";

interface PolicyTableProps {
  policies: PolicySummary[];
}

export function PolicyTable({ policies }: PolicyTableProps) {
  return (
    <DataTable
      rowKey={(policy) => policy.id}
      rows={policies}
      columns={[
        {
          key: "name",
          title: "策略名称",
          render: (policy) => (
            <div>
              <p className="font-semibold text-ink">{policy.name}</p>
              <p className="mt-1 text-xs text-ink-muted">优先级 {policy.priority}</p>
            </div>
          ),
        },
        { key: "scope", title: "作用范围", render: (policy) => policy.scope },
        { key: "effect", title: "判定结果", render: (policy) => <StatusBadge status={policy.effect} /> },
        { key: "flow", title: "审批模板", render: (policy) => policy.approverFlow },
        { key: "enabled", title: "状态", render: (policy) => <StatusBadge status={policy.enabled ? "active" : "disabled"} /> },
      ]}
    />
  );
}
