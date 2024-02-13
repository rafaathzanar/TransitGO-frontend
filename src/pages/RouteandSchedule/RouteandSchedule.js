//RouteandSchedule.js
import React from "react";
import Grid from "@mui/material/Grid";
import CardButton from "../../components/CardButton/CardButton";
import Icon1 from "../../logo/manageroute.png";
import Icon2 from "../../logo/managebus.png";
import { useNavigate } from "react-router";
const RouteandSchedule = () => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={20}>
      <Grid item xs={12} sm={8} md={4} lg={10} xl={10}>
        <CardButton
          typography="Route Management"
          icon={Icon1}
          onClick={() => navigate("routemanagement")}
        />
      </Grid>
      <Grid item xs={12} sm={8} md={10} lg={10} xl={5}>
        <CardButton
          typography="Bus Management"
          icon={Icon2}
          onClick={() => navigate("busmanagement")}
        />
      </Grid>
    </Grid>
  );
};

export default RouteandSchedule;
