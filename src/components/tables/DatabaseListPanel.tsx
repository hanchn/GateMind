import { Button } from "antd";

import { SectionCard } from "@/components/ui/SectionCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { TableGovernanceItem } from "@/types";

interface DatabaseListPanelProps {
  databases: Array<{
    databaseName: string;
    environment: string;
    connectionName: string;
    tableCount: number;
  }>;
  selectedDatabaseName?: string;
  onSelect: (databaseName: string) => void;
}

export function DatabaseListPanel({
  databases,
  selectedDatabaseName,
  onSelect,
}: DatabaseListPanelProps) {
  return (
    <SectionCard title="库列表" eyebrow="Database Assets">
      <div className="max-h-[620px] space-y-3 overflow-auto pr-1">
        {databases.map((database) => (
          <Button
            key={`${database.connectionName}-${database.databaseName}-${database.environment}`}
            type={selectedDatabaseName === database.databaseName ? "primary" : "default"}
            block
            className="!h-auto !py-4 text-left"
            onClick={() => onSelect(database.databaseName)}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-ink">{database.databaseName}</p>
                <p className="mt-1 text-xs text-ink-muted">{database.connectionName}</p>
              </div>
              <StatusBadge status={selectedDatabaseName === database.databaseName ? "active" : "draft"} />
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-ink-muted">
              <span>环境：{database.environment}</span>
              <span>表数：{database.tableCount}</span>
            </div>
          </Button>
        ))}
      </div>
    </SectionCard>
  );
}
