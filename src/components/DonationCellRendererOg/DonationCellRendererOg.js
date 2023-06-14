import {
  Stack,
  Button,
  TextField,
  Typography,
  Modal,
  Box,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import makeDonation from "../../utils/makeDonation";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import getOneDontaion from "../../utils/getOneDontaion";
import heart from '../../images/heart.png'

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
  alignItems: "stretch",
  textAlign: "center",
};

export default function DontaionCellRendererOg(props) {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [currentDonation, setCurrentDonation] = useState({});
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      setCurrentDonation(await getOneDontaion(id));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const donationInput = useRef();

  console.log("props.match.params.id", id);
  const donationCallback = () => {
    makeDonation(id, { value: parseInt(donationInput.current.value) });
  };

  return (
    <>
      <Helmet>
        <meta property="og:title" content={currentDonation.title} />
        <meta property="og:description" content={currentDonation.description} />
        <meta property="og:image" content={heart} />
      </Helmet>
      <Stack className="donation-cell">
        <Button variant="outlined" onClick={handleOpen}>
          Donate!
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Enter Donation Amount
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {currentDonation.title}
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {currentDonation.description}
            </Typography>
            <TextField
              id="outlined-basic"
              label="Donation Value"
              variant="outlined"
              ref={donationInput}
            />
            <Button variant="outlined" onClick={donationCallback}>
              Donate!
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                navigator.clipboard.writeText(
                  `http://89.40.2.236:3013/wannadonate/${id}`
                );
              }}
            >
              Copy Link
            </Button>
          </Box>
        </Modal>
      </Stack>
    </>
  );
}
