import { Stack, Button, TextField, Typography, Modal, Box } from "@mui/material";
import { useState, useRef, useParams, useEffect } from "react";
import makeDonation from "../../utils/makeDonation";
import { Helmet } from "react-helmet";
import getOneDontaion from "../../utils/getOneDontaion";

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

  const [openOptionsModal, setOpenOptionsModal] = useState(false);
  const handleCloseOptionsModal = () => setOpenOptionsModal(false);
  const handleOpenOptionsModal = () => {
      setOpenOptionsModal(true);
  }

  const donationInput = useRef();
  const [currentDonation, setCurrentDonation] = useState({});
  const id = params.valueFormatted ? params.valueFormatted : params.data.id;

  const createdAt = new Date(params.data.created_at);
  const createdAtYear = createdAt.getFullYear();
  const createdAtMonth = createdAt.getMonth() + 1;
  const createdAtDay = createdAt.getDate();

  useEffect(() => {
    (async () => {
      setCurrentDonation(await getOneDontaion(id));
    })();
  }, []);

  const donationCallback = () => {
      let amount = Number(donationInput.current.querySelector("input").value);
      makeDonation(id, {value: amount});
      params.handleUpdate();
  }

  return (
      <>
    <Helmet>
      <meta property="og:title" content={currentDonation.title} />
      <meta property="og:description" content={currentDonation.description} />
    </Helmet>
    <Stack className="donation-cell">
        <Button variant="outlined" onClick={handleOpenOptionsModal}>Інфо</Button>

        <Modal
          open={openOptionsModal}
          onClose={handleCloseOptionsModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Інфо збору:
            </Typography>

              <Typography>
                Імʼя виконавця збору: {params.data.name}
              </Typography>
              <Typography>
                Назва: {params.data.title}
              </Typography>
              <Typography>
                Дата створення: {`${createdAtDay}/${createdAtMonth}/${createdAtYear}`}
              </Typography>
              <Typography>
                Сума збору: {params.data.amount}UAH
              </Typography>
              <Typography>
                Вже зібрано: {params.data.value}UAH
              </Typography>
              <Typography>
                Статус: {params.data.status}
              </Typography>

                <Typography>
                  Опис: {params.data.description}
                </Typography>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Скільки ви б хотіли задонатити?
                </Typography>
                <TextField id="outlined-basic" label="Сума донату" variant="outlined" ref={donationInput} />
                <Button variant="outlined" onClick={donationCallback}>Задонатити</Button>
                <Button variant="outlined" onClick={() => {
                  navigator.clipboard.writeText(
                    `https://vpo.tazasho.shop/wannadonate/${id}`
                  );
              }}>Скопіювати посилання на збір</Button>
            </Box>
        </Modal>
    </Stack>
    </>
  );
}
