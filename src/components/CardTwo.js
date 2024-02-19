import { CardContent } from "@mui/material";
import React from "react";
import SelectComp from "./SelectComp";
import Card from "@mui/material/Card";
import Reviews from "./Reviews";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import PieChartTraffic from "./PieChart crowd/PieChartTraffic"

function CardTwo() {
  return (
    <Grid m={3}>
      <Typography
        variant="h3"
        fontFamily="Sans serif"
        style={{ marginTop: "10px" }}
      >
        Passengers Data
      </Typography>{" "}
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={5}>
          <Reviews heading="Route Traffic" />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={7}>
          <h1>Percentages</h1>
          <PieChartTraffic ></PieChartTraffic>
        </Grid>
        
      </Grid>

      <Grid container spacing={5} mt={2}>
      <Grid item xs={12} sm={12} md={12} lg={5} >
          <Reviews heading="Bus Crowd" />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={7} >
          <h1>Percentages</h1>
          <PieChartTraffic></PieChartTraffic>
        </Grid>
      </Grid>
      
    </Grid>
  );
}

export default CardTwo;
