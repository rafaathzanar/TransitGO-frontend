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
  const [formData, setFormData] = useState({
    busId: "",
    busRegNo: "",
    selectedValue: "",
  });
  const [selectedValue, setSelectedValue] = useState("");

  const [formErrors, setFormErrors] = useState({
    busId: false,
    busRegNo: false,
    selectedValue: false,
  });
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  const handleChange = (e) => {
    const selectedOption = e.target.value; // Change 'event' to 'e'
    setSelectedValue(selectedOption);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: false });
    setShowAdditionalFields(
      selectedOption !== "" &&
        additionalFieldsDatasets[selectedOption].length > 0
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        errors[key] = true;
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    console.log(formData);
  };

  return (
    <Grid container item xs={10}>
      <Grid xs={12} sm={6} md={6} style={{ marginLeft: "5rem" }}>
        <Typography variant="h4" gutterBottom>
          Add Bus
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bus ID"
                name="busId"
                value={formData.busId}
                onChange={handleChange}
                error={formErrors.busId}
                helperText={formErrors.busId && "Bus ID is required"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bus Reg. No"
                name="busRegNo"
                value={formData.busRegNo}
                onChange={handleChange}
                error={formErrors.busRegNo}
                helperText={formErrors.busRegNo && "Bus Reg. No is required"}
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                fullWidth
                label="Select Route"
                name="selectedValue"
                value={formData.selectedValue}
                onChange={handleChange}
                error={formErrors.selectedValue}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select Route
                </MenuItem>
                <MenuItem value="1">Matara-Colombo</MenuItem>
                <MenuItem value="2">Colombo-Kandy</MenuItem>
                <MenuItem value="3">Colombo-Monaragala</MenuItem>
              </Select>
              {formErrors.selectedValue && (
                <Typography variant="caption" color="error">
                  Route selection is required
                </Typography>
              )}
            </Grid>
          </Grid>

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

          <Button
            sx={{ marginTop: "20px" }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}

export default FormBus;
