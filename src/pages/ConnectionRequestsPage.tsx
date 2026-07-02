import { useEffect, useState } from "react";

import { ConnectionRequestForm } from "@/components/connections/ConnectionRequestForm";
import { ConnectionRequestTable } from "@/components/connections/ConnectionRequestTable";
import { PageHeader } from "@/components/shell/PageHeader";
import { listConnectionRequests } from "@/services/connectionRequestService";
import type { ConnectionRequest } from "@/types";

export function ConnectionRequestsPage() {
  const [items, setItems] = useState<ConnectionRequest[]>([]);

  useEffect(() => {
    listConnectionRequests().then(setItems);
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Access Workflow"
        title="创建连接申请"
        description="所有新数据库接入都应先提交申请，明确业务域、权限范围、用途说明，再进入审批。"
      />
      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <ConnectionRequestForm />
        <ConnectionRequestTable items={items} />
      </div>
    </div>
  );
}
