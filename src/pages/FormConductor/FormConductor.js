import { TextField, Typography, Grid,FormControl, Select, MenuItem, InputLabel, Button } from "@mui/material";
import React, {useEffect, useState} from "react";
import axios from "axios";




function FormConductor(){

    const[pack,setpack] = useState({
        packageID:"",
        status:""
    })

    const {packageID,status} = pack;

    const onInputChange=(e)=>{
        setpack({...pack,[e.target.name]:e.target.value});
    }

    
    const onSubmitPack=async(e)=>{
        e.preventDefault();
        try{
            await axios.put(`http://localhost:8080/package/${packageID}`,pack);
            setpack({
                packageID:"",
                status:""
            });
        }
        catch(error){
            alert("Package is not available")
            //console.error("Error in submitting: ", error.response?.status, error.response?.data);
        }
    
    }


    const clearForm = () =>{
        setpack({
            packageID:"",
            status: ""
        });
    }

    return(
        <Grid containerxs={12} >
            <Grid item xs={12} style={{marginLeft:"4rem", marginTop:"2rem"}}>
                <Typography variant="h4" >Receive / Transfer Package</Typography>
            </Grid>
            <form onSubmit={onSubmitPack}>
            <Grid item xs={12}>
                <TextField className="packageID" sx={{ minWidth: 300, mt:5, ml:8}} 
                 name="packageID"
                 value={pack.packageID} 
                 onChange={onInputChange} 
                 placeholder="Package ID"/> 
            </Grid>


            <Grid item xs={12}>
                <FormControl className='status' sx={{ minWidth: 300, mt:3, ml:8}}>
                    <Select
                        name='status'
                        value={pack.status}
                        onChange={onInputChange}
                    >
                    <MenuItem value={"Depature"}>Receive</MenuItem>
                    <MenuItem value={"Destination"}>Transfer</MenuItem>
                    <MenuItem value={"Completed"}>Completed</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12} sx={{mt:5, ml:8}}>
                <Button variant="contained" type="submit" sx={{mr:2}}>Submit</Button>
                <Button variant="outlined" onClick={clearForm}>Clear</Button>
            </Grid>
            </form>

        </Grid>

    );

}

export default FormConductor;

