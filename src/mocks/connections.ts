import type { ConnectionSummary } from "@/types";

export const connections: ConnectionSummary[] = [
  {
    id: "conn-1",
    name: "local-sqlite-governance",
    environment: "开发环境",
    driver: "SQLite",
    status: "connected",
    owner: "平台团队",
    databaseCount: 1,
    lastCheckedAt: "2026-07-02 16:40",
    requestSource: "系统初始化",
  },
  {
    id: "conn-2",
    name: "project-postgres-shadow",
    environment: "预发布环境",
    driver: "PostgreSQL",
    status: "pending",
    owner: "PMO",
    databaseCount: 4,
    lastCheckedAt: "2026-07-02 14:18",
    requestSource: "申请单 req-3021",
  },
  {
    id: "conn-3",
    name: "erp-readonly-mirror",
    environment: "生产镜像",
    driver: "MySQL",
    status: "failed",
    owner: "财务数据组",
    databaseCount: 12,
    lastCheckedAt: "2026-07-02 13:02",
    requestSource: "申请单 req-2988",
  },
];
