import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectVariants() {
  const [Bus, setBus] = React.useState('');

  const handleChange = (event) => {
    setBus(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ minWidth: 300}}>
        <InputLabel id="demo-simple-select-standard-label">Select bus</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={Bus}
          onChange={handleChange}
          label="Station"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>001A Colombo-Kandy     10.00AM</MenuItem>
          <MenuItem value={2}>001B Colombo-Jaffna    11.00AM</MenuItem>
          <MenuItem value={3}>001L Galle-Colombo     03.00PM</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

