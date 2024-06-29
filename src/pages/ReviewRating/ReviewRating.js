import React from "react";
import CardOne from "../../components/ReviewPage/CardOne";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";

function ReviewRating() {
  const { busID } = useParams();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{
        backgroundColor: "#fa6b6b",
        minHeight: "100vh",
      }}
    >
      <Grid item xs={12} sm={10} md={8} lg={8} m={4}>
        <CardOne busID={busID} />
      </Grid>
    </Grid>
  );
}

export default ReviewRating;
