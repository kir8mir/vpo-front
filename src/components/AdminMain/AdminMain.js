import { Stack, Typography } from "@mui/material";
import SearchForm from "../SearchForm/SearchForm";
import DonationAdminList from "../DonationAdminList/DonationAdminList";
import CampaignAdminList from "../CampaignAdminList/CampaignAdminList";

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
            Адміністративна сторінка
        </Typography>
        <Typography >
            Тут ви можете побачити список всіх існуючих пожертвувань і кампаній, змінити статус пожертвування або кампанії, тощо.
        </Typography>


          <Stack
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: '20px'
            }}
          >
              <SearchForm/>
          </Stack>
          <Stack
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: '20px'
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
          <Typography variant="h4" >
              Збори
          </Typography>
          <DonationAdminList />
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
          <Typography variant="h4" >
              Кампанії
          </Typography>
          <CampaignAdminList />
        </Stack>
      </Stack>
    </Stack>
  );
}
