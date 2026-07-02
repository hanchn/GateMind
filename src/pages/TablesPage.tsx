import { useEffect, useState } from "react";

import { PageHeader } from "@/components/shell/PageHeader";
import { TableGovernancePanel } from "@/components/tables/TableGovernancePanel";
import { TableGovernanceTable } from "@/components/tables/TableGovernanceTable";
import { listGovernanceTables } from "@/services/tableService";
import type { TableGovernanceItem } from "@/types";

export function TablesPage() {
  const [items, setItems] = useState<TableGovernanceItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<TableGovernanceItem | undefined>(undefined);

  useEffect(() => {
    listGovernanceTables().then((data) => {
      setItems(data);
      setSelectedItem(data[0]);
    });
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Table Governance"
        title="库表展示与资产总览"
        description="这里优先展示连接下有哪些库、有哪些表、字段数量和数据规模，再在此基础上叠加纳管状态。"
      />
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <TableGovernanceTable items={items} onSelect={setSelectedItem} />
        <TableGovernancePanel item={selectedItem} />
      </div>
    </div>
  );
}
