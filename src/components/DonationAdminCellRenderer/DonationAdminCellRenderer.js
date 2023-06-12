import { Stack, Button, TextField } from "@mui/material";
import { useRef } from "react";
import changeDonationStatus from "../../utils/changeDonationStatus";
import deleteDonation from "../../utils/deleteDonation";

export default function DonationAdminCellRenderer( params ) {
  const donationInput = useRef();
  const id = params.valueFormatted ? params.valueFormatted : params.data.id;
  const status = params.valueFormatted ? params.valueFormatted : params.data.status;

  const donationActivateCallback = id => {
      changeDonationStatus(id);
  }

    const donationDeleteCallback = id => {
        deleteDonation(id);
    }

  return (
    <Stack className="donation-cell">
        {status === 'pending' && (
            <Button variant="outlined" onClick={() => donationActivateCallback(id)}>Activate</Button>
        )}
        <Button variant="outlined" onClick={() => donationDeleteCallback(id)}>Delete</Button>
    </Stack>
  );
}
