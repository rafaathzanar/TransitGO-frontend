import React, { useEffect, useState } from "react";
import CardContent from "@mui/material/CardContent";
import CommentBox from "./CommentBox";
import FeedbackCards from "./FeedbackCards";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { Typography } from "@mui/material";

const CardOne = ({ busID }) => {
  const token = localStorage.getItem("token");
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/rates/${busID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const formattedFeedbacks = result.data.map((feedback) => ({
        ...feedback,
        rate: parseFloat(feedback.rate),
      }));

      const sortedFeedbacks = formattedFeedbacks.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setFeedbacks(sortedFeedbacks);
    } catch (error) {
      console.error("Error loading reviews:", error);
    }
  };

  const handleFeedbackSubmission = (feedback) => {
    setFeedbacks([feedback, ...feedbacks]);
  };

  const deleteReviews = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/rate/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      loadReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div>
      <Grid item xs={11} sm={11} md={10} lg={10} xl={10} m={6}>
        <CardContent sx={{ backgroundColor: "white", borderRadius: "25px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>BusID: {busID}</Typography>
          </div>
          <CommentBox onSubmit={handleFeedbackSubmission} busId={busID} />
        </CardContent>
      </Grid>

      {feedbacks.map((feedback) => (
        <FeedbackCards
          key={feedback.id}
          id={feedback.id}
          username={feedback.username}
          profile={feedback.profile}
          rate={feedback.rate}
          review={feedback.review}
          createdAt={feedback.createdAt}
          onDelete={deleteReviews}
        />
      ))}
    </div>
  );
};

export default CardOne;
