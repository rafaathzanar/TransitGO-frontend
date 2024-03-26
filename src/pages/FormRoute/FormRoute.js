import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
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

  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [validationErrors, setValidationErrors] = useState({
    routeno: false,
    routename: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoute((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddStop = () => {
    setRoute((prevData) => ({
      ...prevData,
      stops: [...prevData.stops, ""],
    }));
  };

  const handleRemoveStop = (index) => {
    const updatedStops = [...stops];
    updatedStops.splice(index, 1);
    setRoute((prevData) => ({
      ...prevData,
      stops: updatedStops,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (hasErrors(validationErrors)) {
      setValidationErrors(validationErrors);
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8080/busroute",
          route
        );
        if (response.status === 200) {
          setOpenDialog(true);
          setOpenSnackbar(true);
        }
        for (const stop of stops) {
          await axios.post("http://localhost:8080/busstop", {
            name: stop,
            busroute: {
              routeno,
            },
          });
        }
      } catch (error) {
        console.error("Error adding route:", error);
      }
    }
  
  };

  const validateForm = () => {
    const errors = {
      routeno: route.routeno.trim() === "",
      routename: route.routename.trim() === "",
      stops: route.stops.some((stop) => stop.trim() === ""),
    };

    return errors;
  };

  const hasErrors = (errors) => {
    return Object.values(errors).some((error) => error);
  };

  const handleCloseDialog = () => {
    navigate("/admin/routeschedule/routemanagement/");
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Grid container item xs={10}>
      <Grid xs={12} sm={6} md={6} style={{ marginLeft: "5rem" }}>
        <Typography variant="h4" gutterBottom>
          Add Route
        </Typography>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Typography>Route No.</Typography>
              <TextField
                fullWidth
                label="Route No"
                name="routeno"
                value={routeno}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography>Route Name</Typography>
              <TextField
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
                    value={stop}
                    onChange={(e) => {
                      const updatedStops = [...stops];
                      updatedStops[index] = e.target.value;
                      setRoute((prevData) => ({
                        ...prevData,
                        stops: updatedStops,
                      }));
                    }}
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
                style={{ marginRight: "10px" }}
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

        <Snackbar
          open={hasErrors(validationErrors)}
          autoHideDuration={3000}
          onClose={() => setValidationErrors({})}
          message="Please fill in all required fields."
        />

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Route Added Successfully</DialogTitle>
          <DialogContent>Your route has been added successfully.</DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message="Route Added Successfully"
        />
      </Grid>
    </Grid>
  );
};

export default FormRoute;
