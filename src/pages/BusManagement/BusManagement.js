import React from "react";
import CRUDtableBus from "../../components/CRUDtableBus/CRUDtableBus";
import Grid from "@mui/material/Grid";
import SearchField from "../../components/SearchField/SearchField";
import CommonButton from "../../components/common/CommonButton/CommonButton";
import { useNavigate } from "react-router";
function BusManagement() {
  const navigate = useNavigate();
  return (
    <Grid container item xs={10}>
      <Grid xs={12} sm={6} md={6} style={{ marginLeft: "10rem" }}>
        <SearchField placeholderText="Search Bus"></SearchField>
        <CommonButton
          sx={{ marginTop: "20px" }}
          variant="contained"
          size="small"
          onClick={() => navigate("addbus")}
        >
          Add Bus
        </CommonButton>
        <CRUDtableBus style={{ margin: "10rem" }}></CRUDtableBus>
      </Grid>
    </Grid>
  );
}

export default BusManagement;
