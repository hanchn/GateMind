import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { TableGovernanceItem } from "@/types";

interface TableGovernanceTableProps {
  databaseName?: string;
  items: TableGovernanceItem[];
  onSelect: (item: TableGovernanceItem) => void;
}

export function TableGovernanceTable({ databaseName, items, onSelect }: TableGovernanceTableProps) {
  return (
    <DataTable
      rowKey={(item) => item.id}
      rows={items}
      onRowClick={onSelect}
      columns={[
        ...(databaseName
          ? []
          : [{ key: "database", title: "库", render: (item: TableGovernanceItem) => item.databaseName }]),
        { key: "connection", title: "连接", render: (item) => item.connectionName },
        { key: "env", title: "环境", render: (item) => item.environment },
        { key: "table", title: "表", render: (item) => item.tableName },
        { key: "fields", title: "字段数", render: (item) => item.fieldCount },
        { key: "rows", title: "预估行数", render: (item) => item.estimatedRows },
        { key: "sensitivity", title: "敏感级别", render: (item) => item.sensitivity },
        { key: "status", title: "纳管状态", render: (item) => <StatusBadge status={item.status} /> },
      ]}
    />
  );
}
