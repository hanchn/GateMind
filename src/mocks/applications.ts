import type { ApplicationCredential } from "@/types";

export const applications: ApplicationCredential[] = [
  {
    id: "app-1",
    name: "项目里程碑助手",
    description: "用于统一查询项目里程碑、进度状态和关键节点变化。",
    integrationDoc: "项目里程碑助手接入文档",
    domain: "项目域",
    owner: "林楠",
    appId: "gm_app_project_hub_01",
    appSecret: "gm_sec_project_hub_20260702_a91xkq",
    status: "active",
    updatedAt: "2026-07-02 17:50",
    tablePermissions: {
      "project_hub.milestone_snapshots": ["read", "update"],
      "gatemind_local.tool_definitions": ["read"],
    },
  },
  {
    id: "app-2",
    name: "审批审计助手",
    description: "用于查看审批进度、审计记录和高风险变更处理结果。",
    integrationDoc: "审批审计助手接入文档",
    domain: "治理域",
    owner: "王璇",
    appId: "gm_app_approval_audit_02",
    appSecret: "gm_sec_approval_audit_20260702_b72mzt",
    status: "draft",
    updatedAt: "2026-07-02 16:10",
    tablePermissions: {
      "project_hub.project_tasks": ["read"],
      "erp_mirror.settlement_orders": ["read", "create"],
    },
  },
];
