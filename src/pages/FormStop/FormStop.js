import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Autocomplete,
  TextField,
  Button,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router";

const FormStop = () => {
  const [busStops, setBusStops] = useState([]);
  const [selectedStop, setSelectedStop] = useState(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false); // State for success dialog
  const [stopsErrorDialog, setStopsErrorDialog] = useState(false); // State for stops validation error dialog
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadBusStops = async () => {
      try {
        const busStopData = await axios.get("http://localhost:8080/busstops", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const busStopLocationData = await axios.get(
          "http://localhost:8080/busstoplocations",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const existingStopLocations = new Set(
          busStopLocationData.data.map((stop) => stop.location.trim())
        );

        const uniqueNamesSet = new Set();
        const busStopNames = busStopData.data
          .filter((stop) => {
            const stopNameTrimmed = stop.name.trim();
            if (
              uniqueNamesSet.has(stopNameTrimmed) ||
              existingStopLocations.has(stopNameTrimmed)
            ) {
              return false;
            } else {
              uniqueNamesSet.add(stopNameTrimmed);
              return true;
            }
          })
          .map((stop) => ({
            label: stop.name.trim(),
            orderIndex: stop.orderIndex,
          }));

        setBusStops(busStopNames);
      } catch (error) {
        console.error("Error loading bus stops:", error.message);
      }
    };
    loadBusStops();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedStop || !latitude || !longitude) {
      setStopsErrorDialog(true);
      return;
    }

    const stop = {
      location: selectedStop.label,
      latitude: latitude,
      longitude: longitude,
    };

    try {
      console.log("Response", stop);
      const response = await axios.post(
        "http://localhost:8080/busstoplocation",
        stop,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setOpenDialog(true);
      }
    } catch (error) {
      console.error("Error adding stop:", error);
    }
    navigate("/admin/routeschedule/stopmanagement");
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate("/admin/routeschedule/stopmanagement");
  };

  const handleCloseStopsErrorDialog = () => {
    setStopsErrorDialog(false);
  };

  return (
    <Grid container item xs={10}>
      <Grid item xs={12} sm={6} md={6} style={{ marginLeft: "5rem" }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Autocomplete
                options={busStops}
                getOptionLabel={(option) => option.label}
                onChange={(event, value) => setSelectedStop(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Bus Stop"
                    variant="outlined"
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                label="Latitude"
                name="latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                label="Longitude"
                name="longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>

        {/* Success dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Stop Added Successfully</DialogTitle>
          <DialogContent>
            <Typography>Your Stop has been added successfully.</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>

        {/* Error dialog */}
        <Dialog open={stopsErrorDialog} onClose={handleCloseStopsErrorDialog}>
          <DialogTitle>Error</DialogTitle>
          <DialogContent>
            <Typography>
              Please select a bus stop, and enter latitude and longitude.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseStopsErrorDialog} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default FormStop;
