import { api } from "./api";

export default async function sendCampaignImage(data) {
  const don = await api.post("/campaign/upload", data);
  return await don.data;
}
