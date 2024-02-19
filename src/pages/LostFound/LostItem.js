import React, { useState } from "react";
import DescriptionCardList from "../../components/DescriptionCardList";
import SearchFilter from "../../components/SearchFilter";
import IconImg from "../../components/IconImg";
import img4 from "../../images/lost.png";
import Typography from "@mui/material/Typography";
import HeadingBar from "../../components/HeadingBar";
import { Container, Grid } from "@mui/material"; // Import Grid from MUI
import { useEffect } from "react";
import { Description } from "@mui/icons-material";

const LostItem = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [existingData, setExistingData] = useState([
    {
      id: 1,
      Uname: "Kusal",
      numb: "075-1234567",
      bus: "Colombo-Kandy",
      desc: "I lost a wallet on this route today morning",
      dateTime: "2024.01.01 at 7.00 PM",
    },
    {
      id: 2,
      Uname: "Smith",
      numb: "074-5123456",
      bus: "Galle-Matale",
      desc: "I have lost a bag",
      dateTime: "2024.01.01 at 7.00 PM",
    },
    {
      id: 3,
      Uname: "Dias",
      numb: "071-6823456",
      bus: "colombo-Jaffna",
      desc: "I lost my umbrella",
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
      desc: "I missed my umbrella today",
      dateTime: "2024.01.01 at 7.00 PM",
    },
    {
      id: 5,
      Uname: "John",
      numb: "077-7478458",
      bus: "Colombo-Kurunegale",
      desc: "I have lost my watch on this route yesterday",
      dateTime: "2024.01.01 at 7.00 PM",
    },
    {
      id: 6,
      Uname: "John Doe",
      numb: "077-7478458",
      bus: "Colombo-Kurunegale",
      desc: "I have lost my  a bag yesterday",
      dateTime: "2024.01.01 at 7.00 PM",
    },
    {
      id: 7,
      Uname: "Chamitha",
      numb: "076-1234567",
      bus: "Colombo-Kandy",
      desc: "I lost a wallet.if anyone found please contact me through above number",
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

  useEffect(() => {
    // Call handleResize on component mount and window resize
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array to run only once on mount

  // ... rest of your component code

  // Define the handleResize function outside the component
  const handleResize = () => {
    // ... (content of handleResize function remains unchanged)
  };

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
        <h1> Reported Lost Items</h1>

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
