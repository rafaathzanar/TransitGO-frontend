import HeaderBar from "../../components/HeaderBar/HeaderBar";
import CardButton from "../../components/CardButton/CardButton";
import React from "react";
import CoverPic from "../../logo/coverpichomepage.png";
import Icon1 from "../../logo/busschimg.png";
import Icon2 from "../../logo/lostimg.png";
import Icon3 from "../../logo/packimg.png";
import Icon4 from "../../logo/announceimg.png";
import { Grid } from "@mui/material";

function HomePage() {
  return (
    <div style={{ backgroundColor: "D4D7DB" }}>
      <HeaderBar></HeaderBar>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Grid container>
          <Grid xs={12} sm={6} md={6}>
            <CardButton
              typography="Bus Schedules"
              icon={Icon1}
              onClick={() => console.log("Button clicked!")}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6}>
            <CardButton
              typography="Lost/Found"
              icon={Icon2}
              onClick={() => console.log("Button clicked!")}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6}>
            <CardButton
              typography="Package Transfer"
              icon={Icon3}
              onClick={() => console.log("Button clicked!")}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6}>
            <CardButton
              typography="Delay Reports Announcements"
              icon={Icon4}
              onClick={() => console.log("Button clicked!")}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default HomePage;
