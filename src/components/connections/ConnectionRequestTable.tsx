import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { ConnectionRequest } from "@/types";

interface ConnectionRequestTableProps {
  items: ConnectionRequest[];
}

export function ConnectionRequestTable({ items }: ConnectionRequestTableProps) {
  return (
    <DataTable
      rowKey={(item) => item.id}
      rows={items}
      columns={[
        {
          key: "name",
          title: "申请单",
          render: (item) => (
            <div>
              <p className="font-semibold text-ink">{item.name}</p>
              <p className="mt-1 text-xs text-ink-muted">{item.id}</p>
            </div>
          ),
        },
        { key: "domain", title: "业务域", render: (item) => item.domain },
        { key: "requester", title: "申请人", render: (item) => item.requester },
        { key: "scope", title: "权限范围", render: (item) => item.scope },
        { key: "status", title: "状态", render: (item) => <StatusBadge status={item.status} /> },
      ]}
    />
  );
}
