import React from "react";
import CardButton from "../../components/CardButton/CardButton";
import Icon3 from "../../logo/location.png";
import { useNavigate } from "react-router";
import { Grid } from "@mui/material";
function Location() {
  const navigate = useNavigate();
  return (
    <div>
      <Grid
        item
        xs={12}
        lg={4}
        justifyContent="center"
        alignItems="center"
        marginTop={25}
        marginLeft={-10}
        display="flex"
      >
        <CardButton
          typography="Location Management"
          icon={Icon3}
          onClick={() => navigate("stopmanagement")}
        />
      </Grid>
    </div>
  );
}

export default Location;
