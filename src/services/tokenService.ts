import { tokens } from "@/mocks/tokens";
import type { PersonalToken } from "@/types";

export async function listPersonalTokens() {
  return Promise.resolve(tokens);
}

export async function createPersonalToken(input: {
  name: string;
  scope: string;
  expiresAt: string;
}) {
  const nextToken: PersonalToken = {
    id: `tok-${tokens.length + 1}`,
    name: input.name,
    scope: input.scope,
    expiresAt: input.expiresAt,
    lastUsedAt: "刚创建",
    status: "active",
    maskedValue: `gtm_usr_****${Math.random().toString(36).slice(-4)}`,
  };

  tokens.unshift(nextToken);
  return Promise.resolve(nextToken);
}
