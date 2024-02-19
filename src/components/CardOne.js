import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CommentBox from "./CommentBox";
import FeedbackCards from "./FeedbackCards";
import Grid from "@mui/material/Grid";

const CardOne = () => {
  const [feedbacks, setFeedbacks] = useState([]); // Store submitted feedback

  const handleFeedbackSubmission = (feedback) => {
    // Update feedback state
    setFeedbacks([...feedbacks, feedback]);
  };

  return (
    <div>
      <Grid item xs={11} sm={11} md={10} lg={10} xl={10} m={6}>
        <CardContent sx={{ backgroundColor: "white", borderRadius: "25px"}}>
          <CommentBox onSubmit={handleFeedbackSubmission} />
        </CardContent>
      </Grid>

      
      {feedbacks.map((feedback) => (
        <FeedbackCards key={feedback.id} {...feedback} />
      ))}
     
    </div>
  );
};

export default CardOne;
