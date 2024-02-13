import React from "react";
import "./CardBox.css";
import { Button, Typography } from "@mui/material";
import { Grid } from "@mui/material";

function CardBox({ icon, typography, onClick }) {
  return (
    <Grid item xs={12} sm={10} md={5} lg={6} xl={4}>
      <Button className="card-box" onClick={onClick}>
        <div className="card-box-content">
          <img src={icon} alt={icon} className="card-box-icon" />
          <Typography className="card-box-typography">{typography}</Typography>
        </div>
      </Button>
    </Grid>
  );
}

export default CardBox;
