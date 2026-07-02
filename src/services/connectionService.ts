import { connections } from "@/mocks/connections";

export async function listConnections() {
  return Promise.resolve(connections);
}
