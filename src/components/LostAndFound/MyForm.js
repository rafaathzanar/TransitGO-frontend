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
  const token = localStorage.getItem("token");
  const Authorization = {
    headers: { Authorization: `Bearer ${token}` },
  };
  let navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState(""); // state to hold error messages

  const { handleSubmit, setValue } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post(props.APIurl, data, Authorization); // use data from useForm
      navigate(props.navigateURL);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Backend validation error
        setErrorMsg(
          error.response.data.Mobile_Number ||
            error.response.data.Name ||
            error.response.data.Bus_Description ||
            error.response.data.Item_Description
        );
      } else {
        // Other types of errors
        setErrorMsg("An error occurred. Please try again later.");
      }
    }
  };

  const onInputChange = (e, fieldName) => {
    setValue(fieldName, e.target.value); // use setValue from react-hook-form

    if (fieldName === "mobile_Number" || fieldName === "name") {
      setErrorMsg(""); // Clear the error message when the mobile number field get changes after error
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            margin: "auto",
            marginTop: 5,
            display: "flex",
            justifyContent: "center",
          }}
        >
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
                    required
                    onChange={(e) => onInputChange(e, "bus_Description")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Item Description"
                    multiline
                    minRows={2.5}
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => onInputChange(e, "item_Description")}
                  />
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

              {errorMsg && (
                <Typography color="error" align="center">
                  {errorMsg}
                </Typography>
              )}

              <br />
              <Link
                to={props.url}
                style={{
                  fontSize: "20px",
                  float: "right",
                  textDecoration: "none",
                  padding: "10px",
                  color: "",
                }}
              >
                Report {props.lostorfound} Items Here
              </Link>
            </CardContent>
          </Card>
        </Box>
      </form>
    </div>
  );
};
export default MyForm;
