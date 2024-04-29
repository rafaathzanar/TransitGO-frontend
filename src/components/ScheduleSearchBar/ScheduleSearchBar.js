import React, { useEffect } from "react";
import {
  Autocomplete,
  TextField,
  Button,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";


const ScheduleSearchBar = () => {
  const [Busstops,setBusstops] = useState();
  useEffect(() => {
    loadBusStops();
  }, []);


  const loadBusStops=async () =>{
  try {
    const busStopData = await axios.get("http://localhost:8080/busstops");
    const busStopNames = busStopData.data.map((stop) => ({
      label: stop.name.trim(),
    }));
    setBusstops(busStopNames);
  
  } catch (error) {
    console.error("Error loading routes:", error.message);
  }
  };





  
  const fromOptions = Busstops;

  const toOptions =Busstops;
  return (
    <Container style={{ paddingTop: 80 }}>
      <Paper elevation={3} style={{ padding: 10, margin: 10 }}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* From Field */}
          <Grid item>
            <Autocomplete
              style={{ width: 200 }}
              options={fromOptions} // Add your options here
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField {...params} label="From:" variant="outlined" />
              )}
            />
          </Grid>

          {/* To Field */}
          <Grid item>
            <Autocomplete
              style={{ width: 200 }}
              options={toOptions} // Add your options here
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField {...params} label="To:" variant="outlined" />
              )}
            />
          </Grid>

          {/* Date Input Field */}
          <Grid item>
            <TextField
              label="Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              autoComplete="on"
            />
          </Grid>

          {/* Search Button */}
          <Grid item>
            <Button variant="contained" color="primary">
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ScheduleSearchBar;
