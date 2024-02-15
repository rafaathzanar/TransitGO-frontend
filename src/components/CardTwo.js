import { CardContent } from '@mui/material'
import React from 'react'
import SelectComp from './SelectComp'
import Card from '@mui/material/Card';
import Reviews from './Reviews';
import Typography from '@mui/material/Typography';


function CardTwo() {
  return (
    <div >
    
            
            <Typography variant="h1" 
            fontFamily='Sans serif'
            style={{marginTop:'20px'}}>
                     Reviews
            </Typography>  <br/> 
            <div style={{display:'flex'}}>
            <div style={{flexGrow:'1'}}>
                <Reviews heading='Route Traffic' />
                </div>
                <div style={{flexGrow:'1'}}>
                <Reviews heading='Bus Crowd Status' />
            </div>
            </div>
                <SelectComp />
            
    </div>
  )
}

export default CardTwo;