import { useForm } from "react-hook-form"
import React from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from "@mui/material/Button";
import useMediaQuery from '@mui/material/useMediaQuery';


const Input = ({ label, register, required }) => (
  <>
    <label>{label}</label>
    <input {...register(label, { required })} />
  </>
)


const MyForm = (props) => {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
   
  }

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
    <form onSubmit={handleSubmit(onSubmit)}>
     

    <Box component={Paper} marginLeft={2}  sx={{ maxWidth: 400, margin: 'auto', marginTop: 2, }}>
<Card >
    <CardContent sx={{ backgroundColor: '#c9d1d4', width:'25rem', height:'30rem'}} > 
 

          
        <Grid container spacing={2}  >

          <Grid  item xs={12}  >

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
               required variant="outlined" 
                fullWidth />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack direction="column" spacing={2}>
              <TextField label="Item Description"
               multiline minRows={2.5} 
               required variant="outlined" 
                fullWidth />
            </Stack>
          </Grid>

          <Grid item xs={12}>
         < Stack direction="column" spacing={1.5}>

         <Button
      variant="contained"
      sx={{ backgroundColor: "black", color: "white" }}
      input type="submit"
    >
      Submit
    </Button>

            </Stack>
          </Grid>

        </Grid>
    
      </CardContent>
      </Card>
      </Box>
    
    </form>
    </div>
  )
}
export default MyForm;