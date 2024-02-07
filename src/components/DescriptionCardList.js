// DescriptionCardList.js
import React from 'react';
import DescriptionCard from './DescriptionCard';

const DescriptionCardList = ({ data }) => {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {data.map((item) => (
        <DescriptionCard key={item.id} Uname={item.Uname} numb={item.numb} bus={item.bus} desc={item.desc} />
      ))}
    </div>
  );
};

export default DescriptionCardList;
