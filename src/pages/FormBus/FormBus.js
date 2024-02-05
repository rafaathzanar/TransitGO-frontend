// FormBus.js
import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import Validation from "../../components/Validation/Validation";

// Custom component for a row with two input fields
const TwoInputFieldsRow = ({ label1, label2 }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField
          type="time"
          label={label1}
          variant="outlined"
          fullWidth
          margin="normal"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="time"
          label={label2}
          variant="outlined"
          fullWidth
          margin="normal"
        />
      </Grid>
    </Grid>
  );
};

const additionalFieldsDatasets = [
  [],
  [
    "Matara",
    "Godagama Interchange",
    "Southern Expressway",
    "Kottawa Interchange",
    "Makumbura",
    "Kottawa",
    "Pannipitiya",
    "Thalawathugoda",
    "Battaramulla",
    "Rajagiriya",
    "Borella",
    "Colombo Bus Stand",
  ],
  [
    "Colombo",
    "Peliyagoda",
    "Kadawatha Interchange",
    "Mirigama Interchange",
    "Kurunegala Interchange",
    "Galagedara",
    "Kandy",
  ],
  [
    "Colombo",
    "Nugegoda",
    "Maharagama",
    "Pannipitiya",
    "Kottawa",
    "Makumbura",
    "Southern Expressway",
    "Mattala",
    "Thanamalwila",
    "Wellawaya",
    "Buttala",
    "Monaragala",
  ],
];

function FormBus() {
  const [busId, setBusId] = useState("");
  const [busRegNo, setBusRegNo] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [errors, setErrors] = useState({
    busId: "",
    busRegNo: "",
    selectedValue: "",
  });

  const handleBusIdChange = (event) => {
    const value = event.target.value;
    setBusId(value);
    setErrors((prevErrors) => ({ ...prevErrors, busId: validateBusId(value) }));
  };

  const handleBusRegNoChange = (event) => {
    const value = event.target.value;
    setBusRegNo(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      busRegNo: validateBusRegNo(value),
    }));
  };

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedValue(selectedOption);

    setErrors((prevErrors) => ({
      ...prevErrors,
      selectedValue: validateRoute(selectedOption),
    }));

    setShowAdditionalFields(
      selectedOption !== "" &&
        additionalFieldsDatasets[selectedOption].length > 0
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform actions when the form is submitted
    if (validateForm()) {
      console.log("Bus ID:", busId);
      console.log("Bus Reg. No:", busRegNo);
      console.log("Selected Value:", selectedValue);
      // Add further actions or API calls here
    } else {
      console.log("Form has validation errors. Please fix them.");
    }
  };

  const validateBusId = (value) => {
    return value.trim() === "" ? "Bus ID is required" : "";
  };

  const validateBusRegNo = (value) => {
    return value.trim() === "" ? "Bus Registration Number is required" : "";
  };

  const validateRoute = (value) => {
    return value === "" ? "Route selection is required" : "";
  };

  const validateForm = () => {
    const busIdError = validateBusId(busId);
    const busRegNoError = validateBusRegNo(busRegNo);
    const selectedValueError = validateRoute(selectedValue);

    setErrors({
      busId: busIdError,
      busRegNo: busRegNoError,
      selectedValue: selectedValueError,
    });

    return (
      busIdError === "" && busRegNoError === "" && selectedValueError === ""
    );
  };

  return (
    <Container>
      <div>
        <Typography variant="h4" gutterBottom>
          Add Bus
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Bus ID"
            variant="outlined"
            fullWidth
            value={busId}
            onChange={handleBusIdChange}
            margin="normal"
          />
          <Validation error={errors.busId} />

          <TextField
            label="Bus Reg. No"
            variant="outlined"
            fullWidth
            value={busRegNo}
            onChange={handleBusRegNoChange}
            margin="normal"
          />
          <Validation error={errors.busRegNo} />

          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Select Route</InputLabel>
            <Select
              label="Select Route"
              value={selectedValue}
              onChange={handleSelectChange}
            >
              <MenuItem value="">Select an option</MenuItem>
              <MenuItem value="1">Matara-Colombo</MenuItem>
              <MenuItem value="2">Colombo-Kandy</MenuItem>
              <MenuItem value="3">Colombo-Monaragala</MenuItem>
            </Select>
          </FormControl>
          <Validation error={errors.selectedValue} />

          {showAdditionalFields && (
            <>
              <div>
                <table>
                  <tbody>
                    <tr>
                      <th>Bus Stops</th>
                      <th>Arrival & Departure Times</th>
                    </tr>
                    {additionalFieldsDatasets[selectedValue].map(
                      (text, index) => (
                        <tr key={index}>
                          <td>
                            <Typography variant="subtitle1">{text}</Typography>
                          </td>
                          <td>
                            <TwoInputFieldsRow />
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          <div style={{ marginTop: "16px" }}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default FormBus;
