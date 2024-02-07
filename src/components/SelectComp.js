import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectComp() {
  const [service, BusEmployee] = React.useState('');

  const handleChange = (event) => {
    BusEmployee(event.target.value);
  };

  return (
    <Box sx={{ width:"30%",height:"20%",marginTop:"20px"}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"> Bus Employee</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={service}
          label="Service"
          onChange={handleChange}
        >
          <MenuItem value={1}>Excellent</MenuItem>
          <MenuItem value={2}>Satisfactory</MenuItem>
          <MenuItem value={3}>Average</MenuItem>
          <MenuItem value={4}>Rude</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}