import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { PersonalToken } from "@/types";

interface TokenTableProps {
  items: PersonalToken[];
}

export function TokenTable({ items }: TokenTableProps) {
  return (
    <DataTable
      rowKey={(item) => item.id}
      rows={items}
      columns={[
        {
          key: "name",
          title: "Token 名称",
          render: (item) => (
            <div>
              <p className="font-semibold text-ink">{item.name}</p>
              <p className="mt-1 text-xs text-cyan-200">{item.maskedValue}</p>
            </div>
          ),
        },
        { key: "scope", title: "作用范围", render: (item) => item.scope },
        { key: "limit", title: "独立频率", render: (item) => item.requestRateLimit },
        { key: "window", title: "默认数据量", render: (item) => item.dataWindow },
        { key: "expiresAt", title: "过期时间", render: (item) => item.expiresAt },
        { key: "status", title: "状态", render: (item) => <StatusBadge status={item.status} /> },
      ]}
    />
  );
}
