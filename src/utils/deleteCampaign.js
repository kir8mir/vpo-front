import { api } from "./api";

export default async function deleteCampaign(id) {
  const don = await api.delete("/campaign/"+id);
  return await don.data;
}
