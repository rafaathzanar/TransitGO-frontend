// DescriptionCardList.js
import React from "react";
import DescriptionCard from "./DescriptionCard";
import { Grid } from "@mui/material";

const DescriptionCardList = ({ data }) => {
  return (
    <Grid container spacing={1}>
      {data.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
          <DescriptionCard {...item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default DescriptionCardList;
