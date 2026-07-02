import { tableGovernanceItems } from "@/mocks/tables";

export async function listGovernanceTables() {
  return Promise.resolve(tableGovernanceItems);
}
