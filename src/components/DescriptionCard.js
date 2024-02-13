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
          Name: {Uname}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Contact Number:{numb}
        </Typography>

        <Typography variant="body2" color="textSecondary">
          Bus Details:{bus}
        </Typography>

        <Typography variant="body2" component="div">
          Item Description:{desc}
        </Typography>

      </CardContent>
    </Card>
  );
};

export default DescriptionCard;
