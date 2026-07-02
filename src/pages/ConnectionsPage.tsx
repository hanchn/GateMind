import { useEffect, useState } from "react";

import { ConnectionTable } from "@/components/connections/ConnectionTable";
import { PageHeader } from "@/components/shell/PageHeader";
import { HelpTooltip } from "@/components/ui/HelpTooltip";
import { listConnections } from "@/services/connectionService";
import type { ConnectionSummary } from "@/types";

export function ConnectionsPage() {
  const [items, setItems] = useState<ConnectionSummary[]>([]);

  useEffect(() => {
    listConnections().then(setItems);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <PageHeader title="数据连接与通用限流" />
        <HelpTooltip content="单连接频率示例：1 分钟最多请求 60 次。连接新增、删除和权限升级优先走申请与审批流程。" />
      </div>
      <ConnectionTable items={items} />
    </div>
  );
}
