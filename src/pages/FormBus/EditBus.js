import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useNavigate, useParams } from "react-router";
import { Container, Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

function EditBus() {
  const token = localStorage.getItem("token");
  const Authorization = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const navigate = useNavigate();
  const { id } = useParams();
  const [busData, setBusData] = useState(null);
  const [busStops, setBusStops] = useState([]);
  const [editedSchedules, setEditedSchedules] = useState([]);
  const [editedRegNo, setEditedRegNo] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch bus data by ID
    axios
      .get(`http://localhost:8080/bus/${id}`, Authorization)
      .then((response) => {
        const data = response.data;
        setBusData(data);
        setEditedRegNo(data.regNo); // Initialize with the current regNo

        // Fetch bus stops from the bus route
        return axios.get(`http://localhost:8080/route/${data.routeNo}/stops`);
      })
      .then((response) => {
        const stops = response.data;
        setBusStops(stops);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  const handleRegNoChange = (e) => {
    setEditedRegNo(e.target.value);
  };

  const handleTimeChange = (time, field, stopId, direction) => {
    const editedScheduleIndex = editedSchedules.findIndex(
      (schedule) =>
        schedule.busStop.stopID === stopId && schedule.direction === direction
    );

    const updatedEditedSchedules = [...editedSchedules];

    if (editedScheduleIndex === -1) {
      const originalSchedule = busData.schedules.find(
        (s) => s.busStop.stopID === stopId && s.direction === direction
      );

      updatedEditedSchedules.push({
        scheduleId: originalSchedule ? originalSchedule.scheduleId : null, // Preserve the original scheduleId
        busStop: {
          stopID: stopId,
        },
        direction: direction,
        arrivalTime:
          field === "arrivalTime"
            ? time
            : originalSchedule
            ? originalSchedule.arrivalTime
            : "",
        departureTime:
          field === "departureTime"
            ? time
            : originalSchedule
            ? originalSchedule.departureTime
            : "",
      });
    } else {
      const updatedSchedule = {
        ...updatedEditedSchedules[editedScheduleIndex],
        [field]: time,
      };

      updatedEditedSchedules[editedScheduleIndex] = updatedSchedule;
    }

    setEditedSchedules(updatedEditedSchedules);
    console.log("Updated Edited Schedules:", updatedEditedSchedules);
  };

  const handleSubmitEditBus = () => {
    console.log("Submitting PUT request");

    // Update bus regNo
    axios
      .put(
        `http://localhost:8080/bus/${id}`,
        {
          regNo: editedRegNo,
          id: id,
          busroute: {
            routeno: busData.routeNo, // Keep the same route number
          },
        },
        Authorization
      )
      .then((response) => {
        console.log("Bus updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating bus:", error);
      });

    // Prepare promises array for scheduling operations
    const promises = [];

    // Iterate over editedSchedules to handle new and updated schedules
    editedSchedules.forEach((schedule) => {
      if (!schedule.scheduleId) {
        // Post new schedule
        console.log("Creating new schedule:", schedule);

        promises.push(
          axios.post(
            `http://localhost:8080/schedule`,
            {
              bus: {
                regNo: editedRegNo,
                id: id,
              },
              busStop: {
                stopID: schedule.busStop.stopID,
                name: schedule.busStop.name,
              },
              direction: schedule.direction,
              arrivalTime: schedule.arrivalTime || null,
              departureTime: schedule.departureTime || null,
            },
            Authorization
          )
        );
      } else {
        // Update existing schedule
        console.log("Updating schedule:", schedule);

        promises.push(
          axios.put(
            `http://localhost:8080/schedule/${schedule.scheduleId}`,
            {
              arrivalTime: schedule.arrivalTime || null,
              departureTime: schedule.departureTime || null,
            },
            Authorization
          )
        );
      }
    });

    // Wait for all POST/PUT requests to complete
    Promise.all(promises)
      .then((results) => {
        results.forEach((result) => {
          console.log("Schedule operation result:", result.data);
        });

        // After updating schedules, navigate to the management page
        navigate("/admin/routeschedule/busmanagement");
      })
      .catch((error) => {
        console.error("Error updating schedules:", error);
      });
  };

  const renderScheduleFields = (stop, direction, index, arr) => {
    const isFirstStop = index === 0;
    const isLastStop = index === arr.length - 1;

    const schedule = busData.schedules.find(
      (s) => s.busStop.stopID === stop.stopID && s.direction === direction
    ) || { arrivalTime: "", departureTime: "" };

    const hasSchedule = busData.schedules.some(
      (s) => s.busStop.stopID === stop.stopID && s.direction === direction
    );

    return (
      <div key={`${stop.stopID}-${direction}`}>
        <Typography variant="subtitle1">Stop : {stop.name}</Typography>

        {hasSchedule && (
          <>
            {!isFirstStop && (
              <TextField
                type="time"
                label="Arrival Time"
                defaultValue={schedule.arrivalTime}
                variant="outlined"
                margin="normal"
                onChange={(e) =>
                  handleTimeChange(
                    e.target.value,
                    "arrivalTime",
                    stop.stopID,
                    direction
                  )
                }
              />
            )}
            {!isLastStop && (
              <TextField
                type="time"
                label="Departure Time"
                defaultValue={schedule.departureTime}
                variant="outlined"
                margin="normal"
                onChange={(e) =>
                  handleTimeChange(
                    e.target.value,
                    "departureTime",
                    stop.stopID,
                    direction
                  )
                }
              />
            )}
          </>
        )}

        {!hasSchedule && (
          <>
            {!isFirstStop && (
              <TextField
                type="time"
                label="Arrival Time"
                defaultValue=""
                variant="outlined"
                margin="normal"
                onChange={(e) =>
                  handleTimeChange(
                    e.target.value,
                    "arrivalTime",
                    stop.stopID,
                    direction
                  )
                }
              />
            )}
            {!isLastStop && (
              <TextField
                type="time"
                label="Departure Time"
                defaultValue=""
                variant="outlined"
                margin="normal"
                onChange={(e) =>
                  handleTimeChange(
                    e.target.value,
                    "departureTime",
                    stop.stopID,
                    direction
                  )
                }
              />
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <Container maxWidth={false} style={{ padding: "0 2rem" }}>
      <Grid
        container
        justifyContent="center"
        style={{
          backgroundColor: "#daedf4",
          padding: 10,
          borderRadius: 20,
          maxWidth: "1200px", // Adjust max width as needed
          margin: "auto",
        }}
      >
        <Grid
          item
          xs={12}
          sm={10}
          md={8}
          style={{ backgroundColor: "white", padding: 30, borderRadius: 10 }}
        >
          <h3
            style={{
              backgroundColor: "#132968",
              color: "#FFFFFF",
              padding: "20px",
              borderRadius: 20,
            }}
          >
            Edit Bus
          </h3>
          {(!busData || !busStops) && <LoadingComponent />}
          {busData && (
            <>
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      label="Route No"
                      defaultValue={busData.routeNo}
                      variant="outlined"
                      fullWidth
                      sx={{ width: "10%" }}
                      margin="normal"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      label="Reg No"
                      value={editedRegNo}
                      variant="outlined"
                      fullWidth
                      sx={{ width: "20%" }}
                      onChange={handleRegNoChange}
                      margin="normal"
                    />
                  </Grid>
                </Grid>
              </form>
              <form>
                <Grid container spacing={2} style={{ marginTop: "1rem" }}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Up</Typography>
                    {busStops
                      .filter((stop) =>
                        busData.schedules.some((s) => s.direction === "up")
                      )
                      .sort((a, b) => a.orderIndex - b.orderIndex)
                      .map((stop, index, arr) =>
                        renderScheduleFields(stop, "up", index, arr)
                      )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Down</Typography>
                    {busStops
                      .filter((stop) =>
                        busData.schedules.some((s) => s.direction === "down")
                      )
                      .sort((a, b) => b.orderIndex - a.orderIndex)
                      .map((stop, index, arr) =>
                        renderScheduleFields(stop, "down", index, arr)
                      )}
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  onClick={handleSubmitEditBus}
                  sx={{ marginTop: "10px", marginBottom: "20px" }}
                >
                  Submit
                </Button>
              </form>
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default EditBus;
