import React, { useState } from "react";
import CardOne from "../../components/ReviewPage/CardOne";
import { useParams } from "react-router-dom";

function ReviewRating() {
  const { busID } = useParams();

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
      <CardOne busID={busID} />
    </div>
  );
}

export default ReviewRating;
