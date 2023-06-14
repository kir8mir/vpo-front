import { api } from "./api";

export default async function changeCampaignStatus(id) {
  const don = await api.post("/campaign/activate/"+id);
  return await don.data;
}
