import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useNavigate, useParams } from "react-router";
import { Divider, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import axios from "axios"; // Import Axios

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function EditBus() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [busData, setBusData] = useState(null);
  const [open, setOpen] = useState(false);
  const [edittable, setEdittable] = useState(false);
  const [routeChangeStatus, setRouteChangeStatus] = useState(false);
  const [editedRouteNo, setEditedRouteNo] = useState("");
  const [updatedRoute, setUpdatedRoute] = useState(null);
  const [editedSchedules, setEditedSchedules] = useState([]);
  const [arrivalTimes, setArrivalTimes] = useState({});
  const [departureTimes, setDepartureTimes] = useState({});

  useEffect(() => {
    // Fetch bus data by ID
    fetch(`http://localhost:8080/bus/${id}`)
      .then((response) => response.json())
      .then((data) => setBusData(data))
      .catch((error) => console.error("Error fetching bus data:", error));
  }, [id]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRouteNoChange = (e) => {
    setEditedRouteNo(e.target.value);
  };

  const handleRouteNoConfirmation = () => {
    setEdittable(true);
    setOpen(false);
  };

  const handleTimeChange = (time, field, scheduleId) => {
    // Find the index of the edited schedule
    const editedScheduleIndex = editedSchedules.findIndex(
      (schedule) => schedule.scheduleId === scheduleId
    );

    // Create a copy of the current editedSchedules array
    const updatedEditedSchedules = [...editedSchedules];

    if (editedScheduleIndex === -1) {
      // If the schedule is not already edited, create a new entry
      updatedEditedSchedules.push({
        scheduleId,
        arrivalTime:
          field === "arrivalTime"
            ? time
            : busData.schedules.find(
                (schedule) => schedule.scheduleId === scheduleId
              ).arrivalTime,
        departureTime:
          field === "departureTime"
            ? time
            : busData.schedules.find(
                (schedule) => schedule.scheduleId === scheduleId
              ).departureTime,
      });
    } else {
      // If the schedule is already edited, update the corresponding field
      const updatedSchedule = {
        ...updatedEditedSchedules[editedScheduleIndex],
        [field]: time,
      };

      // Keep the existing value if the field is not being changed
      if (time === "" && field === "arrivalTime") {
        updatedSchedule.arrivalTime = busData.schedules.find(
          (schedule) => schedule.scheduleId === scheduleId
        ).arrivalTime;
      } else if (time === "" && field === "departureTime") {
        updatedSchedule.departureTime = busData.schedules.find(
          (schedule) => schedule.scheduleId === scheduleId
        ).departureTime;
      }

      updatedEditedSchedules[editedScheduleIndex] = updatedSchedule;
    }

    // Update the state with the new edited schedules
    setEditedSchedules(updatedEditedSchedules);
  };

  const handleSubmitRouteNoChange = () => {
    axios
      .put(`http://localhost:8080/bus/${id}`, {
        regNo: busData.regNo,
        id: id,
        busroute: {
          routeno: editedRouteNo,
        },
      })
      .then((response) => {
        console.log("Route number updated successfully:", response.data);
        setRouteChangeStatus(true);

        // Fetch updated bus route data to get new bus stops
        axios
          .get("http://localhost:8080/busroutes")
          .then((response) => {
            console.log("Response data:", response.data);

            const routes = response.data;

            const updatedRoute = routes.find(
              (route) => route.routeno === parseInt(editedRouteNo)
            );

            console.log("Updated route:", updatedRoute);

            if (updatedRoute) {
              setUpdatedRoute(updatedRoute);
            }
          })
          .catch((error) => {
            console.error("Error fetching updated bus route data:", error);
          });
      })
      .catch((error) => {
        console.error("Error updating route number:", error);
      });
    setEdittable(false);
  };

  const handleCancelRouteNoChange = () => {
    setEdittable(false); // Go back to initial state
    setEditedRouteNo(""); // Clear edited route number
  };

  const handleSubmitEditBus = () => {
    console.log("happening put request");
    console.log("edited schedules", editedSchedules);

    // Send PUT requests to update schedules
    editedSchedules.forEach((schedule) => {
      axios
        .put(`http://localhost:8080/schedule/${schedule.scheduleId}`, {
          arrivalTime: schedule.arrivalTime,
          departureTime: schedule.departureTime,
        })
        .then((response) => {
          console.log("Schedule updated successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error updating schedule:", error);
        });
    });
    navigate("/admin/routeschedule/busmanagement");
  };

  const handlebusStopTimeChange = (time, field, stopId) => {
    if (field === "arrivalTime") {
      setArrivalTimes((prevTimes) => ({ ...prevTimes, [stopId]: time }));
    } else if (field === "departureTime") {
      setDepartureTimes((prevTimes) => ({ ...prevTimes, [stopId]: time }));
    }
  };

  const handleSubmitSetupNewSchedules = () => {
    console.log("happening post request for new schedules");

    // Iterate over updatedRoute.busStops to create schedules for each stop
    updatedRoute.busStops.forEach((stop) => {
      // Define the schedule data
      const stopId = stop.stopID; // Get the stop ID
      const stopName = stop.name; // Get the stop name

      // Define the schedule data
      const scheduleData = {
        bus: {
          regNo: busData.regNo,
          id: parseInt(id),
        },
        busStop: {
          stopID: stopId, // Use the stop ID here
          name: stopName, // Use the stop name here
        },
        arrivalTime: arrivalTimes[stopId], // Use the stop ID to access arrival time
        departureTime: departureTimes[stopId], // Use the stop ID to access departure time
      };

      // Send a POST request to create the schedule
      axios
        .post("http://localhost:8080/schedule", scheduleData)
        .then((response) => {
          console.log("Schedule created successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error creating schedule:", error);
        });
    });

    navigate("/admin/routeschedule/busmanagement");
  };

  return (
    <div>
      {busData && (
        <>
          <form>
            <TextField
              label="Route No"
              defaultValue={busData.routeNo}
              variant="outlined"
              fullWidth
              margin="normal"
              disabled={!edittable} // Disable if dialog is closed
              onChange={handleRouteNoChange}
            />

            <TextField
              label="Reg No"
              defaultValue={busData.regNo}
              variant="outlined"
              fullWidth
              disabled
              margin="normal"
            />

            {edittable ? (
              <>
                <Button variant="outlined" onClick={handleSubmitRouteNoChange}>
                  Submit
                </Button>

                <Button variant="outlined" onClick={handleCancelRouteNoChange}>
                  Cancel
                </Button>
                <p style={{ color: "alert", marginTop: "10px" }}>
                  Schedules of the bus under the current route will be deleted
                  after you changing the route number.
                </p>
              </>
            ) : (
              <Button variant="outlined" onClick={handleClickOpen}>
                Edit Route No
              </Button>
            )}
          </form>
          <>
            <form>
              {!routeChangeStatus &&
                busData.schedules.map((schedule) => (
                  <div key={schedule.scheduleId}>
                    <Typography variant="subtitle1">
                      Stop : {schedule.busStop.name}
                    </Typography>

                    <TextField
                      type="time"
                      label="Arrival Time"
                      defaultValue={schedule.arrivalTime}
                      variant="outlined"
                      margin="normal"
                      disabled={edittable}
                      onChange={(e) =>
                        handleTimeChange(
                          e.target.value,
                          "arrivalTime",
                          schedule.scheduleId
                        )
                      }
                    />
                    <TextField
                      type="time"
                      label="Departure Time"
                      defaultValue={schedule.departureTime}
                      variant="outlined"
                      margin="normal"
                      disabled={edittable}
                      onChange={(e) =>
                        handleTimeChange(
                          e.target.value,
                          "departureTime",
                          schedule.scheduleId
                        )
                      }
                    />
                  </div>
                ))}

              {routeChangeStatus &&
                updatedRoute &&
                updatedRoute.busStops.map((stop) => (
                  <div>
                    <Divider orientation="vertical" />
                    <p>Setting Up New Schedules For Current Bus</p>{" "}
                    <div key={stop.stopID}>
                      <Typography variant="subtitle1">
                        Stop : {stop.name}
                      </Typography>
                      <TextField
                        type="time"
                        label="Arrival Time"
                        variant="outlined"
                        margin="normal"
                        onChange={(e) =>
                          handlebusStopTimeChange(
                            e.target.value,
                            "arrivalTime",
                            stop.stopID
                          )
                        }
                      />
                      <TextField
                        type="time"
                        label="Departure Time"
                        variant="outlined"
                        margin="normal"
                        onChange={(e) =>
                          handlebusStopTimeChange(
                            e.target.value,
                            "departureTime",
                            stop.stopID
                          )
                        }
                      />
                    </div>
                  </div>
                ))}

              {!routeChangeStatus && (
                <Button variant="outlined" onClick={handleSubmitEditBus}>
                  Submit
                </Button>
              )}
              {routeChangeStatus && (
                <Button
                  variant="outlined"
                  onClick={handleSubmitSetupNewSchedules}
                >
                  Submit
                </Button>
              )}
            </form>
          </>
        </>
      )}

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Change Route No?"}</DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ color: "black" }}
            id="alert-dialog-slide-description"
          >
            Are you sure you want to change the Route No? <br></br>{" "}
            <span style={{ color: "#ff4545" }}>
              Note : Schedules of this bus under the current route will be
              deleted.
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleRouteNoConfirmation}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditBus;
