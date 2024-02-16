import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import StarRating from "./StarRating"; // Assuming you have a StarRating component

const FeedBacks = ({ username, profile, rating, comment }) => {
  return (
    <Card>
      <CardContent>
        <h3>{username}</h3>
        <img src={profile} alt={username} />
        <StarRating value={rating} readOnly />
        <p>{comment}</p>
      </CardContent>
    </Card>
  );
};

export default FeedBacks;
