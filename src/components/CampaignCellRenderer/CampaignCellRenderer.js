import { Stack, Button, TextField, Typography, Modal, Box } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import makeDonation from "../../utils/makeDonation";
import getOneDontaion from "../../utils/getOneDontaion";
import { Helmet } from "react-helmet";

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
      const [openDonateModal, setOpenDonateModal] = useState(false);
      const handleCloseDonateModal = () => setOpenDonateModal(false);
      const handleOpenDonateModal = () => {
          handleCloseDescriptionModal();
          handleCloseOptionsModal();
          setOpenDonateModal(true);
      }

      const [openDescriptionModal, setOpenDescriptionModal] = useState(false);
      const handleCloseDescriptionModal = () => setOpenDescriptionModal(false);
      const handleOpenDescriptionModal = () => {
          handleCloseDonateModal();
          setOpenDescriptionModal(true);
      }

      const [openOptionsModal, setOpenOptionsModal] = useState(false);
      const handleCloseOptionsModal = () => setOpenOptionsModal(false);
      const handleOpenOptionsModal = () => {
          handleCloseDescriptionModal();
          handleCloseDonateModal();
          setOpenOptionsModal(true);
      }

  const [currentDonation, setCurrentDonation] = useState({});
  const donationId = params.valueFormatted ? params.valueFormatted : params.data.donations[0];
  const donationInput = useRef();
  const id = params.valueFormatted ? params.valueFormatted : params.data.id;

    const createdAt = new Date(params.data.created_at);
    const createdAtYear = createdAt.getFullYear();
    const createdAtMonth = createdAt.getMonth() + 1;
    const createdAtDay = createdAt.getDate();
    const createdAtDonation = new Date(currentDonation.created_at);
    const createdAtYearDonation = createdAtDonation.getFullYear();
      const createdAtMonthDonation = createdAtDonation.getMonth() + 1;
      const createdAtDayDonation = createdAtDonation.getDate();

  const imageId = params.data.images ? params.data.images[0] : '';


      useEffect(() => {
        (async () => {
          if(donationId && donationId != ''){
              setCurrentDonation(await getOneDontaion(donationId));
          }
        })();
      }, []);

  const donationCallback = () => {
      let amount = Number(donationInput.current.querySelector("input").value);
      makeDonation(currentDonation.id, {value: amount});
      params.handleUpdate();
  }

  return (
      <>
    <Helmet>
      <meta property="og:title" content={currentDonation.title} />
      <meta property="og:description" content={currentDonation.description} />
    </Helmet>
    <Stack className="donation-cell">
            <Stack className="donation-cell">
                <Button variant="outlined" onClick={handleOpenOptionsModal}>Опції</Button>

                <Modal
                  open={openOptionsModal}
                  onClose={handleCloseOptionsModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      Опції:
                    </Typography>
                    <Button variant="outlined" onClick={handleOpenDescriptionModal}>Подивитися інфо кампанії</Button>
                    {donationId && donationId !== '' && currentDonation.status !== 'closed' && (<Button variant="outlined" onClick={handleOpenDonateModal}>Задонатити</Button>)}
                    </Box>
                </Modal>
                <Modal
                  open={openDescriptionModal}
                  onClose={handleCloseDescriptionModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Опис кампанії:
                  </Typography>

                    <Typography>
                      Імʼя виконавця кампанії: {params.data.name}
                    </Typography>
                    <Typography>
                      Назва: {params.data.title}
                    </Typography>
                    <Typography>
                      Дата створення: {`${createdAtDay}/${createdAtMonth}/${createdAtYear}`}
                    </Typography>
                    <Typography>
                      Статус: {params.data.status}
                    </Typography>
                    <Button variant="outlined" onClick={() => {
                      navigator.clipboard.writeText(
                        params.data.email
                      );
                      const mailtoLink = `mailto:${params.data.email}`;
                      window.location.href = mailtoLink;
                  }}>Email</Button>
                  <Button variant="outlined" onClick={() => {
                    navigator.clipboard.writeText(
                      params.data.phone
                    );
                    const phoneLink = `tel:${params.data.phone}`;
                    window.location.href = phoneLink;
                }}>Телефон</Button>

                      <Typography>
                        Опис: {params.data.description}
                      </Typography>
                      {imageId && (<img src={`http://89.40.2.236:3031/campaign/upload/${imageId}`} />)}

                      {donationId && donationId !== '' && (
                          <>
                          <Typography id="modal-modal-title" variant="h6" component="h2">
                            Збір до даної кампанії:
                          </Typography>

                            <Typography>
                              Імʼя виконавця збору: {currentDonation.name}
                            </Typography>
                            <Typography>
                              Назва: {currentDonation.title}
                            </Typography>
                            <Typography>
                              Дата створення: {`${createdAtDayDonation}/${createdAtMonthDonation}/${createdAtYearDonation}`}
                            </Typography>
                            <Typography>
                              Сума збору: {currentDonation.amount}UAH
                            </Typography>
                            <Typography>
                              Вже зібрано: {currentDonation.value}UAH
                            </Typography>
                            <Typography>
                              Статус: {currentDonation.status}
                            </Typography>
                          </>
                      )}
                    </Box>
                </Modal>
                <Modal
                  open={openDonateModal}
                  onClose={handleCloseDonateModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      Скільки ви б хотіли задонатити?
                    </Typography>
                    <TextField id="outlined-basic" label="Сума донату" variant="outlined" ref={donationInput} />

                    {currentDonation.status !== 'closed' && (<Button variant="outlined" onClick={donationCallback}>Задонатити</Button>)}
                    <Button variant="outlined" onClick={() => {
                      navigator.clipboard.writeText(
                        `http://89.40.2.236:3031/wannadonate/${id}`
                      );
                  }}>Скопіювати посилання на збір</Button>
                  </Box>
                </Modal>
            </Stack>
    </Stack>
    </>
  );
}
