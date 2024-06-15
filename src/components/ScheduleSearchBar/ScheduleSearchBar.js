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
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [date, setDate] = useState("");

  useEffect(() => {
    const loadBusStops = async () => {
      try {
        const busStopData = await axios.get("http://localhost:8080/busstops");
        const busStopNames = busStopData.data.map((stop) => ({
          label: stop.name.trim(),
          orderIndex: stop.orderIndex,
        }));
        setBusStops(busStopNames);
      } catch (error) {
        console.error("Error loading bus stops:", error.message);
      }
    };
    loadBusStops();
  }, []);

  const calculateDirection = (fromStop, toStop) => {
    if (fromStop.orderIndex < toStop.orderIndex) {
      return "up";
    } else {
      return "down";
    }
  };

  const handleSearch = () => {
    if (from && to && date) {
      const direction = calculateDirection(from, to);
      onSearch(from.label, to.label, direction, date);
    }
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
              onChange={(event, value) => setFrom(value)}
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
              onChange={(event, value) => setTo(value)}
              renderInput={(params) => (
                <TextField {...params} label="To:" variant="outlined" />
              )}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              autoComplete="on"
              onChange={(e) => setDate(e.target.value)}
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
