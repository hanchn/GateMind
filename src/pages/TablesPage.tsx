import { useEffect, useState } from "react";
import { Button } from "antd";

import { PageHeader } from "@/components/shell/PageHeader";
import { DatabaseListPanel } from "@/components/tables/DatabaseListPanel";
import { SectionCard } from "@/components/ui/SectionCard";
import { HelpTooltip } from "@/components/ui/HelpTooltip";
import { TableGovernancePanel } from "@/components/tables/TableGovernancePanel";
import { TableGovernanceTable } from "@/components/tables/TableGovernanceTable";
import { listGovernanceTables } from "@/services/tableService";
import type { TableGovernanceItem } from "@/types";

export function TablesPage() {
  const [items, setItems] = useState<TableGovernanceItem[]>([]);
  const [selectedDatabaseName, setSelectedDatabaseName] = useState<string | undefined>(undefined);
  const [selectedItem, setSelectedItem] = useState<TableGovernanceItem | undefined>(undefined);

  useEffect(() => {
    listGovernanceTables().then((data) => {
      setItems(data);
      setSelectedDatabaseName(data[0]?.databaseName);
      setSelectedItem(data[0]);
    });
  }, []);

  const databases = Object.values(
    items.reduce<Record<string, { databaseName: string; environment: string; connectionName: string; tableCount: number }>>(
      (acc, item) => {
        const key = `${item.connectionName}-${item.databaseName}-${item.environment}`;
        if (!acc[key]) {
          acc[key] = {
            databaseName: item.databaseName,
            environment: item.environment,
            connectionName: item.connectionName,
            tableCount: 0,
          };
        }
        acc[key].tableCount += 1;
        return acc;
      },
      {},
    ),
  );

  const filteredItems = selectedDatabaseName
    ? items.filter((item) => item.databaseName === selectedDatabaseName)
    : items;

  return (
    <div className="space-y-8">
      <PageHeader title="库表展示与资产总览" />
      <SectionCard
        title="录入库表"
        action={
          <div className="flex items-center gap-3">
            <HelpTooltip content="先扫描连接下的数据库和表结构，录入后再统一展示和维护。" />
            <Button type="primary">扫描并录入库表</Button>
          </div>
        }
      >
        <p className="text-sm text-ink-muted">先扫描录入，再统一展示和维护。</p>
      </SectionCard>
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr_0.9fr]">
        <DatabaseListPanel
          databases={databases}
          selectedDatabaseName={selectedDatabaseName}
          onSelect={(databaseName) => {
            setSelectedDatabaseName(databaseName);
            const nextItems = items.filter((item) => item.databaseName === databaseName);
            setSelectedItem(nextItems[0]);
          }}
        />
        <TableGovernanceTable
          databaseName={selectedDatabaseName}
          items={filteredItems}
          onSelect={setSelectedItem}
        />
        <TableGovernancePanel item={selectedItem} />
      </div>
    </div>
  );
}
