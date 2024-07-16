import React, { useEffect, useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Grid,
  Container,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
const TwoInputFieldsRow = ({
  label1,
  label2,
  onTimeChange,
  hideArrival,
  hideDeparture,
  error,
}) => {
  const handleTimeChange = (e, field) => {
    const { value } = e.target;
    onTimeChange(value, field);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        {!hideArrival && (
          <TextField
            type="time"
            label={label1}
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => handleTimeChange(e, "arrivalTime")}
            required
            error={Boolean(error?.arrivalTime)}
            helperText={error?.arrivalTime || ""}
          />
        )}
      </Grid>
      <Grid item xs={6}>
        {!hideDeparture && (
          <TextField
            type="time"
            label={label2}
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => handleTimeChange(e, "departureTime")}
            required
            error={Boolean(error?.departureTime)}
            helperText={error?.departureTime || ""}
          />
        )}
      </Grid>
    </Grid>
  );
};

function FormBus() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [additionalFieldsDatasets, setAdditionalFieldsDatasets] = useState([]);
  const [bus, setBus] = useState({
    regNo: "",
    busroute: {
      routeno: "",
    },
    noOfJourneysPerDay: 1,
    status: "off",
  });
  const [arrivalTimesUp, setArrivalTimesUp] = useState({});
  const [departureTimesUp, setDepartureTimesUp] = useState({});
  const [arrivalTimesDown, setArrivalTimesDown] = useState({});
  const [departureTimesDown, setDepartureTimesDown] = useState({});
  const [menuOptions, setMenuOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [errorMessagesUp, setErrorMessagesUp] = useState({});
  const [errorMessagesDown, setErrorMessagesDown] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8080/busroutes", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const routes = response.data;
        const busstoplist = routes.map((route) =>
          route.busStops
            .sort((a, b) => a.orderIndex - b.orderIndex)
            .map((stop) => stop.name)
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

    // Validate input to allow only 1 or 2 for 'noOfJourneysPerDay'
    if (name === "noOfJourneysPerDay" && (value === "1" || value === "2")) {
      setBus((prevData) => ({
        ...prevData,
        [name]: parseInt(value, 10),
      }));
    } else {
      // General handling for other fields
      setBus((prevData) => {
        const newBus = { ...prevData };
        if (name.includes(".")) {
          const [parent, child] = name.split(".");
          newBus[parent][child] = value;
        } else {
          newBus[name] = value;
        }
        return newBus;
      });
    }
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

  const validateTimes = (times, oppositeTimes = []) => {
    const errors = {};
    for (let i = 0; i < times.length; i++) {
      const { stopName, arrivalTime, departureTime } = times[i];

      if (arrivalTime && departureTime && arrivalTime > departureTime) {
        errors[stopName] = {
          arrivalTime: "Arrival time cannot be later than departure time.",
        };
      }

      if (i > 0) {
        const prevTime = times[i - 1];
        if (
          prevTime.departureTime &&
          arrivalTime &&
          prevTime.departureTime > arrivalTime
        ) {
          errors[stopName] = {
            ...errors[stopName],
            arrivalTime:
              "Arrival time cannot be earlier than previous stop's departure time.",
          };
        }
      }
    }
    return Object.keys(errors).length ? errors : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const upTimes = additionalFieldsDatasets[selectedValue].map((stopName) => ({
      stopName,
      arrivalTime: arrivalTimesUp[stopName],
      departureTime: departureTimesUp[stopName],
    }));

    const downTimes = additionalFieldsDatasets[selectedValue]
      .slice()
      .reverse()
      .map((stopName) => ({
        stopName,
        arrivalTime: arrivalTimesDown[stopName],
        departureTime: departureTimesDown[stopName],
      }));

    const errorMsgUp = validateTimes(upTimes, downTimes);
    const errorMsgDown = validateTimes(downTimes, upTimes);

    if (errorMsgUp || errorMsgDown) {
      setErrorMessagesUp(errorMsgUp || {});
      setErrorMessagesDown(errorMsgDown || {});
      return;
    }

    try {
      const token = localStorage.getItem("token");
      // First, add the bus
      const { data: addedBus } = await axios.post(
        "http://localhost:8080/bus",
        bus,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Get the selected route
      const selectedRoute = menuOptions[selectedValue];

      // Create an array to store schedule data for both directions
      const schedulesUp = upTimes.map(
        ({ stopName, arrivalTime, departureTime }) => {
          const stop = selectedRoute.busStops.find(
            (stop) => stop.name === stopName
          );

          return {
            bus: { id: addedBus.id, regNo: addedBus.regNo },
            busStop: { stopID: stop.stopID, name: stopName },
            arrivalTime,
            departureTime,
            direction: "up",
          };
        }
      );

      const schedulesDown = downTimes.map(
        ({ stopName, arrivalTime, departureTime }) => {
          const stop = selectedRoute.busStops.find(
            (stop) => stop.name === stopName
          );

          return {
            bus: { id: addedBus.id, regNo: addedBus.regNo },
            busStop: { stopID: stop.stopID, name: stopName },
            arrivalTime,
            departureTime,
            direction: "down",
          };
        }
      );

      // Post all schedules to the server
      for (const scheduleData of [...schedulesUp, ...schedulesDown]) {
        console.log("schedule data", scheduleData);
        await axios.post("http://localhost:8080/schedule", scheduleData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (error) {
      console.error("Error adding bus or schedule:", error);
    }

    navigate("/admin/routeschedule/busmanagement");
  };

  return (
    <Container maxWidth={false} style={{ padding: "0 1rem" }}>
      <Grid
        container
        justifyContent="center"
        style={{
          backgroundColor: "#daedf4",
          padding: 10,
          borderRadius: 20,
          maxWidth: "1440px", // Adjust max width as needed
          margin: "auto",
        }}
      >
        <Grid item xs={12} sm={10} md={8}>
          <h3
            style={{
              backgroundColor: "#132968",
              color: "#FFFFFF",
              padding: "20px",
              borderRadius: 20,
            }}
          >
            Add Bus
          </h3>
          <form
            style={{
              backgroundColor: "white",
              padding: 30,
              borderRadius: 10,
              width: "110%",
            }}
            onSubmit={handleSubmit}
            sx={{}}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  width="50%"
                  label="Bus Reg. No"
                  name="regNo"
                  value={bus.regNo}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth sx={{ width: "70%" }}>
                  <InputLabel id="selectRoute">Select Route</InputLabel>
                  <Select
                    required
                    fullWidth
                    name="selectedValue"
                    value={selectedValue}
                    onChange={handleChangeSelectOption}
                  >
                    <MenuItem value="" disabled>
                      Select Route
                    </MenuItem>
                    {menuOptions.map((option, index) => (
                      <MenuItem key={index} value={index}>
                        {option.routeno} - {option.routename}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Number of Journeys Per Day"
                  name="noOfJourneysPerDay"
                  type="number"
                  value={bus.noOfJourneysPerDay}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  sx={{ width: "50%" }}
                  margin="normal"
                  inputProps={{
                    min: 1,
                    max: 2,
                  }}
                />
              </Grid>
            </Grid>

            {showAdditionalFields && (
              <Grid container spacing={2} style={{ marginTop: "1rem" }}>
                <Grid item xs={12} sm={6}>
                  <NorthIcon />
                  <Typography variant="h7" gutterBottom>
                    Up Direction
                  </Typography>{" "}
                  <Typography variant="h6" gutterBottom>
                    ({additionalFieldsDatasets[selectedValue][0]} -{" "}
                    {
                      additionalFieldsDatasets[selectedValue][
                        additionalFieldsDatasets[selectedValue].length - 1
                      ]
                    }
                    )
                  </Typography>
                  <table style={{ width: "100%" }}>
                    <tbody>
                      <tr>
                        {/* <th>Bus Stops</th>
                        <th>Arrival & Departure Times</th> */}
                      </tr>
                      {additionalFieldsDatasets[selectedValue].map(
                        (text, index) => (
                          <tr key={index}>
                            <td>
                              <ShareLocationIcon sx={{ color: "red" }} />
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
                                hideArrival={index === 0}
                                hideDeparture={
                                  index ===
                                  additionalFieldsDatasets[selectedValue]
                                    .length -
                                    1
                                }
                                error={errorMessagesUp[text]}
                              />
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <SouthIcon />
                  <Typography variant="h7" gutterBottom>
                    Down Direction{" "}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {" "}
                    (
                    {
                      additionalFieldsDatasets[selectedValue][
                        additionalFieldsDatasets[selectedValue].length - 1
                      ]
                    }{" "}
                    - {additionalFieldsDatasets[selectedValue][0]})
                  </Typography>
                  <table style={{ width: "100%" }}>
                    <tbody>
                      <tr>
                        {/* <th>Bus Stops</th>
                        <th>Arrival & Departure Times</th> */}
                      </tr>
                      {additionalFieldsDatasets[selectedValue]
                        .slice()
                        .reverse()
                        .map((text, index) => (
                          <tr key={index}>
                            <td>
                              <ShareLocationIcon sx={{ color: "blue" }} />
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
                                hideArrival={index === 0}
                                hideDeparture={
                                  index ===
                                  additionalFieldsDatasets[selectedValue]
                                    .slice()
                                    .reverse().length -
                                    1
                                }
                                error={errorMessagesDown[text]}
                              />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </Grid>
              </Grid>
            )}

            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginTop: "20px", marginBottom: "20px" }}
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
