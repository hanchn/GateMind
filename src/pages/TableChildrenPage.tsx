import { useEffect, useMemo, useState } from "react";
import { Button, Modal } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";

import { PageHeader } from "@/components/shell/PageHeader";
import { TableGovernancePanel } from "@/components/tables/TableGovernancePanel";
import { TableGovernanceTable } from "@/components/tables/TableGovernanceTable";
import { SectionCard } from "@/components/ui/SectionCard";
import { listGovernanceTables } from "@/services/tableService";
import type { TableGovernanceItem } from "@/types";

function getDatabaseKey(item: Pick<TableGovernanceItem, "connectionName" | "databaseName" | "environment">) {
  return `${item.connectionName}-${item.databaseName}-${item.environment}`;
}

export function TableChildrenPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [items, setItems] = useState<TableGovernanceItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<TableGovernanceItem | undefined>(undefined);
  const [panelMode, setPanelMode] = useState<"view" | "edit">("view");
  const [detailOpen, setDetailOpen] = useState(false);

  const databaseKey = searchParams.get("databaseKey") ?? "";

  useEffect(() => {
    listGovernanceTables().then((data) => {
      setItems(data);
    });
  }, []);

  const filteredItems = useMemo(
    () => items.filter((item) => getDatabaseKey(item) === databaseKey),
    [items, databaseKey],
  );

  const selectedDatabase = filteredItems[0];

  useEffect(() => {
    setSelectedItem(filteredItems[0]);
    setPanelMode("view");
    setDetailOpen(false);
  }, [databaseKey, filteredItems]);

  return (
    <div className="space-y-8">
      <PageHeader
        title={selectedDatabase ? `${selectedDatabase.databaseName} 子表列表` : "子表列表"}
        description={selectedDatabase ? `查看 ${selectedDatabase.connectionName} 下的子表资产与维护信息。` : "查看所选库下的子表列表。"}
      />
      <SectionCard
        title="库信息"
        action={<Button onClick={() => navigate("/tables")}>返回库列表</Button>}
      >
        {selectedDatabase ? (
          <div className="grid gap-4 text-sm text-ink-muted md:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-[0.24em]">所属连接</p>
              <p className="mt-2 text-ink">{selectedDatabase.connectionName}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em]">环境</p>
              <p className="mt-2 text-ink">{selectedDatabase.environment}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em]">子表数量</p>
              <p className="mt-2 text-ink">{filteredItems.length}</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-ink-muted">未找到对应库，请返回库列表重新选择。</p>
        )}
      </SectionCard>
      <SectionCard title="子表列表">
        <TableGovernanceTable
          databaseName={selectedDatabase?.databaseName}
          items={filteredItems}
          onSelect={setSelectedItem}
          onView={(item) => {
            setSelectedItem(item);
            setPanelMode("view");
            setDetailOpen(true);
          }}
          onEdit={(item) => {
            setSelectedItem(item);
            setPanelMode("edit");
            setDetailOpen(true);
          }}
        />
      </SectionCard>
      <Modal
        title={panelMode === "edit" ? "编辑表描述" : "查看表结构"}
        open={detailOpen}
        onCancel={() => setDetailOpen(false)}
        footer={null}
        width={960}
      >
        <TableGovernancePanel
          item={selectedItem}
          mode={panelMode}
          embedded
          onSave={(itemId, updates) => {
            setItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, ...updates } : item)));
            setSelectedItem((prev) => (prev?.id === itemId ? { ...prev, ...updates } : prev));
            setPanelMode("view");
            setDetailOpen(false);
          }}
        />
      </Modal>
    </div>
  );
}
