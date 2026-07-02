import { tokens } from "@/mocks/tokens";
import type { PersonalToken } from "@/types";

const CURRENT_USER_KEY = "yuanjing";

function formatTokenTimestamp(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  const hour = `${date.getHours()}`.padStart(2, "0");
  const minute = `${date.getMinutes()}`.padStart(2, "0");
  const second = `${date.getSeconds()}`.padStart(2, "0");

  return `${year}${month}${day}${hour}${minute}${second}`;
}

function buildTokenValue() {
  const suffix = Math.random().toString(36).slice(-6);
  return `gtm_usr_${CURRENT_USER_KEY}_${formatTokenTimestamp(new Date())}_${suffix}`;
}

function maskTokenValue(value: string) {
  return `${value.slice(0, 12)}****${value.slice(-4)}`;
}

export async function listPersonalTokens() {
  return Promise.resolve([...tokens]);
}

export async function createPersonalToken(input: {
  name: string;
  scope: string;
  expiresAt: string;
}) {
  const value = buildTokenValue();
  const nextToken: PersonalToken = {
    id: `tok-${tokens.length + 1}`,
    name: input.name,
    scope: input.scope,
    expiresAt: input.expiresAt,
    lastUsedAt: "刚创建",
    status: "active",
    value,
    maskedValue: maskTokenValue(value),
  };

  tokens.unshift(nextToken);
  return Promise.resolve(nextToken);
}
