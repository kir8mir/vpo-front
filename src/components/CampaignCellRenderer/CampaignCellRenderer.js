import { Stack, Button, TextField, Typography, Modal, Box } from "@mui/material";
import { useState, useRef } from "react";
import makeDonation from "../../utils/makeDonation";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  alignItems: 'stretch',
  textAlign: 'center'
};

export default function CampaignCellRenderer( params ) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const donationInput = useRef();
  const id = params.valueFormatted ? params.valueFormatted : params.data.id;

  const donationCallback = () => {
      let amount = Number(donationInput.current.querySelector("input").value);
      makeDonation(id, {value: amount});
      params.handleUpdate();
  }

  return (
    <Stack className="donation-cell">
        {params.data.status !== 'closed' && (
            <Stack>
            <Button variant="outlined" onClick={handleOpen}>Розглянути</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Вкажіть суму донату
                </Typography>
                <TextField id="outlined-basic" label="Скільки ви б хотіли задонатити?" variant="outlined" ref={donationInput} />
                <Button variant="outlined" onClick={donationCallback}>Задонатити</Button>
                <Button variant="outlined" onClick={() => {navigator.clipboard.writeText('LOL')}}>Скопіювати посилання на збір</Button>
              </Box>
            </Modal>
            </Stack>
        )}
    </Stack>
  );
}
