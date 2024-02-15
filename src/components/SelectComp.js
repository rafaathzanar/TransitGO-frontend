import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Typography } from '@mui/material';

export default function SelectComp() {
  const [service, BusEmployee] = React.useState('');

  const handleChange = (event) => {
    BusEmployee(event.target.value);
  };

  return (
    <Box sx={{ width:"30%",height:"20%",marginTop:"20px"}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"><Typography variant='h4'>  Bus Employee</Typography></InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={service}
          label="Service"
          onChange={handleChange}
        >
          <MenuItem value={1}><Typography variant='h4'> Excellent </Typography></MenuItem>
          <MenuItem value={2}><Typography variant='h4'>Satisfactory</Typography></MenuItem>
          <MenuItem value={3}><Typography variant='h4'>Average</Typography></MenuItem>
          <MenuItem value={4}><Typography variant='h4'>Rude</Typography></MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
