import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function SelectVariants() {
  

  const [fromStation,setFromStation]=React.useState('');
  const [toStation,setToStation]=React.useState('');

  const handleFromChange = (event)=>{
    setFromStation(event.target.value);
  };
  
  const handleToChange = (event)=>{
    setToStation(event.target.value);
  };
  return (
    <div>
      <FormControl className='first' sx={{ minWidth: 250, mt:3 }}>
        <InputLabel id="demo-simple-select-standard-label">From</InputLabel>
        <Select
          className='from'
          labelId="from-station-label"
          id="from-station"
          value={fromStation}
          onChange={handleFromChange}
          label="From Station"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Colombo</MenuItem>
          <MenuItem value={20}>Galle</MenuItem>
          <MenuItem value={30}>Kandy</MenuItem>
        </Select>
      </FormControl>
      <FormControl className='second' sx={{ minWidth: 250, ml:1, mt:3}}>
        <InputLabel id="demo-simple-select-standard-label">To</InputLabel>
        <Select
          className='to'
          labelId="to-station-label"
          id="to-station"
          value={toStation}
          onChange={handleToChange}
          label="To Station"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>Colombo</MenuItem>
          <MenuItem value={2}>Galle</MenuItem>
          <MenuItem value={3}>Kandy</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

