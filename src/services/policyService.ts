import { policies } from "@/mocks/policies";

export async function listPolicies() {
  return Promise.resolve(policies);
}
