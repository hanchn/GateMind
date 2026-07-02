import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { TableGovernanceItem } from "@/types";

interface TableGovernanceTableProps {
  items: TableGovernanceItem[];
}

export function TableGovernanceTable({ items }: TableGovernanceTableProps) {
  return (
    <DataTable
      rowKey={(item) => item.id}
      rows={items}
      columns={[
        { key: "connection", title: "连接", render: (item) => item.connectionName },
        { key: "database", title: "库", render: (item) => item.databaseName },
        { key: "table", title: "表", render: (item) => item.tableName },
        { key: "sensitivity", title: "敏感级别", render: (item) => item.sensitivity },
        { key: "mode", title: "可用动作", render: (item) => item.operationMode },
        { key: "status", title: "纳管状态", render: (item) => <StatusBadge status={item.status} /> },
      ]}
    />
  );
}
