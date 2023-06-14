import { Stack, Button, TextField, Typography, Modal, Box } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import changeCampaignStatus from "../../utils/changeCampaignStatus";
import getCampaignImage from "../../utils/getCampaignImage";
import deleteCampaign from "../../utils/deleteCampaign";
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

export default function CampaignAdminCellRenderer( params ) {
  const [openDescription, setOpenDescription] = useState(false);
  const handleCloseDescription = () => setOpenDescription(false);
  const handleOpenDescription = () => setOpenDescription(true);

    const [openOptions, setOpenOptions] = useState(false);
    const handleCloseOptions = () => setOpenOptions(false);
    const handleOpenOptions = () => setOpenOptions(true);

    const [currentDonation, setCurrentDonation] = useState({});
    const donationId = params.valueFormatted ? params.valueFormatted : params.data.donations[0];

  const id = params.valueFormatted ? params.valueFormatted : params.data.id;
  const status = params.valueFormatted ? params.valueFormatted : params.data.status;
  const createdAt = new Date(params.data.created_at);
  const createdAtYear = createdAt.getFullYear();
    const createdAtMonth = createdAt.getMonth() + 1;
    const createdAtDay = createdAt.getDate();

  const imageId = params.data.images ? params.data.images[0] : '';

    useEffect(() => {
      (async () => {
        if(donationId && donationId != ''){
            setCurrentDonation(await getOneDontaion(donationId));
        }
      })();
    }, []);

  const campaignActivateCallback = id => {
      changeCampaignStatus(id);
      setTimeout(() => {
          params.handleUpdate();
      }, 1000);
  }

    const campaignDeleteCallback = id => {
        deleteCampaign(id);
        setTimeout(() => {
            params.handleUpdate();
        }, 1000);
    }

  return (
    <Stack className="donation-cell" style={{display: 'flex', flexWrap: 'nowrap', flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Button variant="outlined" onClick={handleOpenOptions}>Опції</Button>
        <Modal
          open={openDescription}
          onClose={handleCloseDescription}
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
                Email: {params.data.email}
              </Typography>
              <Typography>
                Телефон: {params.data.phone}
              </Typography>
              <Typography>
                Статус: {params.data.status}
              </Typography>

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
                    </>
                )}
            </Box>
        </Modal>
        <Modal
          open={openOptions}
          onClose={handleCloseOptions}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Опції:
            </Typography>
            {status === 'pending' && (
                <Button variant="outlined" onClick={() => campaignActivateCallback(id)}>Активувати кампанію</Button>
            )}
            <Button variant="outlined" onClick={handleOpenDescription}>Подивитися опис кампанії</Button>
            <Button variant="outlined" onClick={() => campaignDeleteCallback(id)}>Позначити як Шахрай</Button>
            <Button variant="outlined" onClick={() => campaignDeleteCallback(id)}>Видалили кампанію</Button>
            </Box>
        </Modal>
    </Stack>
  );
}
