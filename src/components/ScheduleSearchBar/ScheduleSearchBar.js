import React from "react";
import {
  Autocomplete,
  TextField,
  Button,
  Container,
  Grid,
  Paper,
} from "@mui/material";

const ScheduleSearchBar = () => {
  const fromOptions = [
    { label: "Option 1" },
    { label: "Option 2" },
    { label: "Option 3" },
  ];

  const toOptions = [
    { label: "Option A" },
    { label: "Option B" },
    { label: "Option C" },
  ];
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
