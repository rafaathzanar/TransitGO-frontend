import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";



export default function EditFoundForm(){

  let navigate=useNavigate();

  const {id}=useParams();

  const[item,setItem]=useState({
           name:"",
           mobile_Number:"",
           bus_Description:"",
          item_Description:""
  })

  const{name,mobile_Number,bus_Description,item_Description}=item

  const onInputChange=(e, fieldName)=>{
               setItem({...item,[fieldName]:e.target.value});
  };

  useEffect(()=>{
    loadItems();
  },[] );

 
  const  onSubmit= async(data) =>{
    await axios.put(`http://localhost:8080/found/${id}`,item);
    navigate("/lostandfound/founditem");
  };

  const loadItems =async ()=>{
    const result=await axios.get(`http://localhost:8080/found/${id}`);
    setItem(result.data);
    console.log("result.data")
  }



  const { handleSubmit } = useForm();

 

  return (
    <div>
     
      <form onSubmit={handleSubmit(onSubmit)}>

      <Box sx={{ margin: "auto", marginTop: 5 ,display: "flex", justifyContent: "center" }}>

      <Card>

      <CardContent>

      <Typography variant="h2" align="center" sx={{fontSize: 32,fontWeight: "bold",fontFamily: "Open Sans" }}>
     Edit Found Form
      </Typography>

      <br/>

              <Grid container spacing={2}>

                <Grid item xs={12}>
                  <Stack direction="column" spacing={2}>
                    <TextField
                      label="Name"
                     
                      variant="outlined"
                      placeholder="Enter your name"
                      fullWidth
                      value={name}
                      onChange={(e)=>onInputChange(e, "name") }  />
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Stack direction="column" spacing={2}>
                    <TextField
                      label="Mobile Number"
                      
                      variant="outlined"
                      fullWidth
                      value={mobile_Number}
                      onChange={(e)=>onInputChange(e,"mobile_Number") } />
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Stack direction="column" spacing={2}>
                    <TextField
                      label="Bus Description"
                      multiline
                      minRows={2.5}
                      required
                      variant="outlined"
                      fullWidth
                      value={bus_Description}
                      onChange={(e)=>onInputChange(e,"bus_Description") } />
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Stack direction="column" spacing={2}>
                    <TextField
                      label="Item Description"
                      multiline
                      minRows={2.5}
                      required
                      variant="outlined"
                      fullWidth
                      value={item_Description}
                      onChange={(e)=>onInputChange(e,"item_Description") }/>
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Stack direction="column" spacing={1.5}>

                    <Button variant="contained" sx={{ backgroundColor: "black", color: "white" }}  input  type="submit" >  Submit </Button>

                  </Stack>
                </Grid>
              </Grid>

<br/>

              

            </CardContent>

          </Card>

        </Box>

      </form>

    </div>
  );
};

