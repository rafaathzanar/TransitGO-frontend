import React from "react";
import Grid from "@mui/material/Grid";
import CardButton from "../../components/CardButton/CardButton";
import Icon1 from "../../logo/manageroute.png";
import Icon2 from "../../logo/managebus.png";
import { useNavigate } from "react-router";

const RouteandSchedule = () => {
  const navigate = useNavigate();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "80vh" }} // Full viewport height to center vertically
    >
      <Grid item xs={10} md={6} lg={4} display="flex" justifyContent="center">
        <CardButton
          typography="Route Management"
          icon={Icon1}
          onClick={() => navigate("routemanagement")}
        />
      </Grid>
      <Grid item xs={10} md={6} lg={4} display="flex" justifyContent="center">
        <CardButton
          typography="Bus & Schedule Management"
          icon={Icon2}
          onClick={() => navigate("busmanagement")}
        />
      </Grid>
    </Grid>
  );
};

export default RouteandSchedule;
