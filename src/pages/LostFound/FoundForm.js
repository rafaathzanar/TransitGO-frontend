import React from "react";
import MyForm from "../../components/MyForm";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ContainedButton from "../../components/ContainedButton";
import OutlinedButton from "../../components/OutlinedButton";
import { useNavigate } from "react-router";

function FoundForm() {
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <MyForm heading="Report Found Item" />

      <Grid
        item
        xs={6}
        alignItems="center"
        display="flex"
        justifyContent="flex-start"
        style={{ marginLeft: 10 }}
      >
        <ContainedButton
          btnName="Found"
          onClick={() => {
            navigate("founditem");
          }}
        />
        <OutlinedButton
          btnName="Lost"
          o
          onClick={() => {
            navigate("lostitem");
          }}
        />
      </Grid>
    </div>
  );
}

export default FoundForm;
