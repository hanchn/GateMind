import { useEffect, useState } from "react";

import { PageHeader } from "@/components/shell/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
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
        description="第一次应先初始化录入库表，把连接下的数据库资产扫出来；录入完成后，再在这里统一展示库、表、字段数量和数据规模。"
      />
      <SectionCard
        title="初始化录入库表"
        eyebrow="Initial Import"
        action={
          <button className="rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-100 transition hover:bg-cyan-500/20">
            扫描并录入库表
          </button>
        }
      >
        <div className="grid gap-4 text-sm leading-7 text-ink-muted lg:grid-cols-3">
          <p>第一步：基于连接扫描数据库和表结构。</p>
          <p>第二步：把库表资产录入 GateMind，形成统一资产清单。</p>
          <p>第三步：录入完成后，才进入展示、纳管、创建功能和发布审批。</p>
        </div>
      </SectionCard>
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <TableGovernanceTable items={items} onSelect={setSelectedItem} />
        <TableGovernancePanel item={selectedItem} />
      </div>
    </div>
  );
}
