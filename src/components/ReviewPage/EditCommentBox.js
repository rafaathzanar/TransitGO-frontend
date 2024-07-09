import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import StarRating from "./StarRating";
import {
  Typography,
  Box,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";

function EditCommentBox({ id, onClose, onEdit }) {
  const token = localStorage.getItem("token");
  const Authorization = {
    headers: { Authorization: `Bearer ${token}` },
  };
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
        const result = await axios.get(
          `http://localhost:8080/rate/${id}`,
          Authorization
        );
        setComment(result.data);
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
        onEdit(comment, true); // Notify parent component of the edit
        onClose(); // Close the dialog upon successful submission
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
    <Box sx={{ padding: "20px" }}>
      <Box
        sx={{ position: "relative", textAlign: "center", marginBottom: "20px" }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Edit Review & Rating
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 0, top: 0 }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <StarRating value={comment.rate} onChange={onRatingChange} />
      {errors.rate && <Typography color="error">{errors.rate}</Typography>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Comments"
          multiline
          rows={4}
          placeholder="Leave a Comment here!"
          id="review"
          name="review"
          value={comment.review}
          onChange={onInputChange}
          error={Boolean(errors.review)}
          helperText={errors.review}
          fullWidth
          sx={{ marginTop: "20px", marginBottom: "20px" }}
        />

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#0B183C",
            color: "white",
            width: "100%",
            padding: "10px 0",
          }}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default EditCommentBox;
