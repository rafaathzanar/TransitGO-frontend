import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const MyForm = (props) => {
  let navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState(""); // state to hold error messages

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post(props.APIurl, data); // use data from useForm
      navigate(props.navigateURL);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Backend validation error
        setErrorMsg(error.response.data.Mobile_Number || "Invalid mobile number.Please check!!!");
      } else {
        // Other types of errors
        setErrorMsg("An error occurred. Please try again later.");
      }
    }
  };

  const onInputChange = (e, fieldName) => {
    setValue(fieldName, e.target.value); // use setValue from react-hook-form
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ margin: "auto", marginTop: 5, display: "flex", justifyContent: "center" }}>
          <Card>
            <CardContent>
              <Typography
                variant="h2"
                align="center"
                sx={{
                  fontSize: 32,
                  fontWeight: "bold",
                  fontFamily: "Open Sans",
                }}
              >
                {props.heading}
              </Typography>
              <br />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    placeholder="Enter your name"
                    fullWidth
                   
                    onChange={(e) => onInputChange(e, "name")}
                  />
                 
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Mobile Number"
                    variant="outlined"
                    fullWidth
                    placeholder="07xxxxxxxx"
                  
                    onChange={(e) => onInputChange(e, "mobile_Number")}
                  />
                 
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Bus Description"
                    multiline
                    minRows={2.5}
                    variant="outlined"
                    fullWidth
                    {...register("bus_Description", {
                      required: "Bus description is required",
                      minLength: {
                        value: 8,
                        message: "Bus description must be at least 8 characters",
                      },
                    })}
                    onChange={(e) => onInputChange(e, "bus_Description")}
                  />
                  {errors.bus_Description && (
                    <Typography color="error">
                      {errors.bus_Description.message}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Item Description"
                    multiline
                    minRows={2.5}
                    variant="outlined"
                    fullWidth
                    {...register("item_Description", {
                      required: "Item description is required",
                      minLength: {
                        value: 5,
                        message: "Item description must be at least 5 characters",
                      },
                    })}
                    onChange={(e) => onInputChange(e, "item_Description")}
                  />
                  {errors.item_Description && (
                    <Typography color="error">
                      {errors.item_Description.message}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "black", color: "white" }}
                    fullWidth
                    type="submit"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
              <br />
              <Link to={props.url} style={{ fontSize: "29px", float: 'right', textDecoration: 'none' }}>
                Want to report {props.lostorfound} item??
              </Link>
              {errorMsg && (
                <Typography color="error" align="center">
                  {errorMsg}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Box>
      </form>
    </div>
  );
};
export default MyForm;

