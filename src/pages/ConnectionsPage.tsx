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
        <PageHeader title="数据连接与通用限流" description="" />
        <HelpTooltip content="通用连接频率设置示例：1 分钟最多请求 60 次，用于控制单连接级别的总体负载。默认数据量请求设置用于约束默认返回条数、分页上限和最大导出量，避免 AI 一次性请求过大数据集。连接新增、删除和权限升级应优先走连接申请与审批流程，而不是直接操作。" />
      </div>
      <ConnectionTable items={items} />
    </div>
  );
}
