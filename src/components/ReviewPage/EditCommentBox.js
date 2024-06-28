import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import StarRating from "./StarRating";
import { Typography } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";

function EditCommentBox() {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState({
    username: "",
    profile: "",
    rate: "",
    review: "",
  });
  const [errors, setErrors] = useState({
    rate: "",
    review: "",
  });

  useEffect(() => {
    const loadComment = async () => {
      try {
        const result = await axios.get(`http://localhost:8080/rate/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setComment(result.data);
        console.log("restult", result.data);
      } catch (error) {
        console.error("Error loading comment:", error);
      }
    };
    loadComment();
  }, [id]);

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setComment({ ...comment, [name]: value });
  };

  const onRatingChange = (rating) => {
    setComment({ ...comment, rate: rating });
  };

  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    if (validate()) {
      try {
        await axios.put(
          `http://localhost:8080/rate/${id}`,
          {
            ...comment,
            rate: parseFloat(comment.rate),
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        navigate(`/reviews/${id}`);
      } catch (error) {
        console.error("Error submitting feedback:", error);
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
        Edit Review & Ratings
      </Typography>

      <StarRating value={comment.rate} onChange={onRatingChange} />
      {errors.rate && <Typography color="error">{errors.rate}</Typography>}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Comments"
            multiline
            rows={8}
            placeholder="Leave a Comment here!"
            id="review"
            name="review"
            value={comment.review}
            onChange={onInputChange}
            error={Boolean(errors.review)}
            helperText={errors.review}
          />

          <br />
          <br />

          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              color: "white",
              width: "13rem",
              justifyContent: "center",
            }}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditCommentBox;
