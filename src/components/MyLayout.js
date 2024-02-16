import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CardOne from './CardOne';
import CardTwo from './CardTwo';

import FeedbackCards from './FeedbackCards';

import FeedbackDisplay from './FeedbackDisplay';





const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



export default function MyLayout() {
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container>
      <Grid item xs={4} > {/* Left side takes half the width on all screens */}
          <Left />
        </Grid>
        <Grid item xs={8}> {/* Right side takes the other half */}
          <RightMain />
        </Grid>
      </Grid>
    </Box>
  );
}

const Left = () => {
  return (
    <Item sx={{ padding: 1, margin: 1 }}>
    <CardOne />
    
    </Item>
  );
};





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

       <CardTwo />
  
          </Item >
        </Grid>
        <Grid item xs={6}> {/* Lower part spans full width */}
        <Item sx={{ padding: 1, margin: 1 }}>
            <FeedbackDisplay />

          </Item>
        </Grid>
      </Grid>
    );
  };
