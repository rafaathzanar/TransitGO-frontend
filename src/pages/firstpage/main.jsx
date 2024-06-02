import React from "react";
import "./main.css";
import m1 from "../../components/assets/p1.png";
import { Link, useNavigate } from "react-router-dom";
import { Grid} from "@mui/material";
const Main = () => {
  const Navigate = useNavigate();
  return (
    <Grid container>
      <Grid item xs={12} md={7}>
        <div className="leftside">
        <h1 style={{color:"#132968", fontWeight:700}}>Move your packages <br/>with us.</h1>
        <p style={{color:"#132968", fontWeight:400, marginTop:0, marginBottom:50}}>Safely move your belongings to your desired places <br/> through our bus route in a fair price.</p>
        <Grid item xs={8} md={12} className="button" style={{paddingLeft:0}}><button onClick={() => Navigate("form")} className="button" style={{width:380, height:60,borderRadius:59,color:"#132968",fontWeight:500, fontSize:18,backgroundColor:"#bfedf9"}}>Move My Package!</button></Grid>
        
        <Grid container xs={12} md={7.5} justifyContent="center" alignItems="center" className="a1" style={{color:"#132968", fontWeight:400,paddingLeft:0, paddingTop:20}}><Link to="tracking">Track My Package</Link></Grid>
        </div>
      </Grid>
      <Grid item xs={12} md={5}>
        <div className="img1"><img src={m1}/></div>
      </Grid>
    </Grid>
  );
};


export default Main;
