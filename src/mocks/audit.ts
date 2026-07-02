import type { AuditEvent } from "@/types";

export const auditEvents: AuditEvent[] = [
  {
    id: "audit-1",
    traceId: "trace-87afd",
    actor: "gate-agent-prod",
    toolName: "query_inventory_snapshot",
    domain: "库存域",
    decision: "allow",
    createdAt: "2026-07-02 11:02:23",
    summary: "读取华东仓库存快照，敏感字段已脱敏。",
  },
  {
    id: "audit-2",
    traceId: "trace-87b31",
    actor: "ops-console",
    toolName: "update_price_preview",
    domain: "商品域",
    decision: "approval_required",
    createdAt: "2026-07-02 10:48:10",
    summary: "命中价格策略，生成 Level 4 变更单。",
  },
  {
    id: "audit-3",
    traceId: "trace-87b92",
    actor: "gate-agent-prod",
    toolName: "get_project_status",
    domain: "项目域",
    decision: "allow",
    createdAt: "2026-07-02 10:15:41",
    summary: "返回项目燃尽状态、阻塞事项和里程碑偏差。",
  },
  {
    id: "audit-4",
    traceId: "trace-87c11",
    actor: "ops-console",
    toolName: "publish_product",
    domain: "商品域",
    decision: "executed",
    createdAt: "2026-07-02 09:21:05",
    summary: "审批通过后执行商品发布，保留上线前后快照。",
  },
];
