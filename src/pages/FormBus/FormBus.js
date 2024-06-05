import React, { useEffect, useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Grid,
  Container,
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
  const navigate = useNavigate();
  const [additionalFieldsDatasets, setAdditionalFieldsDatasets] = useState([]);
  const [bus, setBus] = useState({
    regNo: "",
    busroute: {
      routeno: "",
    },
  });
  const [arrivalTimesUp, setArrivalTimesUp] = useState({});
  const [departureTimesUp, setDepartureTimesUp] = useState({});
  const [arrivalTimesDown, setArrivalTimesDown] = useState({});
  const [departureTimesDown, setDepartureTimesDown] = useState({});
  const [menuOptions, setMenuOptions] = useState([]);

  // const {
  //   regNo,
  //   busroute: { routeno },
  // } = bus;
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/busroutes")
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

  const handleTimeChange = (time, field, stopName, direction) => {
    if (direction === "up") {
      if (field === "arrivalTime") {
        setArrivalTimesUp((prevTimes) => ({ ...prevTimes, [stopName]: time }));
      } else if (field === "departureTime") {
        setDepartureTimesUp((prevTimes) => ({
          ...prevTimes,
          [stopName]: time,
        }));
      }
    } else if (direction === "down") {
      if (field === "arrivalTime") {
        setArrivalTimesDown((prevTimes) => ({
          ...prevTimes,
          [stopName]: time,
        }));
      } else if (field === "departureTime") {
        setDepartureTimesDown((prevTimes) => ({
          ...prevTimes,
          [stopName]: time,
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // First, add the bus
      const { data: addedBus } = await axios.post(
        "http://localhost:8080/bus",
        bus
      );

      // Get the selected route
      const selectedRoute = menuOptions[selectedValue];

      // Create an array to store schedule data for both directions
      const schedulesUp = additionalFieldsDatasets[selectedValue].map(
        (stopName) => {
          const stop = selectedRoute.busStops.find(
            (stop) => stop.name === stopName
          );

          return {
            bus: { id: addedBus.id, regNo: addedBus.regNo },
            busStop: { stopID: stop.stopID, name: stopName },
            arrivalTime: arrivalTimesUp[stopName],
            departureTime: departureTimesUp[stopName],
            direction: "up",
          };
        }
      );

      const schedulesDown = additionalFieldsDatasets[selectedValue]
        .reverse()
        .map((stopName) => {
          const stop = selectedRoute.busStops.find(
            (stop) => stop.name === stopName
          );

          return {
            bus: { id: addedBus.id, regNo: addedBus.regNo },
            busStop: { stopID: stop.stopID, name: stopName },
            arrivalTime: arrivalTimesDown[stopName],
            departureTime: departureTimesDown[stopName],
            direction: "down",
          };
        });

      // Post all schedules to the server
      for (const scheduleData of [...schedulesUp, ...schedulesDown]) {
        console.log("schedule data", scheduleData);
        await axios.post("http://localhost:8080/schedule", scheduleData);
      }
    } catch (error) {
      console.error("Error adding bus or schedule:", error);
    }

    navigate("/admin/routeschedule/busmanagement");
  };

  return (
    <Container>
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
                  display
                  Empty
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
                <Typography variant="h6" gutterBottom>
                  Up Direction
                </Typography>
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
                              <Typography variant="subtitle1">
                                {text}
                              </Typography>
                            </td>
                            <td>
                              <TwoInputFieldsRow
                                label1="Arrival time"
                                label2="Departure time"
                                onTimeChange={(time, field) =>
                                  handleTimeChange(time, field, text, "up")
                                }
                              />
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>

                <Typography
                  variant="h6"
                  gutterBottom
                  style={{ marginTop: "2rem" }}
                >
                  Down Direction
                </Typography>
                <div>
                  <table>
                    <tbody>
                      <tr>
                        <th>Bus Stops</th>
                        <th>Arrival & Departure Times</th>
                      </tr>
                      {additionalFieldsDatasets[selectedValue]
                        .slice()
                        .reverse()
                        .map((text, index) => (
                          <tr key={index}>
                            <td>
                              <Typography variant="subtitle1">
                                {text}
                              </Typography>
                            </td>
                            <td>
                              <TwoInputFieldsRow
                                label1="Arrival time"
                                label2="Departure time"
                                onTimeChange={(time, field) =>
                                  handleTimeChange(time, field, text, "down")
                                }
                              />
                            </td>
                          </tr>
                        ))}
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
    </Container>
  );
}

export default FormBus;
