import { domains } from "@/mocks/domains";

export async function listDomains() {
  return Promise.resolve(domains);
}
