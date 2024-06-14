import React from "react";
import Grid from "@mui/material/Grid";
import CRUDtableRoute from "../../components/CRUDtableRoute/CRUDtableRoute";
import CommonButton from "../../components/common/CommonButton/CommonButton";
import { useNavigate } from "react-router";

function RouteManagement() {
  const navigate = useNavigate();
  return (
    <Grid container item xs={10}>
      <Grid item xs={12} sm={6} md={6} style={{ marginLeft: "5rem" }}>
        <div>
          <CommonButton
            variant="contained"
            size="small"
            onClick={() => navigate("addroute")}
          >
            Add Route
          </CommonButton>
        </div>

        <CRUDtableRoute></CRUDtableRoute>
      </Grid>
    </Grid>
  );
}

export default RouteManagement;
