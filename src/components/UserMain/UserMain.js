import { Button, IconButton, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import heartImg from "../../images/heart.png";
import DonationList from "../DonationList/DonationList";

export default function UserMain() {
  const [heartCapacity, setHeartCapacity] = useState(1);
  const [heartSize, setHeartSize] = useState(10);
  const [bodyRootSize, setBodyRootSize] = useState(100);

  const increaseHeartCapacity = () => setHeartCapacity(heartCapacity + 1);
  const bodyRoot = document.getElementById("root");
  bodyRoot.style.zoom = `${bodyRootSize}%`;

  useEffect(() => {
    setHeartSize(heartSize + 10);

    if (heartSize > 20) {
      setBodyRootSize(bodyRootSize - 10);
      bodyRoot.style.zoom = `${bodyRootSize}%`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heartCapacity]);

  return (
    <Stack
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <Typography variant="h3">
        You are the lovelest girl in my heart
      </Typography>
      <Typography variant="h2">
        {`Capacity of my heart: ${heartCapacity}`}
      </Typography>
      <Button variant="contained" onClick={increaseHeartCapacity}>
        Click Me
        <IconButton>
          <FavoriteBorderIcon />
        </IconButton>
      </Button>
      <img
        src={heartImg}
        alt="heart"
        style={{ width: `${heartSize}%`, maxWidth: "100%" }}
      />
      <DonationList />
    </Stack>
  );
}
