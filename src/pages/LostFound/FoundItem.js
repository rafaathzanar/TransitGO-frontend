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
    },
    {
      id: 2,
      Uname: "Smith",
      numb: "074-5123456",
      bus: "Galle-Matale",
      desc: "found a bag",
    },
    {
      id: 3,
      Uname: "Dias",
      numb: "071-6823456",
      bus: "colombo-Jaffna",
      desc: "found an  umbrella",
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
    },
    {
      id: 5,
      Uname: "John",
      numb: "077-7478458",
      bus: "Colombo-Kurunegale",
      desc: "a watch was founded",
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
    <Container>
      <Grid container spacing={2}>
        <div style={{ display: "flex", gap: "400px" }}>
          <Grid item xs={12} sm={6}>
            <div style={{ marginTop: "20px" }}>
              <HeadingBar title="Found Items" />
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <div style={{ marginTop: "20px" }}>
              <SearchFilter onSearch={handleSearch} />
            </div>
          </Grid>

          <div>
            <IconImg imageSrc={img5} altText="losticon" />
          </div>
        </div>
        <Grid item xs={12}>
          <DescriptionCardList
            data={searchTerm ? filteredData : allData}
            style={{ display: "flex", flexWrap: "wrap" }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default LostItem;
