import { Stack, Typography } from "@mui/material";

export default function DonationItem({ donation }) {
  const { title, description } = donation;
  return (
    <Stack>
      <Typography variant="h4"> {title} {description}</Typography>
    </Stack>
  );
}
