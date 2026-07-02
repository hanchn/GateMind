import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { ApplicationCredential } from "@/types";

interface ApplicationTableProps {
  items: ApplicationCredential[];
}

export function ApplicationTable({ items }: ApplicationTableProps) {
  return (
    <DataTable
      rowKey={(item) => item.id}
      rows={items}
      scrollClassName="max-h-[620px] overflow-auto"
      columns={[
        {
          key: "name",
          title: "应用名称",
          render: (item) => <span className="font-semibold text-ink">{item.name}</span>,
        },
        { key: "domain", title: "业务域", render: (item) => item.domain },
        { key: "owner", title: "负责人", render: (item) => item.owner },
        { key: "appId", title: "应用 ID", render: (item) => item.appId },
        { key: "appSecret", title: "应用秘钥", render: (item) => item.appSecret },
        { key: "createdAt", title: "创建时间", render: (item) => item.createdAt },
        { key: "status", title: "状态", render: (item) => <StatusBadge status={item.status} /> },
      ]}
    />
  );
}
