import React from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ContainedButton from './ContainedButton';

function MyForm(props) {
  

  return (
    <div>
        <Typography
  variant="h2"
  align="center"
  sx={{
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'Open Sans',
  }}
>
  {props.heading}
</Typography>

    <Box component={Paper} marginLeft={2}  sx={{ maxWidth: 400, margin: 'auto', marginTop: 2, }}>
<Card>
    <CardContent sx={{ backgroundColor: '#c9d1d4', width:'375px', height:'345px'}} > 
      <form >

          
        <Grid container spacing={2}  >

          <Grid  item xs={12}>

            <Stack direction="column" spacing={2}>

              <TextField 
              label="Name"
               required variant="outlined" 
               placeholder='Enter your name' 
                fullWidth />

            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack direction="column" spacing={2}>
              <TextField 
              label="Mobile Number"
               required variant="outlined" 
               fullWidth />

            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack direction="column" spacing={2}>
              <TextField label="Bus Details"
               variant="outlined" 
                fullWidth />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack direction="column" spacing={2}>
              <TextField label="Item Description"
               multiline minRows={2.5} 
               variant="outlined" 
                fullWidth />
            </Stack>
          </Grid>

          <Grid item xs={12}>
         < Stack direction="column" spacing={1.5}>

            <ContainedButton btnName='Submit' />

            </Stack>
          </Grid>

        </Grid>
      </form>
      </CardContent>
      </Card>
    </Box>
    </div>
  );
}

export default MyForm;
