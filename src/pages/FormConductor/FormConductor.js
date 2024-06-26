import {
  TextField,
  Typography,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Box,
  InputLabel,
  Button,
  ButtonBase,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

function FormConductor() {
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');
  const Authorization = {
    headers: {Authorization: `Bearer ${token}`}
  }
  const [pack, setpack] = useState({
    packageID: "",
    status: "",
  });

  const [pacDet, setPacDet] = useState([]);

  useEffect(()=>{
    loadPackageDetails();
  },[]);

  const { packageID, status } = pack;

  const onInputChange = (e) => {
    setpack({ ...pack, [e.target.name]: e.target.value });
  };

  const loadPackageDetails = async () => {
    // e.preventDefault();
   
    try{
      const packages = await axios.get(`http://localhost:8080/packages`,Authorization);
      console.log(packages);
      const packageArray = packages.data || [];
      const filteredPackages = packageArray.filter((pac)=>String(pac.employeeId) === String(id));
      setPacDet(filteredPackages);
    }catch (error){
      console.log("Error loading packages", error);
    }
  }

  const onSubmitPack = async () => {
    console.log(packageID);
    //e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/package/${packageID}`, pack, Authorization );
      console.log(response);
      setpack({
        packageID: "",
        status: "",
      });
      loadPackageDetails();
    } catch (error) {
      alert("Package is not available");
      //console.error("Error in submitting: ", error.response?.status, error.response?.data);
    }
  };

  const clearForm = () => {
    setpack({
      packageID: "",
      status: "",
    });
  };

  const getStatusColor = (status) =>{
    switch (status){
        case 'Booked':
           return 'red';
        case 'Received':
          return 'blue'; 
        case 'Completed':
          return 'green'; 
        default:
          return '#000';
    }
  };

  return (
    <Grid containerxs={12}>
      <Grid item xs={12} style={{ marginLeft: "4rem", marginTop: "2rem" }}>
        <Typography variant="h4">Receive / Transfer Package</Typography>
      </Grid>
      <form onSubmit={onSubmitPack}>
        <Grid item xs={12}>
          <TextField
            className="packageID"
            sx={{ minWidth: 300, mt: 5, ml: 8 }}
            name="packageID"
            value={pack.packageID}
            disabled
            placeholder="Package ID"
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl className="status" sx={{ minWidth: 300, mt: 3, ml: 8 }}>
            <Select name="status" value={pack.status} onChange={onInputChange}>
              <MenuItem value={"Received"}>Received</MenuItem>
              <MenuItem value={"Completed"}>Completed</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sx={{ mt: 5, ml: 8 }}>
          <Button variant="contained" type="submit" sx={{ mr: 2 }}>
            Submit
          </Button>
          <Button variant="outlined" onClick={clearForm}>
            Clear
          </Button>
        </Grid>
      </form>
      <Grid item xs={12} container spacing={2} justifyContent="left" sx={{padding: "5%"}}>
      {pacDet.length > 0 ? pacDet.map((pac) => (
        <Grid item xs={12} sm={6} md={4} key={pac.packageID} sx={{ display: 'flex', justifyContent: 'center' }}>
        <ButtonBase
            onClick={() => setpack({
            packageID: pac.packageID,
            status: pac.status
          })}
          sx={{
            width: '80%', 
                padding: '5%', 
                height: '150px', 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid #ddd',
                borderRadius: '10px', 
                backgroundColor: '#f9f9f9',
                textAlign: 'center',
                boxShadow: '0 4px 8px rgba(0, 0, 1, 0.1)',
                '&:hover': {
                  backgroundColor: '#132968',
                  transform: 'scale(1.1)',
                  color: "white" 
                },
          }}
        >
              <Typography 
              variant="h6" 
              gutterBottom
              sx={{fontWeight: "bold"}}
              >
                Package ID: {pac.packageID}
              </Typography>
              <Typography variant="body2">
                {pac.start} - {pac.destination}
              </Typography>
              <Typography variant="body2">
                {pac.receiverName}
              </Typography>
              <Typography variant="body2"
              sx={{color: "#FA6B6B"}}>
                {pac.receiverContact}
              </Typography>
              <Typography
              sx={{backgroundColor: getStatusColor(pac.status), color:"white", padding:"2px 5px", borderRadius:"5px"}}
              > 
              {pac.status}
              </Typography>
        </ButtonBase>
        </Grid>
      )):(
        <p style={{ textAlign: 'center', fontSize: '2rem', opacity: '0.5' }}>No Package Found</p>
      )
    }
      </Grid>
      
    </Grid>
  );
}

export default FormConductor;
