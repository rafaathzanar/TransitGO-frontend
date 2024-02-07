import { CardContent } from '@mui/material'
import React from 'react'
import RadioButton from './Reviews'
import SelectComp from './SelectComp'
import Card from '@mui/material/Card';
import Reviews from './Reviews';

function CardTwo() {
  return (
    <div >
      <Card style={{ width: '500px', height: '450px'}}>

        <CardContent >
            <div>
            
                <Reviews heading='Route Traffic' />
                <Reviews heading='Bus Crowd Status' />
                <SelectComp />
            </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CardTwo
