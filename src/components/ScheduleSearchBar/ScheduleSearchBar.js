//ScheduleSearchBar.js
import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  TextField,
  Button,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import axios from "axios";

const ScheduleSearchBar = ({ onSearch }) => {
  const [busStops, setBusStops] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    const loadBusStops = async () => {
      try {
        const busStopData = await axios.get("http://localhost:8080/busstops");
        const busStopNames = busStopData.data.map((stop) => ({
          label: stop.name.trim(),
        }));
        setBusStops(busStopNames);
      } catch (error) {
        console.error("Error loading routes:", error.message);
      }
    };
    loadBusStops();
  }, []);

  const handleSearch = () => {
    onSearch(from, to);
  };

  return (
    <Container style={{ paddingTop: 80 }}>
      <Paper elevation={3} style={{ padding: 10, margin: 10 }}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item>
            <Autocomplete
              style={{ width: 200 }}
              options={busStops}
              getOptionLabel={(option) => option.label}
              onChange={(event, value) => setFrom(value?.label || "")}
              renderInput={(params) => (
                <TextField {...params} label="From:" variant="outlined" />
              )}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              style={{ width: 200 }}
              options={busStops}
              getOptionLabel={(option) => option.label}
              onChange={(event, value) => setTo(value?.label || "")}
              renderInput={(params) => (
                <TextField {...params} label="To:" variant="outlined" />
              )}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleSearch}>
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ScheduleSearchBar;
