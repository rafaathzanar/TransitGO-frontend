import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function SelectVariants() {
  const [station, setStation] = React.useState('');

  const handleChange = (event) => {
    setStation(event.target.value);
  };

  return (
    <div>
      <FormControl className='first' sx={{ minWidth: 250 }}>
        <InputLabel id="demo-simple-select-standard-label">From</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={station}
          onChange={handleChange}
          label="Station"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>Colombo</MenuItem>
          <MenuItem value={2}>Galle</MenuItem>
          <MenuItem value={3}>Kandy</MenuItem>
        </Select>
      </FormControl>
      <FormControl className='second' sx={{ minWidth: 250, ml:1}}>
        <InputLabel id="demo-simple-select-standard-label">To</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={station}
          onChange={handleChange}
          label="Station"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Colombo</MenuItem>
          <MenuItem value={20}>Galle</MenuItem>
          <MenuItem value={30}>Kandy</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

