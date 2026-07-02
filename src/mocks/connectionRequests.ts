import type { ConnectionRequest } from "@/types";

export const connectionRequests: ConnectionRequest[] = [
  {
    id: "req-3021",
    name: "接入项目排期 PostgreSQL",
    driver: "PostgreSQL",
    domain: "项目域",
    requester: "林楠",
    scope: "只读 + 表结构元数据",
    reason: "用于项目状态分析和周报生成。",
    status: "pending",
    createdAt: "2026-07-02 15:28",
  },
  {
    id: "req-2988",
    name: "接入 ERP 镜像库",
    driver: "MySQL",
    domain: "财务域",
    requester: "赵毅",
    scope: "只读镜像",
    reason: "用于订单结算对账和异常分析。",
    status: "approved",
    createdAt: "2026-07-01 18:10",
  },
  {
    id: "req-2963",
    name: "接入素材生产库",
    driver: "PostgreSQL",
    domain: "素材域",
    requester: "张琳",
    scope: "读写申请",
    reason: "需要直接修改素材标签和状态。",
    status: "rejected",
    createdAt: "2026-07-01 11:46",
  },
];
