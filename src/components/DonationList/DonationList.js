import { Stack } from "@mui/material";
import getAllDontaions from "../../utils/getAllDontaions";
import DonationItem from "../DontaionItem/DonationItem";
import { useEffect, useState } from "react";

export default function DonationList() {
  const [donationList, setDonationList] = useState([]);

  useEffect(() => {
    (async () => {
      const donationList = await getAllDontaions();
      setDonationList(donationList);
    })();
  }, []);

  return (
    <Stack>
      {donationList.map((donation) => (
        <DonationItem key={donation.id} donation={donation} />
      ))}
    </Stack>
  );
}
