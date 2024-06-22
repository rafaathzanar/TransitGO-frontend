import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import StarRating from "./StarRating";
import { Typography } from "@mui/material";
import axios from "axios";

function CommentBox({ onSubmit, busId }) {
  const token = localStorage.getItem("token");
  const [comment, setComment] = useState({
    username: localStorage.getItem("username") || "Anonymous",
    profile: "",
    rate: "",
    review: "",
    buses: {
      busId: busId,
    },
  });

  const [errors, setErrors] = useState({
    rate: "",
    review: "",
  });

  const { rate, review } = comment;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setComment({ ...comment, [name]: value });
  };

  const onRatingChange = (rating) => {
    setComment({ ...comment, rate: rating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const currentDateTime = new Date().toISOString();
        const response = await axios.post(
          "http://localhost:8080/rate",
          { ...comment, rate: parseFloat(rate) },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        onSubmit({
          ...comment,
          rate: parseFloat(rate),
          createdAt: currentDateTime,
        });
        setComment({
          username: localStorage.getItem("username") || "Anonymous",
          profile: "",
          rate: "",
          review: "",
          buses: {
            busId: busId,
          },
        });
        console.log("comment: ", comment);
      } catch (error) {
        console.error("Error submitting feedback:", error);
        if (error.response?.data?.message) {
          alert(error.response.data.message);
        }
      }
    }
  };

  const validate = () => {
    let tempErrors = { rate: "", review: "" };
    let isValid = true;

    if (!rate) {
      tempErrors.rate = "Rating is required";
      isValid = false;
    }

    if (!review) {
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
        sx={{ display: "flex", justifyContent: "center" }}
      >
        Review & Ratings
      </Typography>

      <StarRating value={rate} onChange={onRatingChange} />
      {errors.rate && <Typography color="error">{errors.rate}</Typography>}

      <div style={{ display: "flex", justifyContent: "center" }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Comments"
            multiline
            rows={8}
            placeholder="Leave a Comment here!"
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
            sx={{ backgroundColor: "black", color: "white" }}
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
