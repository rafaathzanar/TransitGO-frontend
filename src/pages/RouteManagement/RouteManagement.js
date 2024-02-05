import React from "react";
import Grid from "@mui/material/Grid";
import SearchField from "../../components/SearchField/SearchField";
import CRUDtableRoute from "../../components/CRUDtableRoute/CRUDtableRoute";
import CommonButton from "../../components/common/CommonButton/CommonButton";
import { useNavigate } from "react-router";
function RouteManagement() {
  const navigate = useNavigate();
  return (
    <Grid container item xs={10}>
      <Grid xs={12} sm={6} md={6} style={{ marginLeft: "10rem" }}>
        <div>
          <SearchField placeholderText="Search Route"></SearchField>

          <CommonButton
            sx={{ marginTop: "20px" }}
            variant="contained"
            size="small"
            onClick={() => navigate("addroute")}
          >
            Add Route
          </CommonButton>
        </div>

        <CRUDtableRoute style={{ margin: "10rem" }}></CRUDtableRoute>
      </Grid>
    </Grid>
  );
}

export default RouteManagement;
