import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ContainedButton from './ContainedButton'; 
import StarRating from './StarRating';
import CommentBox from './CommentBox';


export default function CardOne() {
    return (
        <div style={{ width: '250px', height: '400px' }}>
      <Card>

        
       <CardContent sx={{ backgroundColor: '#f07a7a',}}>

       <CardContent sx={{display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        spacing: 2, 
        backgroundColor: 'white' , 
        }}>

      

        <h3>Review & Rating</h3>

          <StarRating />
          <CommentBox />
          <ContainedButton btnName='Submit'/>

          
        </CardContent> 
    
        </CardContent>
    
      </Card>
      </div>
    );
  }

