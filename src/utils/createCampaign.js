import { api } from "./api";

export default async function createCampaign(data) {
  const don = await api.post("/campaign", data);
  return await don.data;
}
