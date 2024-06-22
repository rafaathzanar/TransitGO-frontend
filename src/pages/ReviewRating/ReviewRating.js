import React, { useState } from "react";
import CardOne from "../../components/ReviewPage/CardOne";
import { useParams } from "react-router-dom";

function ReviewRating() {
  const { busID } = useParams();

  const handleSubmit = (commentData) => {
    console.log("Submitted comment:", commentData);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#031a30",
        borderTopRightRadius: "0px",
      }}
    >
      <CardOne busID={busID} onSubmit={handleSubmit} />
    </div>
  );
}

export default ReviewRating;
