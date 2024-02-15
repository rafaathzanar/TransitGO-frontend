import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CardOne from './CardOne';
import CardTwo from './CardTwo';
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

const RightMain = () => {
    return (
      <Grid container direction="column"> {/* Vertical layout for left side */}
        <Grid item xs={6}> {/* Upper part spans full width */}
        <Item sx={{ display: 'grid', alignItems: 'center', justifyContent: 'center' , padding: 1, margin: 1 }}>

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