import { Button } from "antd";

import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { TableGovernanceItem } from "@/types";

interface TableGovernanceTableProps {
  databaseName?: string;
  items: TableGovernanceItem[];
  onSelect: (item: TableGovernanceItem) => void;
  onView: (item: TableGovernanceItem) => void;
  onEdit: (item: TableGovernanceItem) => void;
}

export function TableGovernanceTable({ databaseName, items, onSelect, onView, onEdit }: TableGovernanceTableProps) {
  return (
    <DataTable
      rowKey={(item) => item.id}
      rows={items}
      onRowClick={onSelect}
      scrollClassName="max-h-[620px] overflow-auto"
      stickyHeader
      columns={[
        ...(databaseName
          ? []
          : [{ key: "database", title: "库", render: (item: TableGovernanceItem) => item.databaseName }]),
        {
          key: "table",
          title: "表",
          render: (item) => (
            <div>
              <p className="font-semibold text-ink">{item.tableName}</p>
              <p className="mt-1 text-xs text-ink-muted">{item.connectionName}</p>
            </div>
          ),
        },
        { key: "fields", title: "字段数", render: (item) => item.fieldCount },
        { key: "rows", title: "预估行数", render: (item) => item.estimatedRows },
        { key: "sensitivity", title: "敏感级别", render: (item) => item.sensitivity },
        { key: "status", title: "纳管状态", render: (item) => <StatusBadge status={item.status} /> },
        {
          key: "actions",
          title: "操作",
          render: (item) => (
            <div className="flex items-center gap-2">
              <Button
                type="link"
                onClick={(event) => {
                  event.stopPropagation();
                  onEdit(item);
                }}
              >
                编辑
              </Button>
              <Button
                type="link"
                onClick={(event) => {
                  event.stopPropagation();
                  onView(item);
                }}
              >
                查看
              </Button>
            </div>
          ),
        },
      ]}
    />
  );
}
