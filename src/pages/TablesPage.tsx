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
  const [selectedDatabaseKey, setSelectedDatabaseKey] = useState<string | undefined>(undefined);
  const [selectedItem, setSelectedItem] = useState<TableGovernanceItem | undefined>(undefined);
  const [showTableList, setShowTableList] = useState(false);
  const [databaseDescriptions, setDatabaseDescriptions] = useState<Record<string, string>>({});
  const [isEditingDatabaseDescription, setIsEditingDatabaseDescription] = useState(false);

  const getDatabaseKey = (item: Pick<TableGovernanceItem, "connectionName" | "databaseName" | "environment">) =>
    `${item.connectionName}-${item.databaseName}-${item.environment}`;

  useEffect(() => {
    listGovernanceTables().then((data) => {
      setItems(data);
      setSelectedDatabaseKey(undefined);
      setSelectedItem(undefined);
      setShowTableList(false);
      setDatabaseDescriptions(
        data.reduce<Record<string, string>>((acc, item) => {
          const key = getDatabaseKey(item);
          if (!acc[key]) {
            acc[key] = `${item.databaseName} 库用于统一沉淀 ${item.connectionName} 在${item.environment}环境下的业务表资产说明。`;
          }
          return acc;
        }, {}),
      );
    });
  }, []);

  const databases = Object.values(
    items.reduce<
      Record<string, { key: string; databaseName: string; environment: string; connectionName: string; tableCount: number }>
    >(
      (acc, item) => {
        const key = getDatabaseKey(item);
        if (!acc[key]) {
          acc[key] = {
            key,
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

  const selectedDatabase = databases.find((database) => database.key === selectedDatabaseKey);
  const filteredItems = selectedDatabase
    ? items.filter((item) => getDatabaseKey(item) === selectedDatabase.key)
    : [];

  return (
    <div className="space-y-8">
      <PageHeader title="库表展示与资产总览" />
      <SectionCard
        title="录入库表"
        action={
          <div className="flex items-center gap-3">
            <HelpTooltip content="先扫描连接下的数据库和表结构，录入后再统一展示和维护。" />
            <Button>扫描并录入库表</Button>
          </div>
        }
      >
        <p className="text-sm text-ink-muted">先扫描录入，再统一展示和维护。</p>
      </SectionCard>
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <DatabaseListPanel
          databases={databases}
          selectedDatabaseKey={selectedDatabaseKey}
          onSelect={(databaseKey) => {
            setSelectedDatabaseKey(databaseKey);
            setSelectedItem(undefined);
            setShowTableList(false);
            setIsEditingDatabaseDescription(false);
          }}
        />
        {showTableList && selectedDatabase ? (
          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <SectionCard
              title={`${selectedDatabase.databaseName} 表列表`}
              action={<Button onClick={() => setShowTableList(false)}>返回库说明</Button>}
            >
              <TableGovernanceTable
                databaseName={selectedDatabase.databaseName}
                items={filteredItems}
                onSelect={setSelectedItem}
              />
            </SectionCard>
            <TableGovernancePanel
              item={selectedItem}
              onSave={(itemId, updates) => {
                setItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, ...updates } : item)));
                setSelectedItem((prev) => (prev?.id === itemId ? { ...prev, ...updates } : prev));
              }}
            />
          </div>
        ) : (
          <SectionCard
            title={selectedDatabase ? `${selectedDatabase.databaseName} 库说明` : "库说明"}
            action={
              selectedDatabase ? (
                <div className="flex items-center gap-3">
                  {isEditingDatabaseDescription ? (
                    <Button onClick={() => setIsEditingDatabaseDescription(false)}>取消</Button>
                  ) : (
                    <Button onClick={() => setIsEditingDatabaseDescription(true)}>编辑库描述</Button>
                  )}
                  <Button onClick={() => setShowTableList(true)}>查看表列表</Button>
                </div>
              ) : undefined
            }
          >
            {selectedDatabase ? (
              <div className="space-y-4 text-sm text-ink-muted">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em]">所属连接</p>
                    <p className="mt-2 text-ink">{selectedDatabase.connectionName}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em]">环境</p>
                    <p className="mt-2 text-ink">{selectedDatabase.environment}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em]">表数量</p>
                    <p className="mt-2 text-ink">{selectedDatabase.tableCount}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em]">库描述</p>
                  <textarea
                    rows={5}
                    value={databaseDescriptions[selectedDatabase.key] ?? ""}
                    disabled={!isEditingDatabaseDescription}
                    onChange={(event) =>
                      setDatabaseDescriptions((prev) => ({
                        ...prev,
                        [selectedDatabase.key]: event.target.value,
                      }))
                    }
                    className="mt-2 w-full rounded-2xl border border-[#d9e1ec] bg-[#f8fafc] p-4 text-[#0f172a] outline-none disabled:cursor-not-allowed disabled:bg-[#f8fafc]"
                  />
                </div>
                {isEditingDatabaseDescription ? (
                  <Button onClick={() => setIsEditingDatabaseDescription(false)}>保存库描述</Button>
                ) : null}
              </div>
            ) : (
              <p className="text-sm text-ink-muted">默认先展示库列表。选择一个库后，可在右侧查看说明并进入表列表。</p>
            )}
          </SectionCard>
        )}
      </div>
    </div>
  );
}
