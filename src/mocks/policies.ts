import type { PolicySummary } from "@/types";

export const policies: PolicySummary[] = [
  {
    id: "policy-1",
    name: "库存域查询白名单",
    priority: 100,
    scope: "库存域 / Level 0",
    effect: "allow",
    enabled: true,
    approverFlow: "无需审批",
  },
  {
    id: "policy-2",
    name: "轻量写入确认策略",
    priority: 90,
    scope: "全域 / Level 2",
    effect: "confirm",
    enabled: true,
    approverFlow: "发起人二次确认",
  },
  {
    id: "policy-3",
    name: "商品发布审批策略",
    priority: 80,
    scope: "商品域 / Level 3",
    effect: "approval_required",
    enabled: true,
    approverFlow: "业务负责人审批",
  },
  {
    id: "policy-4",
    name: "极高风险禁写策略",
    priority: 70,
    scope: "全域 / Level 4",
    effect: "deny",
    enabled: true,
    approverFlow: "默认阻断",
  },
];
