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
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: "20px",
      }}
    >
      <Typography variant="h3">
          Допоможемо ВПО разом!
      </Typography>
      <Typography >
          Вітаємо вас на нашому благодійному веб-сервісі для організації допомоги ВПО. Тут ви можете отримати допомогу якщо вона вам потрібна, або допомогти тим, хто потребує допомоги. Кожен новий збір проходить модерацію організаторами, тому будь ласка, робіть донати тільки на активні збори. Щоб допомогти кампанії, будь ласка, звʼяжіться з організаторами обраної вами кампанії напряму. Будьте обережні, завжди перевіряйте надану вам інформацію щоб не стати жертвою шахрайства! 
      </Typography>
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
</Stack>
  );
}
