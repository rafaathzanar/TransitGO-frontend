import React, { useState } from 'react';
import FeedbackDisplay from './FeedbackDisplay';
import CardOne from './CardOne';

const FeedbackPage = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [rating, setRating] = useState(0);

  const handleCommentSubmit = (commentData) => {
    // Create a new feedback entry with the comment data
    const newFeedback = {
      id: feedbackData.length + 1,
      username: "User",
      date: new Date().toISOString().slice(0, 10),
      rating: rating,
      review: commentData.comment,
      avatarUrl: "https://example.com/user-avatars/default.png",
    };

    // Update the feedback data state
    setFeedbackData([...feedbackData, newFeedback]);
  };

  return (
    <div>
      {/* Pass the handleCommentSubmit function to CardOne */}
      <CardOne onSubmit={handleCommentSubmit} />
      <FeedbackDisplay feedbackData={feedbackData} />
    </div>
  );
};

export default FeedbackPage;
