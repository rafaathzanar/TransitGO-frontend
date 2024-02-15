import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CardOne from './CardOne';
import CardTwo from './CardTwo';
import FeedbackCards from './FeedbackCards';




const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));




export default function MyLayout() {
  return (
   <div style={{display:'flex'}}>
        
   <div style={{flexBasis:'35%' ,backgroundColor:'#f07a7a',borderTopRightRadius:'50px',height:'45rem',flexGrow:'1',marginRight:'60px'}}>
       <  CardOne />
       </div>
      
   <div style={{flexBasis:'65%',flexGrow:'1'}}>
       <CardTwo />
       </div>

       
        
    </div>
  );
}
