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
      <Grid item xs={12} sm={6} md={6} style={{ marginLeft: "5rem" }}>
        <CommonButton
          variant="contained"
          size="small"
          onClick={() => navigate("addbus")}
        >
          Add Bus
        </CommonButton>
        <CRUDtableBus></CRUDtableBus>
      </Grid>
    </Grid>
  );
}

export default BusManagement;
