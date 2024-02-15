// FeedbackPage.js
import React, { useState } from 'react';
import FeedbackDisplay from './FeedbackDisplay';
import CommentBox from './CommentBox';

const FeedbackPage = () => {
  const [feedbackData, setFeedbackData] = useState([]);

  const handleCommentSubmit = (newFeedback) => {
    // Update the feedback data state
    setFeedbackData([...feedbackData, newFeedback]);
  };

  return (
    <div>
      {/* Render CommentBox directly */}
      <CommentBox onFeedbackSubmit={handleCommentSubmit} />
      <FeedbackDisplay feedbackData={feedbackData} />
    </div>
  );
};

export default FeedbackPage;