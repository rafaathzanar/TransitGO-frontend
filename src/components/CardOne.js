import React from 'react';
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
            
    

const CardOne = ({ onSubmit }) => {
  return (
    <div style={{ width: '250px', height: '400px' }}>
      <Card>
        <CardContent sx={{ backgroundColor: '#f07a7a' }}>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              spacing: 2,
              backgroundColor: 'white',
            }}
          >
            {/* Pass the onSubmit function directly to CommentBox */}
            <CommentBox onSubmit={onSubmit} />
          </CardContent>

        </CardContent>
      </Card>

      {feedbacks.map((feedback) => (
              <FeedbackCards key={feedback.id} {...feedback} />
     ))}
    </div>
  );
};


export default CardOne;

export default CardOne;



