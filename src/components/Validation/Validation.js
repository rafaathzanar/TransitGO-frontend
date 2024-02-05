// Validation.js
import React from "react";
import Typography from "@mui/material/Typography";

const Validation = ({ error }) => (
  <Typography variant="body2" color="error" paragraph>
    {error}
  </Typography>
);

export default Validation;
