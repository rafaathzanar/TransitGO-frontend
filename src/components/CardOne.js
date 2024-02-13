import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CommentBox from './CommentBox';

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
    </div>
  );
};

export default CardOne;


