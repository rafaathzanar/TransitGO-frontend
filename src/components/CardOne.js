import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CommentBox from './CommentBox';
import FeedbackCards from './FeedbackCards';


const CardOne = () => {
  const [feedbacks, setFeedbacks] = useState([]); // Store submitted feedback

  const handleFeedbackSubmission = (feedback) => {
    // Update feedback state
    setFeedbacks([...feedbacks, feedback]);
  };

  return (
    <div  >
      <Card  sx={{marginBottom:'225px',marginLeft:'50px',marginRight:'50px',marginTop:'75px',borderRadius:'25px',}}>
        <CardContent sx={{ backgroundColor: 'white' ,}}>

            <CommentBox onSubmit={handleFeedbackSubmission} />
            
    
        </CardContent>
      </Card>

      {feedbacks.map((feedback) => (
              <FeedbackCards key={feedback.id} {...feedback} />
     ))}
    </div>
  );
};

export default CardOne;