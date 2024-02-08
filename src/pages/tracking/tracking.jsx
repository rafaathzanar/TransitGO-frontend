import React from 'react'
import Heading from '../../components/heading/heading'
import './tracking.css'
import {Stack, TextField} from '@mui/material'
function tracking() {
  return (
    <div className='content'>
      <div className='header'>
        <p className='p1'>TRACK PACKAGE</p>
        <Heading className="h1" text="Want to track your belonging?"/>
      </div>
      <div className='search'>
        <TextField className='t1' label="Your parcel's tracking ID"  size='small' sx={{ minWidth: 600 }} />
      </div>
      <div className='track'>
        <div className='map'>
          
        </div>
      </div>
    </div>
  )
}

export default tracking;
