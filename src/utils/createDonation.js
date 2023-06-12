import { api } from "./api";

export default async function createDontaion(data) {
  const don = await api.post("/donation", data);
  return await don.data;
}
