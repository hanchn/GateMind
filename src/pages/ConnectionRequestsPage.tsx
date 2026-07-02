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
        title="功能发布"
        description="基于已有连接和库表发布对外功能，明确业务域、执行范围、版本号，并在发布时进入审批流程。"
      />
      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <ConnectionRequestForm />
        <ConnectionRequestTable items={items} />
      </div>
    </div>
  );
}
