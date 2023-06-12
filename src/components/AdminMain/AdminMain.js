import { Stack, Typography } from "@mui/material";
import DonationAdminList from "../DonationAdminList/DonationAdminList";

export default function AdminMain() {

  return (
    <Stack
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: '20px'
      }}
    >
      <Typography variant="h3">
        This is Admin Page
      </Typography>
    <DonationAdminList />
    </Stack>
  );
}
