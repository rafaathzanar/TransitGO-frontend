import React, { useEffect, useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router";

const TwoInputFieldsRow = ({ label1, label2, onTimeChange }) => {
  const handleTimeChange = (e, field) => {
    const { value } = e.target;
    onTimeChange(value, field);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField
          type="time"
          label={label1}
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(e) => handleTimeChange(e, "arrivalTime")}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="time"
          label={label2}
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(e) => handleTimeChange(e, "departureTime")}
        />
      </Grid>
    </Grid>
  );
};

function FormBus() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [additionalFieldsDatasets, setAdditionalFieldsDatasets] = useState([]);
  const [bus, setBus] = useState({
    regNo: "",
    busroute: {
      routeno: "",
    },
  });
  const [arrivalTimes, setArrivalTimes] = useState({});
  const [departureTimes, setDepartureTimes] = useState({});

  const {
    regNo,
    busroute: { routeno },
  } = bus;
  const [selectedValue, setSelectedValue] = useState("");
  const [menuOptions, setMenuOptions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get("http://localhost:8080/busroutes",{
        headers: {Authorization: `Bearer ${token}`}
      })
      .then((response) => {
        const routes = response.data;
        const busstoplist = routes.map((route) =>
          route.busStops.map((stop) => stop.name)
        );
        setAdditionalFieldsDatasets(busstoplist);
        setMenuOptions(routes);
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
    const selectedOptionIndex = e.target.value;
    setSelectedValue(selectedOptionIndex);
    const selectedRoute = menuOptions[selectedOptionIndex];
    const selectedRouteNo = selectedRoute ? selectedRoute.routeno : "";

    setBus((prevBus) => ({
      ...prevBus,
      busroute: {
        ...prevBus.busroute,
        routeno: selectedRouteNo,
      },
    }));

    setShowAdditionalFields(
      selectedOptionIndex !== "" &&
        additionalFieldsDatasets[selectedOptionIndex] &&
        additionalFieldsDatasets[selectedOptionIndex].length > 0
    );
  };

  const handleTimeChange = (time, field, stopName) => {
    if (field === "arrivalTime") {
      setArrivalTimes((prevTimes) => ({ ...prevTimes, [stopName]: time }));
    } else if (field === "departureTime") {
      setDepartureTimes((prevTimes) => ({ ...prevTimes, [stopName]: time }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      // First, add the bus
      const { data: addedBus } = await axios.post(
        "http://localhost:8080/bus",
        bus,{
          headers: {Authorization: `Bearer ${token}`}
        }
      );

      // Get the selected route
      const selectedRoute = menuOptions[selectedValue];

      // Create an array to store schedule data
      const schedules = additionalFieldsDatasets[selectedValue].map(
        (stopName) => {
          const stop = selectedRoute.busStops.find(
            (stop) => stop.name === stopName
          );

          console.log("Selected Route:", selectedRoute);
          console.log("Bus Stops:", stop);

          return {
            bus: { id: addedBus.id, regNo: addedBus.regNo },
            busStop: { stopID: stop.stopID, name: stopName }, // Ensure stop exists
            arrivalTime: arrivalTimes[stopName],
            departureTime: departureTimes[stopName],
          };
        }
      );

      console.log("schedules:", schedules);

      // Post all schedules to the server
      await Promise.all(
        schedules.map(async (scheduleData) => {
          console.log("posting json is", scheduleData);
          await axios.post("http://localhost:8080/schedule", scheduleData,{
            headers: {Authorization: `Bearer ${token}`}
          });
        })
      );
    } catch (error) {
      console.error("Error adding bus or schedule:", error);
    }

    navigate("/admin/routeschedule/busmanagement");
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
                required
                fullWidth
                label="Bus Reg. No"
                name="regNo"
                value={bus.regNo}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                required
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
                    {option.routename}
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
                            <TwoInputFieldsRow
                              label1="Arrival time"
                              label2="Departure time"
                              onTimeChange={(time, field) =>
                                handleTimeChange(time, field, text)
                              }
                            />
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
