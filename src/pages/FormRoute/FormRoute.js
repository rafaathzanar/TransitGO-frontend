import React, { useState } from "react";
import axios from "axios";
import {
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

const FormRoute = () => {
  const [route, setRoute] = useState({
    routeno: "",
    routename: "",
    stops: [],
  });
  const navigate = useNavigate();

  const { routeno, routename, stops } = route;

  const [openDialog, setOpenDialog] = useState(false); // State for success dialog
  const [stopsErrorDialog, setStopsErrorDialog] = useState(false); // State for stops validation error dialog
  const [routeExistsDialog, setRouteExistsDialog] = useState(false); // State for route exists error dialog

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoute((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeStop = (index, value) => {
    const updatedStops = stops.map((stop, i) =>
      i === index ? { ...stop, name: value } : stop
    );
    setRoute((prevData) => ({
      ...prevData,
      stops: updatedStops,
    }));
  };

  const handleAddStop = () => {
    setRoute((prevData) => ({
      ...prevData,
      stops: [
        ...prevData.stops,
        { name: "", orderIndex: prevData.stops.length },
      ],
    }));
  };

  const handleRemoveStop = (index) => {
    const updatedStops = stops.filter((_, i) => i !== index);
    setRoute((prevData) => ({
      ...prevData,
      stops: updatedStops.map((stop, i) => ({ ...stop, orderIndex: i })),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    // Check if at least two stops are added
    if (stops.length < 2) {
      setStopsErrorDialog(true);
      return;
    }

    // Check if the route number already exists
    try {
      const response = await axios.get("http://localhost:8080/busroutes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const existingRoutes = response.data;

      if (existingRoutes.some((r) => r.routeno === parseInt(routeno, 10))) {
        setRouteExistsDialog(true);
        return;
      }
      if (existingRoutes.some((r) => r.routename === routename)) {
        setRouteExistsDialog(true);
        return;
      }
    } catch (error) {
      console.error("Error checking existing routes:", error);
    }

    try {
      console.log("Response", route);
      const response = await axios.post(
        "http://localhost:8080/busroute",
        route,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setOpenDialog(true);
      }

      // Include orderIndex for each stop
      for (let i = 0; i < stops.length; i++) {
        await axios.post(
          "http://localhost:8080/busstop",
          {
            name: stops[i].name,
            orderIndex: i, // Set the orderIndex here
            busroute: {
              routeno,
            },
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
    } catch (error) {
      console.error("Error adding route:", error);
    }
    navigate("/admin/routeschedule/routemanagement");
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate("/admin/routeschedule/routemanagement");
  };

  const handleCloseStopsErrorDialog = () => {
    setStopsErrorDialog(false);
  };

  const handleCloseRouteExistsDialog = () => {
    setRouteExistsDialog(false);
  };

  return (
    <Grid container item xs={10}>
      <Grid item xs={12} sm={6} md={6} style={{ marginLeft: "5rem" }}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                label="Route No"
                name="routeno"
                type="number"
                value={routeno}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                label="Route Name"
                name="routename"
                value={routename}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography>Stops</Typography>
              {stops.map((stop, index) => (
                <div key={index}>
                  <TextField
                    fullWidth
                    label={`Stop ${index + 1}`}
                    value={stop.name}
                    onChange={(e) => handleChangeStop(index, e.target.value)}
                    sx={{ marginTop: 2 }}
                  />
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleRemoveStop(index)}
                  >
                    Delete Stop
                  </Button>
                </div>
              ))}
              <Button
                variant="outlined"
                color="primary"
                onClick={handleAddStop}
                style={{ marginRight: "10px", marginTop: "20px" }}
              >
                Add Stop
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>

        {/* Stops validation error dialog */}
        <Dialog open={stopsErrorDialog} onClose={handleCloseStopsErrorDialog}>
          <DialogTitle>Please Add Bus Stops</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              At least two stops need to be added to submit a route.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseStopsErrorDialog} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>

        {/* Route exists error dialog */}
        <Dialog open={routeExistsDialog} onClose={handleCloseRouteExistsDialog}>
          <DialogTitle>Route Number Exists</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              A route with this route no. / name already exists. Please use a
              different route details.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseRouteExistsDialog} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>

        {/* Success dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Route Added Successfully</DialogTitle>
          <DialogContent>
            <Typography>Your route has been added successfully.</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default FormRoute;
