import React from "react";
import CardBox from "../../components/LostAndFound/CardBox";
import Typography from "@mui/material/Typography";
import img1 from "../../images/LostAnno.png";
import img2 from "../../images/FoundAnno.png";
import img3 from "../../images/Report.png";
import { useNavigate } from "react-router";
import { Grid } from "@mui/material";
import HeaderBar from "../../components/HeaderBar/HeaderBar";

export default function LostFound() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleAuthentication = () => {
    if (token != null){
      navigate("lostfoundreport");
    }else{
       navigate("/signin");
    }
  }

  const cardBoxStyle = {
    boxShadow: "0px 2px 4px hsla(0, 93%, 70%, 0.8)",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
  };

  return (
    <div>
      <HeaderBar></HeaderBar>
      <div
        style={{
          backgroundColor: "hsl(224, 69%, 24%)",
          padding: "10px 0",
          boxShadow: "0px 5px 8px hsla(0, 93%, 70%, 0.8)",
        }}
      >
        <Typography variant="h3" align="center" marginTop="80px" color="#fff">
          Get Your Things Back with
        </Typography>

        <Typography
          variant="h2"
          align="center"
          fontWeight="bold"
          fontFamily="OpenSans"
          marginBottom="30px"
          color="#fff"
        >
          Lost & Found
        </Typography>
      </div>

      <Grid
        container
        spacing={6}
        justifyContent="center"
        alignItems="center"
        mt={4}
      >
        <CardBox
          icon={img1}
          typography={"Lost Announcement"}
          onClick={() => navigate("lostitem")}
        />
        <CardBox
          icon={img2}
          typography={"Found Announcement"}
          onClick={() => navigate("founditem")}
        />
        <CardBox
          icon={img3}
          typography={"Report Lost/Found"}
          onClick={() => handleAuthentication()}
          //onClick={() => navigate("lostfoundreport")}
        />
      </Grid>
    </div>
  );
}
