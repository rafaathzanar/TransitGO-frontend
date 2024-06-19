import React from "react";
import "./form.css"
import {Grid} from "@mui/material";
import H1 from "../../components/heading/heading";
import M2 from "../../components/assets/p2.png";
import TextField from "../../components/textfield/Textfield";


const Form = () => {
  return (
    <Grid container>
      <Grid
        item
        className="img1"
        xs={12}
        md={6}
        style={{
          backgroundColor: " #f1f3f6",
          paddingTop: 100,
          paddingLeft: 50,
        }}
      >
        <img src={M2} />
      </Grid>
      <Grid item xs={12} md={6} mt={10}>
          <h1 style={{color:"#132968", fontWeight:700, fontSize: 37.813, marginBottom: 30, marginLeft: 150}}>Where is it going?</h1>
          <div className="textfield"><TextField className="fields"/></div>
          
      </Grid>
    </Grid>
  );
};

export default Form;