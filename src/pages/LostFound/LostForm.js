import React, { Component } from "react";

import MyForm from "../../components/MyForm";
import Grid from "@mui/material/Grid";
import ContainedButton from "../../components/ContainedButton";
import OutlinedButton from "../../components/OutlinedButton";
import { useNavigate } from "react-router-dom";

function LostForm() {
  const navigate = useNavigate();

  return (
    <div className="lost-form">
      <div className="lost-form-container">
        <MyForm heading="Report Lost Item" />
        <Grid container spacing={2} className="button-grid">
          <Grid item xs={6}>
            <ContainedButton btnName="Lost" onClick={() => navigate("lostitem")} />
          </Grid>
          <Grid item xs={6}>
            <OutlinedButton btnName="Found" onClick={() => navigate("founditem")} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default LostForm;
