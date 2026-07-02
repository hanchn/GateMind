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
        eyebrow="Capability Release"
        title="应用发布"
        description="选表、勾选增删改查、填写申请原因，系统自动更新版本号后进入审批。"
      />
      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <ConnectionRequestForm />
        <ConnectionRequestTable items={items} />
      </div>
    </div>
  );
}
