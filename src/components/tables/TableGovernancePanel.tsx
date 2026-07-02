import { useEffect, useMemo, useState } from "react";
import { Button } from "antd";

import { SectionCard } from "@/components/ui/SectionCard";
import { HelpTooltip } from "@/components/ui/HelpTooltip";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { TableGovernanceItem } from "@/types";

interface TableGovernancePanelProps {
  item?: TableGovernanceItem;
  mode?: "view" | "edit";
  embedded?: boolean;
  onSave?: (itemId: string, updates: Pick<TableGovernanceItem, "description" | "sensitivity">) => void;
}

const tableStructures: Record<
  string,
  Array<{ name: string; type: string; nullable: string; description: string }>
> = {
  tool_definitions: [
    { name: "id", type: "TEXT", nullable: "否", description: "工具主键 ID" },
    { name: "name", type: "TEXT", nullable: "否", description: "工具名称" },
    { name: "version", type: "TEXT", nullable: "否", description: "当前版本号" },
    { name: "risk_level", type: "INTEGER", nullable: "否", description: "风险等级" },
    { name: "owner", type: "TEXT", nullable: "是", description: "负责人" },
  ],
  milestone_snapshots: [
    { name: "snapshot_id", type: "BIGINT", nullable: "否", description: "快照主键" },
    { name: "project_id", type: "BIGINT", nullable: "否", description: "项目 ID" },
    { name: "milestone_name", type: "VARCHAR(128)", nullable: "否", description: "里程碑名称" },
    { name: "planned_date", type: "TIMESTAMP", nullable: "是", description: "计划时间" },
    { name: "risk_status", type: "VARCHAR(32)", nullable: "是", description: "风险状态" },
  ],
  settlement_orders: [
    { name: "order_id", type: "BIGINT", nullable: "否", description: "结算订单 ID" },
    { name: "settlement_no", type: "VARCHAR(64)", nullable: "否", description: "结算单号" },
    { name: "amount", type: "DECIMAL(18,2)", nullable: "否", description: "结算金额" },
    { name: "currency", type: "VARCHAR(16)", nullable: "否", description: "币种" },
    { name: "settlement_status", type: "VARCHAR(32)", nullable: "否", description: "结算状态" },
  ],
  project_tasks: [
    { name: "task_id", type: "BIGINT", nullable: "否", description: "任务 ID" },
    { name: "project_id", type: "BIGINT", nullable: "否", description: "所属项目 ID" },
    { name: "task_name", type: "VARCHAR(128)", nullable: "否", description: "任务名称" },
    { name: "assignee", type: "VARCHAR(64)", nullable: "是", description: "负责人" },
    { name: "due_at", type: "TIMESTAMP", nullable: "是", description: "截止时间" },
  ],
  order_items: [
    { name: "item_id", type: "BIGINT", nullable: "否", description: "明细行 ID" },
    { name: "order_id", type: "BIGINT", nullable: "否", description: "所属订单 ID" },
    { name: "sku_code", type: "VARCHAR(64)", nullable: "否", description: "SKU 编码" },
    { name: "quantity", type: "INTEGER", nullable: "否", description: "数量" },
    { name: "item_amount", type: "DECIMAL(18,2)", nullable: "否", description: "明细金额" },
  ],
  policy_rules: [
    { name: "rule_id", type: "TEXT", nullable: "否", description: "规则 ID" },
    { name: "rule_name", type: "TEXT", nullable: "否", description: "规则名称" },
    { name: "effect", type: "TEXT", nullable: "否", description: "规则效果" },
    { name: "priority", type: "INTEGER", nullable: "否", description: "优先级" },
    { name: "approval_flow", type: "TEXT", nullable: "是", description: "审批流程" },
  ],
};

export function TableGovernancePanel({ item, mode = "view", embedded = false, onSave }: TableGovernancePanelProps) {
  const [draftDescription, setDraftDescription] = useState(item?.description ?? "");
  const [draftSensitivity, setDraftSensitivity] = useState(item?.sensitivity ?? "中");
  const fields = useMemo(() => (item ? tableStructures[item.tableName] ?? [] : []), [item]);

  useEffect(() => {
    setDraftDescription(item?.description ?? "");
    setDraftSensitivity(item?.sensitivity ?? "中");
  }, [item]);

  if (!item) {
    return embedded ? <p className="text-sm text-ink-muted">点击表列表中的查看或编辑。</p> : <SectionCard title="表详情"><p className="text-sm text-ink-muted">点击左侧表列表中的查看或编辑。</p></SectionCard>;
  }

  const content = (
    <div className="space-y-4 text-sm text-ink-muted">
      <div className="flex flex-wrap items-center gap-3">
        <StatusBadge status={item.status} />
        <span className="text-sm text-ink-muted">敏感级别：{item.sensitivity}</span>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.24em]">所属库</p>
          <p className="mt-2 text-ink">{item.databaseName}</p>
        </div>
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
        <div>
          <p className="text-xs uppercase tracking-[0.24em]">可用动作</p>
          <p className="mt-2 text-ink">{item.operationMode}</p>
        </div>
      </div>
      {mode === "edit" ? (
        <>
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em]">
              <p>库表详细描述</p>
              <HelpTooltip content="补充表用途、口径和主要字段说明。" />
            </div>
            <textarea
              value={draftDescription}
              onChange={(event) => setDraftDescription(event.target.value)}
              rows={4}
              className="mt-2 w-full border border-[#d9e1ec] bg-[#f8fafc] p-4 text-[#0f172a] outline-none"
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
              className="mt-2 w-full border border-[#d9e1ec] bg-[#f8fafc] px-4 py-3 text-[#0f172a] outline-none"
            >
              <option>低</option>
              <option>中</option>
              <option>高</option>
              <option>极高</option>
            </select>
          </div>
          <Button
            block
            onClick={() => {
              onSave?.(item.id, {
                description: draftDescription,
                sensitivity: draftSensitivity,
              });
            }}
          >
            保存表维护
          </Button>
        </>
      ) : (
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em]">
            <p>表结构</p>
            <HelpTooltip content="查看当前表的核心字段、类型和字段说明。" />
          </div>
          <div className="mt-2 border border-[#e6ebf5]">
            <div className="grid grid-cols-[1.1fr_1fr_88px_1.4fr] border-b border-[#e6ebf5] bg-[#f8fafc] px-4 py-3 text-xs uppercase tracking-[0.2em] text-ink-muted">
              <span>字段名</span>
              <span>类型</span>
              <span>可空</span>
              <span>说明</span>
            </div>
            {fields.map((field) => (
              <div key={field.name} className="grid grid-cols-[1.1fr_1fr_88px_1.4fr] border-b border-[#e6ebf5] px-4 py-3 last:border-b-0">
                <span className="font-semibold text-ink">{field.name}</span>
                <span className="text-ink">{field.type}</span>
                <span className="text-ink">{field.nullable}</span>
                <span className="text-ink">{field.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div>
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em]">
          <p>库表详细描述</p>
          <HelpTooltip content="用于说明表的业务用途和维护口径。" />
        </div>
        <p className="mt-2 border border-[#e6ebf5] bg-[#f8fafc] p-4 text-ink">{item.description}</p>
      </div>
    </div>
  );

  if (embedded) {
    return content;
  }

  return (
    <SectionCard
      title={mode === "edit" ? `${item.tableName} / 编辑描述` : `${item.tableName} / 表结构`}
      action={
        <div className="flex items-center gap-3">
          <HelpTooltip content={mode === "edit" ? "维护表描述和敏感级别。" : "查看当前表的字段结构和基础信息。"} />
        </div>
      }
    >
      {content}
    </SectionCard>
  );
}
