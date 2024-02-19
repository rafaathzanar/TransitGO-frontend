import React, { useState } from "react";
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

const FormRoute = () => {
  const [formData, setFormData] = useState({
    routeNo: "",
    from: "",
    end: "",
    stops: [],
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [validationErrors, setValidationErrors] = useState({
    routeNo: false,
    from: false,
    end: false,
    stops: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddStop = () => {
    setFormData((prevData) => ({
      ...prevData,
      stops: [...prevData.stops, ""],
    }));
  };

  const handleRemoveStop = () => {
    if (formData.stops.length > 0) {
      const updatedStops = [...formData.stops];
      updatedStops.pop();

      setFormData((prevData) => ({
        ...prevData,
        stops: updatedStops,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
      routeNo: formData.routeNo.trim() === "",
      from: formData.from.trim() === "",
      end: formData.end.trim() === "",
      stops: formData.stops.some((stop) => stop.trim() === ""),
    };

    return errors;
  };

  const hasErrors = (errors) => {
    return Object.values(errors).some((error) => error);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Typography>Route No.</Typography>
              <TextField
                fullWidth
                label="Route No"
                name="routeNo"
                value={formData.routeNo}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography>From</Typography>
              <TextField
                fullWidth
                label="From- Bus Station"
                name="from"
                value={formData.from}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography>End</Typography>
              <TextField
                fullWidth
                label="End- Bus Station"
                name="end"
                value={formData.end}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography>Stops</Typography>
              {formData.stops.map((stop, index) => (
                <TextField
                  key={index}
                  fullWidth
                  label={`Stop ${index + 1}`}
                  value={stop}
                  onChange={(e) => {
                    const updatedStops = [...formData.stops];
                    updatedStops[index] = e.target.value;
                    setFormData((prevData) => ({
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
