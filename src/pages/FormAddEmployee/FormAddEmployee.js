import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Select,
  MenuItem,
} from "@mui/material";

const FormAddEmployee = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    role: "",
    department: "",
    bus: "", // New state for bus selection
  });

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    username: false,
    password: false,
    role: false,
    department: false,
    bus: false, // New state for bus selection
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        errors[key] = true;
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    console.log(formData);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add Employee
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={formErrors.firstName}
              helperText={formErrors.firstName && "First name is required"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={formErrors.lastName}
              helperText={formErrors.lastName && "Last name is required"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={formErrors.email}
              helperText={formErrors.email && "Email is required"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={formErrors.username}
              helperText={formErrors.username && "Username is required"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={formErrors.password}
              helperText={formErrors.password && "Password is required"}
            />
          </Grid>

          <Grid item xs={12}>
            <Select
              fullWidth
              label="Bus"
              name="bus"
              value={formData.bus}
              onChange={handleChange}
              error={formErrors.bus}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select Bus
              </MenuItem>
              <MenuItem value="bus1">Bus 1</MenuItem>
              <MenuItem value="bus2">Bus 2</MenuItem>
              <MenuItem value="bus3">Bus 3</MenuItem>
            </Select>
            {formErrors.bus && (
              <Typography variant="caption" color="error">
                Bus selection is required
              </Typography>
            )}
          </Grid>
        </Grid>
        <Button
          sx={{ marginTop: "20px" }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default FormAddEmployee;
