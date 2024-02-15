import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import StarRating from './StarRating';
import Card from '@mui/material/Card';
import FeedbackCards from './FeedbackCards';
import { Typography } from '@mui/material';

const CommentBox = ({ onSubmit }) => {
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState('');
  const [rating, setRating] = useState(0);
  const [feedbackData, setFeedbackData] = useState([]); // Store submitted feedback

  const handleCommentChange = (event) => {
    const value = event.target.value;
    setComment(value);
    if (value.length > 0) {
      setCommentError('');
    }
  };

  const handleRatingChange = (newValue) => {
    setRating(newValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (comment.length > 0 && rating > 0) {
      // Create new feedback entry
      const newFeedback = {
        id: new Date().getTime(),
        username: "User", // Replace with actual values
        profile: "https://example.com/avatar.jpg",
        rating: rating,
        comment: comment,
      };

      // Update feedback data array
      setFeedbackData([...feedbackData, newFeedback]);

      // Optionally call the provided onSubmit function (if needed)
      if (onSubmit) {
        onSubmit(newFeedback);
      }

      // Reset form values
      setComment('');
      setRating(0);
    } else {
      setCommentError('Please type a comment and select a rating');
    }
  };

  return (
    <div style={{margin:'50px'}}>

      <Typography 
      variant='h4'sx={{display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center'}}>
      Review & Rating
      </Typography>

      <StarRating value={rating} onChange={handleRatingChange} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Comments"
          multiline
          rows={8}
          placeholder="Leave a Comment here!"
          id="comment"
          name="comment"
          value={comment}
          onChange={handleCommentChange}
          error={commentError}
          helperText={commentError}
        />

        <br />
        <br />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "black", color: "white",
         
          justifyContent: 'center', }}
          type="submit"
          disabled={commentError || comment.length === 0 || rating === 0} // All conditions
        >
          Submit
        </Button>
       </div>
      </form>
      </div>
</div>
   

  );
};

export default CommentBox;
