import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditLostForm() {
  const token = localStorage.getItem('token');
  const Authorization = {
    headers: {Authorization: `Bearer ${token}`}
  };
  let navigate = useNavigate();

  const { id } = useParams();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    await axios.put(`http://localhost:8080/lost/${id}`, item, Authorization);
    navigate("/lostandfound/lostitem");
    
  };

  const [item, setItem] = useState({
    name: "",
    mobile_Number: "",
    bus_Description: "",
    item_Description: ""
  });

  const { name, mobile_Number, bus_Description, item_Description } = item;

  const onInputChange = (e, fieldName) => {
    setItem({ ...item, [fieldName]: e.target.value });
  };

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const result = await axios.get(`http://localhost:8080/lost/${id}`, Authorization);
    setItem(result.data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ margin: "auto", marginTop: 5, display: "flex", justifyContent: "center" }}>
          <Card>
            <CardContent>
              <Typography variant="h2" align="center" sx={{ fontSize: 32, fontWeight: "bold", fontFamily: "Open Sans" }}>
                Edit Lost Form
              </Typography>
              <br />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Stack direction="column" spacing={2}>
                    <TextField
                      label="Name"
                      variant="outlined"
                      placeholder="Enter your name"
                      fullWidth
                      {...register("name", {
                        
                        pattern: {
                          value: /^[A-Za-z]+$/,
                          message: "Name should contain only alphabets"
                        }
                      })}
                      value={name}
                      onChange={(e) => onInputChange(e, "name")}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="column" spacing={2}>
                    <TextField
                      label="Mobile Number"
                      variant="outlined"
                      fullWidth
                        placeholder="07xxxxxxxx"
                      {...register("mobile_Number", {
                        
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Mobile Number should be 10 digits"
                        }
                      })}
                      value={mobile_Number}
                      onChange={(e) => onInputChange(e, "mobile_Number")}
                      error={!!errors.mobile_Number}
                      helperText={errors.mobile_Number?.message}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="column" spacing={2}>
                    <TextField
                      label="Bus Description"
                      multiline
                      minRows={2.5}
                      required
                      variant="outlined"
                      fullWidth
                      {...register("bus_Description", {
                        
                        minLength: {
                          value: 8,
                          message: "Bus Description must be at least 8 characters"
                        }
                      })}
                      value={bus_Description}
                      onChange={(e) => onInputChange(e, "bus_Description")}
                      error={!!errors.bus_Description}
                      helperText={errors.bus_Description?.message}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="column" spacing={2}>
                    <TextField
                      label="Item Description"
                      multiline
                      minRows={2.5}
                      required
                      variant="outlined"
                      fullWidth
                      {...register("item_Description", {
                       
                        minLength: {
                          value: 5,
                          message: "Item Description must be at least 5 characters"
                        }
                      })}
                      value={item_Description}
                      onChange={(e) => onInputChange(e, "item_Description")}
                      error={!!errors.item_Description}
                      helperText={errors.item_Description?.message}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="column" spacing={1.5}>
                    <Button variant="contained" sx={{ backgroundColor: "black", color: "white" }} type="submit">
                      Submit
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
              <br />
            </CardContent>
          </Card>
        </Box>
      </form>
    </div>
  );
};



