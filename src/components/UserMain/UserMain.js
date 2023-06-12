import { Button, IconButton, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import DonationList from "../DonationList/DonationList";
import DonationForm from "../DonationForm/DonationForm";

export default function UserMain() {

  return (
    <Stack
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: "20px",
      }}
    >

      <Stack
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
          <DonationList />
          <DonationForm />
        </Stack>

          <Stack
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
              <DonationList />
              <DonationForm />
            </Stack>
    </Stack>
  );
}
