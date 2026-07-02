import { connectionRequests } from "@/mocks/connectionRequests";

export async function listConnectionRequests() {
  return Promise.resolve(connectionRequests);
}
