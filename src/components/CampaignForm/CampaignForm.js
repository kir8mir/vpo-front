import { Stack, Button, TextField, Modal, Typography, Box } from "@mui/material";
import createCampaign from "../../utils/createCampaign";
import { useEffect, useState, useRef } from "react";

export default function CampaignForm() {
  const [campaignList, setCampaignList] = useState([]);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    title: "",
    amount: 0,
    value: 0,
    status: "pending",
    description: "",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    createCampaign(formValues);
    setIsFormVisible(false);
    setOpen(true);
  };

  const doUpdateField = (e) => {
    switch (e.target.name) {
      case "amount":
        setFormValues({
          ...formValues,
          [e.target.name]: Number(e.target.value),
        });
        break;
      default:
        setFormValues({
          ...formValues,
          [e.target.name]: e.target.value,
        });
    }
  };

  return (
    <Stack className="donation-form">
      {!isFormVisible && (
        <Button variant="outlined" onClick={() => setIsFormVisible(true)}>
          Додати нову кампанію
        </Button>
      )}
      {isFormVisible && (
        <form name="create-donation" onSubmit={handleSubmit}>
          <TextField
            required
            id="outlined-basic"
            label="Ваше імʼя (або імʼя того, для кого відкривається кампанія)"
            variant="outlined"
            name="name"
            value={formValues.firstName}
            onChange={doUpdateField}
          />
          <TextField
            required
            id="outlined-basic"
            label="Назва кампанії"
            variant="outlined"
            name="title"
            value={formValues.title}
            onChange={doUpdateField}
          />
          <TextField
            required
            id="outlined-basic"
            label="Необхідна сума"
            variant="outlined"
            name="amount"
            onChange={doUpdateField}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
          <TextField
            required
            id="outlined-basic"
            label="Опис кампанії"
            variant="outlined"
            name="description"
            value={formValues.description}
            onChange={doUpdateField}
          />
          <Button variant="contained" type="submit">
            Додати
          </Button>
        </form>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Кампанію успішно створено!
      </Typography>
      </Box>
    </Modal>
    </Stack>
  );
}
