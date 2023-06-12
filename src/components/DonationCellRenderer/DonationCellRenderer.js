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

export default function DontaionCellRenderer( params ) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const donationInput = useRef();
  const id = params.valueFormatted ? params.valueFormatted : params.value;
  const donationCallback = () => {
      makeDonation(id, {value: parseInt(donationInput.current.value)});
      params.setUpdate(true);
  }

  return (
    <Stack className="donation-cell">
        <Button variant="outlined" onClick={handleOpen}>Donate!</Button>
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
            <TextField id="outlined-basic" label="Donation Value" variant="outlined" ref={donationInput} />
            <Button variant="outlined" onClick={donationCallback}>Donate!</Button>
            <Button variant="outlined" onClick={() => {navigator.clipboard.writeText(`http://localhost:3000/wannadonate/to=${id}`)}}>Copy Link</Button>
          </Box>
        </Modal>
    </Stack>
  );
}
