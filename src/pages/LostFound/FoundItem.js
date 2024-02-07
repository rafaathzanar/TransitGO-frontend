import React, { useState } from 'react';
import DescriptionCardList from '../../components/DescriptionCardList';
import SearchFilter from '../../components/SearchFilter';
import IconImg from '../../components/IconImg';
import img4 from '../../images/lost.png'
import Typography from '@mui/material/Typography';



const DescriptionPage = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [existingData, setExistingData] = useState([
    { id: 1, Uname: 'John Doe', numb: '123456', bus: ' A', desc: 'missed watch' },
    { id: 2, Uname: 'smith', numb: '123456', bus: 'B', desc: 'lost a bag' },
    { id: 3, Uname: 'dias', numb: '123456', bus: 'A', desc: 'wallet' },

    // Other existing data
  ]);

  const [dynamicData, setDynamicData] = useState([
    { id: 101, Uname: 'mohamed', numb: '111111', bus: 'D', desc: 'travelling bag' },
   
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
    if (typeof value === 'string') {
      return value.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
  })
);


  return (
  <div>
  
      
        <div style={{ display:'flex' }}>   <Typography
           variant="h2"
          marginRight={'50px'}
           sx={{
             fontSize: 32,
            fontWeight: 'bold',
            fontFamily: 'OpenSans', }}>

         {props.head}

        </Typography>

        <div style={{marginLeft:'100px', }}>
      <SearchFilter onSearch={handleSearch} />
      </div>
  
      <IconImg imageSrc={img4}  altText='losticon' />
      </div>
      
    
   
      <div >
      <DescriptionCardList data={searchTerm ? filteredData : allData} />
      </div>
    </div>
  );
};

export default DescriptionPage;

