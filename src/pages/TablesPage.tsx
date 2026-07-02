import { useEffect, useState } from "react";

import { PageHeader } from "@/components/shell/PageHeader";
import { TableGovernancePanel } from "@/components/tables/TableGovernancePanel";
import { TableGovernanceTable } from "@/components/tables/TableGovernanceTable";
import { listGovernanceTables } from "@/services/tableService";
import type { TableGovernanceItem } from "@/types";

export function TablesPage() {
  const [items, setItems] = useState<TableGovernanceItem[]>([]);

  useEffect(() => {
    listGovernanceTables().then(setItems);
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Table Governance"
        title="库表治理与增删入口"
        description="统一查看连接下的数据库资产，配置纳管状态、敏感级别、默认数据量和新增删除动作限制。"
      />
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <TableGovernanceTable items={items} />
        <TableGovernancePanel />
      </div>
    </div>
  );
}
