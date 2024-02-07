import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Rating } from '@mui/material';
import Avatar from '@mui/material/Avatar';



  
  // Sample feedback data
  const mockFeedbackData = [
    {
      id: 2,
      username: "Jane Doe",
      date: "2024-02-02",
      rating: 3,
      review: "The product was good, but the shipping was slow and expensive.",
      avatarUrl: "https://example.com/user-avatars/54321.png",
    },
    {
      id: 3,
      username: "David Smith",
      date: "2024-02-01",
      rating: 5,
      review: "I absolutely love this product! It's easy to use and has made my life so much easier.",
      avatarUrl: "https://example.com/user-avatars/98765.png",
    },
    {
      id: 4,
      username: "Alice Johnson",
      date: "2024-01-31",
      rating: 4,
      review: "The product is good overall, but it could be improved by adding some additional features.",
      avatarUrl: "https://example.com/user-avatars/24681.png",
    },
    // Add more feedback entries here
  ];
   
  
  function FeedbackDisplay() {
    const [feedbackData, setFeedbackData] = useState(mockFeedbackData);
  
    return (
      <div>
        {feedbackData.map((feedback) => (
          <Card key={feedback.id} sx={{ borderTop: 3, borderBottom: 3 ,borderColor:'#f2a2a2', marginBottom: 0.2}}> {/* Add borders */}

            <CardContent style={{ display: 'flex', alignItems: 'flex-start', }}>

  <Avatar src={feedback.avatarUrl} alt={feedback.username} />
  <div style={{ marginLeft: '10px' , alignItems: 'flex-start'}}> {/* Add margin for spacing */}
  <Typography variant="h7">{feedback.username}</Typography><br />
  <Rating value={feedback.rating} readOnly /><br />
  <Typography variant="caption" display="block" gutterBottom>{feedback.review}</Typography>
  </div>

           </CardContent>

          </Card>
        ))}
      </div>
    );
  }
export default FeedbackDisplay