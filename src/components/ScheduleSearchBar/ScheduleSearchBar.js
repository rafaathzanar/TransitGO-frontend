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
import { useNavigate } from "react-router";

const ScheduleSearchBar = ({ onSearch }) => {
  const userRole = localStorage.getItem("userRole");
  const [busStops, setBusStops] = useState([]);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [date, setDate] = useState("");
  const [fromError, setFromError] = useState(false);
  const [toError, setToError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [sameStopError, setSameStopError] = useState(false);

  const navigation = useNavigate();

  useEffect(() => {
    const loadBusStops = async () => {
      try {
        const busStopData = await axios.get("http://localhost:8080/busstops");

        // Use a Set to store unique bus stop names
        const uniqueNamesSet = new Set();
        const busStopNames = busStopData.data
          .filter((stop) => {
            if (uniqueNamesSet.has(stop.name.trim())) {
              return false; // Exclude duplicate names
            } else {
              uniqueNamesSet.add(stop.name.trim());
              return true; // Include unique names
            }
          })
          .map((stop) => ({
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
    setFromError(!from);
    setToError(!to);
    setDateError(!date);
    setSameStopError(from && to && from.label === to.label);

    if (!from || !to || !date || (from && to && from.label === to.label)) {
      return;
    }

    const direction = calculateDirection(from, to);
    onSearch(from.label, to.label, direction, date);
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
              onChange={(event, value) => {
                setFrom(value);
                setFromError(false);
                setSameStopError(false);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="From:"
                  variant="outlined"
                  error={fromError || sameStopError}
                  helperText={
                    fromError ? "From stop is required" : sameStopError
                  }
                />
              )}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              style={{ width: 200 }}
              options={busStops}
              getOptionLabel={(option) => option.label}
              onChange={(event, value) => {
                setTo(value);
                setToError(false);
                setSameStopError(false);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="To:"
                  variant="outlined"
                  error={toError || sameStopError}
                  helperText={
                    toError
                      ? "To stop is required"
                      : sameStopError
                      ? "From and To are same"
                      : ""
                  }
                />
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
              error={dateError}
              helperText={dateError ? "Date is required" : ""}
              onChange={(e) => {
                setDate(e.target.value);
                setDateError(false);
              }}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleSearch}>
              Search
            </Button>
            {userRole === "employee" && (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: 20 }}
                  onClick={() => navigation("/location")}
                >
                  Start Bus Journey
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ScheduleSearchBar;
