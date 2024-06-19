import React,{useState} from 'react';
import {Stack, TextField,Autocomplete} from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LoginButton from "../LoginButton/LoginButton";
import './textfield.css'
import axios from "axios";



function Textfield() {


  const[pack,setpack]=useState({
    busID:"",
    destination:"",
    payment:"",
    receivedDate:"",
    start:"",
    status:"",
    receiverName:"",
    receiverContact:"",
    receiverNIC:""
  })

  const{busID,destination,payment,receivedDate,start,status,receiverName,receiverContact,receiverNIC}=pack;
  
  /*const[Error,setError]=useState({
    busID:false,
    destination:false,
    payment:false,
    receivedDate:false,
    start:false,
    status:false,
    receiverName:false,
    receiverContact:false,
    receiverNIC:false
  })*/

  
  
  const onInputChange=(e)=>{
    setpack({...pack,[e.target.name]: e.target.value});
    //setError({ ...Error, [e.target.name]: false});
  };

  
  


  const onSubmitPack=async(e)=>{
    e.preventDefault();
    /*const errors = {};
    Object.keys(pack).forEach((key)=> {
      if (!pack[key]){
        errors[key] = true;
      }
    });

    if (Object.keys(errors).length > 0){
      setError(errors);
      return;
    }
    
    else{*/
    try{
      await axios.post("http://localhost:8080/package",pack);
      setpack({
        busID:'',
        destination:'',
        payment:'',
        receivedDate:'',
        start:'',
        status:'',
        receiverName:'',
        receiverContact:'',
        receiverNIC:''
      });
    }catch(error){
      console.error("Error in submitting: ", error);
    }
  }
  


  return(
    <form onSubmit={onSubmitPack}>
    <div>
    <FormControl className='select-from' sx={{ minWidth: 250, mt:3, mr:1 }}>
        <InputLabel>From</InputLabel>
        <Select
          name='start'
          value={pack.start}
          onChange={onInputChange}
          label="From Station"
          required={true}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Colombo"}>Colombo</MenuItem>
          <MenuItem value={"Galle"}>Galle</MenuItem>
          <MenuItem value={"Kandy"}>Kandy</MenuItem>
        </Select>
      </FormControl>

      <FormControl className='select-To' sx={{ minWidth: 250, mt:3,mb:3}}>
        <InputLabel>To</InputLabel>
        <Select
          name='destination'
          value={pack.destination}
          onChange={onInputChange}
          label="To Station"
          required={true}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Colombo"}>Colombo</MenuItem>
          <MenuItem value={"Galle"}>Galle</MenuItem>
          <MenuItem value={"Kandy"}>Kandy</MenuItem>
        </Select>
      </FormControl>
    
      <TextField
        label="Received Date"
        name="receivedDate"
        value={pack.receivedDate}
        onChange={onInputChange}
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        autoComplete="on"
        required={true}
      />
      <br/>
      <FormControl sx={{ minWidth: 300, mt:3, mb:3}}>
        <InputLabel id="select-bus">Select bus</InputLabel>
        <Select
          name="busID"
          value={pack.busID}
          onChange={onInputChange}
          label="Station"
          required={true}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"001A"}>001A Colombo-Kandy     10.00AM</MenuItem>
          <MenuItem value={"001B"}>001B Colombo-Jaffna    11.00AM</MenuItem>
          <MenuItem value={"001L"}>001L Galle-Colombo     03.00PM</MenuItem>
        </Select>
      </FormControl>
      <br/>
      <TextField 
        className='t1' 
        label='Receiver Name' 
        name='receiverName' 
        value={pack.receiverName} 
        onChange={onInputChange} 
        required={true}
        //error={Error.receiverName}
        helperText={Error.receiverName && "Receiver Name is required"}
        sx={{ minWidth: 250, marginBottom:3, mr:1 }}/>
      <TextField label='Receiver ID' 
        name="receiverNIC" 
        value={pack.receiverNIC} 
        onChange={onInputChange} 
        required={true}
        sx={{ minWidth: 250, marginBottom:3, mr:3}}/>
      <TextField label='Receiver Contact' 
        name="receiverContact" 
        value={pack.receiverContact} 
        onChange={onInputChange}
        required={true} 
        sx={{marginBottom:3}} />
      <br/><br/>
      <div className="confirm"><LoginButton  buttonTitle={"Confirm Booking"}/></div>
    </div>
    </form>
  )

}
export default Textfield;
