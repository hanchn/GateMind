import { useEffect, useState } from "react";

import { SectionCard } from "@/components/ui/SectionCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { TableGovernanceItem } from "@/types";

interface TableGovernancePanelProps {
  item?: TableGovernanceItem;
}

export function TableGovernancePanel({ item }: TableGovernancePanelProps) {
  const [draftDescription, setDraftDescription] = useState(item?.description ?? "");
  const [draftSensitivity, setDraftSensitivity] = useState(item?.sensitivity ?? "中");

  useEffect(() => {
    setDraftDescription(item?.description ?? "");
    setDraftSensitivity(item?.sensitivity ?? "中");
  }, [item]);

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
          <p className="text-xs uppercase tracking-[0.24em]">库表详细描述</p>
          <textarea
            value={draftDescription}
            onChange={(event) => setDraftDescription(event.target.value)}
            rows={4}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-ink outline-none"
          />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.24em]">表的敏感级别</p>
          <select
            value={draftSensitivity}
            onChange={(event) => setDraftSensitivity(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-ink outline-none"
          >
            <option>低</option>
            <option>中</option>
            <option>高</option>
            <option>极高</option>
          </select>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.24em]">可用动作</p>
          <p className="mt-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-ink">{item.operationMode}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.24em]">二次维护说明</p>
          <p className="mt-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-ink">
            库表第一次初始化录入后，可以在这里继续二次维护，包括补充详细描述、调整敏感级别，以及修正后续纳管规则。
          </p>
        </div>
        <button className="w-full rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-100 transition hover:bg-cyan-500/20">
          保存库表维护
        </button>
      </div>
    </SectionCard>
  );
}
