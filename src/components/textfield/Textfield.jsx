import React,{useState} from 'react';
import {Stack, TextField} from '@mui/material'
import Datepicker from '../datepicker/Datepicker'
import Selectone from '../select/selectone'
import Selecttwo from '../select/selecttwo'
import './textfield.css'


function Textfield() {
  const[pack,setackage]=useState({
    
  })
  return (
    <div>
      <Selectone/><br/>
      <Datepicker/><br/>
      <Selecttwo/><br/>
      <TextField className='t1' label='Receiver Name' sx={{ minWidth: 250, marginBottom:3 }}/>
      <TextField label='Receiver ID' sx={{ minWidth: 250, ml:1, marginBottom:3, mr:3}}/>
      <TextField label='Receiver Contact Number' sx={{marginBottom:3}} />
      <br/><br/>
    </div>
  )
}

export default Textfield
