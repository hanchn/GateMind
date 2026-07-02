import { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";

import { PageHeader } from "@/components/shell/PageHeader";
import { DatabaseListPanel } from "@/components/tables/DatabaseListPanel";
import { SectionCard } from "@/components/ui/SectionCard";
import { HelpTooltip } from "@/components/ui/HelpTooltip";
import { listGovernanceTables } from "@/services/tableService";
import type { TableGovernanceItem } from "@/types";

export function TablesPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState<TableGovernanceItem[]>([]);
  const [selectedDatabaseKey, setSelectedDatabaseKey] = useState<string | undefined>(undefined);
  const [databaseDescriptions, setDatabaseDescriptions] = useState<Record<string, string>>({});
  const [isEditingDatabaseDescription, setIsEditingDatabaseDescription] = useState(false);

  const getDatabaseKey = (item: Pick<TableGovernanceItem, "connectionName" | "databaseName" | "environment">) =>
    `${item.connectionName}-${item.databaseName}-${item.environment}`;

  useEffect(() => {
    listGovernanceTables().then((data) => {
      setItems(data);
      setSelectedDatabaseKey(undefined);
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
 
  function openDatabaseDetail(databaseKey: string) {
    setSelectedDatabaseKey(databaseKey);
    setIsEditingDatabaseDescription(true);
  }

  function closeDatabaseDetail() {
    setSelectedDatabaseKey(undefined);
    setIsEditingDatabaseDescription(false);
  }

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
      <DatabaseListPanel
        databases={databases}
        selectedDatabaseKey={selectedDatabaseKey}
        onEditDescription={openDatabaseDetail}
        onViewTables={(databaseKey) => navigate(`/tables/children?databaseKey=${encodeURIComponent(databaseKey)}`)}
      />
      <Modal
        title={selectedDatabase ? `${selectedDatabase.databaseName} 库详情` : "库详情"}
        open={Boolean(selectedDatabase)}
        onCancel={closeDatabaseDetail}
        width={820}
        footer={
          selectedDatabase
            ? [
                <Button key="close" onClick={closeDatabaseDetail}>
                  关闭
                </Button>,
                isEditingDatabaseDescription ? (
                  <Button key="cancel" onClick={() => setIsEditingDatabaseDescription(false)}>
                    取消
                  </Button>
                ) : null,
                isEditingDatabaseDescription ? (
                  <Button key="save" onClick={() => setIsEditingDatabaseDescription(false)}>
                    保存库描述
                  </Button>
                ) : null,
              ].filter(Boolean)
            : []
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
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
