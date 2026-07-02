import type { ApplicationCredential } from "@/types";

export const applications: ApplicationCredential[] = [
  {
    id: "app-1",
    name: "项目里程碑助手",
    domain: "项目域",
    owner: "林楠",
    appId: "gm_app_project_hub_01",
    appSecret: "gm_sec_project_hub_20260702_a91xkq",
    status: "active",
    createdAt: "2026-07-02 17:50",
  },
  {
    id: "app-2",
    name: "审批审计助手",
    domain: "治理域",
    owner: "王璇",
    appId: "gm_app_approval_audit_02",
    appSecret: "gm_sec_approval_audit_20260702_b72mzt",
    status: "draft",
    createdAt: "2026-07-02 16:10",
  },
];
