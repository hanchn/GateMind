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
        eyebrow="Capability Builder"
        title="创建功能"
        description="基于已有连接和库表创建对外功能，明确业务域、执行范围和功能说明，再进入后续治理流程。"
      />
      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <ConnectionRequestForm />
        <ConnectionRequestTable items={items} />
      </div>
    </div>
  );
}
