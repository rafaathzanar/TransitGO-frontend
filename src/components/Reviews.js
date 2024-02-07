import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function Reviews(props) {
  const [value, setValue] = React.useState('0');
  const [userSelections, setUserSelections] = React.useState({
    veryHigh: 0,
    high: 0,
    low: 0,
    veryLow: 0,
  });

  const handleChange = (event) => {
    setValue(event.target.value);
    
    setUserSelections((prevState) => ({
         ...prevState ,
        [event.target.value] : prevState[event.target.value] + 1
       
      }));
      
  }
   
  

  return (
    <FormControl>
     <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormLabel id="demo-controlled-radio-buttons-group">
          
          <h6>{props.heading}</h6>
        </FormLabel>

        <Card sx={{ border: 1, borderColor: '#f2a2a2', marginRight: 5 }}>

      <CardContent sx={{ backgroundColor: '#e6f2f5' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          <FormControlLabel
            value="veryHigh"
            control= {<Radio
            checked={value === "veryHigh"} // Bind to the selected value
            onChange={handleChange} // Handle radio button changes
          />}
          
            label={
              <span>
                Very High <Typography variant="caption" color="textSecondary">({userSelections.veryHigh})</Typography>
              </span>
            }
            labelPlacement="start"
          />
        
        <FormControlLabel
            value="high"
            control= {<Radio
            checked={value === "high"} // Bind to the selected value
            onChange={handleChange} // Handle radio button changes
          />}
          
            label={
              <span>
                 High <Typography variant="caption" color="textSecondary">({userSelections.high})</Typography>
              </span>
            }
            labelPlacement="start"
          />

<FormControlLabel
            value="low"
            control= {<Radio
            checked={value === "low"} // Bind to the selected value
            onChange={handleChange} // Handle radio button changes
          />}
          
            label={
              <span>
                low <Typography variant="caption" color="textSecondary">({userSelections.low})</Typography>
              </span>
            }
            labelPlacement="start"
          />

<FormControlLabel
            value="veryLow"
            control= {<Radio
            checked={value === "veryLow"} // Bind to the selected value
            onChange={handleChange} // Handle radio button changes
          />}
          
            label={
              <span>
                Very Low <Typography variant="caption" color="textSecondary">({userSelections.veryLow})</Typography>
              </span>
            }
            labelPlacement="start"
          />

        </div>
      </CardContent>
      </Card>
      </RadioGroup>
    </FormControl>
  );
}
