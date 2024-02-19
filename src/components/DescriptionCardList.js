// DescriptionCardList.js
import React from "react";
import DescriptionCard from "./DescriptionCard";
import { Grid } from "@mui/material";

const DescriptionCardList = ({ data }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {data.map((item, index) => (
        <DescriptionCard
          key={index} // Make sure to provide a unique key for each card
          Uname={item.Uname}
          numb={item.numb}
          bus={item.bus}
          desc={item.desc}
          dateTime={item.dateTime}
        />
      ))}
    </div>
  );
};

export default DescriptionCardList;
