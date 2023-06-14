import { api } from "./api";

export default async function getCampaignImage(data) {
  const don = await api.get(`/campaign/upload/${data}`);
  return await don.data;
}
