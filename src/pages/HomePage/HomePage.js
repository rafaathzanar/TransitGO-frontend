import HeaderBar from "../../components/HeaderBar/HeaderBar";
import CardButton from "../../components/CardButton/CardButton";
import React from "react";
import CoverPic from "../../logo/coverpichomepage.png";
import Icon1 from "../../logo/busschimg.png";
import Icon2 from "../../logo/lostimg.png";
import Icon3 from "../../logo/packimg.png";
import Icon4 from "../../logo/announceimg.png";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router";

function HomePage() {
  const navigate = useNavigate();
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
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} md={6}>
            <CardButton
              typography="Bus Schedules"
              icon={Icon1}
              onClick={() => navigate("busschedule")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardButton
              typography="Lost/Found"
              icon={Icon2}
              onClick={() => navigate("lostandfound")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardButton
              typography="Package Transfer"
              icon={Icon3}
              onClick={() => navigate("packagetransfer")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardButton
              typography="Delay Reports Announcements"
              icon={Icon4}
              onClick={() => navigate("announcementanddelay")}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default HomePage;
