import { api } from "./api";

export default async function deleteDontaion(id) {
  const don = await api.delete("/donation/"+id);
  return await don.data;
}
