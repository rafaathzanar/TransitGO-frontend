//RouteandSchedule.js
import React from "react";
import Grid from "@mui/material/Grid";
import CardButton from "../../components/CardButton/CardButton";
import Icon1 from "../../logo/manageroute.png";
import Icon2 from "../../logo/managebus.png";
import Icon3  from "../../logo/location.png";
import { useNavigate } from "react-router";
const RouteandSchedule = () => {
  const navigate = useNavigate();

  return (
 
      <Grid container spacing={5} m={{lg :20 , sm:1, md:15}} >
        <Grid item xs={10} md={6}lg={4} justifyContent="center" alignItems="center" marginTop={2}>
          <CardButton
            typography="Route Management"
            icon={Icon1}
            onClick={() => navigate("routemanagement")}
          />
        </Grid>
        <Grid item xs={12} lg={4} justifyContent="center" alignItems="center" marginTop={2}>
          <CardButton
            typography="Bus Management"
            icon={Icon2}
            onClick={() => navigate("busmanagement")}
          />
        </Grid>
        <Grid item xs={12} lg={4} justifyContent="center" alignItems="center" marginTop={2}>
          <CardButton
            typography="Location Management"
            icon={Icon3}
            onClick={() => navigate("stopmanagement")}
          />
        </Grid>
      </Grid>
   
  );
};

export default RouteandSchedule;
