import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Grid from "@mui/material/Grid";
import CardButton from "../../components/CardButton/CardButton";
import Icon1 from "../../logo/manageroute.png";
import Icon2 from "../../logo/managebus.png";
const RouteandSchedule = () => {
  return (
    <Grid container item xs={10}>
      <Grid xs={12} sm={6} md={6}>
        <CardButton
          typography="Route Management"
          icon={Icon1}
          onClick={() => console.log("Button clicked!")}
        />
      </Grid>
      <Grid xs={12} sm={6} md={6}>
        <CardButton
          typography="Bus Management"
          icon={Icon2}
          onClick={() => console.log("Button clicked!")}
        />
      </Grid>
    </Grid>
  );
};

export default RouteandSchedule;
