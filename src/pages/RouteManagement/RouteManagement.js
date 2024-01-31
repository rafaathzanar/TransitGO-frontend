import React from "react";
import Grid from "@mui/material/Grid";
import SearchField from "../../components/SearchField/SearchField";
import CRUDtable from "../../components/CRUDtableRoute/CRUDtableRoute";
function RouteManagement() {
  return (
    <Grid container item xs={10}>
      <Grid xs={12} sm={6} md={6} style={{ marginLeft: "10rem" }}>
        <SearchField></SearchField>
        <CRUDtable style={{ margin: "10rem" }}></CRUDtable>
      </Grid>
    </Grid>
  );
}

export default RouteManagement;
