import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { AuditEvent } from "@/types";

interface AuditTableProps {
  events: AuditEvent[];
  onSelect: (event: AuditEvent) => void;
}

export function AuditTable({ events, onSelect }: AuditTableProps) {
  return (
    <DataTable
      rowKey={(event) => event.id}
      rows={events}
      onRowClick={onSelect}
      columns={[
        { key: "traceId", title: "Trace", render: (event) => event.traceId },
        { key: "actor", title: "发起方", render: (event) => event.actor },
        { key: "toolName", title: "工具", render: (event) => event.toolName },
        { key: "domain", title: "业务域", render: (event) => event.domain },
        { key: "decision", title: "结果", render: (event) => <StatusBadge status={event.decision} /> },
        { key: "createdAt", title: "时间", render: (event) => event.createdAt },
      ]}
    />
  );
}
