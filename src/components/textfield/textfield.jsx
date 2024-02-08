import React from 'react';
import {Stack, TextField} from '@mui/material'
import Datepicker from '../datepicker/datepicker'
import Selectone from '../select/selectone'
import Selecttwo from '../select/selecttwo'
import './textfield.css'


function textfield() {
  return (
    <div>
      <Selectone/><br/>
      <Datepicker/><br/>
      <Selecttwo/><br/>
      <TextField className='t1' label='Receiver Name' sx={{ minWidth: 250 }} />
      <TextField label='Receiver ID' sx={{ minWidth: 250 }}/><br/><br/>
      <TextField label='Receiver Contact Number' />
      <br/><br/>
    </div>
  )
}

export default textfield
