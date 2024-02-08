import * as React from "react";
import Button from "@mui/material/Button";

export default function OutlinedButton(props) {
  return (
    <Button variant="outlined" style={{ marginLeft: 10 }}>
      {props.btnName}
    </Button>
  );
}
