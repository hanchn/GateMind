import type { PersonalToken } from "@/types";

export const tokens: PersonalToken[] = [
  {
    id: "tok-1",
    name: "CLI 本地调试",
    scope: "工具查询、审计查看",
    expiresAt: "2026-08-01",
    lastUsedAt: "2026-07-02 16:30",
    status: "active",
    maskedValue: "gtm_cli_****x91a",
  },
  {
    id: "tok-2",
    name: "项目机器人",
    scope: "项目域只读 + 草稿",
    expiresAt: "2026-07-18",
    lastUsedAt: "2026-07-02 12:04",
    status: "expiring",
    maskedValue: "gtm_bot_****q73k",
  },
  {
    id: "tok-3",
    name: "旧版测试脚本",
    scope: "工具目录只读",
    expiresAt: "2026-06-28",
    lastUsedAt: "2026-06-27 09:11",
    status: "revoked",
    maskedValue: "gtm_old_****r20v",
  },
];
