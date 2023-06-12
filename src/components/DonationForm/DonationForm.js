import { Stack, Button, TextField } from "@mui/material";
import createDonation from "../../utils/createDonation";
import { useEffect, useState, useRef } from "react";

export default function DonationForm() {
  const [donationList, setDonationList] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    title: "",
    amount: 0,
    value: 0,
    status: "pending",
    description: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    createDonation(formValues);
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
          Make a new Donation
        </Button>
      )}
      {isFormVisible && (
        <form name="create-donation" onSubmit={handleSubmit}>
          <TextField
            required
            id="outlined-basic"
            label="Name"
            variant="outlined"
            name="name"
            value={formValues.firstName}
            onChange={doUpdateField}
          />
          <TextField
            required
            id="outlined-basic"
            label="Title"
            variant="outlined"
            name="title"
            value={formValues.title}
            onChange={doUpdateField}
          />
          <TextField
            required
            id="outlined-basic"
            label="Amount"
            variant="outlined"
            name="amount"
            onChange={doUpdateField}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
          <TextField
            required
            id="outlined-basic"
            label="Description"
            variant="outlined"
            name="description"
            value={formValues.description}
            onChange={doUpdateField}
          />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
      )}
    </Stack>
  );
}
