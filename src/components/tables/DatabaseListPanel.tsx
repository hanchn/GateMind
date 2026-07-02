import { Button } from "antd";

import { DataTable } from "@/components/ui/DataTable";
import { SectionCard } from "@/components/ui/SectionCard";
import { StatusBadge } from "@/components/ui/StatusBadge";

interface DatabaseListPanelProps {
  databases: Array<{
    key: string;
    databaseName: string;
    environment: string;
    connectionName: string;
    tableCount: number;
  }>;
  selectedDatabaseKey?: string;
  onEditDescription: (databaseKey: string) => void;
  onViewTables: (databaseKey: string) => void;
}

export function DatabaseListPanel({
  databases,
  selectedDatabaseKey,
  onEditDescription,
  onViewTables,
}: DatabaseListPanelProps) {
  return (
    <SectionCard title="库列表" eyebrow="Database Assets">
      <DataTable
        rowKey={(database) => database.key}
        rows={databases}
        scrollClassName="max-h-[620px] overflow-auto"
        columns={[
          {
            key: "databaseName",
            title: "库名",
            render: (database) => <span className="font-semibold text-ink">{database.databaseName}</span>,
          },
          {
            key: "connectionName",
            title: "连接",
            render: (database) => database.connectionName,
          },
          {
            key: "environment",
            title: "环境",
            render: (database) => database.environment,
          },
          {
            key: "tableCount",
            title: "表数",
            render: (database) => database.tableCount,
          },
          {
            key: "status",
            title: "状态",
            render: (database) => (
              <StatusBadge status={selectedDatabaseKey === database.key ? "active" : "draft"} />
            ),
          },
          {
            key: "actions",
            title: "操作",
            render: (database) => (
              <div className="flex items-center gap-2">
                <Button
                  type="link"
                  onClick={(event) => {
                    event.stopPropagation();
                    onEditDescription(database.key);
                  }}
                >
                  编辑库描述
                </Button>
                <Button
                  type="link"
                  onClick={(event) => {
                    event.stopPropagation();
                    onViewTables(database.key);
                  }}
                >
                  查看子表
                </Button>
              </div>
            ),
          },
        ]}
      />
    </SectionCard>
  );
}
