import { Stack, Typography } from "@mui/material";

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
    </Stack>
  );
}
