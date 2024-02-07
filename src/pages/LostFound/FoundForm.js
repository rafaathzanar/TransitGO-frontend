import React, { Component } from 'react'
import MyForm from '../../components/MyForm'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ContainedButton from '../../components/ContainedButton';
import OutlinedButton from '../../components/OutlinedButton';



export class FoundForm extends Component {
  render() {
    return (
        <div style={{display:'flex', justifyContent:'center'}}>
        
        <MyForm heading='Report Found Item' />


        <Grid item xs={6} alignItems="center" display="flex" justifyContent="flex-start" style={{ marginLeft: 10 ,}}>

        <ContainedButton btnName='Found' />
        <OutlinedButton btnName='Lost' />
      </Grid>
    

        
        
      </div>
    )
  }
}

export default FoundForm
