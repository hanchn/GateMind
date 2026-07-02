import { auditEvents } from "@/mocks/audit";

export async function listAuditEvents() {
  return Promise.resolve(auditEvents);
}
