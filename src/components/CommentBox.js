import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import StarRating from './StarRating';

const CommentBox = ({ onFeedbackSubmit }) => {
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState('');
  const [rating, setRating] = useState(0);

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

    if (!commentError && comment.length > 0 && rating > 0) {
      // Create a new feedback entry with the comment data
      const newFeedback = {
        id: new Date().getTime(), // Use timestamp as a unique ID
        username: "User",
        date: new Date().toISOString().slice(0, 10),
        rating: rating,
        review: comment,
        avatarUrl: "https://example.com/user-avatars/default.png",
      };

      // Pass the feedback data to the parent component
      onFeedbackSubmit(newFeedback);

      // Reset form values
      setComment('');
      setRating(0);
    } else {
      setCommentError('Please type something and select a rating');
    }
  };

  return (
    <div>
      <h3>Review & Rating</h3>
      <StarRating value={rating} onChange={handleRatingChange} />

      <form onSubmit={handleSubmit}>
        <TextField
          label="Comments"
          multiline
          rows={4}
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
        <Button type="submit" disabled={commentError}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CommentBox;