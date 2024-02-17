import React, { useState } from "react";
import DescriptionCardList from "../../components/DescriptionCardList";
import SearchFilter from "../../components/SearchFilter";
import IconImg from "../../components/IconImg";
import img5 from "../../images/found.png";
import HeadingBar from "../../components/HeadingBar";
import { Container, Grid } from "@mui/material"; // Import Grid from MUI
import { useEffect } from "react";

const LostItem = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [existingData, setExistingData] = useState([
    {
      id: 1,
      Uname: "Kusal",
      numb: "075-1234567",
      bus: "Colombo-Kandy",
      desc: "found a  wallet on this route today morning.if it is yours,contact me",
      dateTime: "2024.01.01 at 7.00 PM",
    },
    {
      id: 2,
      Uname: "Smith",
      numb: "074-5123456",
      bus: "Galle-Matale",
      desc: "found a bag",
      dateTime: "2024.01.01 at 7.00 PM",
    },
    {
      id: 3,
      Uname: "Dias",
      numb: "071-6823456",
      bus: "colombo-Jaffna",
      desc: "found an  umbrella",
      dateTime: "2024.01.01 at 7.00 PM",
    },
    // Other existing data
  ]);

  const [dynamicData, setDynamicData] = useState([
    {
      id: 4,
      Uname: "Mohamed",
      numb: "070-7437458",
      bus: "Kaduruwela-Colombo",
      desc: "found a backpack.if you think it might belongs to you please let me know",
      dateTime: "2024.01.01 at 7.00 PM",
    },
    {
      id: 5,
      Uname: "John",
      numb: "077-7478458",
      bus: "Colombo-Kurunegale",
      desc: "a watch was founded",
      dateTime: "2024.01.01 at 7.00 PM",
    },

    // Other dynamic data
  ]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Merge existingData and dynamicData
  const allData = [...existingData, ...dynamicData];

  // Filter data based on the search term
  const filteredData = allData.filter((item) =>
    Object.values(item).some((value) => {
      if (typeof value === "string") {
        return value.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return false;
    })
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <h1> Reported Found Items</h1>
        <SearchFilter onSearch={handleSearch} />
      </div>
      <DescriptionCardList
        data={searchTerm ? filteredData : allData}
        style={{ display: "flex", flexWrap: "wrap" }}
      />
    </>
  );
};

export default LostItem;
