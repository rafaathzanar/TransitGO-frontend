import React from "react";
import CardBox from "../../components/CardBox";
import Typography from "@mui/material/Typography";
import img1 from "../../images/LostAnno.png";
import img2 from "../../images/FoundAnno.png";
import img3 from "../../images/Report.png";
import { useNavigate } from "react-router";

export default function LostFound() {
  const navigate = useNavigate();
  return (
    <div>
      <Typography
        variant="h2"
        align="center"
        marginTop="50px"
        sx={{
          fontSize: 32,
        }}
      >
        Get Your Things Back with
      </Typography>

      <Typography
        variant="h2"
        align="center"
        sx={{
          fontSize: 32,
          fontWeight: "bold",
          fontFamily: "OpenSans",
        }}
      >
        Lost&Found
      </Typography>

      <div style={{ display: "flex", alignItems: "center", marginTop: "75px" }}>
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
          onClick={() => navigate("lostfoundreport")}
        />
      </div>
    </div>
  );
}
