import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import StarRating from "./StarRating";
import { Typography } from "@mui/material";
import axios from "axios";

function CommentBox({ onSubmit, busRouteId, username }) {
  const [comment, setComment] = useState({
    username: username,
    profile: "",
    rate: "",
    review: "",
    busRouteId: busRouteId,
  }); //to store information

  const [errors, setErrors] = useState({
    rate: "",
    review: "",
  });

  const { profile, rate, review } = comment; //this is the thing pass to relevant value

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setComment({ ...comment, [name]: value });
  }; //this is to type and store comments

  const onRatingChange = (rating) => {
    setComment({ ...comment, rate: rating });
  };

  const handleSubmit = async (e) => {  //to post data
    e.preventDefault(); //to avoid weird details on the url 
    if (validate()) {
      try {
        const currentDateTime = new Date().toISOString(); // Get current date and time
        // Submit feedback
        const response = await axios.post("http://localhost:8080/rate", {
          ...comment,
          rate: parseFloat(comment.rate), // Ensure rate is a number
        });
        // Call the onSubmit function passed from the parent component
        onSubmit({ ...comment, rate: parseFloat(comment.rate), createdAt: currentDateTime });
        // Clear the form
        setComment({ username: username, profile: "", rate: "", review: "", busRouteId: busRouteId });
      } catch (error) {
        console.error("Error submitting feedback:", error);
        if (error.response && error.response.data && error.response.data.message) {
          alert(error.response.data.message);
        }
      }
    }
  };
  
  const validate = () => {
    let tempErrors = { rate: "", review: "" };
    let isValid = true;

    if (!comment.rate) {
      tempErrors.rate = "Rating is required";
      isValid = false;
    }

    if (!comment.review) {
      tempErrors.review = "Review is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  return (
    <div style={{ margin: "50px" }}>
      <Typography
        variant="h4"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Review & Ratings
      </Typography>

      <StarRating value={rate} onChange={onRatingChange} />
      {errors.rate && <Typography color="error">{errors.rate}</Typography>}

      <div
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            label="Comments"
            multiline
            rows={8}
            placeholder="Leave a Comment here!"
            id="review"
            name="review"
            value={review}
            onChange={onInputChange}
            error={Boolean(errors.review)}
            helperText={errors.review}
          />

          <br />
          <br />

          <Button
            variant="contained"
            sx={{ backgroundColor: "black", color: "white", width: "13rem", justifyContent: "center" }}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CommentBox;
