import type { TableGovernanceItem } from "@/types";

export const tableGovernanceItems: TableGovernanceItem[] = [
  {
    id: "tbl-1",
    connectionName: "local-sqlite-governance",
    databaseName: "gatemind_local",
    tableName: "tool_definitions",
    sensitivity: "中",
    status: "managed",
    owner: "平台团队",
    operationMode: "查询 / 注册",
  },
  {
    id: "tbl-2",
    connectionName: "project-postgres-shadow",
    databaseName: "project_hub",
    tableName: "milestone_snapshots",
    sensitivity: "低",
    status: "draft",
    owner: "PMO",
    operationMode: "查询 / 草稿生成",
  },
  {
    id: "tbl-3",
    connectionName: "erp-readonly-mirror",
    databaseName: "erp_mirror",
    tableName: "settlement_orders",
    sensitivity: "高",
    status: "restricted",
    owner: "财务数据组",
    operationMode: "查询 / 禁止导出",
  },
];
