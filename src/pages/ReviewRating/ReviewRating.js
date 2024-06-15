import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import CardOne from "../../components/ReviewPage/CardOne";
import CardTwo from "../../components/ReviewPage/CardTwo";

function ReviewRating() {
  const [selectedRating, setSelectedRating] = useState(null);

  const handleRadioChange = (label) => {
    setSelectedRating(label);
  };

  const handleSubmit = (commentData) => {
    console.log("Submitted comment:", commentData);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',   backgroundColor: "#031a30",
    borderTopRightRadius: "0px",}}>

<CardOne selectedRating={selectedRating} onSubmit={handleSubmit} />

     { /* <Grid container spacing={5}>
      <Grid item xs={12} sm={12} md={6} lg={6}
          style={{
            backgroundColor: "#031a30",
            borderTopRightRadius: "50px",
          }}>
          <CardOne selectedRating={selectedRating} onSubmit={handleSubmit} />
        </Grid>

      <Grid item xs={12} sm={12} md={6} lg={6}
          style={{
            backgroundColor: "#f07a7a",
            borderTopRightRadius: "50px",
          }}
        >
           <CardTwo onRadioChange={handleRadioChange} /> 
        </Grid> 
      </Grid>*/}
    </div>
  );
}

export default ReviewRating;

