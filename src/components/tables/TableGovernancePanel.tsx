import { useEffect, useState } from "react";

import { SectionCard } from "@/components/ui/SectionCard";
import { HelpTooltip } from "@/components/ui/HelpTooltip";
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
      <SectionCard title="库表详情">
        <p className="text-sm text-ink-muted">选择库表后查看详情。</p>
      </SectionCard>
    );
  }

  return (
    <SectionCard
      title={`${item.databaseName}.${item.tableName}`}
      action={<HelpTooltip content="初始化录入后，可在这里补充描述、调整敏感级别并维护纳管信息。" />}
    >
      <div className="space-y-4 text-sm text-ink-muted">
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
            <p className="text-xs uppercase tracking-[0.24em]">环境</p>
            <p className="mt-2 text-ink">{item.environment}</p>
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
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em]">
            <p>库表详细描述</p>
            <HelpTooltip content="补充表用途、口径和主要字段说明。" />
          </div>
          <textarea
            value={draftDescription}
            onChange={(event) => setDraftDescription(event.target.value)}
            rows={4}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-ink outline-none"
          />
        </div>
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em]">
            <p>表的敏感级别</p>
            <HelpTooltip content="用于标记数据敏感程度，影响后续暴露和审批策略。" />
          </div>
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
          <p className="mt-2 text-ink">{item.operationMode}</p>
        </div>
        <button className="w-full rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-100 transition hover:bg-cyan-500/20">
          保存库表维护
        </button>
      </div>
    </SectionCard>
  );
}
