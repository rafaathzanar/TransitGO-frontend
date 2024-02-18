import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import CardOne from "./CardOne";
import CardTwo from "./CardTwo";
import FeedbackCards from "./FeedbackCards";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function MyLayout() {
  return (
    <Grid container spacing={5} >
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <CardTwo />
      </Grid>

      <Grid item xs={12} sm={12} md={6} lg={6}
        style={{
          backgroundColor: "#f07a7a",
          borderTopRightRadius: "50px",
        }}
      >
        <CardOne />
      </Grid>
    </Grid>
  );
}
