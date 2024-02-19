import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const DescriptionCard = ({ Uname, numb, bus, desc, dateTime }) => {
  return (
    <Card
      sx={{
        background: "light-grey",

        border: "2px solid #FA6B6B",
      }}
      style={{ width: "80%", margin: 20 }}
    >
      <CardContent>
        <Typography variant="body1" component="div">
          <strong>Name:</strong> {Uname}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          <strong>Contact Number:</strong> {numb}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          <strong>Bus Details:</strong> {bus}
        </Typography>
        <Typography variant="body1" component="div">
          <strong>Item Description:</strong> {desc}
        </Typography>
        <span style={{ color: "red" }}>
          <Typography variant="body3 ">Posted On :</Typography> {dateTime}{" "}
        </span>
      </CardContent>
    </Card>
  );
};

export default DescriptionCard;
