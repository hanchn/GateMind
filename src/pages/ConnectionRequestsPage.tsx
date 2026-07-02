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
      <PageHeader title="应用发布" description="统一提交发布申请并进入审批。" />
      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <ConnectionRequestForm />
        <ConnectionRequestTable items={items} />
      </div>
    </div>
  );
}
