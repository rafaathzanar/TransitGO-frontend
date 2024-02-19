import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const FeedbackCards = ({ username, profile, rating, comment }) => {
  return (
    <Card
      sx={{
        border: 1,
        borderRadius: "25px",
        borderColor: "#f2a2a2",
        margin:"5px"
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          
        }}
      >
        <Typography variant="h3">{username}</Typography>
        <img src={profile} alt={username} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Rating
            name="read-only"
            size="large"
            value={rating}
            readOnly
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
        </Box>
        <Typography variant="body1">{comment}</Typography>
      </CardContent>
    </Card>
  );
};

export default FeedbackCards;
