import { applications } from "@/mocks/applications";
import type { ApplicationCredential } from "@/types";

function formatNow() {
  const now = new Date();
  const year = now.getFullYear();
  const month = `${now.getMonth() + 1}`.padStart(2, "0");
  const day = `${now.getDate()}`.padStart(2, "0");
  const hour = `${now.getHours()}`.padStart(2, "0");
  const minute = `${now.getMinutes()}`.padStart(2, "0");
  const second = `${now.getSeconds()}`.padStart(2, "0");

  return {
    compact: `${year}${month}${day}${hour}${minute}${second}`,
    display: `${year}-${month}-${day} ${hour}:${minute}`,
  };
}

function normalizeName(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 24);
}

export async function listApplications() {
  return Promise.resolve([...applications]);
}

export async function createApplication(input: {
  name: string;
  domain: string;
  owner: string;
}) {
  const timestamp = formatNow();
  const suffix = Math.random().toString(36).slice(-6);
  const normalizedName = normalizeName(input.name) || "custom_app";

  const nextApplication: ApplicationCredential = {
    id: `app-${applications.length + 1}`,
    name: input.name,
    domain: input.domain,
    owner: input.owner,
    appId: `gm_app_${normalizedName}_${applications.length + 1}`,
    appSecret: `gm_sec_${normalizedName}_${timestamp.compact}_${suffix}`,
    status: "active",
    createdAt: timestamp.display,
  };

  applications.unshift(nextApplication);
  return Promise.resolve(nextApplication);
}
