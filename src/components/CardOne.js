import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CommentBox from './CommentBox';

import FeedBacks from './FeedBacks';

const CardOne = () => {
  const [feedbacks, setFeedbacks] = useState([]); // Store submitted feedback

  const handleFeedbackSubmission = (feedback) => {
    // Update feedback state
    setFeedbacks([...feedbacks, feedback]);
  };

  return (
    <div style={{ width: '25rem' }}>
      <Card>
        <CardContent sx={{ backgroundColor: '#f07a7a' }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', spacing: 4, backgroundColor: 'white', padding: 0, margin: 0 }}>
            <CommentBox onSubmit={handleFeedbackSubmission} />
            {/* Display submitted feedback below CommentBox */}
            {feedbacks.map((feedback) => (
              <FeedBacks key={feedback.id} {...feedback} />
            ))}
          </CardContent>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardOne;
