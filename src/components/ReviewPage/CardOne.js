import React, { useEffect, useState } from "react";
import CardContent from "@mui/material/CardContent";
import CommentBox from "./CommentBox";
import FeedbackCards from "./FeedbackCards";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useParams } from "react-router";
import { Typography } from "@mui/material";

const CardOne = ({ busRouteId, username }) => {
  const [feedbacks, setFeedbacks] = useState([]);

  const { id } = useParams();

  const handleFeedbackSubmission = (feedback) => {
    // Add the new feedback and sort the feedbacks array
    const updatedFeedbacks = [feedback, ...feedbacks];
    setFeedbacks(updatedFeedbacks);
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    const result = await axios.get("http://localhost:8080/rates");
    console.log(result.data);

    const formattedFeedbacks = result.data.map((feedback) => ({
      ...feedback,
      rate: parseFloat(feedback.rate),
    }));

    // Sort the feedbacks by createdAt date in descending order
    const sortedFeedbacks = formattedFeedbacks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFeedbacks(sortedFeedbacks);
  };

  const deleteReviews = async (id) => {
    await axios.delete(`http://localhost:8080/rate/${id}`);
    loadReviews();
  };

  return (
    <div>
      <Grid item xs={11} sm={11} md={10} lg={10} xl={10} m={6}>
        <CardContent sx={{ backgroundColor: "white", borderRadius: "25px" }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>BusID:xxx</Typography>
            <Typography>RouteNo:xx</Typography>
          </div>
          <CommentBox onSubmit={handleFeedbackSubmission} busRouteId={busRouteId} username={username} />
        </CardContent>
      </Grid>

      {feedbacks.map((feedback) => (
        <div key={feedback.id}>
          <FeedbackCards
            id={feedback.id}
            username={feedback.username}
            profile={feedback.profile}
            rate={feedback.rate}
            review={feedback.review}
            createdAt={feedback.createdAt}
            onDelete={deleteReviews}
          />
        </div>
      ))}
    </div>
  );
};

export default CardOne;




