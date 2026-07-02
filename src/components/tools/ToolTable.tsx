import { DataTable } from "@/components/ui/DataTable";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { ToolSummary } from "@/types";

interface ToolTableProps {
  tools: ToolSummary[];
  onSelect: (tool: ToolSummary) => void;
}

export function ToolTable({ tools, onSelect }: ToolTableProps) {
  return (
    <DataTable
      rowKey={(tool) => tool.id}
      rows={tools}
      onRowClick={onSelect}
      columns={[
        {
          key: "name",
          title: "工具",
          render: (tool) => (
            <div>
              <p className="font-semibold text-ink">{tool.name}</p>
              <p className="mt-1 text-xs text-ink-muted">{tool.description}</p>
            </div>
          ),
        },
        { key: "domain", title: "业务域", render: (tool) => tool.domain },
        { key: "system", title: "系统", render: (tool) => tool.system },
        { key: "risk", title: "风险", render: (tool) => <RiskBadge level={tool.riskLevel} /> },
        { key: "status", title: "状态", render: (tool) => <StatusBadge status={tool.status} /> },
        { key: "owner", title: "负责人", render: (tool) => tool.owner },
      ]}
    />
  );
}
