import { SectionCard } from "@/components/ui/SectionCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { TableGovernanceItem } from "@/types";

interface TableGovernancePanelProps {
  item?: TableGovernanceItem;
}

export function TableGovernancePanel({ item }: TableGovernancePanelProps) {
  if (!item) {
    return (
      <SectionCard title="库表详情" eyebrow="Table Detail">
        <p className="text-sm leading-7 text-ink-muted">点击左侧任意库表后，这里会展示它所属连接、字段数量、预估数据量和当前纳管状态。</p>
      </SectionCard>
    );
  }

  return (
    <SectionCard title={`${item.databaseName}.${item.tableName}`} eyebrow="Table Detail">
      <div className="space-y-4 text-sm leading-7 text-ink-muted">
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={item.status} />
          <span className="text-sm text-ink-muted">敏感级别：{item.sensitivity}</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.24em]">所属连接</p>
            <p className="mt-2 text-ink">{item.connectionName}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em]">负责人</p>
            <p className="mt-2 text-ink">{item.owner}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em]">字段数量</p>
            <p className="mt-2 text-ink">{item.fieldCount}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em]">预估行数</p>
            <p className="mt-2 text-ink">{item.estimatedRows}</p>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.24em]">可用动作</p>
          <p className="mt-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-ink">{item.operationMode}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.24em]">页面定位</p>
          <p className="mt-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-ink">
            这里优先展示库和表本身，让用户先看清有哪些数据库资产，再决定后续是否做纳管、脱敏和工具暴露。
          </p>
        </div>
      </div>
    </SectionCard>
  );
}
