import { Stack, Button, TextField, Modal, Typography, Box, Switch, FormGroup, FormControlLabel } from "@mui/material";
import createCampaign from "../../utils/createCampaign";
import createDonation from "../../utils/createDonation";
import sendCampaignImage from "../../utils/sendCampaignImage";
import { useEffect, useState, useRef } from "react";

export default function CampaignForm() {
  const [campaignList, setCampaignList] = useState([]);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
  const [openForm, setOpenForm] = useState(false);
  const handleCloseForm = () => setOpenForm(false);
  const handleOpenForm = () => setOpenForm(true);
    const [isDonationAdded, setIsDonationAdded] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    status: "pending",
    description: "",
    donations: []
  });

  const [formValuesDonate, setFormValuesDonate] = useState({
    name: "",
    title: "",
    amount: 0,
    value: 0,
    status: "pending",
    description: "",
  });

  const [imagesData, setImagesData] = useState(new FormData());

  const isDonationAddedRef = useRef();

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

  const handleAddDonation = (e) => {
      setIsDonationAdded(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const donation = await createDonation(formValuesDonate);
    setFormValues({...formValues, donations: [donation.is]});
    const campaign = await createCampaign(formValues);
    if(imagesData.image){
        sendCampaignImage(imagesData.append('campaignId', campaign.id));
    }
    setIsFormVisible(false);
    setOpen(true);
  };

  const doUpdateField = (e) => {
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.value,
      });
  };

  const doUpdateFieldDonate = (e) => {
    switch (e.target.name) {
      case "amount":
        setFormValuesDonate({
          ...formValuesDonate,
          [e.target.name]: Number(e.target.value),
        });
        break;
      default:
        setFormValuesDonate({
          ...formValuesDonate,
          [e.target.name]: e.target.value,
        });
    }
  };

    const doUploadImage = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setImagesData(formData);
    };

  return (
    <Stack className="donation-form">
        <Button variant="outlined" onClick={handleOpenForm}>
          Додати нову кампанію
        </Button>
      <Modal
        open={openForm}
        onClose={handleCloseForm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={style}>
        <form id="create-donation" onSubmit={handleSubmit}>
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
            label="Email"
            variant="outlined"
            name="email"
            value={formValues.email}
            onChange={doUpdateField}
          />
          <TextField
            required
            id="outlined-basic"
            label="Телефон"
            variant="outlined"
            name="phone"
            value={formValues.phone}
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
          <FormGroup>
              <FormControlLabel control={<Switch ref={isDonationAddedRef} onChange={handleAddDonation}/>} label="Додати Збір" />
          </FormGroup>
          {isDonationAdded && (
              <>
                <TextField
                  required
                  id="outlined-basic"
                  label="Ваше імʼя (або імʼя того, для кого відкривається збір)"
                  variant="outlined"
                  name="name"
                  value={formValuesDonate.firstName}
                  onChange={doUpdateFieldDonate}
                />
                <TextField
                  required
                  id="outlined-basic"
                  label="Назва збору"
                  variant="outlined"
                  name="title"
                  value={formValuesDonate.title}
                  onChange={doUpdateFieldDonate}
                />
                <TextField
                  required
                  id="outlined-basic"
                  label="Необхідна сума"
                  variant="outlined"
                  name="amount"
                  onChange={doUpdateFieldDonate}
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
                <TextField
                  required
                  id="outlined-basic"
                  label="Опис збору"
                  variant="outlined"
                  name="description"
                  value={formValuesDonate.description}
                  onChange={doUpdateFieldDonate}
                />
            </>
          )}
          <Button variant="contained" component="label">
            Завантажити зображення
            <input hidden accept="image/*" multiple type="file" onChange={doUploadImage} />
          </Button>
          <Button variant="contained" type="submit">
            Додати
          </Button>
        </form>
        </Box>
        </Modal>

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
