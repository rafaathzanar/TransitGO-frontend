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
  const [route, setroute] = useState({
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
    setroute((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddStop = () => {
    setroute((prevData) => ({
      ...prevData,
      stops: [...prevData.stops, ""],
    }));
  };

  const handleRemoveStop = () => {
    if (route.stops.length > 0) {
      const updatedStops = [...route.stops];
      updatedStops.pop();

      setroute((prevData) => ({
        ...prevData,
        stops: updatedStops,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/busroute", route);

    // Validate the form
    const validationErrors = validateForm();
    if (hasErrors(validationErrors)) {
      setValidationErrors(validationErrors);
    } else {
      // Form is valid, proceed with submission
      setOpenDialog(true);
      setOpenSnackbar(true);
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
              {route.stops.map((stop, index) => (
                <TextField
                  key={index}
                  fullWidth
                  label={`Stop ${index + 1}`}
                  value={stop}
                  onChange={(e) => {
                    const updatedStops = [...stops];
                    updatedStops[index] = e.target.value;
                    setroute((prevData) => ({
                      ...prevData,
                      stops: updatedStops,
                    }));
                  }}
                />
              ))}
              <Button
                variant="outlined"
                color="primary"
                onClick={handleAddStop}
                style={{ marginRight: "10px" }}
              >
                Add Stop
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleRemoveStop}
              >
                Delete Stop
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>

        {/* Validation Error Snackbar */}
        <Snackbar
          open={hasErrors(validationErrors)}
          autoHideDuration={3000}
          onClose={() => setValidationErrors({})}
          message="Please fill in all required fields."
        />

        {/* Success Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Route Added Successfully</DialogTitle>
          <DialogContent>Your route has been added successfully.</DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>

        {/* Success Snackbar */}
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
