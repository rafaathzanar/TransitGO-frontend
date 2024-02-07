import * as React from "react";
import Button from "@mui/material/Button";

export default function ContainedButton(props) {
  return (
    <Button
      variant="contained"
      sx={{ backgroundColor: "black", color: "white" }}
    >
      {props.btnName}
    </Button>
  );
}
