import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { ConnectionSummary } from "@/types";

interface ConnectionTableProps {
  items: ConnectionSummary[];
}

export function ConnectionTable({ items }: ConnectionTableProps) {
  return (
    <DataTable
      rowKey={(item) => item.id}
      rows={items}
      columns={[
        {
          key: "name",
          title: "连接名称",
          render: (item) => (
            <div>
              <p className="font-semibold text-ink">{item.name}</p>
              <p className="mt-1 text-xs text-ink-muted">{item.requestSource}</p>
            </div>
          ),
        },
        { key: "env", title: "环境", render: (item) => item.environment },
        { key: "driver", title: "驱动", render: (item) => item.driver },
        { key: "status", title: "状态", render: (item) => <StatusBadge status={item.status} /> },
        { key: "limit", title: "连接频率", render: (item) => item.rateLimit },
        { key: "window", title: "默认数据量", render: (item) => item.defaultDataWindow },
      ]}
    />
  );
}
