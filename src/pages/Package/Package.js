import React from "react";
import Grid from "@mui/material/Grid";
import CRUDtablePackage from "../../components/CRUDtablePackage/CRUDtablePackage";
import CommonButton from "../../components/common/CommonButton/CommonButton";
import { useNavigate } from "react-router";
function RouteManagement() {
  const navigate = useNavigate();
  return (
    <Grid container item xs={10}>
      <Grid xs={12} sm={6} md={6} style={{ marginLeft: "5rem" }}>
        <CRUDtablePackage style={{ margin: "10rem" }}></CRUDtablePackage>
      </Grid>
    </Grid>
  );
}

export default RouteManagement;
