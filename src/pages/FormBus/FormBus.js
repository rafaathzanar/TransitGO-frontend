// FormBus.js
import React, { useEffect, useState } from "react";
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
import axios from "axios";

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
  const [bus, setBus] = useState({
    regNo: "",
    busroute: {
      routeno: "",
    },
  });

  const {
    regNo,
    busroute: { routeno },
  } = bus;
  const [selectedValue, setSelectedValue] = useState("");
  const [menuOptions, setMenuOptions] = useState([]);

  useEffect(() => {
    // Fetch menu options from Spring backend when component mounts
    axios
      .get("http://localhost:8080/busroutes")
      .then((response) => {
        const routes = response.data;
        const routeNames = routes.map((route) => route.routename);
        setMenuOptions(routeNames);
        console.log(routeNames);
      })
      .catch((error) => {
        console.error("Error fetching menu options:", error);
      });
  }, []);

  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBus((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleChangeSelectOption = (e) => {
    const selectedOption = e.target.value;
    setSelectedValue(selectedOption);
    console.log("Selected option:", selectedOption);
    const { name, value } = e.target;
    setBus({ ...bus, [name]: value });

    setShowAdditionalFields(
      selectedOption !== "" &&
        additionalFieldsDatasets[selectedOption] &&
        additionalFieldsDatasets[selectedOption].length > 0
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(bus);
  };

  return (
    <Grid container item xs={10}>
      <Grid item xs={12} sm={6} md={6} style={{ marginLeft: "5rem" }}>
        <Typography variant="h4" gutterBottom>
          Add Bus
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bus Reg. No"
                name="regNo"
                value={bus.regNo}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                fullWidth
                label="Select Route"
                name="selectedValue"
                value={selectedValue}
                onChange={handleChangeSelectOption}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select Route
                </MenuItem>
                {menuOptions.map((option, index) => (
                  <MenuItem key={index} value={index}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
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
