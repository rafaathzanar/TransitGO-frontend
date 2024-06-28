import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

const SearchFilter = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
  };

  return (
    <TextField
      placeholder="Search..."
      style={{
        position: "relative",

        width: "20rem", // Adjust the width as needed
        borderRadius: "4px",
        padding: "0px", // Adjust padding for the inner content

        backgroundColor: "#020552",
      }}
      value={searchTerm}
      onChange={handleSearch}
      InputProps={{
        startAdornment: (
          <SearchIcon
            style={{ color: "#edebe6", marginRight: "7", marginLeft: "10" }}
          />
        ),
        style: { padding: "0", margin: "0" }, // Adjust padding and margin for the input field
        inputProps: { style: { color: "#edebe6" } }, // Set color for the input text
      }}
    />
  );
};

export default SearchFilter;
