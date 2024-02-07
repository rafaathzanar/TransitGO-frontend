import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

const SearchFilter = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
  };

  return (
    <TextField
    placeholder="Search..."
    variant="outlined"
    style={{
      width: '150px', // Adjust the width as needed
      borderRadius: '4px', // Add border-radius for a rectangular shape
     padding:'1px',
       // Optional: Add some margin for spacing
      height:'30px',
    }}
    value={searchTerm}
    onChange={handleSearch}
    InputProps={{
      startAdornment: (
        <SearchIcon style={{ color: '#6d7070' }} />
      ),
    }}
  />

  );
};

export default SearchFilter;
