//EditRoute.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

const EditRoute = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleteConfirmationBar, setDeleteConfirmationBar] = useState(false);
  const [deletingStopID, setDeletingStopID] = useState(null);
  const [errors, setErrors] = useState([]);

  const [route, setRoute] = useState({
    routeno: "",
    routename: "",
    busStops: [],
  });

  useEffect(() => {
    fetchRouteData();
  }, []);

  const fetchRouteData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/busroute/${id}`);
      // Ensure busStops are sorted by orderIndex
      response.data.busStops.sort((a, b) => a.orderIndex - b.orderIndex);
      setRoute(response.data);
    } catch (error) {
      console.error("Error fetching route data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoute((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const stopErrors = route.busStops.map((stop) => !stop.name);
    setErrors(stopErrors);

    if (stopErrors.some((error) => error)) {
      console.error("Validation failed: Some bus stops are empty.");
      return;
    }

    try {
      // Update the route details
      console.log("route", route);
      await axios.put(`http://localhost:8080/busroute/${id}`, route);
      navigate("/admin/routeschedule/routemanagement");
    } catch (error) {
      console.error("Error updating route:", error);
    }
  };

  const handleClose = () => {
    setDeleteConfirmationBar(false);
  };

  const handleDeleteStop = async (name, stopId) => {
    console.log("name for deletion ", name);
    console.log("stopID for deletion ", stopId);
    if (name === "") {
      try {
        await axios.delete(`http://localhost:8080/busstop/${stopId}`);

        setRoute((prevData) => ({
          ...prevData,
          busStops: prevData.busStops.filter(
            (stop) => stop.stopID !== deletingStopID
          ),
        }));
      } catch (error) {
        console.error("Error deleting bus stop:", error);
      }
      navigate(0);
    } else {
      setDeletingStopID(stopId);
      setDeleteConfirmationBar(true);
    }
  };

  const handleDeleteStopConfirmation = async () => {
    try {
      await axios.delete(`http://localhost:8080/busstop/${deletingStopID}`);
      setRoute((prevData) => ({
        ...prevData,
        busStops: prevData.busStops.filter(
          (stop) => stop.stopID !== deletingStopID
        ),
      }));
    } catch (error) {
      console.error("Error deleting bus stop:", error);
    }
    handleClose();
  };

  const handleAddStop = async (index) => {
    try {
      const newStop = { name: "", stopID: null, orderIndex: index };
      const updatedBusStops = [
        ...route.busStops.slice(0, index),
        newStop,
        ...route.busStops.slice(index),
      ].map((stop, i) => ({ ...stop, orderIndex: i }));

      setRoute((prevData) => ({
        ...prevData,
        busStops: updatedBusStops,
      }));

      const response = await axios.post("http://localhost:8080/busstop", {
        ...newStop,
        busroute: { routeno: route.routeno },
      });
      console.log("Posting new stop", response);
      const createdStop = response.data;
      const updatedBusStopsWithId = [
        ...updatedBusStops.slice(0, index),
        { ...createdStop, orderIndex: index }, // Ensure the new stop has the correct orderIndex
        ...updatedBusStops.slice(index + 1),
      ];

      setRoute((prevData) => ({
        ...prevData,
        busStops: updatedBusStopsWithId,
      }));
    } catch (error) {
      console.error("Error adding bus stop:", error);
    }
  };

  return (
    <>
      <Grid container item xs={10}>
        <Grid item xs={12} sm={6} md={6} style={{ marginLeft: "5rem" }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  name="routeno"
                  type="number"
                  value={route.routeno}
                  onChange={handleChange}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  label="Route Name"
                  name="routename"
                  value={route.routename}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography>Bus Stops</Typography>
                {route.busStops &&
                  route.busStops.map((stop, index) => (
                    <div
                      key={stop.stopID ?? `new-${index}`}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <TextField
                        fullWidth
                        label={`Stop ${index + 1}`}
                        value={stop.name || ""}
                        onChange={(e) => {
                          const updatedBusStops = [...route.busStops];
                          updatedBusStops[index] = {
                            ...updatedBusStops[index],
                            name: e.target.value,
                          };
                          setRoute((prevData) => ({
                            ...prevData,
                            busStops: updatedBusStops,
                          }));
                          setErrors((prevErrors) =>
                            prevErrors.map((error, i) =>
                              i === index ? !e.target.value : error
                            )
                          );
                        }}
                        sx={{ marginTop: 2 }}
                        error={errors[index]}
                        helperText={
                          errors[index] ? "Bus stop name is required" : ""
                        }
                      />
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteStop(stop.name, stop.stopID)}
                        sx={{ marginLeft: 1 }}
                      >
                        <DeleteIcon />
                      </IconButton>
                      {index === 0 && (
                        <IconButton
                          color="primary"
                          aria-label="add"
                          onClick={() => handleAddStop(0)}
                          sx={{ marginLeft: 1 }}
                        >
                          <ArrowCircleUpIcon />
                        </IconButton>
                      )}
                      <IconButton
                        color="primary"
                        aria-label="add"
                        onClick={() => handleAddStop(index + 1)}
                        sx={{ marginLeft: 1 }}
                      >
                        <ArrowCircleDownIcon />
                      </IconButton>
                    </div>
                  ))}
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Update
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>

      <Dialog
        open={deleteConfirmationBar}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this stop? Note: The schedule under
            this stop will be deleted too.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteStopConfirmation}
            color="secondary"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditRoute;
