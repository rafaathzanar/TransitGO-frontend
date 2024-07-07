import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router";
import { type } from "@testing-library/user-event/dist/type";
import {
  validateFname,
  validateLname,
  validateUsername,
  validateEmail,
  validatePhoneNumber,
  validatePassword,
} from "../../components/FormValidationSignup/FormValidationSignup";

const AddAdminForm = () => {
  const token = localStorage.getItem("token");
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    uname: "",
    password: "",
    phone: "",
   
  });

  const { fname, lname, email, uname, password, phone} = formData;

  const onFormInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [formErrors, setFormErrors] = useState({
    fname: "",
    lname: "",
    email: "",
    uname: "",
    password: "",
    phone: "",
  });

  useEffect(() => {
    loadBuses();
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Form Validation
    const fnameValidation = validateFname(formData.fname);
    const lnameValidation = validateLname(formData.lname);
    const usernameValidation = validateUsername(formData.uname);
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);
    const phoneValidation = validatePhoneNumber(formData.phone);

    if (
      !fnameValidation.isValid ||
      !lnameValidation.isValid ||
      !usernameValidation.isValid ||
      !emailValidation.isValid ||
      !phoneValidation.isValid ||
      !passwordValidation.isValid
    ) {
      setFormErrors({
        fname: fnameValidation.Message,
        lname: lnameValidation.Message,
        uname: usernameValidation.Message,
        email: emailValidation.Message,
        phone: phoneValidation.Message,
        password: passwordValidation.Message,
      });
      console.log(formErrors);
      return;
    }

    //to register new users
    try {
      const token = localStorage.getItem("token");
      const updatedFormData = { ...formData, type: "employee" };
      console.log("json is", updatedFormData);
      await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        updatedFormData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      window.alert("Employee Added Successfully");
      navigate("/admin/employees");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        if(error.response.data === "Email already in use"){
          setFormErrors({
            ...formErrors,
            email: error.response.data,
          });
        }
        
      } else {
        console.error("Error submitting form: ", error);
        window.alert("Something went wrong, please try again later");
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add Admin
      </Typography>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="hidden" name="type" value="admin" />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="fname"
              value={formData.firstName}
              onChange={(e) => onFormInput(e)}
              error={formErrors.fname}
            />
            {formErrors.fname && <p className="error">{formErrors.fname}</p>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lname"
              value={formData.lastName}
              onChange={(e) => onFormInput(e)}
              error={formErrors.lname}
            />
            {formErrors.lname && <p className="error">{formErrors.lname}</p>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="text"
              name="email"
              value={formData.email}
              onChange={(e) => onFormInput(e)}
              error={formErrors.email}
            />
            {formErrors.email && <p className="error">{formErrors.email}</p>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Username"
              name="uname"
              value={formData.uname}
              onChange={(e) => onFormInput(e)}
              error={formErrors.uname}
            />
            {formErrors.uname && <p className="error">{formErrors.uname}</p>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={(e) => onFormInput(e)}
              error={formErrors.phone}
            />
            {formErrors.phone && <p className="error">{formErrors.phone}</p>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => onFormInput(e)}
              error={formErrors.password}
            />
            {formErrors.password && (
              <p className="error">{formErrors.password}</p>
            )}
          </Grid>

          {/* <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={(e) => onFormInput(e)}
              error={formErrors.phone}
            />
            {formErrors.phone && <p className="error">{formErrors.phone}</p>}
          </Grid> */}

          
          
        </Grid>
        <Button
          onSubmit={handleSubmit}
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

export default AddAdminForm;
