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
    <Grid container spacing={1} mt={15}>
      <Grid
        container
        xs={12}
        sm={12}
        md={6}
        justifyContent="center"
        alignItems="center"
        marginTop={2}
      >
        <CardButton
          typography="Route Management"
          icon={Icon1}
          onClick={() => navigate("routemanagement")}
        />
      </Grid>
      <Grid
        container
        xs={12}
        md={6}
        justifyContent="center"
        alignItems="center"
        marginTop={2}
      >
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
