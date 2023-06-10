import { Stack, Typography } from "@mui/material";

export default function DonationItem({ donation }) {
  const { title, description, created_at } = donation;
  return (
    <Stack>
      <Typography variant="h4"> {title} {created_at}</Typography>
    </Stack>
  );
}
