import { api } from "./api";

export default async function changeDonationStatus(id) {
  const don = await api.post("/donation/activate/"+id);
  return await don.data;
}
