// DescriptionCard.js
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const DescriptionCard = ({ Uname,numb,bus,desc }) => {
  return (
    <Card style={{width:'100%'}}>
      <CardContent>
        <Typography variant="body2" component="div">
          {Uname}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {numb}
        </Typography>

        <Typography variant="body2" color="textSecondary">
          {bus}
        </Typography>

        <Typography variant="body2" color="textSecondary">
          {desc}
        </Typography>

      </CardContent>
    </Card>
  );
};

export default DescriptionCard;
