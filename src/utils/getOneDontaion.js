import { api } from "./api";

export default async function getOneDontaion(id) {
  const don = await api.get(`/donation/${id}`);
  return await don.data;
}
