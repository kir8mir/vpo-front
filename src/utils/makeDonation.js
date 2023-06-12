import { api } from "./api";

export default async function makeDontaion(id, data) {
  const don = await api.patch("/donation/"+id, data);
  return await don.data;
}
