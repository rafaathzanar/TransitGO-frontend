import React, { Component } from 'react'
import MyForm from '../../components/MyForm'
import Grid from '@mui/material/Grid';
import ContainedButton from '../../components/ContainedButton'
import OutlinedButton from '../../components/OutlinedButton'

export class LostForm extends Component {
  render() {
    return (
      <div style={{display:'flex', justifyContent:'center'}}>
        <MyForm heading='Report Lost Item'/>

        <Grid item xs={6} alignItems="center" display="flex" justifyContent="flex-start" style={{ marginLeft: 10 ,}}>

        <ContainedButton btnName='Lost' />
        <OutlinedButton btnName='Found' />

      </Grid>
      </div>
    )
  }
}

export default LostForm
