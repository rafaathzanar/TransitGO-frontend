import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import StarRating from "./StarRating";
import { Typography, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router";

function CommentBox({ onSubmit, busId }) {
  const token = localStorage.getItem("token");
  const Authorization = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const [comment, setComment] = useState({
    username: localStorage.getItem("username") || "Anonymous",
    profile: "",
    rate: "",
    review: "",
    buses: {
      busId: parseInt(busId, 10),
    },
  });

  const [errors, setErrors] = useState({
    rate: "",
    review: "",
  });

  const { rate, review } = comment;

  const navigate = useNavigate();

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setComment({ ...comment, [name]: value });
  };

  const onRatingChange = (rating) => {
    setComment({ ...comment, rate: rating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (token != null) {
      if (validate()) {
        try {
          const currentDateTime = new Date().toISOString();
          console.log(comment);
          const response = await axios.post(
            "http://localhost:8080/rate/bus",
            { ...comment, rate: parseFloat(rate) },
            Authorization
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
              busId: parseInt(busId, 10),
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
    } else {
      navigate("/signin");
    }
    navigate(0);
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
    <Box sx={{ margin: "20px", textAlign: "center" }}>
      <Typography
        variant="h4"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        Review & Ratings
      </Typography>

      <StarRating value={rate} onChange={onRatingChange} />
      {errors.rate && <Typography color="error">{errors.rate}</Typography>}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", maxWidth: "1000px" }}
        >
          <TextField
            label="Comments"
            multiline
            rows={10}
            placeholder="Leave a Comment here!"
            name="review"
            value={review}
            fullWidth
            onChange={onInputChange}
            error={Boolean(errors.review)}
            helperText={errors.review}
          />
          <Box sx={{ marginTop: "16px" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#0B183C",
                color: "white",
                width: "10rem",
              }}
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default CommentBox;
