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
import Footer from "../../components/Footer/Footer";
import Mobile from "../../components/Mobile/Mobile";
import BackgroundImage from "../../images/busstand.jpg";

function HomePage() {
  const navigate = useNavigate();
  return (
    <div style={{}}>
      <HeaderBar></HeaderBar>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
        }}
      >
        <Grid container spacing={2} mt={15}>
          <Grid
            container
            xs={12}
            md={6}
            justifyContent="center"
            alignItems="center"
            marginTop={2}
          >
            <CardButton
              typography="Bus Schedules"
              icon={Icon1}
              onClick={() => navigate("busschedule")}
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
              typography="Lost/Found"
              icon={Icon2}
              onClick={() => navigate("lostandfound")}
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
              typography="Package Transfer"
              icon={Icon3}
              onClick={() => navigate("packagetransfer")}
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
              typography="Delay Reports Announcements"
              icon={Icon4}
              onClick={() => navigate("announcementanddelay")}
            />
          </Grid>
        </Grid>
      </div>
      <Mobile></Mobile>
      <Footer />
    </div>
  );
}

export default HomePage;
