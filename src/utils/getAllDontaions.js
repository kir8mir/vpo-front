import { api } from "./api";

export default async function getAllDontaions() {
  const don = await api.get(`/donation`);
  return await don.data;
}
