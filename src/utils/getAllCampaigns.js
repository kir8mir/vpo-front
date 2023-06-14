import { api } from "./api";

export default async function getAllCampaigns() {
  const don = await api.get("/campaign");
  return await don.data;
}
