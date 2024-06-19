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
import { useNavigate, useParams } from "react-router";

const FormEditEmployee = () => {
  let navigate=useNavigate();
  const {id} = useParams()
  const token = localStorage.getItem('token');
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    uname: "",
    phone: "",
    //password: "",
    busid: "", // New state for bus selection
  });


  const{fname,lname,email,uname,password,phone,bus} = formData;

  const onFormInput = (e) =>{
     setFormData({...formData,[e.target.name]:e.target.value});
  }

  useEffect(()=>{
    loadUserData();
  },[id])


  const [formErrors, setFormErrors] = useState({
    fname: "",
    lname: "",
    email: "",
    uname: "",
    phone: "",
    //password: "",
    busid: "", // New state for bus selection
  });



  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      console.log("json is",formData)
    await axios.put(`http://localhost:8080/admin-user/update/${id}`,formData,{
      headers: { Authorization: `Bearer ${token}` }
    });
    window.alert("Employee Details Updated");
    navigate("/admin/employees");
    }
    catch(error){
      console.error("Error submitting form: ",error);
    }
  };

  //Load the data for the specific user
  // const loadUsers = async ()=>{
  //   const result = await axios.get(`http://localhost:8080/user/${id}`,formData);
  //   setFormData(result.data);
    
  // }

  const loadUserData = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/admin/get-user/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(result);
      if (result.data && result.data.user) {
        setFormData({
          fname: result.data.user.fname,
          lname: result.data.user.lname,
          email: result.data.user.email,
          uname: result.data.user.uname,
          phone: result.data.user.phone,
          //password: "",
          busid: result.data.user.busid || "",
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Edit Employee
      </Typography>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="fname"
              value={formData.fname}
              onChange={(e)=>onFormInput(e)}
              error={formErrors.fname}
              helperText={formErrors.fname && "First name is required"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lname"
              value={formData.lname}
              onChange={(e)=>onFormInput(e)}
              error={formErrors.lname}
              helperText={formErrors.lname && "Last name is required"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={(e)=>onFormInput(e)}
              error={formErrors.email}
              helperText={formErrors.email && "Email is required"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Username"
              name="uname"
              value={formData.uname}
              onChange={(e)=>onFormInput(e)}
              error={formErrors.uname}
              helperText={formErrors.uname && "Username is required"}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={(e)=>onFormInput(e)}
              error={formErrors.phone}
              helperText={formErrors.phone && "Phone is required"}
            />
          </Grid>

          {/* <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={(e)=>onFormInput(e)}
              error={formErrors.password}
              helperText={formErrors.password && "Password is required"}
            />
          </Grid> */}

          <Grid item xs={12}>
            <Select
              fullWidth
              label="Bus"
              name="busid"
              value={formData.busid}
              onChange={(e)=>onFormInput(e)}
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
        <Button onSubmit={handleSubmit}
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

export default FormEditEmployee;

