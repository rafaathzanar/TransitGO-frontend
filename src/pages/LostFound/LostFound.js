
import React from "react";
import CardBox from "../../components/CardBox";
import Typography from "@mui/material/Typography";
import img1 from "../../images/LostAnno.png";
import img2 from "../../images/FoundAnno.png";
import img3 from "../../images/Report.png";
import { useNavigate } from "react-router";
import { Grid } from "@mui/material";

export default function LostFound() {
  const navigate = useNavigate();

  return (
    <div>
      <Typography variant="h2" align="center" marginTop="50px">
        Get Your Things Back with
      </Typography>

      <Typography variant="h2" align="center" fontWeight="bold" fontFamily="OpenSans">
        Lost&Found
      </Typography>

      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <CardBox icon={img1} typography={"Lost Announcement"} onClick={() => navigate("lostitem")} />
        <CardBox icon={img2} typography={"Found Announcement"} onClick={() => navigate("founditem")} />
        <CardBox icon={img3} typography={"Report Lost/Found"} onClick={() => navigate("lostfoundreport")} />
      </Grid>
    </div>
  );
}
